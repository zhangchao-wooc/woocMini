// plugins/i18n.js
export default {
  install: (app, options) => {
    app.mixin({
      methods: {
        t (id: string) {
          return options(id)
        }
      }
    })
  }
}