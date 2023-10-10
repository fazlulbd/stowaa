import { createContext, useReducer } from "react";
const Store = createContext()


const userInitialState = {
    // userInfo: null
    userInfo: localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')):null
}

function userReducer(state, action){
    switch(action.type){
        case 'USER_LOGIN':
            return({...state, userInfo: action.payload})
        case 'USER_LOGOUT':
            return({...state, userInfo: null})
        default:
            return state
    }
}


const cartInitialState = {
    cart:{
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

    }
}

function cartReducer(state,action){
    switch(action.type){
        case 'CART_ADD_PRODUCT':  
            const newItem = action.payload
            const existingItem = state.cart.cartItems.find((item)=> item._id === newItem._id)

            const cartItems = existingItem ? state.cart.cartItems.map((item)=> item._id === existingItem._id ? newItem : item) : [...state.cart.cartItems, newItem]

            localStorage.setItem('cartItems',JSON.stringify(cartItems)) 
            return {...state,cart:{...state.cart, cartItems}}  
        case 'CART_REMOVE_PRODUCT':{
            const cartItems = state.cart.cartItems.filter((item)=> item._id !== action.payload._id)
            localStorage.setItem('cartItems',JSON.stringify(cartItems))
            return {...state,cart:{...state.cart,cartItems}}
        }
        case 'CLEAR_CART':{
            localStorage.removeItem('cartItems')
            return {...state,cart:{...state.cart,cartItems:[]}}
        }
        default:
            return state 
    }
}


function StoreProvider(props){
    let [state, dispatch] = useReducer(userReducer, userInitialState)
    let [cartstate, cartdispatch] = useReducer(cartReducer,cartInitialState)

    const value = {state, dispatch, cartstate, cartdispatch}

    return <Store.Provider value= {value}>{props.children}</Store.Provider>
}

export {Store, StoreProvider}
