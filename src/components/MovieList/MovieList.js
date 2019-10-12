import React from 'react';
import Movie from './../Movie/Movie';
import { Card, Col, Row } from 'antd';

const MovieList = ({ movies, viewMovieInfo, }) => {
    return (
        <div className="container">
            <Row type="flex" justify="space-around">
                {movies.map((movie, i) => {
                    return (
                        <Movie
                            movieId={movie.id}
                            viewMovieInfo={viewMovieInfo}
                            key={i}
                            image={movie.poster_path}
                            title={movie.title}
                        />)
                })
                }
            </Row>
        </div>

    )


}
export default MovieList;