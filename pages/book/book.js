import {
  random
} from '../../utils/common.js'

import { BookModel} from '../../models/bookModel'
const bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searching: false,
    books: [],
    more: '',
    loadingCenter:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this._showLoadingCenter()
    bookModel.search('java',10,1).then(res=>{
      console.log(res)
      this.setData({
        books:res.items
      })
      this._hideLoadingCenter()
    },()=>{
      this._hideLoadingCenter()
    })
  },

  onSearching(event) {
    this.setData({
      searching: true
    })
  },
  onCancle(e) {
    this.setData({
      searching: false
    })
  },

  _showLoadingCenter() {
    this.setData({
      loadingCenter: true
    })
  },

  _hideLoadingCenter() {
    this.setData({
      loadingCenter: false
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 触底操作，每次修改more 随机16位字符串
     this.setData({
       more:random(16)
     })
  }
})