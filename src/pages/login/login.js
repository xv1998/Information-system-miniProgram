// src/pages/login/login.js
import { request, showError } from '../../lib/index'
import { api } from '../../config/api'

Page({
    account: '',
    password: '',
    /**
     * 页面的初始数据
     */
    data: {},
    /**
     * 绑定账号
     * @param e
     */
    getAccount: function(e){
        this.account = e.detail.value
    },
    /**
     * 绑定密码
     * @param e
     */
    getPassword: function(e){
        this.password = e.detail.value
    },
    /**
     * 登录
     */
    bindLogin: function(){
        let that = this
        if (!(this.account && this.password)){
            wx.showToast({
                title: '请输入账号或密码',
                icon: 'none'
            })
        } else{
            return request({
                url: api.login,
                method: 'POST',
                needLogin: false,
                data: {
                    account: that.account,
                    password: that.password
                }
            }).then((res) =>{
                if (res.data.code === '0') {
                    wx.showToast({
                        title: '登录成功',
                        icon: 'success'
                    })
                }else {
                    showError('账号或密码错误')
                }
            })
        }
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

    }
})
