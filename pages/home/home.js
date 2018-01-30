// pages/home.js
Page({
  data: {
  },
  onLoad: function (options) {
  },
  onShow: function () {
  },
  onReady: function () {
    wx.mogoAjax.post({
      url: '/login/getAuthCode',
      data: {
        jobNum: '90178'
      },
      success: (res) => {
        console.log(res);
      },
      fail: (error) => {
        console.log(error);
      },
      complete: (res) => {
        console.log(res);
      },
    })
  },
  onHide: function () {
  },
  onUnload: function () {
  },
  goChooseCity: function () {
    wx.navigateTo({
      url: '../chooseCity/chooseCity',
      // url: '../index/index',
    })
  },

  onShareAppMessage: function () {
  }
})