// src/pages/personal/personal.js
import { cache } from '../../lib/index'

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        id: null,
        hasUserInfo: false,
        isBind: false,
        isLogout: false,
        isTrue: true,
        intro: '简介',
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 判断是否授权微信
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
        }
    },
    /**
     * 获取个人信息
     * @param e
     */
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    /**
     * 跳转到登陆页面
     */
    toLogin:function() {
      wx.navigateTo({
          url: '../login/login'
      })
    },
    /**
     * 跳转到基础信息页面
     */
    tobasicInfo: function() {
        wx.navigateTo({
            url: '../basicInfo/basicInfo'
        })
    },
    /**
     * 跳转到简介页面
     */
    tobriefIntro:function() {
        const isLogin = cache.get("loginState")
        if (isLogin) {
            wx.navigateTo({
                url: '../briefIntro/briefIntro'
            })
        }else {
            wx.showToast({
                title: '请先登录',
                icon: 'none',
                duration: 2000
            })
        }
    },
    /**
     * 打开退出登录面板
     */
    openLogoutDialog: function () {
        this.setData({
            isLogout: true
        })
    },
    /**
     * 关闭退出登录面板
     */
    closeLogoutDialog: function () {
        this.setData({
            isLogout: false
        })
    },
    /**
     * 退出登录
     */
    logOut: function () {
        const that = this
        console.log('logout')
        cache.remove("loginState")
        that.setData({
            isLogout: false,
            id: 'null',
            isBind: false,
            intro: '简介'
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        const isLogin = cache.get("loginState")
        const intro = cache.get("intro")
        if (isLogin) {
            this.setData({
                isBind: true,
                intro: intro? `个性签名：${intro}`: '个性签名'
            })
        }
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

    }
})
