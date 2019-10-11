import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Card, Col, Row, Pagination  } from 'antd';
import  {Route, Link} from 'react-router-dom';

import axios from 'axios';
import Searchbox from './../../components/Search/Search';
import MovieList from './../../components/MovieList/MovieList';
import MovieInfo from './../../components/MovieInfo/MovieInfo';
import Upcoming from '../../components/Upcoming/Upcoming';

const { Meta } = Card;
const { Header, Content, Footer } = Layout;


class LayoutPage extends Component {

  state = {
    movieId: null,
    movies: [],
    searchValue: '',
    totalResults: 0,
    currentPage: 1,
    currentMovie: null,
    credits: []

}




handleSearch = () => {

 axios.get(`https://api.themoviedb.org/3/search/movie?api_key=9dd57bdcf58f9d7ad02cd4e2a9d0fc22&language=en-US&query=${this.state.searchValue}`)
 .then(res =>{
   
   this.setState({movies: [...res.data.results], totalResults: res.data.total_results, upcoming: [], popular: []});
   console.log(res.data.results);
 })
};

handleOnChange = (event) => {
  
  this.setState({ searchValue: event.target.value })
}

nextPage = (pageNumber) => {
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=9dd57bdcf58f9d7ad02cd4e2a9d0fc22&language=en-US&query=${this.state.searchValue}&page=${pageNumber}`)
  .then(res =>{
    
    this.setState({movies: [...res.data.results], currentPage: pageNumber});
    
  })
}

viewMovieInfo = (id) => {   // KAK SDELAT DLIA VSEH FILMOV ( )
  const filteredMovie = this.state.movies.filter(movie => movie.id == id)
  const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null
  this.setState({ currentMovie: newCurrentMovie})

}




getCredits = () => {
  axios.get(`https://api.themoviedb.org/3/movie/${this.state.currentMovie}/credits?api_key=9dd57bdcf58f9d7ad02cd4e2a9d0fc22
  `)
  .then(res =>{
    this.setState({credits: res.data.cast})
    console.log(res.data.cast);
   
  })
}

closeMovieInfo = () => {
  this.setState({currentMovie: null, credits: []})
}


    render(){
      const numberPages = Math.floor(this.state.totalResults / 20);
     
        return (


        <Layout className="layout">
        <Header >
          <div className="logo" />
          <Menu className="container"
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px'}}
          >
            <Menu.Item key="1"> <Link to= "/">Home</Link></Menu.Item>
            <Menu.Item key="2">Search</Menu.Item>
            
            <Menu.Item key="3"> </Menu.Item>
           <Searchbox handleSearch={this.handleSearch} handleOnChange={this.handleOnChange}/>
          </Menu>
          
        </Header>
        <Content style={{ padding: '0 50px' }}>

        
          <div style={{background: '#fff', padding: 24, minHeight: 280 }}>
         <Route path='/'  component = {Upcoming} ></Route>
         <Route path='/view-info'  component = {MovieInfo} ></Route>
         <Route path='/results'  component = {MovieList} ></Route>

         {/* <Upcoming viewMovieInfo={this.viewMovieInfo} movies={this.state.movies} upcoming = {this.state.upcoming} popular={this.state.popular} /> */}

{this.state.currentMovie == null ? 
<div>
<MovieList viewMovieInfo={this.viewMovieInfo} movies={this.state.movies} upcoming = {this.state.upcoming} popular={this.state.popular} />
</div> : <MovieInfo currentMovie={this.state.currentMovie} closeMovieInfo ={this.closedMovieInfo} credits={this.state.credits}/>
}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
        <Pagination total={this.state.totalResults} defaultPageSize={numberPages} onChange={this.nextPage} current={this.state.currentPage} />

        </Footer>
      </Layout>
      
      )
    }

}
export default LayoutPage;