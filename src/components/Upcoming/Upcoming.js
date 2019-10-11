import React, { Component } from 'react';
import axios from 'axios';
import Movie from './../Movie/Movie';
import { Card, Col, Row } from 'antd';
import MovieInfo from './../MovieInfo/MovieInfo';
const { Meta } = Card;

class Upcoming extends Component {

    state = {
        upcoming: [],
        popular: [],
        currentMovie: null,


    }

    componentDidMount() {


        axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=9dd57bdcf58f9d7ad02cd4e2a9d0fc22&language=en-US&page=1')
            .then(res => {

                this.setState({ upcoming: [...res.data.results] });
                console.log(res.data.results);
            })
        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=9dd57bdcf58f9d7ad02cd4e2a9d0fc22&language=en-US&page=1')
            .then(res => {

                this.setState({ popular: [...res.data.results] });
                console.log(res.data.results);
            })


    }

    viewMovieInfoPopular = (id) => {
        console.log(this.state.currentMovie);
        const filteredMovie = this.state.popular.filter(movie => movie.id === id)
        const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null
        this.setState({ currentMovie: newCurrentMovie })



    }

    viewMovieInfoUpcoming = (id) => {
        const filteredMovie = this.state.upcoming.filter(movie => movie.id === id)
        const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null
        this.setState({ currentMovie: newCurrentMovie })



    }


    render() {
        return (
            <React.Fragment>
                {
                    this.state.currentMovie == !null ?
                   
                    <div><MovieInfo currentMovie={this.state.currentMovie} closeMovieInfo={this.closedMovieInfo} credits={this.state.credits} /></div> :
                    <div>
                    <div className="container">
                        <h2 style={{ textAlign: "center" }}>Upcoming movies </h2>
                        <Row type="flex" justify="space-around">


                            {this.state.upcoming.map((movie, i) => {
                                return (<Movie

                                    movieId={movie.id}


                                    key={i}
                                    image={movie.poster_path}
                                    title={movie.title}
                                    viewMovieInfo={this.viewMovieInfoUpcoming}

                                />)
                            })

                            }
                        </Row>
                    </div>
                    <div className="container">
                        <h2 style={{ textAlign: "center" }}>Popular movies</h2>
                        <Row type="flex" justify="space-around">

                            {this.state.popular.map((movie, i) => {
                                return (

                                    <Col span={6}>
                                        <Card
                                            hoverable
                                            onClick={() => this.viewMovieInfoPopular(movie.id)}
                                            style={{ width: 250 }}
                                            cover={<img alt={movie.title} src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} />}
                                            // cover={props.image == null ? <img src={"./../../../assets/no_img.png"} style={{ width:"100%", height: 360 }} : <img src={`https://image.tmdb.org/t/p/w185${props.image}`} alt={props.title} />}

                                            key={i}
                                        >
                                            <Meta title={movie.title} description={movie.overview} />
                                        </Card>
                                    </Col>




                                )
                            })

                            }
                        </Row>
                    </div>
                    </div>
                    
                } 
                </React.Fragment>
        )


    }
}



export default Upcoming;