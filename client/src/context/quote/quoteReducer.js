import { 
    ADD_QUOTE,
    DELETE_QUOTE,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_QUOTE,
    FILTER_QUOTES,
    CLEAR_FILTER,
    QUOTE_ERROR,
    GET_QUOTES,
    CLEAR_QUOTES
} from "../types"

const reducer = (state, action) => {
    switch(action.type)
    {
        case GET_QUOTES:
            return{
                ...state,
                quotes: action.payload,
                loading: false
            }
        case ADD_QUOTE:
            return {
                ...state,
                quotes: [...state.quotes, action.payload]
            }
        case DELETE_QUOTE:
            return {
                ...state,
                quotes: state.quotes.filter( quote => quote._id !== action.payload )
            }
        case SET_CURRENT:
            return{
                ...state,
                current: state.quotes.find( quote => quote._id === action.payload )
            }
        case CLEAR_CURRENT:
            return{
                ...state,
                current: null
            }
        case UPDATE_QUOTE:
            return{
                ...state,
                quotes: state.quotes.map( quote => quote._id === action.payload._id ? action.payload : quote ) ,
                current: null
            }
        case CLEAR_QUOTES:
            return{
                ...state,
                quotes: null,
                filtered: null,
                error: null,
                current: null
            }
        case FILTER_QUOTES:
            return {
                ...state,
                filtered: action.payload ? 
                    state.quotes.filter( quote => {
                        const regex = new RegExp(`${action.payload}`,'gi')
                        return quote.name.match(regex) || quote.content.match(regex)
                    }):null
            }
        case CLEAR_FILTER:
            return{
                ...state,
                filtered: null
            }
        case QUOTE_ERROR:
            return{
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default reducer