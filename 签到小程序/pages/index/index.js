//index.js
//获取应用实例
const app = getApp()



Page({

  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  scanCode: function(){
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      scanType: 'qrCode',
      success: function (res) {
        console.log(res);
        //that.setData({
        getApp().globalData.codeResult = res.result;
        console.log(getApp().globalData.codeResult);
        //});
        wx.navigateTo({
          url: '../scanSuccess/index'
        })
        },
      fail: function (res) {
        wx.navigateTo({
          url: '../scanFailure/index'
        })
       },
      complete: function (res) { },
      
    })
  },  
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
      

      // 获取openid
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.getUserInfo({
              success: function (res) {
                console.log("存在code")
              }
            });
            var appid = "	wx9e31613b66710dc9"
            var secret = "30c510db054c494b2860adaef714856f"
            var openid = ""
            var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code';
            wx.request({
              url: l,
              data: {},
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
              // header: {}, // 设置请求的 header  
              success: function (res) {
                var obj = {};
                obj.openid = res.data.openid;
                console.log("取得的openid==" + res.data.openid);

                that.setData({
                  openid: obj.openid
                })

                obj.expires_in = Date.now() + res.data.expires_in;
                // console.log(obj);
                // wx.setStorageSync('user', obj);//存储openid  
              }
            });
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });

    }

  }
})
