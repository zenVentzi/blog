import { GetStaticProps } from 'next';
import React from 'react';
// import * as contentful from 'contentful';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import AboutPage, { AboutPageProps } from '../modules/about/AboutPage';
import { getAboutPageData } from '../modules/about/getAboutPageData';

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

  return { props: aboutPageData, revalidate: 1 };
};

export default AboutPersonal;
