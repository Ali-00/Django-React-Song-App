import { BrowserRouter as Router, Switch, Route, Routes,Navigate } from 'react-router-dom'
import Artist from './pages/Artist'
import Song from './pages/Song'
import Album from './pages/Album'
import Login from './pages/LoginPage'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import Layout from './components/Layout'
import React,{useContext} from 'react'
// import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: green
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})


const check_token = ()=>{

  if (window.location.search !== "") {
    let token = String(window.location.search).split("=")[1];
    localStorage.setItem('Token', token)
    return true
  }else if (localStorage.getItem("token")){
    return true
  }else if (localStorage.getItem("Token")){
    return true
  } else {
    return false
  }

}
const token = check_token()
console.log(token)

function App() {
  return (
    
    <ThemeProvider theme={theme}>
      <Router>
      <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />}/>
                  <Route element={token?<Artist/>: <Navigate to="/login"/>} path="/"/>
                  <Route element={token?<Album/>: <Navigate to="/login"/>} path="/albums"/>
                  <Route element={token ? <Song/>: <Navigate to="/login"/>} path="/songs"/>
            </Routes>
          </Layout>
        </AuthProvider>
      </Router>
    </ThemeProvider>
    
  );
}

export default App;




