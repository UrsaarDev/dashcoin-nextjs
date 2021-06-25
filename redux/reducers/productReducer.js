import { GET_WHOLE_PRODUCTS, GET_CURRENT_PRODUCT, SET_PRODUCT_DATA, ADD_SUCCESS, REMOVE_SUCCESS, UPDATE_SUCCESS } from '../actions/types';

const initState = {
    productsData : [],
    filteredProducts : [],
    _prodname : '',
    _calories : 0.0,
    _fat : 0.0,
    _carbs : 0.0,
    _protein : 0.0,
};

export default function todo(state = initState, action) {
    switch (action.type) {
        case ADD_SUCCESS:
            return { ...state,
                productsData : [...state.productsData,action.added],
                filteredProducts : [...state.filteredProducts,action.added]
            };
        case REMOVE_SUCCESS:
            const dt1 = [...state.productsData];
            const dt2 = [...state.filteredProducts];
            dt1.splice(dt1.findIndex(each => each.id === action.where),1);
            dt2.splice(dt2.findIndex(each => each.id === action.where),1);
            return { ...state,
                productsData : dt1,
                filteredProducts : dt2,
            };
        case GET_WHOLE_PRODUCTS:
            return { ...state,
                productsData : action.productsData,
                filteredProducts : action.productsData
            };
        case GET_CURRENT_PRODUCT:
            return { ...state,
                _prodname : action.product.prodname,
                _calories : action.product.calories,
                _fat : action.product.fat,
                _carbs : action.product.carbs,
                _protein : action.product.protein,
            }
        case SET_PRODUCT_DATA.PRODNAME_SET:
            return { ...state ,
                _prodname : action.value
            };
        case SET_PRODUCT_DATA.CALORIES_SET:
            return { ...state ,
                _calories : parseFloat(action.value)
            };
        case SET_PRODUCT_DATA.FAT_SET:
            return { ...state ,
                _fat : parseFloat(action.value)
            };
        case SET_PRODUCT_DATA.CARBS_SET:
            return { ...state ,
                _carbs : parseFloat(action.value)
            };
        case SET_PRODUCT_DATA.PROTEIN_SET:
            return { ...state ,
                _protein : parseFloat(action.value)
            };
        default:
            return state
    }
}