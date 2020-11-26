#学生活动管理系统前台

#配置代理
proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: `http://www.huige666.com`, // 修改后台接口地址
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }