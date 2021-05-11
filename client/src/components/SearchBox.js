/* eslint-disable no-use-before-define */
import React,{ useContext, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

import QuoteContext from '../context/quote/quoteContext'

const useStyles = makeStyles( theme => {

    return{
        searchBox:{
            margin:'125px auto 0 auto',
            "& .MuiFormLabel-root":{
                color:'white',
                textShadow:'0 0 8px white',
                marginLeft:40
            },
            "& .MuiInputBase-root":{
                color:'white',
                boxShadow:'0 0 8px white',
                marginLeft:40
            },
            "& .MuiSvgIcon-root":{
                fill:'white'
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{
                border:'5px solid white'                
            },
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":{
                border:'5px solid white'
            },
            "& .MuiOutlinedInput-notchedOutline":{
                border:'3px solid white'
            }
        }   
    }
})


const optionsList = []

const SearchBox = () => {

    const quoteContext = useContext(QuoteContext)
    const { filtered, filterQuotes, clearFilter } = quoteContext
    const text = useRef('')

    const classes = useStyles()

    useEffect(() => {
        if(!filtered)
            text.current.value=''
    },[filtered])

    const searchBoxOnChange =  e => {
        filterQuotes(e.target.value)
        if(e.target.value==='')
            clearFilter()
    }

    return (
        <div style={{ width: 300 }}>
        <Autocomplete
            className={classes.searchBox}
            freeSolo
            options={optionsList.map((option) => option.title)}
            onInputChange={ e => searchBoxOnChange(e) } 
            renderInput={(params) => (
            <TextField 
                {...params} 
                label="Search" 
                inputRef={text}
                margin="normal" 
                variant="outlined"
                />
            )}
        />
        </div>
    )
}

export default SearchBox