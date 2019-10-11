import React from 'react';
import { Card, Col } from 'antd';
const { Meta } = Card;


const Movie = (props) => {


    
    return (
        
            <Col span={6}>
                <Card
                    hoverable
                    onClick={()=> props.viewMovieInfo(props.movieId)}
                    style={{ width: 250 }}
                    cover={<img alt={props.title} src={`https://image.tmdb.org/t/p/w185${props.image}`} />}
                    // cover={props.image == null ? <img src={"./../../../assets/no_img.png"} style={{ width:"100%", height: 360 }} : <img src={`https://image.tmdb.org/t/p/w185${props.image}`} alt={props.title} />}

                    key={props.id}
                >
                    <Meta title={props.title } description={props.overview} />
                </Card>
            </Col>
       
    )

}
export default Movie;