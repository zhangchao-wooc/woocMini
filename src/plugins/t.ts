// plugins/i18n.js
export default {
  install: (app, options) => {
    // app.config.globalProperties.t = (key) => {
    //   return options(key)
    // }

    // app.provide('t', options)

    // app.directive('my-directive', {
    //   // mounted (el, binding, vnode, oldVnode) {
    //   //   // some logic ...
    //   // }
    // })

    app.mixin({
      methods: {
        t (id: string) {
          return options(id)
        }
      }
    })
  }
}