import React from "react";

import { Card, Col, Row, Input } from 'antd';

const { Meta } = Card;
const { Search } = Input;

const Searchbox = (props) => {
    
        return (
           <React.Fragment>
                <Search
                    placeholder="input the movie title here..."
                    onSearch={props.handleSearch}
                    onChange={props.handleOnChange}
                    
                    // event => this.handleOnChange(event)
                    enterButton="Search"
                    size="large"
                    style={{ width: 400,position: 'relative', display: "flex", float: "right", top: "10px"}}
                    

                />
                </React.Fragment> 
            //  {this.state.searchValue ? (
            //         <Row gutter={48}>
            //             {this.state.movies.map((movie, id) =>
            //                 (
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
                            


            //                 )
            //             )}
            //             </Row>

                  

            //     ) : (<p>Please etrer here...</p>
            //         )

            //     }
         
        )
    
}
export default Searchbox;




