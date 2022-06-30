// components/search/index.js
import {
  SearchModel
} from '../../models/searhModel'
import {
  BookModel
} from '../../models/bookModel'

import {pagingloadBev} from '../behaviors/pagingload'

const searchModel = new SearchModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors:[pagingloadBev],
  properties: {
      // getHot 剥离网络请求，通过properties 。外部使用数据传入
      more:{
        type:String,
        observer:'loadMore'
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hotWords: [],
    historyWords: [],
    q:'',
    // dataArray:[],
    searching:false,
    // loading:false,
    loadingCenter:false
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
    loadMore(){
      console.log('loadMore')
      if(!this.data.q){
        return
      }
      // if(this.data.loading){
      //   return
      // }
      // this.data.loading = true
      // bookModel.search(this.data.q,10,2).then(res=>{
      //   console.log(res)
      //   const tempArray = this.data.dataArray.concat(res.items)
      //   this.setData({
      //     dataArray:tempArray
      //   })
      //   this.data.loading = false
      // },()=>{
      //   this.data.loading = false
      // })
      if(this.isLocked()){
         return
      }
      console.log(this.hasMore())
      console.log(this.getCurrentPage())

      if(this.hasMore()){
         this.locked()
         bookModel.search(this.data.q,10,this.getCurrentPage()).then(res=>{
            this.setMoreData(res.items)
            this.unLocked()
         },()=>{
           this.unLocked()
         })
      }

    },
    onDelete(){
      this.initialize()
       this.setData({
         searching:false,
         q:''
       })
    },
    onCancle(e) {
      this.initialize()
      this.triggerEvent('cancle', {}, {})
    },
    onConfirm(e) {
      this._showResult()
      this._showLoadingCenter()
      this.initialize()
      const q = e.detail.value ||  e.detail.text 
      this.setData({
        q
      })
      /**
       *  这里mock 下没有数据的情况
       * 正常情况通过behaviors里面的判断
       * if (total == 0) {
        this.setData({
          noneResult: true
        })
      }
      */
      if(q == '日本'){
        this.setData({
          noneResult:true
        })
        this._hideLoadingCenter()
      }else{
        bookModel.search(q,10,1).then(res=>{
          this.setData({
            searching:true
          })
          console.log(res)
          this.setMoreData(res.items)
          this.setTotal(res.total_count)
          //  this.setData({
          //    dataArray:res.items
          //  })
          searchModel.addToHistory(q)
          this._hideLoadingCenter()
        },()=>{
          this._hideLoadingCenter()
        })
      }

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

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    }
  }
})