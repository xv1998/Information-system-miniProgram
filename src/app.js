// app.js
import { initApp } from './lib/index'

App({
    onLaunch: function () {
        // 获取手机信息
        let phoneInfo = wx.getSystemInfoSync()
        // console.log(phoneInfo)
        let navHeight = (phoneInfo.system.indexOf('iOS') !== -1) ? 48 : 44 // 48安卓标题栏高度、44iOS标题栏高度
        this.globalData.screenInfo = {
            navHeight: navHeight,
            phoneInfo: phoneInfo,
            statusBarHeight: phoneInfo.statusBarHeight, // 手机状态栏高度
            windowHeight: phoneInfo.windowHeight, // 手机窗口高度
            screenHeight: phoneInfo.screenHeight, // 屏幕高度
            screenWidth: phoneInfo.screenWidth,  // 屏幕宽度
            btn: {
                top: wx.getMenuButtonBoundingClientRect().top, // 胶囊按钮的上边界坐标
                left: wx.getMenuButtonBoundingClientRect().left, // 胶囊按钮的左边界坐标
                right: wx.getMenuButtonBoundingClientRect().right, // 胶囊按钮的右边界坐标
                height: wx.getMenuButtonBoundingClientRect().height, // 胶囊按钮的高度
                bottom: wx.getMenuButtonBoundingClientRect().bottom // 胶囊按钮的下边界坐标
            }
        }
        console.log(this.globalData.screenInfo)
        if (phoneInfo.system.indexOf('Plus') !== -1) {
            this.globalData.Height = 48 // 安卓标题栏高度
        } else if (phoneInfo.brand !== 'iPhone X') {
            this.globalData.Height = 44 // iOS标题栏高度
        } else {
            this.globalData.Height = 48
        }
        initApp(this)

        // 展示本地存储能力
        let logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null,
        screenInfo: null,
        Height: 0
    }
})
