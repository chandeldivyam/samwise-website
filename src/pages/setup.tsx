// src/pages/setup.tsx
import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import SetupInstructions from '../components/setup/SetupInstructions';

const SetupPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>How to Setup Samwise</title>
        <meta name="description" content="Step-by-step guide to set up Samwise on your Mac or Windows computer" />
      </Head>
      <SetupInstructions />
    </Layout>
  );
};

export default SetupPage;