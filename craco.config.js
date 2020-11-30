/* 
    @description  系统主题配置以及less-loader
    @autor        cheng liang
    @create       2020-11-30 11:05"
    @params       
    @return       
*/
const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#1DA57A' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
