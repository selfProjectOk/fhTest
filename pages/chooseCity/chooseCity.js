// pages/chooseCity/chooseCity.js

const ajax = require('../../utils/ajax.js');
Page({

  data: {
  },
  onLoad: function (options) {
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
  onShow: function () {
  },
  onReady: function () {
  },
  onHide: function () {
  },
  onUnload: function () {
  },

  onPullDownRefresh: function () {
  },

  onReachBottom: function () {
  },

  onShareAppMessage: function () {
  }
})