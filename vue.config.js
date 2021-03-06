module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/strong-rewards/" : "/",
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
      includeLocales: false,
      enableBridge: true,
    },
  },
};
