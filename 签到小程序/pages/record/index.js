// pages/record/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  download:function(){
    var that = this
    wx.request({
      url: 'http://127.0.0.1:5000/getTable', //仅为示例，并非真实的接口地址
      data: {

      },  
      method: "GET",
      success(res) {
        console.log(res.data)
        that.setData({
          newsList:res.data
        })
        console.log(that.data.newsList)
      },
      error(){
        wx.showToast({
          title: "获取失败",
          icon: 'none',
          duration: 2000,
        });
      }
    })
  }

})