export default defineNuxtConfig({
  // SPA 模式（原 Nuxt 2 的 mode: "spa"）
  ssr: false,

  devServer: {
    port: 3008,
    host: "0.0.0.0"
  },

  app: {
    baseURL: "/zcode-web/",
    head: {
      title: "zcode-web",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "zcode web"
        }
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/zcode-web/favicon.ico" },
        {
          rel: "stylesheet",
          href: "https://cdn.bootcss.com/normalize/8.0.1/normalize.css"
        }
      ]
    }
  },

  compatibilityDate: "2025-08-02"
});
