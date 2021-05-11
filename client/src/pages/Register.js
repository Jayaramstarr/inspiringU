import React,{ useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styles from '../App.module.css'

import { motion } from "framer-motion"

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EmailIcon from '@material-ui/icons/Email'
import VpnKeyIcon from '@material-ui/icons/VpnKey'

import AlertContext from "../context/alert/alertContext"
import AuthContext from "../context/auth/authContext"

import setAuthToken from '../utils/setAuthToken'

if(localStorage.token){
    setAuthToken(localStorage.token)
}


const useStyles = makeStyles((theme) => ({
    container:{
        backgroundColor:'rgba(153, 51, 255,.75)',
        position:'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        width:'35%',
        boxShadow:'0 0 8px #aaa',
        borderRadius:10,
        padding:"10px 40px"
    },
    heading:{
        color:'white',
        textAlign:'center',
        padding:'10px 0',
        margin:'20px 0 10px 0',
        fontWeight:'800',
        textShadow:'0 0 8px #fff'
    },
    formControl:{
        marginBottom:35
    },
    textField:{
        width:'100%',
        "& .MuiInput-underline:hover:not(.Mui-disabled):before":{
            borderBottom:'2px solid #ccc'
        },
        "& .MuiInputBase-input:hover::after":{
            borderBottom:'2px solid white'
        },
        "& .MuiInputBase-root": {
            color: "white",
            textShadow:'0 0 8px #fff'
        },
        "& .MuiFormLabel-root":{
            color:"white",
            textShadow:'0 0 8px #fff'
        },
        "& .MuiInput-underline:before":{
            borderBottom:"1px solid #fff"
        },
        "& .MuiInput-underline:after":{
            borderBottom:"1px solid #fff"
        }
    },
    textFeildContainer:{
        marginLeft:10,
        flex:'1'
    },
    icon:{
        fill:"white"
    },
    submitButton: {
        margin:'20px 0',
        width:'100%',
        color:'white',
        fontSize: 20,
        textShadow: '0px 0px 8px rgba(255,255,255)',
        boxShadow: '0px 0px 8px rgba(255,255,255)',
        borderColor:'white',
        '&:hover':{
            borderColor:'white',
        }
    },
    loginContainer:{
        position:'absolute',
        left: '85%',
        top: '50%',
        padding:30
    },
    loginLabel:{
        color:'white',
        fontSize:15,
        marginBottom:15
    },
    loginButton: {
        color:'white',
        fontSize: 20,
        boxShadow: '0px 0px 8px rgba(255,255,255)',
        borderColor:'white',
        '&:hover':{
            borderColor:'white',
        }
    },
}));


const pageVariants = {
    hidden:{
      x:'100vw'
    },
    visible:{
      x: 0,
      transition: { ease: 'linear', delay:.5 }
    },
    exit:{
      x:'-100vw',
      transition: { ease: 'easeInOut' }
    }
}

const containerVariants = {
    hidden:{
        y:'-200vh',
        x:'-50%'
      },
    visible:{
        y: '-50%',
        x:'-50%',
        transition:{ 
          type:'spring', 
          mass:.4,
          damping: 8,
          delay: 1.2,
          staggerChildren: .3
        }
    }
}

const loginContainerVariants = {
    hidden:{
        x:'-200vw'
    },
    visible:{
        x: 0,
        transition:{ 
          type:'spring', 
          mass:.4,
          damping: 8,
          delay: 2.2,
          staggerChildren: .3
        }
    },
}

const buttonVariants = {
    hover: {
        scale: 1.1
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

const Register = () => {

    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)
    const { setAlert } = alertContext
    const { register, error, clearErrors, isAuthenticated, loadUser } = authContext
    let history = useHistory()

    useEffect(() => {
        loadUser()
        if(isAuthenticated)
        {
            history.push('/home')
            setAlert('Welcome','success')
        }
        if(error==='User already exists')
        {
            setAlert(error,'danger')
            clearErrors()
        }
        // eslint-disable-next-line
    },[error, isAuthenticated])

    const classes = useStyles()
    const [user, setUser] = useState({
        name:'',
        email:'',
        password:''
    })

    const { name, email, password } = user

    const onSubmit = e => {
        e.preventDefault()
        if(email === '' || password === '' || name === '')
            setAlert('Please set all fields', 'danger')
        else
        {
            register({
                name,
                email,
                password
            })
        }
    }

    return (
        <motion.div
            variants={pageVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            className={`${styles.register} ${styles.baseBody}`}
        >
            
            <Container 
                component={motion.form} 
                onSubmit={onSubmit}  
                variants={containerVariants} 
                className={classes.container}
            >
                <Typography variant="h3" className={classes.heading}>
                    Register
                </Typography>  
                <Grid container alignItems="flex-end" className={classes.formControl}>
                    <Grid item>
                        <AccountCircleIcon className={classes.icon}/>
                    </Grid>
                    <Grid item className={classes.textFeildContainer}>
                        <TextField onChange={ e => setUser({...user, name:e.target.value}) } className={classes.textField} label="Username"/>
                    </Grid>
                </Grid>
                <Grid container alignItems="flex-end" className={classes.formControl}>
                    <Grid item>
                        <EmailIcon className={classes.icon}/>
                    </Grid>
                    <Grid item className={classes.textFeildContainer}>
                        <TextField 
                            className={classes.textField} 
                            onChange={ e => setUser({...user, email:e.target.value})}
                            type="email"
                            label="Email"/>
                    </Grid>
                </Grid>
                <Grid container alignItems="flex-end" className={classes.formControl}>
                    <Grid item>
                        <VpnKeyIcon className={classes.icon}/>
                    </Grid>
                    <Grid item className={classes.textFeildContainer}>
                        <TextField  
                            className={classes.textField} 
                            onChange={ e => setUser({...user, password:e.target.value})}
                            type="password"
                            label="Password"/>
                    </Grid>
                </Grid>
                <Button variant="outlined" transformOrigin='center' size='large' color="primary" 
                    className={classes.submitButton} 
                    component={motion.button}
                    variants={buttonVariants}
                    whileHover='hover'>
                    Submit
                </Button>    
            </Container>
            
            <motion.div className={classes.loginContainer} variants={loginContainerVariants}>
                <div className={classes.loginLabel}>
                    Already have an account?
                </div>
                <Link to='/login'>
                    <Button variant="outlined" transformOrigin='center' size='large' color="primary" 
                        className={classes.loginButton} 
                        component={motion.div}
                        variants={buttonVariants}
                        whileHover='hover'>
                        Login
                    </Button>
                </Link>
            </motion.div>
            
        </motion.div>
    )
}

export default Register
