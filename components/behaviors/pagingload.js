const pagingloadBev = Behavior({
  data: {
    dataArray: [],
    currentPage: 1,
    total: 0,
    noneResult: false,
    loading: false
  },
  methods: {
    setMoreData(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray)

      this.setData({
        dataArray: tempArray
      })
    },
    getCurrentPage() {
      return this.data.currentPage++
    },
    setTotal(total) {
      this.data.total = total
      if (total == 0) {
        this.setData({
          noneResult: true
        })
      }
    },
    hasMore() {
      //  这里由于 github 数据较多，进行mock处理
      return this.data.dataArray.length <= (this.data.total / 100)
    },
    initialize(){
       this.setData({
        dataArray: [],
        currentPage: 1,
        total: 0,
        noneResult: false,
        loading: false
       })

    },
    isLocked() {
      return this.data.loading ? true : false
    },

    locked() {
      this.setData({
        loading: true
      })
    },

    unLocked() {
      this.setData({
        loading: false
      })
    },
  }
})
export{
  pagingloadBev
}