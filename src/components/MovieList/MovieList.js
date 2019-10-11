import React from 'react';
import Movie from './../Movie/Movie';
import { Card, Col, Row } from 'antd';

const MovieList = (props) => {
    return (
        <React.Fragment>
        <div className="container">
        <Row type="flex" justify="space-around">
                
                   {props.movies.map((movie, i) => {
                        return (<Movie

                            movieId={movie.id}
                            viewMovieInfo={props.viewMovieInfo}
                            key={i}
                            image={movie.poster_path}
                            title = {movie.title}
                             />)
                    })

                   }
                    </Row>
                    </div>
                                   </React.Fragment>
       
    )


}
export default MovieList;