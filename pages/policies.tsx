/* eslint-disable @next/next/no-sync-scripts */
import type { NextPage } from 'next';
import Head from 'next/head';
import { PoolCoverageBox } from '../components/PoolBox';
import Template from '../components/Template';

const Policies: NextPage = () => {
    return (
        <>
            <Head>
                <title>Unboxed - Decentralized insurance services</title>
                <meta name="description" content="Unboxed - Decentralized insurance services" />
                <link rel="icon" href="/favicon.ico" />
                <script src="//unpkg.com/@worldcoin/id/dist/world-id.js"></script>
            </Head>

            <Template>
                <PoolCoverageBox />
            </Template>
        </>
    );
};

export default Policies;
