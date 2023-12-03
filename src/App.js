import React from 'react'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import AddReview from "./components/add-review"
import MoviesList from "./components/movies-list"
import Movie from "./components/movie"
import Login from "./components/login"
function App() {
  const[user,setUser]= React.useState(null)
  async function login(user= null){
    setUser(user)
}
  async function logout(){
    setUser(null)
}
return (<div className="App">
<Router>
<Navbar bg="light" expand="lg">
<Navbar.Brand href="#home"></Navbar.Brand>
<Navbar.Toggle aria-controls="basic-navbarnav"/>
<Navbar.Collapse id="basic-navbar-nav">
<Nav className="mr-auto">
<Nav.Link href="#home"><Link to= {"/movies"}>Movies</Link></Nav.Link>
<Nav.Link href="#link">{ user ? (<a onClick={logout}>Logout User</a>) : (<Link to={"/login"}>Login</Link>)}</Nav.Link>
</Nav>
</Navbar.Collapse>
</Navbar>
<Routes>
<Route path="/" element={<MoviesList />} />
<Route path="/movies" element={<MoviesList />} />
<Route path="/movies/:id/review" element={<AddReview user={user} />} />
<Route path="/movies/:id/" element={<Movie user={user} />} />
<Route path="/login" element={<Login login={login} />} />
</Routes>
</Router>
</div>
);
}
export default App
