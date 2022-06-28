import {HTTP} from '../utils/http.js'

class BookModel extends HTTP{
    search(q,per_page,page){
      return this.request({
        url:'search/repositories',
        data:{
          q,
          per_page,
          page
        }
      })
    }
}

export {BookModel}