import React, { useReducer } from 'react'
import { v4 as uuid }  from 'uuid'
import axios from 'axios'
import QuoteContext from './quoteContext'
import quoteReducer from './quoteReducer'
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


const QuoteState = props => {
    const initialState = {
        quotes:[],

            // { 
            //     id:1,
            //     imageURL:"https://source.unsplash.com/1600x900/?scenary/?orientation=landscape",
            //     date:'September 14, 2016',
            //     username:'jayaram',
            //     likeState:0,
            //     content:"All our dreams can come true, if we have the courage to pursue them" 
            // },
            // { 
            //     id:2,
            //     imageURL:"https://source.unsplash.com/1600x900/?scenary/?orientation=landscape",
            //     date:'September 14, 2016',
            //     username:'shriram',
            //     likeState:1,
            //     content:"The secret of getting ahead is getting started" 
            // },
            // { 
            //     id:3,
            //     imageURL:"https://source.unsplash.com/1600x900/?scenary/?orientation=landscape",
            //     date:'September 14, 2016',
            //     username:'krishna',
            //     likeState:1,
            //     content:"I’ve missed more than 9,000 shots in my career. I’ve lost almost 300 games. 26 times I’ve been trusted to take the game winning shot and missed. I’ve failed over and over and over again in my life and that is why I succeed" 
            // },
            // { 
            //     id:4,
            //     imageURL:"https://source.unsplash.com/1600x900/?scenary/?orientation=landscape",
            //     date:'September 14, 2016',
            //     username:'raghuram',
            //     likeState:0,
            //     content:"Don’t limit yourself. Many people limit themselves to what they think they can do. You can go as far as your mind lets you. What you believe, remember, you can achieve" 
            // },
            // { 
            //     id:5,
            //     imageURL:"https://source.unsplash.com/1600x900/?scenary/?orientation=landscape",
            //     date:'September 14, 2016',
            //     username:'vijay',
            //     likeState:-1,
            //     content:"The best time to plant a tree was 20 years ago. The second best time is now" 
            // }
        
        current:null,
        filtered: null
    }

    const [state,dispatch] = useReducer(quoteReducer, initialState)

    const getQuotes = async () => {

        try {
            const res = await axios.get('/api/quotes')
            dispatch({ type: GET_QUOTES, payload: res.data })
        } catch (err) {
            dispatch({ type: QUOTE_ERROR, payload: err.response.msg })
        }
    }

    const addQuote = async quote => {
        console.log(quote)
        quote.likeID = uuid()

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('http://localhost:5000/api/quotes', quote, config)
            console.log(res)
            dispatch({ type: ADD_QUOTE, payload: res.data })
        } catch (err) {
            dispatch({ type: QUOTE_ERROR, payload: err.response.msg })
        }
    }

    const deleteQuote = async _id => {
        console.log(_id)
        try {
            await axios.delete(`http://localhost:5000/api/quotes/${_id}`)
            dispatch({ type: DELETE_QUOTE, payload: _id })
        } catch (err) {
            dispatch({ type: QUOTE_ERROR, payload: err.response.msg })
        }
    }

    const clearQuotes = () => {
        dispatch({ type: CLEAR_QUOTES })
    }

    const setCurrent = id => {
        dispatch({ type: SET_CURRENT, payload: id })
    }

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }

    const updateQuote = quote => {
        dispatch({ type: UPDATE_QUOTE, payload: quote })
    }

    const filterQuotes = text => {
        dispatch({ type: FILTER_QUOTES, payload: text })
    }

    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    }

    return (
        <QuoteContext.Provider
            value={{
                quotes: state.quotes,
                current: state.current,
                filtered: state.filtered,
                getQuotes,
                addQuote,
                deleteQuote,
                clearQuotes,
                setCurrent,
                clearCurrent,
                updateQuote,
                filterQuotes,
                clearFilter
            }}
        >
            { props.children }
        </QuoteContext.Provider>
    )
}   

export default QuoteState