import React, {useContext} from 'react'
import { makeStyles } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import { useLocation } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { format } from 'date-fns'
import Avatar from '@material-ui/core/Avatar'
import ali from '../images/avatar/ali.jpg'
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: '#f4f4f4'
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    date: {
      flexGrow: 1
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(2)
    },
    secondaryAvatar: {
      backgroundColor: theme.palette.secondary.main,
    }
  }
})

export default function Layout({ children }) {
  const classes = useStyles()
  const history = useNavigate()
  const location = useLocation()
  let {user, logoutUser} = useContext(AuthContext)

  const menuItems = [
    { 
      text: 'Artists', 
      icon: <SubjectOutlined color="secondary" />, 
      path: '/' 
    },
    { 
      text: 'Songs', 
      icon: <MusicNoteIcon color="secondary" />, 
      path: '/songs' 
    },
    { 
      text: 'Albums', 
      icon: <QueueMusicIcon color="secondary" />, 
      path: '/albums' 
    },
  ];


  return (
    <div className={classes.root}>
      <AppBar 
        position="fixed" 
        className={classes.appBar}
        elevation={0}
        color="primary"
      >
        <Toolbar>
          <Typography className={classes.date}>
            Today is the {format(new Date(), 'do MMMM Y')}
          </Typography>
          <Typography>
            {user && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ marginRight: '8px' }}>{user.username}</p>
                <Avatar className={`${classes.avatar} ${classes.secondaryAvatar}`} alt={user.username} src="../images/avatar/ali.jpg" />
              </div>
            )}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div>
          <Typography variant="h4" className={classes.title} color="secondary">
            Tidal
          </Typography>
        </div>

        {/* links/list section */}
        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              onClick={() => history(item.path)}
              className={location.pathname === item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}

          {(user || localStorage.getItem('Token')) && (
            <ListItem button key='Logout' onClick={logoutUser}>
              <ExitToAppIcon color='secondary' style={{ marginRight: '30px' }} />
              <ListItemText primary='Logout' />
            </ListItem>
          )}
        </List>
        
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        { children }
      </div>
    </div>
  )
}
