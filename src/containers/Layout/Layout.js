import React, { PureComponent } from 'react';
import { Layout, Menu, Breadcrumb, Card, Col, Row, Pagination } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Searchbox from './../../components/Search/Search';
import MovieList from './../../components/MovieList/MovieList';
import MovieInfo from './../../components/MovieInfo/MovieInfo';
const { Header, Content, Footer } = Layout;


class LayoutPage extends PureComponent {

  componentDidMount() {
    const { getData } = this.props;
    getData();
  }



  render() {
    const { currentMovie, totalResults, handleSearch,
      handleOnChange, movies,
      closedMovieInfo, credits, nextPage,
      currentPage, viewMovieInfo, searchValue
    } = this.props;
    const numberPages = Math.floor(totalResults / 40);

    return (
      <Layout className="layout">
        <Header >
          {/* <div className="logo" >
        My movie database
          </div> */}
          <Menu className="container"
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            {/* <Menu.Item key="1"> <Link to="/">Home</Link></Menu.Item> */}
            <Menu.Item key="1" style= {{textDecoration: "none", fontWeight: "bold", fontSize: "18px"}} ><Link to="/">My movie DataBase</Link></Menu.Item>

            <Menu.Item key="3"> </Menu.Item>
            <Searchbox handleSearch={handleSearch} handleOnChange={handleOnChange} />
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          {!searchValue && <h1 style={{ textAlign: 'center'}}>Popular and Upcoming movies</h1>}
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            { currentMovie === null ?
              <div>
              {searchValue && <h1 style={{ textAlign: 'center'}}>Search results</h1>}
                <MovieList
                  viewMovieInfo={viewMovieInfo}
                  movies={movies}
                />
              </div>
              : <MovieInfo
                  currentMovie={currentMovie}
                  closeMovieInfo={closedMovieInfo}
                  credits={credits}
                />
            }

          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <Pagination
            total={totalResults}
            defaultPageSize={numberPages}
            onChange={nextPage}
            current={currentPage}
          />
        </Footer>
      </Layout>

    )
  }

}
export default LayoutPage;