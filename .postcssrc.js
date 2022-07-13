module.exports = {
    plugins: {
        'autoprefixer': {
            browsers: ['Android >= 4.0', 'iOS >= 8']
        },
        'postcss-pxtorem': {
            rootValue: (module) => (/vant/gi.test(module.file) ? 37.5 : 75),
            // rootValue: (module) => {
            //     if (/want/gi.test(module.file)) {
            //         return 37.5
            //     } else {
            //         return 75
            //     }
            // },
            propList: ['*'] // 匹配所有的属性转化为rem
        }
    }
}
