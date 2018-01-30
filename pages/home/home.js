// pages/home.js
const ajax = require('../../utils/ajax.js');

Page({
  data: {
  },
  onLoad: function (options) {
  },
  onShow: function () {
  },
  onReady: function () {
    ajax.post({
      url: '/login/getAuthCode',
      data: {
        jobNum: '91510'
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