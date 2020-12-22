## 学生活动管理系统前台


## 1.从github拉代码
git clone https://github.com/ryh1008611/activityView.git
## 2.安装
npm install
## 3.配置代理
proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: `http://www.huige666.com`, // 修改后台接口地址
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
## 4.运行
npm run dev
