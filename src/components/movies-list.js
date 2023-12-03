import React from "react"
import {useState,useEffect} from "react"
import MovieDataService from '../services/movies'
import {Link} from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
function MoviesList(props){
  const [movies, setMovies] = React.useState([])
  const [searchTitle, setSearchTitle] = React.useState("")
  const [searchRating, setSearchRating] = React.useState("")
  const [ratings, setRatings] = React.useState(["All Ratings"])
  const [currentPage,setCurrentPage]= useState(0)
  const [entriesPerPage,setentriesPerPage]= useState(0)
  const [currentSearchMode,setCurrentSearchMode]= useState("")
  useEffect(() =>{
  retrieveMovies()
  retrieveRatings()
  },[])

  useEffect(()=>{
    retrieveNextPage()
  },[currentPage])

  useEffect(()=>{
    setCurrentPage(0)
  },[currentSearchMode])
  const retrieveMovies = () =>{
  setCurrentSearchMode("")
  MovieDataService.getAll(currentPage).then(response =>{console.log(response.data);setMovies(response.data.movies);setCurrentPage(response.data.page); setentriesPerPage(response.data.entries_per_page)}).catch( e =>{console.log(e)})};
  const retrieveRatings = () =>{
  MovieDataService.getRatings().then(response =>{console.log(response.data);
//start with 'All ratings' if user doesn't specify
  setRatings(["All Ratings"].concat(response.data))}).catch( e =>{console.log(e)})}
  const onChangeSearchTitle = e=>{
    const searchTitle= e.target.value
    setSearchTitle(searchTitle);
  }

  const retrieveNextPage = () => {
  if(currentSearchMode === "findByTitle")
    findByTitle()
  else if(currentSearchMode === "findByRating")
    findByRating()
  else
    retrieveMovies()
}
  const onChangeSearchRating= e=>{
    const searchRating= e.target.value
    setSearchRating(searchRating);
  }
  const find =(query, by) =>{
    MovieDataService.find(query,by,currentPage).then(response =>{
    console.log(response.data)
    setMovies(response.data.movies)
    }).catch(e =>{console.log(e)
    })
   }
  const findByTitle = () => {
    setCurrentSearchMode("findByTitle")
    find(searchTitle, "title")
  }
  const findByRating = () => {
    setCurrentSearchMode("findByRating")
   if(searchRating === "All Ratings"){
     retrieveMovies()
   }
   else{
     find(searchRating, "rated")
  }
 }
  return(<div className="App">MoviesList
  <Container>
  <Form>
  <Row>
  <Col>
  <Form.Group>
  <Form.Control
  type="text"
  placeholder="Search by title"
  value={searchTitle}
  onChange={onChangeSearchTitle}/>
  </Form.Group>
  <Button
  variant="primary"
  type="button"
  onClick={findByTitle}>Search</Button>
  </Col>
  <Col>
  <Form.Group>
  <Form.Control
  as="select"
  onChange={onChangeSearchRating} >{ratings.map(rating =>{
  return(
  <option value={rating}>{rating}</option>
  )
  })}
  </Form.Control>
  </Form.Group>
  <Button
  variant="primary"
  type="button"
  onClick={findByRating}>Search</Button>
  </Col>
  </Row>
  </Form>
  <Row>
  {movies.map((movie) =>{
  return(
  <Col>
  <Card style={{ width: '18rem' }}>
  <Card.Img src={movie.poster+"/100px180"} />
  <Card.Body>
  <Card.Title>{movie.title}</Card.Title>
  <Card.Text>Rating: {movie.rated}</Card.Text>
  <Card.Text>{movie.plot}</Card.Text>
  <Link to={"/movies/"+movie._id} >ViewReviews</Link>
  </Card.Body>
  </Card>
  </Col>
  )
  })}
  </Row>
  <br />Showing page: {currentPage}.
  <Button variant="link" onClick={() => {setCurrentPage(currentPage+ 1)}}>
  Get next {entriesPerPage} results
  </Button>
  </Container>
  </div>);
}
export default MoviesList
