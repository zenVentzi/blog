import { GetStaticProps } from 'next';
import React from 'react';
import AboutPage, { AboutPageProps } from '../modules/about/AboutPage';
import { getAboutPageData } from '../modules/about/getAboutPageData';

const AboutPro = (props: AboutPageProps) => {
  return <AboutPage {...props} />;
};

export const getStaticProps: GetStaticProps<AboutPageProps> = async (
  context
) => {
  console.log(`fdsfdfs`);
  const aboutPageData = await getAboutPageData('aboutPagePro');

  if (!aboutPageData) {
    return { notFound: true };
  }

  return { props: aboutPageData };
};

export default AboutPro;
