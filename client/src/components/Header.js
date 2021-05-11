import React,{ useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import AppBar  from '@material-ui/core/AppBar'
import Button  from '@material-ui/core/Button'
import Toolbar  from '@material-ui/core/Toolbar'
import { motion } from "framer-motion"

import AlertContext from "../context/alert/alertContext"
import AuthContext from "../context/auth/authContext"


const useStyles = makeStyles( theme => {
    return{
        button: {
            marginLeft:'auto',
            padding:7,
            color:'white',
            fontSize: 15,
            borderColor:'transparent',
            '&:hover':{
                borderColor:'white',
                boxShadow: '0px 0px 8px rgba(255,255,255)',
            }
        },
        root:{
            display:"flex"
        },
        toolbar: theme.mixins.toolbar,
        toolbar1:{
            padding:'20px 25px',
            backgroundColor:'rgb(115, 0, 230)',
            boxShadow:'0 0 8px white'
        },
        mainTitle:{
            marginLeft:'auto',
            color:'white',
            fontSize: 60,
            fontWeight:'800',
            textShadow:'0 0 8px white'
        }
    }
})

const toolbarVariants = {
    hidden:{
        opacity:0
    },
    visible:{
        opacity:1,
        transition:{
            delay:.25,
            type:'tween'
        }
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

const Header = ({ title }) => {
    
    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)
    const { setAlert } = alertContext
    const { logout } = authContext
    let history = useHistory()

    const logoutHandler = () => {
        logout()
        history.push('/')
        setAlert('Logged out successfully!', 'success')
    }

    const classes = useStyles()
    return (
        <div className={classes.root}>
            <AppBar
                className={classes.appbar}
                elevation={0}
            >
                <Toolbar 
                    component={motion.div} 
                    className={classes.toolbar1}
                    variants={toolbarVariants}
                    initial='hidden'
                    animate='visible'
                >
                    <Typography variant="h1" className={classes.mainTitle}>
                        {title}
                    </Typography>
                    <Button variant="outlined" transformOrigin='center' size='large' color="primary" 
                        className={classes.button} 
                        component={motion.div}
                        variants={buttonVariants}
                        onClick={logoutHandler}
                        whileHover='hover'>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
