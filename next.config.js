module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        ...config.node,
        fs: 'empty',
        child_process: 'empty',
        net: 'empty',
        tls: 'empty',
      };
    }

    return config;
  },
};

// module.exports = {
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback.fs = false;
//     }
//     return config;
//   },
// };

// module.exports = {
//   webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
//     // Note: we provide webpack above so you should not `require` it
//     // Perform customizations to webpack config
//     // Important: return the modified config

//     // Example using webpack option
//     //config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
//     config.node = {
//       fs: 'empty',
//       child_process: 'empty',
//       net: 'empty',
//       tls: 'empty',
//     };
//     return config;
//   },
//   webpackDevMiddleware: (config) => {
//     // Perform customizations to webpack dev middleware config
//     // Important: return the modified config
//     return config;
//   },
// };
