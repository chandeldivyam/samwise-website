import React from 'react';
import Head from 'next/head';
import HeroSection from '../components/home/HeroSection';
import Layout from '../components/layout/Layout'; // Import the Layout
import FeatureSection from '../components/home/FeatureSection';
import WhySamwiseSection from '@/components/home/WhySamwiseSection';
import RoadmapSection from '@/components/home/RoadmapSection';

const Home: React.FC = () => {
  return (
    <Layout> {/* Use the Layout component to wrap the page content */}
      <Head>
        <title>Samwise - Think clearly. Speak powerfully.</title>
        <meta name="description" content="Samwise illuminates your thoughts, transforming every conversation into an opportunity for growth." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <HeroSection />
      <FeatureSection />
      <WhySamwiseSection />
      <RoadmapSection />
    </Layout>
  );
};

export default Home;