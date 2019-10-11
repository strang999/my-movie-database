import React from 'react';
import axios from "axios";
import { Row, Col, Icon } from 'antd';
const MovieInfo = (props) => {



    return (
        <div className='container'>
       <Icon type="close"  onClick={props.closeMovieInfo} style={{cursor: "pointer, paddingTop: 50"}}/>
      <Col span={6}    > {props.currentMovie.poster_path = null ? <img src= {"./../../../assets/no_img.png"} alt = "Poster Image"  style={{ width: "100%", height: 360 }}/> : <img src= {`https://image.tmdb.org/t/p/w500${props.currentMovie.poster_path}`} alt = "Poster Image"   />} </Col>
        
            <Col  span={18}>
                
            <div className='container' style={{textAlign: "right"}}>
        <h2>{props.currentMovie.title}</h2>
        <h5>{props.currentMovie.overview}</h5>
        <h5>{props.currentMovie.release_date}</h5>
        <h5> {props.credits}</h5>
</div>
        </Col>
           </div>
        

    )
}
export default MovieInfo;