import { GetStaticProps } from 'next';
import React from 'react';
// import * as contentful from 'contentful';
import {
  // AboutPage,
  AboutPageProps,
  getAboutPageData,
  // createGetStaticProps,
} from '../modules/about';
import { SerializedAbout, UnserializedAbout } from '../modules/common';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import AboutPage from '../modules/about/AboutPage';

const AboutPersonal = (props: AboutPageProps) => {
  // return <div>About personal</div>;
  return <AboutPage {...props} />;
};

// export const getStaticProps = createGetStaticProps('aboutPagePersonal');
export const getStaticProps: GetStaticProps<AboutPageProps> = async (
  context
) => {
  const aboutPageData = await getAboutPageData('aboutPagePersonal');

  if (!aboutPageData) {
    return { notFound: true };
  }

  return { props: aboutPageData };
};

export default AboutPersonal;
