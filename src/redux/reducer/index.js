const initialState = {
    products: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case "GET_PRODUCTS":
            return{
                ...state,
                products: action.payload
            }
        case "CREATE_PRODUCTS":
            return{
                ...state,
                products: action.payload
            }
        default: return state
    }
}

export default rootReducer;