import React, { useContext, useEffect } from 'react'
import styles from '../App.module.css'
import { motion } from "framer-motion"
import Header from '../components/Header'
import Quote from '../components/Quote'
import SearchBox from '../components/SearchBox'

import Container from '@material-ui/core/Container'
import Masonry from 'react-masonry-css'

import QuoteContext from '../context/quote/quoteContext'

import AuthContext from "../context/auth/authContext"

const pageVariants = {
    hidden:{
      x:'100vw'
    },
    visible:{
      x: 0
    },
    exit:{
      x:'-100vw'
    }
}


const Home = () => {

    const authContext = useContext(AuthContext)
    const quoteContext = useContext(QuoteContext)

    const { quotes, filtered, getQuotes } = quoteContext
    const { loadUser, user } = authContext

    getQuotes()

    useEffect( () => {
        loadUser()
        // eslint-disable-next-line
    }, [])

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1
    }

    return (
        <motion.div 
            className={`${styles.home} ${styles.baseBody}`}
            variants={pageVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
        >
            <Header title='All Quotes' username='Jstarr'/>
            <SearchBox/>
            <Container>
                <Masonry
                    breakpointCols={breakpoints}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {
                        (filtered) ?
                        (filtered.map( quote => 
                            <Quote  
                                key={quote._id} 
                                _id={quote._id}
                                name={quote.name} 
                                date={quote.date}
                                imageURL={quote.imageURL} 
                                content={quote.content} 
                                likeState={quote.likeState}/>)) :
                        (quotes.map( quote => 
                            <Quote  
                                key={quote._id} 
                                _id={quote._id}
                                name={quote.name} 
                                date={quote.date}
                                imageURL={quote.imageURL} 
                                content={quote.content} 
                                likeState={quote.likeState}/>))
                    }
                </Masonry>
            </Container>
        </motion.div>
    )
}

export default Home
