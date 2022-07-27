import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { useGoogleLogout } from 'react-google-login';
import '../../index.css';
import globus from '../../images/globus.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';
import './styles.css'

const clientId = '757907037708-iils2rkugb4n6vpevpvvuk5useb26phd.apps.googleusercontent.com';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const googleLogOut = useGoogleLogout({clientId});


  const logout = () => {
    
    googleLogOut.signOut();

    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
    
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <img id='image' className={classes.image} src={globus} alt='globus' height='60' />
        <Typography id='heading' component={Link} to="/" className={classes.heading} variant='h2' align='center'>Around the World in 80 Days</Typography>
        <img className={classes.image2} src={globus} alt='globus' height='60' />
      </div>
      <Toolbar id='toolbar' className={classes.toolbar}>
        {user?.result ? (
          <div id='profile' className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography id='userName' className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
