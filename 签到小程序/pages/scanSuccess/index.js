// pages/scanSuccess/index.js
const app = getApp()
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:null,
    ID: null,
    name:null,
    hiddenmodalput: true,
    hiddenmodalput1: true,
    Result: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      Result: app.globalData.codeResult
    }
    )
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  

  getname: function() {
    this.setData({
      hiddenmodalput1: !this.data.hiddenmodalput1
    })
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },


  uploadResult: function(){
    var that = this;
    console.log(that.data.Result);
    console.log("上传签到结果")
    wx.request({
      url: 'http://127.0.0.1:5000/sign/' + that.data.Result,
      data: {
        id: this.data.ID, 
        name:this.data.name,
        state:'已签到',
        time: (this.data.time)
      },
      header: {
        'Content-Type': 'json' // 使用这个能正常获取数据
      },

      method:"POST",
      success(res) {
        if (res.data.success == 1){
          wx.showToast({
            title: "签到成功",
            icon: 'success',
            duration: 2000,
          });
          app.globalData.codeResult = res.data;
          console.log(app.globalData.codeResult)
        }
        else
        wx.showToast({
          title: "签到失败",
          icon: 'none',
          duration: 2000,
        });
        
      },
      error(){
        wx.showToast({
          title: "签到失败",
          icon: 'none',
          duration: 2000,
        });
      }
    })
    this.setData({
      hiddenmodalput1: !this.data.hiddenmodalput1
    })
  },
  //点击按钮指定的hiddenmodalput弹出框
	modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
    this.uploadResult
  },
      
  inputname:function(name1){
    this.setData({
    name:name1.detail.value,
    })
  },

  xuehao:function(number){
    this.setData({
    ID: number.detail.value,
    
  })
  
  }
})