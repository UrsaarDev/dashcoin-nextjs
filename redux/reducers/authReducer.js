import { AUTH_RESULT, REG_RESULT, SET_FORM_DATA, SET_CURRENT_USER, CURE_RESULT } from '../actions/types';

const initState = {
    user:{},
    jwtToken: {},
    
    cureErrorCode : -1,

    authErrorCode : -1,
    regErrorCode : -1,

    isValidUsername:false,
    isValidEmail:false,
    isValidPassword:false,
    _username:'',
    _email:'',
    _password:''
};

export default function todo(state = initState, action) {
    switch (action.type) {
        case CURE_RESULT:
            return { ...state,
                cureErrorCode : action.cureErrorCode
            };
        case SET_CURRENT_USER:
            return { ...state,
                user : action.user
            };
        case AUTH_RESULT:
            return { ...state,
                authErrorCode : action.authErrorCode
            };
        case REG_RESULT:
            return { ...state,
                regErrorCode : action.regErrorCode
            }
        case SET_FORM_DATA.USERNAME_SET:
            return { ...state ,
                isValidUsername : (action.value === "") ? true : false,
                _username : action.value
            };
        case SET_FORM_DATA.EMAIL_SET:
            return { ...state ,
                isValidEmail : (action.value === "") ? true : false,
                _email : action.value
            };
        case SET_FORM_DATA.PASSWORD_SET:
            return { ...state ,
                isValidPassword : (action.value === "") ? true : false,
                _password : action.value
            };
        default:
            return state
    }
}