const ADD_PRODUCT='ADD_PRODUCT';
const EDIT_PRODUCT='EDIT_PRODUCT';
const DELETE_PRODUCT='DELETE_PRODUCT';
const GET_PRODUCT='GET_PRODUCT';
const LOADING='LOADING';
const GET_ALL_PRODUCT='GET_ALL_PRODUCT';
const ERROR = 'ERROR';

const productReducer = (state, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCT:
            return {
                ...state,
                products: action.payload,
                error:false,
                loading: false
            }
        case LOADING:
            return {
                ...state,
                products: [],
                error: false,
                loading: true,
            }
        case ADD_PRODUCT:
            return {
                ...state,
                products: action.payload,
                error: false,
                loading: false,
            }
        case EDIT_PRODUCT:
            return {
                ...state,
                products: action.payload,
                error: false,
                loading: false
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                products: action.payload,
                error: false,
                loading: false
            }
        case GET_PRODUCT:
            return {
                ...state,
                products: action.payload,
                error: false,
                loading: false
            }
        case ERROR:
            return {
                ...state,
                products: [],
                error: true,
                loading: false
            }
        default:
            return state;
    }
}

export { productReducer, ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, LOADING, GET_PRODUCT, GET_ALL_PRODUCT, ERROR };