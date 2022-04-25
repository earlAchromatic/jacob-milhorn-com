const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const ghostContentAPI = require('@tryghost/content-api');
const localImages = require('eleventy-plugin-local-images');
require('dotenv').config();

const api = new ghostContentAPI({
  url: process.env.GHOST_API_URL,
  key: process.env.GHOST_CONTENT_API_KEY,
  version: 'v2',
});

// const stripDomain = (url, precursor = '') => {
//   return url.replace(process.env.GHOST_API_URL, precursor);
// };

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  if (process.env.ELEVENTY_BUILD_OUTPUT_DIR) {
    eleventyConfig.addPlugin(localImages, {
      distPath: process.env.ELEVENTY_BUILD_OUTPUT_DIR,
      assetPath: '/assets/',
      selector: 'img',
      verbose: false,
    });
  }

  //eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);

  /**
   * Why copy the /public directory?
   *
   * Slinkity uses Vite (https://vitejs.dev) under the hood for processing styles and JS resources
   * This tool encourages a /public directory for your static assets like social images
   * To ensure this directory is discoverable by Vite, we copy it to our 11ty build output like so:
   */
  eleventyConfig.addCollection('posts', async function (collection) {
    collection = await api.posts
      .browse({
        include: 'tags,authors',
        limit: 'all',
      })
      .catch((err) => {
        console.error(err);
      });

    collection.forEach((post) => {
      post.url = stripDomain(post.url, '/posts');
      post.primary_author.url = stripDomain(post.primary_author.url, '/posts');
      post.tags = post.tags.map((tag) => tag.name);

      // Convert publish date into a Date object
      post.published_at = new Date(post.published_at);
    });

    return collection;
  });

  eleventyConfig.addNunjucksGlobal('GoogleAnalytics', function () {
    if (process.env.GA_KEY !== 'false' && process.env.GA_KEY !== 'null') {
      return process.env.GA_KEY;
    } else return;
  });

  

  return {
    /**
     * Why use Nunjucks?
     *
     * We recommend using Nunjucks over Liquid for nicer component shortcode syntax in your markdown
     * See our docs on passing props to components here: https://slinkity.dev/docs/component-shortcodes/#passing-props-to-shortcodes
     * Prefer liquid, or don't mind liquid's shortcode syntax? No problem!
     * Just delete this line to switch back to liquid:
     */
    markdownTemplateEngine: 'njk',
    dir: {
      /**
       * Why set an input directory?
       *
       * By default, 11ty will treat the base of your project as the input.
       * This can have some nasty consequences, like accidentally copying your README.md as a route!
       * You can manually ignore certain files from the build output. But to keep things simple,
       * We recommend setting an input directory like so:
       */
      input: 'src',
    },
  };
};
