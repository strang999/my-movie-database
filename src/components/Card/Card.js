// import React, {Component} from 'react';
// import axios from 'axios';
// import { Card, Col, Row } from 'antd';
// const { Meta } = Card;

// class Cards extends Component{
//     state = {
//         movies: [],
//         searchResults: null
//     }
//     componentDidMount() {
//         axios.get('https://api.themoviedb.org/3/trending/all/week?api_key=9dd57bdcf58f9d7ad02cd4e2a9d0fc22')
//             .then(res => {
//                 // const data = res.data.slice();
    
//                 this.setState({ movies: res.data.results });
//                 console.log(res.data.results);
//             })
    
    
//             .catch(error => {
//                 console.log(error);
//                 // this.setState({ error: true })
//             });
//     }
//     render() {
//         // let moviesData = <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}> Something went wrong!</p>
//         // if (!this.state.error) {
//         const urlPoster = 'https://image.tmdb.org/t/p/w500';
//         let movies = this.state.movies.map(movie => {
//             return (
               
//                     <Col span={8}>
//                         <Card
//                             hoverable
//                             style={{ width: 250 }}
//                             cover={<img alt={movie.title} src={urlPoster + movie.poster_path} />}
//                             key={movie.id}
//                         >
//                             <Meta title={movie.title || movie.original_title} description={movie.overview} />
//                         </Card>
//                     </Col>
              
    
//             )
//             // <Card
//             //     title={movie.title}
//             //     key={movie.id}
//             //     overview={movie.overview}
    
//             //     // clicked={() => this.postSelecedHandler(data.id)}
//             // />;
    
    
//         });
    
//         return (
//             <Row type="flex"> {movies}</Row>
//         )
// }


// }


// export default Cards;