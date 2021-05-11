import React from 'react'
import styles from '../App.module.css'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    button: {
      position:'absolute',
      left: '70%',
      top: '70%',
      color:'white',
      fontSize: 20,
      boxShadow: '0px 0px 8px rgba(255,255,255)',
      borderColor:'white',
      '&:hover':{
          borderColor:'white',
      }
    },
    heading:{
        position:'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        fontSize: 75,
        color:'white',
        textTransform:'capitalize',
        letterSpacing: 3,
        textShadow: '0px 0px 8px rgba(255,255,255)'
    }
}));

const containerVariants = {
    hidden:{
      x:'100vw'
    },
    visible:{
      x: 0,
      transition: { ease: 'easeInOut', delay:.5 }
    },
    exit:{
      x:'-100vw',
      transition: { ease: 'easeInOut' }
    }
}

const buttonVariants = {
    hover: {
        scale:1.2,
        textShadow: '0px 0px 8px rgba(255,255,255)'
    },
    hidden:{
        opacity: 0,
    },
    visible:{
        opacity:1,
        transition:{
            duration: 1,
            delay:.5,
            ease: 'easeInOut'
        }
    }
}

const Welcome = () => {

    const classes = useStyles();

    return (
        <motion.div  
            className={`${styles.welcome} ${styles.baseBody}`}
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
        >
            <Typography variant="h3" component="h2" gutterBottom className={classes.heading}>
                Inspirational Quotes
            </Typography>
            <Link to='/register'>
                <Button variant="outlined" transformOrigin='center' size='large' color="primary" 
                    className={classes.button} 
                    component={motion.div}
                    variants={buttonVariants}
                    whileHover='hover'>
                    Get Started
                </Button>
            </Link>
            
        </motion.div>
    )
}

export default Welcome