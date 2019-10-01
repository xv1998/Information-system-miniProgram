// component/pnav/pnav.js

const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        titleName: String,
        isMain: String
    },

    /**
     * 组件的初始数据
     */
    data: {
    },
    /**
     * 生命周期
     */
    lifetimes: {
        attached: function() {
            const that = this
            const capsule = app.globalData.screenInfo.btn // 胶囊位置信息
            that.setData({
                headerT: capsule.top,
                headerH: capsule.height
            })
        },
    },
    /**
     * 组件的方法列表
     */
    methods: {
        navBack: function () {
            wx.navigateBack({
                delta: 1
            })
        },
    }
})
