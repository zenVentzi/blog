import * as contentful from 'contentful';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { SerializedAbout, UnserializedAbout } from '../common/types';
import { AboutPageProps } from './AboutPage';

export const getAboutPageData = async (
  type: 'aboutPagePersonal' | 'aboutPagePro'
): Promise<AboutPageProps | null> => {
  const contentfulClient = contentful.createClient({
    // FIXME
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  });

  const entry = await contentfulClient.getEntries<UnserializedAbout>({
    content_type: type,
  });

  // console.log('entry');
  // console.dir(entry, { depth: null });

  // TODO: map just the first item
  const unserializedAbout: UnserializedAbout | null | undefined =
    entry.items.map((item: any) => {
      const { content, data } = matter(item.fields.content);

      // TODO: check data fields if empty

      return {
        title: data.title,
        content,
        meta: data.meta,
      };
    })[0];

  if (!unserializedAbout) return null;

  const serializedContent = await serialize(unserializedAbout.content);
  // const serializedContent = {} as any;

  const serializedAbout: SerializedAbout = {
    ...unserializedAbout,
    content: serializedContent,
  };

  return {
    aboutData: serializedAbout, // will be passed to the page component as props
  };
};

// export const createGetStaticProps = (
//   type: 'aboutPagePro' | 'aboutPagePersonal'
// ) => {
//   const getStaticProps: GetStaticProps<AboutProps> = async (context) => {
//     const contentfulClient = contentful.createClient({
//       // FIXME
//       space: process.env.CONTENTFUL_SPACE_ID as string,
//       accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
//     });

//     const entry = await contentfulClient.getEntries<UnserializedAbout>({
//       content_type: type,
//     });

//     // console.log('entry');
//     // console.dir(entry, { depth: null });

//     // TODO: map just the first item
//     const unserializedAbout: UnserializedAbout | null | undefined =
//       entry.items.map((item: any) => {
//         const { content, data } = matter(item.fields.content);

//         // TODO: check data fields if empty

//         return {
//           title: data.title,
//           content,
//         };
//       })[0];

//     if (!unserializedAbout) {
//       return { notFound: true };
//     }

//     const serializedContent = await serialize(unserializedAbout.content);
//     // const serializedContent = {} as any;

//     const serializedAbout: SerializedAbout = {
//       ...unserializedAbout,
//       content: serializedContent,
//     };

//     return {
//       props: { aboutData: serializedAbout }, // will be passed to the page component as props
//     };
//   };
//   return {} as any;
//   return getStaticProps;
// };

// // export const createGetStaticProps = () => {
// //   return {} as any;
// // };
