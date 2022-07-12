// //跨域代理
// //vue项目启动端口
module.exports={

    devServer:{

        host: 'localhost',  //前端服务器地址

        port: 8086, //前端服务器的端口地址即vue运行时的端口

    //     proxy: {
    //         '/': {
    //              target:'http://localhost:8081/',//代理对象,这要根据你后台服务器（tomcat服务）的实际地址来决定。
    //
    //              changeOrigin: true, //是否跨域。
    //
    //              pathRewrite: { //重写配置，被代理的接口会多一个‘/’的前缀,如果原本接口就有‘/’这种前缀，就可以把此项删掉；
    //
    //     '^/': ''
    //
    // }
    //         }
    //
    //     } //代理服务器

    }

}