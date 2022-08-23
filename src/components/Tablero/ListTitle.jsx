import { Button, IconButton, InputBase, makeStyles, Typography } from '@material-ui/core';
import MoreHOrizIcon  from '@material-ui/icons/MoreHoriz';
import React, { useContext, useState } from 'react'
import contextAPI from '../../utils/contextAPI';

const ListTitle = ({title,listId}) => {
  const classes = useStyle();
  const [open, setOpen] = useState(false)
  const [newTitle,setNewTitle] = useState(title)
  const{ updateListTitle } = useContext(contextAPI)
  const handleBlur = () =>{
     updateListTitle(newTitle,listId)
     setOpen(false);
  }
  return (
     <>
          {open ? (
               <div>
                    <InputBase
                         value={newTitle}
                         onChange= {e => setNewTitle(e.target.value)}
                         autoFocus
                         onBlur={handleBlur}
                         fullWidth
                         inputProps={{className: classes.input}}
                    />
               </div>
          ) : (
          <div className={classes.title}>
               <Typography className={classes.titleText} onClick={() => setOpen(true)}>
                   {title}
               </Typography>
               <IconButton><MoreHOrizIcon/></IconButton>
          </div>
          )}
     </>
  )
}

const useStyle = makeStyles(theme => ({
     title: {
          display:"flex",
          margin: theme.spacing(1),
     },
     titleText:{
          fontSize:"1.2rem",
          fontWeight:"bold",
          padding: theme.spacing(1),
          flexGrow:1,
     },
     input:{
          fontSize:"1.2rem",
          fontWeight:"bold",
          padding:theme.spacing(1),
          margin: theme.spacing(1),
          borderRadius:"5px",
          "&:focus":{
               backgroundColor:"#fff",
               border:"2px Solid",
               borderColor:"blue",
          }
     }
}))


export default ListTitle