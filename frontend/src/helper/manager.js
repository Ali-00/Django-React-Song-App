import API_BASE_URL from '../context/config'
import AuthContext from '../context/AuthContext'


const manager = {
    
  artist : (currentPage, setArtists, setPreviousPage, setNextPage,logoutUser) => {
    
    fetch(API_BASE_URL+`/artists1/showartist/?page=${currentPage}`)
    .then(response => {
      if (!response.ok) {
        if(response.statusText === 'Unauthorized'){
          logoutUser()
        }
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      setArtists(data.artists);
      setPreviousPage(data.links.previous);
      setNextPage(data.links.next);
    })
    .catch(error => console.error(error));
    },

    album : (authTokens, artists, setError, setResults,logoutUser) => {
    
        fetch(API_BASE_URL+'/albums1/showalbums/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({ artists }),
          })
          .then((response) => {
            if (!response.ok) {
              setError(true);
              throw new Error('Network response was not ok');
            }
            if(response.statusText === 'Unauthorized'){
              logoutUser()
            }
            console.log(response)
            return response.json();
          })
          .then((data) => {
            setError(true);
            setResults(data);
          })
          .catch((error) => {
            console.error(error);
            setResults([]);
            // setResults('Error fetching songs. Please try again later.');
          });
    },

    song : (authTokens, album, setError, setResults,logoutUser) => {
        fetch(API_BASE_URL+"/songs1/showsong/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + String(authTokens.access),
              },
              body: JSON.stringify({ album }),
            })
              .then((response) => {
                if (!response.ok) {
                  setError(true);
                  if(response.statusText === 'Unauthorized'){
                    logoutUser()
                  }
                  throw new Error("Network response was not ok");
                }
                return response.json();
              })
              .then((data) => {
                setError(true);
                setResults(data);
              })
              .catch((error) => {
                console.error(error);
                setResults([]);
                // setResults('Error fetching songs. Please try again later.');
              });
    },

    accesstoken : (user,password) => {
        fetch(API_BASE_URL+'/api/token/', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({'username':user, 'password':password})
            })
    },

    refreshtoken : (authTokens) => {
        fetch(API_BASE_URL+'/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            // body:JSON.stringify({'refresh':authTokens?.refresh})
            body:JSON.stringify({'refresh': authTokens && authTokens.refresh})
            
        })
    },

};

export default manager;