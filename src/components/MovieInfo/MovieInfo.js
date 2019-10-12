import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import axios from "axios";
import { Row, Col, Icon, Card } from 'antd';
import './MovieInfo.css';

const { Meta } = Card;

const apiKey = '9dd57bdcf58f9d7ad02cd4e2a9d0fc22';

class MovieInfo extends PureComponent {
    state = {
        relatedFims: [],
        cast: []
    }

    componentDidMount() {
        this.getRelatedMovies();
        this.getCredits();
    }

    closeMovieInfo = () => {
        const { closeMovieInfo, history } = this.props;
        closeMovieInfo();
        history.push('/');
    }

    getRelatedMovies = async () => {
        const { match } = this.props;
        try {
            const responseRelated = await axios.get(`https://api.themoviedb.org/3/movie/${match.params.id}/similar?api_key=${apiKey}&language=en-US&page=1`);
            this.setState({
                relatedFims: [...responseRelated.data.results]
            });
        }
        catch(e) {
            console.log(e);
        }
    }

    // viewMovieInfo = (id) => {
    //     const { viewMovieInfo, history } = this.props;
    //     viewMovieInfo(id);
    //     history.push(`/movies/${id}`);
    // }

    getCredits = async () => {
        try {
            const { match } = this.props;
            const responseCredits = await axios.get(`https://api.themoviedb.org/3/movie/${match.params.id}/credits?api_key=${apiKey}`);
            console.log();
            this.setState({
                cast: [...responseCredits.data.cast]
            });
            console.log(this.state.cast);
        }
        catch(e) {
            console.log(e);
        }
    }

    render() {
        const {
            currentMovie: { title, overview,
                release_date, poster_path }, credits, viewMovieInfo
        } = this.props;
        const { relatedFims, cast } = this.state;
        return (
            <div className='container'>
                <Card style={{
                    height: '100%'
                }}
                >
                    <Icon className="movie-image" type="close" onClick={this.closeMovieInfo} />
                    <Col span={14}>
                        {poster_path === null ?
                            <img
                                src={"./../../../assets/no_img.png"}
                                alt="Poster Image"
                                style={{ width: "100%", height: '360', }} />
                            : <img
                                src={`https://image.tmdb.org/t/p/w400${poster_path}`}
                                alt="Poster Image"
                                // style={{ maxWidth: '100%' }}
                            />
                        }
                    </Col>

                    <Col span={10}>
                        <div className='container' style={{ textAlign: "right" }}>
                            <h2>{title}</h2>
                            <h5>{overview}</h5>
                            <h5 style={{ textAlign: 'left'}}> Cast</h5>
                            <ul >
                                {
                                    cast.map((item, idx) => (
                                        <li
                                            style={{ listStyleType: 'none', textAlign: 'left' }}
                                            key={`cast-elem-${idx.toString()}`}>
                                            {item.name}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </Col>
                </Card>
                <h2>Related films</h2>
                <Row type="flex" justify="space-around">
                { relatedFims.map( (movie, index) => (
                    <Col key={`relatedFilms-${index.toString()}`} xs={24} md={6}>
                        <Card
                        // onClick={() => this.viewMovieInfo(movie.id)}
                        cover= {movie.poster_path === null ?
                                <img
                                    src={"./../../../assets/no_img.png"}
                                    alt="Poster Image"
                                    // style={{ width: "100px", height: 360 }} />
                                    />
                                : <img
                                    src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                                    alt="Poster Image"
                                    // style={{ width: '100px'}}
                                />
                            }>
                        <Meta title={movie.title} />
                    </Card>
                </Col>
                ))}
                </Row>
            </div>


        )
    }
}
export default withRouter(MovieInfo);