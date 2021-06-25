import { AUTH_RESULT, REG_RESULT, SET_FORM_DATA, SET_CURRENT_USER, CURE_RESULT, GET_WHOLE_PRODUCTS } from './types';
import axios from 'axios';

export function doLoginUser( formData, router, e ) {
    return (dispatch) => {
        axios.post('/api/authController/doLoginUser', formData)
        .then((res) => {
            if(res.data.success) {
                localStorage.removeItem('authErrorCode');
                localStorage.setItem('jwtToken', res.data.token);
                router.push('/dashboard');
            }
            else {
                localStorage.removeItem('jwtToken');
                localStorage.setItem('authErrorCode', res.data.errorCode);
                e.submit();
            }
        });
    }
}

export function doRegisterUser( formData ) {
    return (dispatch) => {
        axios.post('/api/authController/doRegisterUser', formData)
        .then((res) => {
            dispatch({
                type : REG_RESULT,
                regErrorCode : (res.data.success) ? 0 : res.data.errorCode
            });
        });
    }
}

export function doChangeVal(whichInput, value) {
    return (dispatch) => {
        if(whichInput === 0)
            dispatch({ type : SET_FORM_DATA.USERNAME_SET,
                whichInput : whichInput,
                value : value
            });
        if(whichInput === 1)
            dispatch({ type : SET_FORM_DATA.EMAIL_SET,
                whichInput : whichInput,
                value : value
            });
        if(whichInput === 2)
            dispatch({ type : SET_FORM_DATA.PASSWORD_SET,
                whichInput : whichInput,
                value : value
            });
    }
}

export function doUpdateErrorCode() {
    return (dispatch) => {
        dispatch({ type : AUTH_RESULT, authErrorCode : (localStorage.getItem('authErrorCode') !== null) ? parseInt(localStorage.getItem('authErrorCode')) : -1 });
    }
}

export function doSetCurrentUser(userData) {
    return (dispatch) => {
        dispatch({ type : SET_CURRENT_USER, user : userData});
    }
}

export function doCureAmnesia(formData) {
    return (dispatch) => {
        axios.post('/api/authController/doCureAmnesia', formData)
        .then((res) => {
            dispatch({ type : CURE_RESULT, cureErrorCode : (res.data.success) ? 0 : res.data.errorCode });
        });
    }
}