class SearchModel {
    key = 'searchKey'
    maxLength = 10
    getHistory(){
       const words = wx.getStorageSync(this.key)
       if(!words){
         return []
       }
       return words
    }

    getHot(){
        let hotWords = ['JavaScript','Python','Java','PHP','CSS','C#','C++','TypeScript','Ruby','C','Swift']
        return hotWords
    }

    addToHistory(keyword){
        let words = this.getHistory()
        const has = words.includes(keyword)
        // 队列栈
        if(!has){
          const length = words.length
          // 数组末尾 删除 ， keyword 数组第一位
          if(length >= this.maxLength){
            words.pop()
          }
          words.unshift(keyword)
          wx.setStorageSync(this.key, words)
        }
    }

}
export {SearchModel}