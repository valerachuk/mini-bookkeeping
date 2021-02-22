module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      externals: ['mssql/msnodesqlv8'],
      builderOptions: {
        productName: 'Mini Bookkeeping',
        appId: 'com.valerii.mini-bookkeeping',
        copyright: 'Copyright © 2021 Valerii',
        extraResources: [
          'node_modules/msnodesqlv8/**',
          'node_modules/mssql/**'
        ]
      }
    }
  }
};
