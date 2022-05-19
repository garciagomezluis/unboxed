import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { Web3Provider } from '@ethersproject/providers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import useError from '../hooks/error';

// TODO: Move configuration to a config file. Remove hardcode.
const POLYGON_MUMBAI_CHAIN_ID = 80001;
const INFURA_KEY = 'd66228f0bbb04cab9accaf05ce471c3d';

const getViewAddress = (address: string) => {
    if (address === '') return '';
    const hex = address.split('x')[1];
    const first = hex.substring(0, 2);
    const second = hex.substring(hex.length - 2, hex.length);
    return '0x' + first + '...' + second;
};

const AccountContext = createContext<{
    connect: () => void;
    disconnect: (reload: boolean) => void;
    connected: boolean;
    address: string;
    balance: string;
    viewAddress: string;
}>({
    connect: () => {},
    disconnect: () => {},
    connected: false,
    address: '',
    balance: '0',
    viewAddress: '',
});

export const useAccount = () => {
    return useContext(AccountContext);
};

export const AccountProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const web3modal = useRef<Web3Modal | null>(null);
    const provider = useRef<Web3Provider | null>(null);

    const [address, setAddress] = useState<string>('');
    const [balance, setBalance] = useState<string>('');
    const [connected, setConnected] = useState<boolean>(false);

    const { showError } = useError({});

    useEffect(() => {
        // TODO: Explore a more flexible alternative to this to generate this configuration.
        web3modal.current = new Web3Modal({
            providerOptions: {
                walletconnect: {
                    package: WalletConnectProvider,
                    options: {
                        rpc: {
                            [POLYGON_MUMBAI_CHAIN_ID]: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,
                        },
                    },
                },
                coinbasewallet: {
                    package: CoinbaseWalletSDK,
                    options: {
                        appName: 'Unboxed',
                        infuraId: INFURA_KEY,
                    },
                },
            },
        });
    }, []);

    const setAccountData = async () => {
        const signer = provider.current!.getSigner();

        if (signer) {
            setAddress(await signer.getAddress());
            setBalance(ethers.utils.formatEther(await signer.getBalance()));
            setConnected(true);
        }
    };

    const unsetAccountData = (reload = false) => {
        provider.current = null;
        setAddress('');
        setBalance('0');
        setConnected(false);

        if (reload) {
            location.href = '/';
        }
    };

    const connect = async () => {
        if (!web3modal.current) return;

        let instance;

        try {
            instance = await web3modal.current.connect();
        } catch (error) {
            showError('Could not connect an account');
            return;
        }

        provider.current = new ethers.providers.Web3Provider(instance);

        const network = await provider.current.getNetwork();

        if (network.chainId !== POLYGON_MUMBAI_CHAIN_ID) {
            disconnect();
            showError('Invalid network. Please switch to Polygon Mumbai');
            return;
        }

        setAccountData();

        instance.on('accountsChanged', async (accounts: string[]) => {
            console.log(`accounts changed: ${accounts}`);

            setAccountData();
        });

        instance.on('chainChanged', (chainId: number) => {
            console.log(`accounts changed: ${chainId}`);

            disconnect(true);
        });
    };

    const disconnect = (reload = false) => {
        if (
            provider.current &&
            provider.current.provider &&
            (provider.current.provider as any).disconnect
        ) {
            (provider.current.provider as any).disconnect();
        }

        unsetAccountData(reload);
    };

    return (
        <AccountContext.Provider
            value={{
                connect,
                disconnect,
                connected,
                address,
                balance,
                viewAddress: getViewAddress(address),
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
