import { GET_WHOLE_PRODUCTS, GET_CURRENT_PRODUCT, SET_PRODUCT_DATA, ADD_SUCCESS, UPDATE_SUCCESS, REMOVE_SUCCESS } from './types';
import axios from 'axios';

export function doGetWholeProducts() {
    return (dispatch) => {
        axios.get('/api/productController/doGetWholeProducts')
        .then( res => {
            dispatch({ type : GET_WHOLE_PRODUCTS, productsData : res.data});
        });
    }
}

export function doGetIndividualProduct(where) {
    return (dispatch) => {
        axios.get(`/api/productController/doGetIndividualProduct/${where}`)
        .then( res => {
            dispatch({ type : GET_CURRENT_PRODUCT, product : res.data.product});
        });
    }
}

export function doChangeVal(whichInput, value) {
    return (dispatch) => {
        if(whichInput === 0) dispatch({ type : SET_PRODUCT_DATA.PRODNAME_SET, whichInput : whichInput,value : value});
        if(whichInput === 1) dispatch({ type : SET_PRODUCT_DATA.CALORIES_SET, whichInput : whichInput,value : value});
        if(whichInput === 2) dispatch({ type : SET_PRODUCT_DATA.FAT_SET, whichInput : whichInput,value : value});
        if(whichInput === 3) dispatch({ type : SET_PRODUCT_DATA.CARBS_SET, whichInput : whichInput,value : value});
        if(whichInput === 4) dispatch({ type : SET_PRODUCT_DATA.PROTEIN_SET, whichInput : whichInput,value : value});
    }
}

export function doAddNewProduct(formData) {
    return (dispatch) => {
        axios.post('/api/productController/doAddNewProduct',formData)
        .then( res => {
            dispatch({ type : ADD_SUCCESS, added : res.data.added});
        });
    }
}

export function doRemoveProduct(formData) {
    return (dispatch) => {
        axios.post('/api/productController/doRemoveProduct',formData)
        .then( res => {
            dispatch({ type : REMOVE_SUCCESS, where : formData.where});
        });
    }
}