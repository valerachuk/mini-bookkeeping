module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        productName: 'Mini Bookkeeping',
        appId: 'com.valerii.mini-bookkeeping',
        copyright: 'Copyright © 2021 Valerii'
      }
    }
  }
};
