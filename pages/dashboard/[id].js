import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as Actions from '/redux/actions/productAction';

const Post = (props) => {
  const router = useRouter()
  const { id } = router.query
  const [users, setUsers] = useState(0);
  
  useEffect(() => {
    props.doGetIndividualProduct(id);
    return () => {
    }
  }, [])

  function clickABC() {
    alert(123)
    setUsers(123);
  }

  return  <div>
            <p>Post: {id}</p>
            <button onClick={clickABC}>abc</button>
            <p>State : {users}</p>
            <div>prodname : {props.curFormData.prodname}</div>
            <div>calories : {props.curFormData.calories}</div>
            <div>fat : {props.curFormData.fat}</div>
            <div>carbs : {props.curFormData.carbs}</div>
            <div>protein : {props.curFormData.protein}</div>
          </div>
}

function fromStore ( store ) {
  return {
      curFormData : {
          prodname : store.productReducer._prodname,
          calories : store.productReducer._calories,
          fat : store.productReducer._fat,
          carbs : store.productReducer._carbs,
          protein : store.productReducer._protein,
      }
  };
}

export default connect(fromStore, Actions)(Post);