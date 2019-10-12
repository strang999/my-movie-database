import React, { PureComponent } from 'react';
import axios from 'axios';
import './App.css';
import LayoutPage from './containers/Layout/Layout.js';
import MovieInfo from './components/MovieInfo/MovieInfo';
import 'antd/dist/antd.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

class App extends PureComponent {
  state = {
    
    movies: [],
    searchValue: '',
    totalResults: 0,
    currentPage: 1,
    currentMovie: null,
    
  }

  getData = async () => {
    try {
      const responseUpcoming = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=9dd57bdcf58f9d7ad02cd4e2a9d0fc22&language=en-US&page=1`);
      const resUpcoming = responseUpcoming.data.results;
      const responsePopular = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=9dd57bdcf58f9d7ad02cd4e2a9d0fc22&language=en-US&page=1');
      const resPopular = responsePopular.data.results;
      this.setState({
        movies: [...resUpcoming, ...resPopular]
      });
    }
    catch (e) {
      console.log(e);
    }

  }

  handleSearch = () => {
    const { searchValue } = this.state;
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=9dd57bdcf58f9d7ad02cd4e2a9d0fc22&language=en-US&query=${searchValue}`)
      .then(res => {

        this.setState({ movies: [...res.data.results], totalResults: res.data.total_results });
        console.log(res.data.results);
      })
  }

  handleOnChange = (event) => {
    this.setState({ searchValue: event.target.value })
  }

  nextPage = async (pageNumber) => {
    const { searchValue } = this.state;
    try {
      const nextMovies = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=9dd57bdcf58f9d7ad02cd4e2a9d0fc22&language=en-US&query=${searchValue}&page=${pageNumber}`);
      this.setState({
        movies: [...nextMovies.data.results],
        currentPage: pageNumber
      })
    }
    catch (e) {
      console.log(e);
    }
  }

  viewMovieInfo = (id) => {
    const filteredMovie = this.state.movies.filter(movie => movie.id == id);
    if (filteredMovie === null) {
      return;
    }
    this.setState({ currentMovie: filteredMovie[0] });
  }

  getCredits = async () => {
    const { currentMovie } = this.state;
    await axios.get(`https://api.themoviedb.org/3/movie/${currentMovie}/credits?api_key=9dd57bdcf58f9d7ad02cd4e2a9d0fc22
  `)
      .then(res => {
        this.setState({ credits: res.data.cast })
      })
  }

  closeMovieInfo = () => {
    this.setState({ currentMovie: null, credits: [] })
  }




  render() {
    const {
      currentMovie, totalResults,
      movies, credits, currentPage,
      searchValue
    } = this.state;
    return (
      <BrowserRouter>
        <Route path="/" exact render={
          (props) => {
            if (props.match.url === '/') {
              return <Redirect to="/movies" />;
            }
          }
        }
        />

        <Route path="/movies" exact
          render={
            () => {
              this.setState({ currentMovie: null });
               return <LayoutPage
                currentMovie={currentMovie}
                totalResults={totalResults}
                handleSearch={this.handleSearch}
                handleOnChange={this.handleOnChange}
                viewMovieInfo={this.viewMovieInfo}
                movies={movies}
                closedMovieInfo={this.closedMovieInfo}
                credits={credits}
                nextPage={this.nextPage}
                currentPage={currentPage}
                getData={this.getData}
                searchValue={searchValue}
              />
            }
          }
        />
        <Route path="/movies/:id" render={
          (props) =>
            <MovieInfo
              currentMovie={currentMovie}
              closeMovieInfo={this.closeMovieInfo}
              {...props}
              getRelatedMovies={this.getRelatedMovies}
              viewMovieInfo={this.viewMovieInfo}
            />
        }
        />

      </BrowserRouter>
    )
  }
}
export default App;
