import axios from 'axios';

export function getPostData(id) {
    axios.get(`http://10.10.11.102:3001/api/productController/doGetSpecificProduct/${id}`)
    .then( res => {
        return res.data;
    });
}
 
 export function getAllPostIds() {
    return [{
       params: {
          id: '60d1b6d2860339014af3a7da'
       }
    },
    {
       params: {
          id: '60d1ce5beff9302768c49bbf'
       }
    }];
}