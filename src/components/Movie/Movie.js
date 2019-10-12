import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Col } from 'antd';
const { Meta } = Card;

class Movie extends PureComponent {
    viewInfo = (movieId) => {
        const { history, viewMovieInfo } = this.props;
        viewMovieInfo(movieId);
        history.push(`/movies/${movieId}`);
    }

    render() {
        const { movieId, image, title, id, overview } = this.props;
        return (
            <Col sm={24} md={6}>
                <Card
                    hoverable
                    onClick={() => this.viewInfo(movieId)}
                    style={{ width: 250 }}
                    cover={<img alt={title} src={`https://image.tmdb.org/t/p/w185${image}`} />}
                    key={id}
                >
                    <Meta title={title} description={overview} />
                </Card>
            </Col>

        )
    }
}
export default withRouter(Movie);