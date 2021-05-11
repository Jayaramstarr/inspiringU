import React,{ useContext, useEffect } from 'react'
import styles from '../App.module.css'
import { motion } from "framer-motion"
import Header from '../components/Header'
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


const Disliked = () => {

  const authContext = useContext(AuthContext)
  const { loadUser, user } = authContext

  useEffect(() => {
      loadUser()
      // eslint-disable-next-line
  },[user])

    return (
        <motion.div 
            className={`${styles.disliked} ${styles.baseBody}`}
            variants={pageVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
        >
            <Header title='Disliked Quotes' username='Jstarr'/>
        </motion.div>
    )
}

export default Disliked
