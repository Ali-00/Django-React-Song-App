import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, List, ListItem, ListItemText } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import API_BASE_URL from '../context/config'
import manager from "../helper/manager";


const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0),
  },
}));

export default function Artist() {
  const classes = useStyles();
  const [artists, setArtists] = useState([]);
  const [previousPage, setPreviousPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  let {authTokens, logoutUser} =" useContext(AuthContext)";
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {

    manager.artist(currentPage, setArtists, setPreviousPage, setNextPage,logoutUser)
  }, [currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage(previousPage);
  };

  const handleNextPage = () => {
    setCurrentPage(nextPage);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4">
        Famous Artists
      </Typography>
      <List>
        {artists.map(artist => (
          <ListItem key={artist}>
            <ListItemText primary={artist} />
          </ListItem>
        ))}
      </List>
      <Grid container spacing={2} justify="center">
        <Grid item>
          <Button disabled={!previousPage} onClick={handlePreviousPage} type="submit" color="secondary" variant="contained" style={{ width: "120px" }} startIcon={<KeyboardArrowLeftIcon />}>Previous</Button>
        </Grid>
        <Grid item>
          <Button disabled={!nextPage} onClick={handleNextPage} type="submit" color="secondary" variant="contained" style={{ width: "120px" }} endIcon={<KeyboardArrowRightIcon />} >Next</Button>
        </Grid>
      </Grid>
    </div>
  );
}
