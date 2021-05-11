import React,{ useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import ShareIcon from '@material-ui/icons/Share'
import DeleteIcon from '@material-ui/icons/Delete'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import CreateIcon from '@material-ui/icons/Create'

import QuoteContext from '../context/quote/quoteContext'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundImage:'radial-gradient(circle, rgba(153, 51, 255,.75) 0%, rgba(115, 0, 230,.75) 100%)',
    color:'white',
    boxShadow:'0 0 8px #eee',
    "& .MuiTypography-colorTextSecondary":{
        color:'white'
    },
    "& .MuiCardHeader-title":{
        fontSize:25,
        fontWeight: 500,
        textShadow:'0 0 4px white'
    },
    "& .MuiCardHeader-subheader":{
        margin:'6px 0 0 4px',
        fontSize:12.5,
        textShadow:'0 0 5px white',
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  expand: {
    marginLeft: 'auto'
  },
  cardContent:{
    fontSize: 20,
    fontWeight: 400,
    textShadow:'0 0 6px white'
  },
  avatar: {
    backgroundColor: 'rgb(115, 0, 230)',
    color: 'white',
    fontWeight:'800',
    textShadow:'0 0 8px white',
    boxShadow:'0 0 4px white'
  },
  iconTrash:{
    fill: 'tomato'
  },
  iconWhite:{
    fill: 'white'
  },
  iconActive:{
      fill: 'white',
      textShadow: '0 0 8px white',
      boxShadow: '0 0 8px white',
      padding:10,
      borderRadius:'50%',
      transform:'scale(1.25)'
  }
}))

const Quote = ({ _id, name, date, imageURL, content, likeState }) => {
  
  const classes = useStyles()

  const quoteContext = useContext(QuoteContext)

  const { deleteQuote, setCurrent, clearCurrent } = quoteContext

  const onDelete = () => {
    deleteQuote(_id)
    clearCurrent()
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {name[0].toUpperCase()}
          </Avatar>
        }
        action={
            true && 
            <IconButton aria-label="settings" onClick={onDelete}>
              <DeleteIcon className={classes.iconTrash}/>
            </IconButton>
          }
        title={name}
        subheader={date}
      />
      <CardMedia
        className={classes.media}
        image={imageURL}
        title="Inspire"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="h4" className={classes.cardContent}>
          <blockquote>{content}</blockquote>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="liked">
            <ThumbUpIcon className={ likeState===1 && classes.iconActive}/>
        </IconButton>
        <IconButton aria-label="disliked">
            <ThumbDownIcon className={ likeState===-1 && classes.iconActive}/>
        </IconButton>
        <IconButton className={clsx(classes.expand)}>
          <CreateIcon className={classes.iconWhite} onClick={() => setCurrent(_id)}/>
        </IconButton>
        <IconButton>
          <ShareIcon className={classes.iconWhite}/>
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default Quote