// components/search/index.js
import {
  SearchModel
} from '../../models/searhModel'
import {
  BookModel
} from '../../models/bookModel'

const searchModel = new SearchModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      // getHot 剥离网络请求，通过properties 。外部使用数据传入
      
  },

  /**
   * 组件的初始数据
   */
  data: {
    hotWords: [],
    historyWords: [],
    q:'',
    dataArray:[],
    searching:false
  },
  attached() {
    this.setData({
      historyWords:searchModel.getHistory()
    })
    console.log(searchModel.getHistory())
    this.setData({
      hotWords: searchModel.getHot()
    })

  },
  /**
   * 组件的方法列表
   */
  methods: {
    onCancle(e) {
      this.triggerEvent('cancle', {}, {})
    },
    onConfirm(e) {
      
      const q = e.detail.value ||  e.detail.text 
      console.log(q,"q")
      this.setData({
        q
      })
      bookModel.search(q,7,1).then(res=>{
        this.setData({
          searching:true
        })
        console.log(res)
         this.setData({
           dataArray:res.items
           
         })
        searchModel.addToHistory(q)
      })
    }
  }
})