import { NextPageContext } from 'next';
import RSS from 'rss';
import getPosts from '../modules/common/getPosts';
import { SerializedPost } from '../modules/common/types';

const getRSSXML = (posts: SerializedPost[]) => {
  const feed = new RSS({
    title: 'Zen Ventzi blog',
    description: 'Zen Ventzi website',
    feed_url: 'https://www.zenventzi.com/rss',
    site_url: 'https://www.zenventzi.com/',
    // image_url: 'http://example.com/icon.png',
    // docs: 'http://example.com/rss/docs.html',
    managingEditor: 'Zen Ventzi',
    webMaster: 'Zen Ventzi',
    // copyright: '2013 Dylan Greene',
    language: 'en',
    // categories: ['Category 1', 'Category 2', 'Category 3'],
    // pubDate: 'May 20, 2012 04:00:00 GMT',
    // ttl: '60',
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.meta.description,
      url: `https://zenventzi.com/blog/${post.slug}`, // link to the item
      // guid: '1123', // optional - defaults to url
      // categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4'], // optional - array of item categories
      author: 'Zen Ventzi', // optional - defaults to feed author property
      date: post.lastUpdate, // any format that js Date can parse.
      // lat: 33.417974, //optional latitude field for GeoRSS
      // long: -111.933231, //optional longitude field for GeoRSS
      // enclosure: { url: '...', file: 'path-to-file' }, // optional enclosure
    });
  });

  // cache the xml to send to clients
  const xml = feed.xml();
  return xml;
};

const Rss = (props: any) => {
  return <div>test</div>;
};

export default RSS;

export async function getServerSideProps(context: NextPageContext) {
  const res = context.res;
  if (!res) {
    return;
  }

  const posts = await getPosts({ limit: 20 });

  const rssXML = getRSSXML(posts);
  res.setHeader('Content-Type', 'text/xml');
  res.write(rssXML);
  res.end();
}
