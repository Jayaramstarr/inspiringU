import React,{ useContext, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import SendIcon from '@material-ui/icons/Send'
import CancelIcon from '@material-ui/icons/Cancel'

import Button from '@material-ui/core/Button'
import { motion } from "framer-motion"
import { format } from "date-fns"

import QuoteContext from '../context/quote/quoteContext'
import AuthContext from '../context/auth/authContext'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: 'transparent',
    padding: theme.spacing(2, 4, 3),
    width: '50%',
    height:'50vh',
    outline:'none',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
  },
  textArea:{
      backgroundColor:'#eee',
      outline:'none',
      border:'none',
      borderRadius:8,
      padding:'20px',
      fontFamily:'inherit',
      fontSize:20,
      width:'95%'
  },
  buttonContainer:{
    width:'100%',
    display:'flex',
    marginTop:50,
    padding:20,
    justifyContent:'space-between'
  },
  button:{
    width:'30%',
    color:'white',
    fontSize: 20,
    boxShadow: '0px 0px 8px #aaa'
  },
  buttonPost:{
    backgroundColor:'tomato',
    boxShadow: '0px 0px 8px #aaa',
    '&:hover':{
        backgroundColor:'tomato'
    }
  },
  buttonCancel:{
    backgroundColor:'rgb(51, 204, 51)',
    boxShadow: '0px 0px 8px #aaa',
    '&:hover':{
        backgroundColor:'rgb(51, 204, 51)'
    }
  }
}))

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

const TransitionModal = ({ open, setOpen }) => {
    const classes = useStyles()
    const date = format(new Date(), 'do MMMM Y')
    const [textAreaValue, setTextAreaValue] = useState('')

    const quoteContext = useContext(QuoteContext)
    const authContext = useContext(AuthContext)

    const { addQuote, current, updateQuote } = quoteContext
    const { user, loadUser } = authContext

    const [quote, setQuote] = useState({
        imageURL:"https://source.unsplash.com/1600x900/?scenary/?orientation=landscape",
        name:"user",
        date,
        likeState:0,
        content:"" 
    })

    const textAreaOnChange = e => {
        setTextAreaValue(e.target.value)
        setQuote({ ...quote, content:e.target.value })
    }

    useEffect(() =>{
        loadUser()
        if(current !== null)
        {
            setQuote(current)
            setTextAreaValue(current.content)
            setOpen(true)
        }
    },[current,quoteContext,setOpen])

    const handleClose = () => {
        setOpen(false)
    }

    const submitQuote = () => {
        if(quote.content)
        {
            setOpen(false)
            console.log(quote)
            quote.id ?  updateQuote(quote) : addQuote(quote)
            setQuote({
                imageURL:"https://source.unsplash.com/1600x900/?scenary/?orientation=landscape",
                name:user.name,
                date,
                likeState:0,
                content:"" 
            })
        }

    }

    return (
    <div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <TextareaAutosize 
                        className={classes.textArea} 
                        aria-label="minimum height" 
                        value={textAreaValue}
                        rowsMin={3} 
                        rowsMax={3} 
                        placeholder="Write a Quote"
                        onChange={e => textAreaOnChange(e)}/>
                        <div className={classes.buttonContainer}>
                            <Button variant="outlined" transformOrigin='center' size='large' color="primary" 
                                className={`${classes.button} ${classes.buttonCancel}`} 
                                component={motion.div}
                                variants={buttonVariants}
                                whileHover='hover'
                                onClick={() => setOpen(false)}>
                                Cancel&nbsp;&nbsp;&nbsp;<CancelIcon/>
                            </Button>
                            <Button variant="outlined" transformOrigin='center' size='large' color="primary" 
                                className={`${classes.button} ${classes.buttonPost}`} 
                                component={motion.div}
                                variants={buttonVariants}
                                whileHover='hover'
                                onClick={submitQuote}>
                                Post it&nbsp;&nbsp;&nbsp;<SendIcon/>
                            </Button>
                        </div>
                </div>
            </Fade>
        </Modal>
    </div>
    )
}

export default TransitionModal