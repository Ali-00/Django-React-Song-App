import  React, { useState, useContext } from 'react';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import AuthContext from '../context/AuthContext'
import API_BASE_URL from '../context/config'
import manager from "../helper/manager";



const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  results: {
    marginTop: theme.spacing(2),
  },
  myDiv: {
    marginBottom: '30px',
  },
}));

function Album() {
  const [artists, setAlbum] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  let {authTokens, logoutUser} = "useContext(AuthContext)"
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();

    manager.album(authTokens, artists, setError, setResults,logoutUser)

  };

  const handlePreviousPage = () => setPage((prevPage) => prevPage - 1);
  const handleNextPage = () => setPage((prevPage) => prevPage + 1);

  const pageSize = 2;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pageResults = results.slice(startIndex, endIndex);
  const hasPreviousPage = startIndex > 0;
  const hasNextPage = endIndex < results.length;

  return (
    <div>
      <Typography variant="h4">
        Album
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          className={classes.input}
          label="Artists"
          value={artists}
          variant="outlined"
          focused={false}
          InputProps={{ style: { color: 'black' } }}
          InputOutlinedProps={{ style: { borderColor: 'black' } }}
          onChange={(event) => setAlbum(event.target.value)}
        />
        <Button
          className={classes.button}
          type="submit" 
          color="secondary" 
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
      {results.length > 0 && ( <div className={classes.results}>
        {pageResults.map((result) => (
          <div key={result.album_id} className={classes.myDiv}>
            <Typography variant="h6">{result.album}</Typography>
            <Typography variant="body1">Artist Ids: {result.artist_ids}</Typography>
          </div>
        ))}
        <Grid container spacing={2} justify="center">
          <Grid item>
            {hasPreviousPage && ( <Button onClick={handlePreviousPage} type="submit" color="secondary" variant="contained" style={{ width: "120px" }} startIcon={<KeyboardArrowLeftIcon />}>Previous</Button> )}
          </Grid>
          <Grid item>
            {hasNextPage && <Button onClick={handleNextPage} type="submit" color="secondary" variant="contained" style={{ width: "120px" }} endIcon={<KeyboardArrowRightIcon />}>Next</Button>}
          </Grid>
        </Grid>
      </div>
      )}
      {results.length === 0 && error && (
        <Typography variant="body1">No result found for this Artist Name</Typography>
      )}
    </div>
  );
}

export default Album;
