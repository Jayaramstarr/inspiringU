import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import TransitionModal from './TransitionModal'

import React, { useState, useContext } from 'react'
import { useHistory, useLocation } from 'react-router'

import IconButton from '@material-ui/core/IconButton'
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined'
import SubjectOutlinedIcon from '@material-ui/icons/SubjectOutlined'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'

import AuthContext from "../context/auth/authContext"
import { motion } from "framer-motion"

const drawerWidth = 240

const useStyles = makeStyles( theme => {
    return{
        page:{
            backgroundColor:'#F9F9F9',
            width:'100%'
        },
        drawer:{
            width:drawerWidth
        },
        drawerPaper:{
            width:drawerWidth,
            backgroundColor:'rgb(115, 0, 230)',
            boxShadow:'0 0 8px white'
        },
        root:{
            display:"flex",
            backgroundImage:'radial-gradient(circle, rgba(153, 51, 255,.75) 0%, rgba(51, 0, 102,.75) 100%)'
        },
        active:{
            boxShadow:'0 0 8px white'
        },
        title:{
            fontSize:30,
            fontWeight:600,
            color:'white',
            padding: theme.spacing(2),
            textShadow:'0 0 8px white'
        },
        appbar:{
            width:`calc(100% - ${drawerWidth}px)`
        },
        toolbar: theme.mixins.toolbar,
        toolbar1:{
            padding:'20px 10px',
            backgroundImage:'linear-gradient(to bottom right, rgba(153, 51, 255,.75) ,rgba(51, 0, 102,.75))'
        },
        profile:{
            display:'flex',
            margin:'20px auto 10px 20px',
            alignContent:'center',
            alignItems:'center'
        },
        username:{
            marginLeft: 'auto',
            marginRight: 10,
            color:'white',
            textShadow:'0 0 8px white',
            //display:'inline-block'
        },
        listItem:{
            marginBottom:20
        },
        listItemText:{
            color:'white'
        },
        icon:{
            fill:"white"
        },
        addIconButton:{
            margin:'80px auto 10px auto',
            borderRadius:'50%',
            padding:0,
            transition:'all .2s ease-in',
            "&:hover":{
                boxShadow:'0 0 8px white',
                transform:'scale(1.1)'
            }
        },
        addIcon:{
            fontSize:50,
            fill:'rgb(204, 51, 255)'
        }
    }
})


const drawerVariants = {
    hidden:{
        // x:'-100%'
        opacity:0
    },
    visible:{
        // x:0,
        // transition:{ 
        //   type:'spring', 
        //   mass:.4,
        //   delay:.75,
        //   damping: 8,
        //   stiffness:700
        // }
        opacity:0
    }
}

const Layout = ({ children }) => {

    const authContext = useContext(AuthContext)
    const { user } = authContext

    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()

    const [open, setOpen] = useState(false);

    const menuItems = [
        {
            text: 'Home',
            icon: <SubjectOutlinedIcon className={classes.icon}/>,
            path: '/home'
        },
        {
            text: 'My Quotes',
            icon: <PersonAddIcon className={classes.icon}/>,
            path: '/my-quotes'
        },
        {
            text: 'Liked Quotes',
            icon: <ThumbUpIcon className={classes.icon}/>,
            path: '/liked'
        },
        {
            text: 'Disliked Quotes',
            icon: <ThumbDownIcon className={classes.icon}/>,
            path: '/disliked'
        }
    ]

    return (
        <div className={classes.root}>
            {/* <motion.div
                variants={drawerVariants}
                initial='hidden'
                animate='visible'> */}
            
            <Drawer 
                component={motion.div}
                variants={drawerVariants}
                initial='hidden'
                animate='visible'
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{ paper: classes.drawerPaper }}
                >

                    <div className={classes.profile}>
                        <Typography className={classes.username}>
                            {/* {user.name} */}
                        </Typography>
                        <Avatar className={classes.avatar}/>
                    </div>

                <div>
                    <Typography variant="h5" className={classes.title}>
                        Make them Quotes!
                    </Typography>
                </div>

                <List>
                    {menuItems.map( item => 
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => history.push(item.path)}
                            className={`${classes.listItem} ${location.pathname === item.path ? classes.active : null}`}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText className={classes.listItemText} primary={item.text}/>
                        </ListItem>
                    )}
                </List>

                <IconButton 
                    aria-label="liked" 
                    className={classes.addIconButton} 
                    onClick={() => setOpen(!open)} 
                >
                    <AddCircleOutlinedIcon className={classes.addIcon}/>
                </IconButton>

            </Drawer>
            {/* </motion.div> */}

            <div className={classes.page}>
                {/* <div className={classes.toolbar}></div> */}
                <TransitionModal open={open} setOpen={setOpen}/>
                {children}
            </div>

        </div>
    )
}

export default Layout
