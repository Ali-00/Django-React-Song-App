import React, { useContext } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AuthContext from "../context/AuthContext";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { redirect } from "react-router-dom";
import {client_id,API_BASE_URL} from '../context/config'


const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(2),
    marginTop: "20px"
  },
  results: {
    marginTop: theme.spacing(2),
  },
  myDiv: {
    marginBottom: "30px",
  }
}));



const LoginPage = () => {
  let { loginUser } = useContext(AuthContext);
  const classes = useStyles();

  return (
    <div>
      <form className={classes.form} onSubmit={loginUser}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ListItem>
            <PermIdentityIcon color="secondary" style={{ fontSize: '50px', marginRight: '10px' }} />
            <ListItemText primary="Login" />
          </ListItem>
        </div>
        <TextField
            required
            className={classes.input}
            label="username"
            type="username"
            id="username"
            variant="outlined"
            focused={false}
            InputProps={{ style: { color: 'black' } }}
            InputOutlinedProps={{ style: { borderColor: 'black' } }}
        />
        <TextField
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            variant="outlined"
            focused={false}
            InputProps={{ style: { color: 'black' } }}
            InputOutlinedProps={{ style: { borderColor: 'black' } }}
        />
        <Button
          className={classes.button}
          type="submit"
          color="secondary"
          variant="contained"
        //   endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>   
      </form>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button 
//          href={`${API_BASE_URL}/google/login`}
          href="https://muzamal-django-dot-cloud-work-314310.ew.r.appspot.com/google/login"
          className="google-login-button"
          style={{ border: '1px solid black' }}
        >
          Login with Google 
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
