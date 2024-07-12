import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import MovieList from './components/movie-list'
import { Offline, Online } from 'react-detect-offline'
import { Alert, Form, Input } from 'antd'
import themovieDbService from './services/themoviedb-service.js'
import { debounce } from 'lodash'
import { Space, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

class App extends Component {
  movieService = new themovieDbService()

  state = {
    movies: [],
    totalResult: 1,
    query: '',
    loading: false,
  }

  handlePageChange = async (page) => {
    try {
      this.setState({ loading: false })
      const query = this.state.query
      console.log(query)
      const movies = await this.movieService.getResource(query, page).then((data) => {
        return data.results
      })
      this.setState({ movies, loading: false })
    } catch (error) {
      this.setState({ loading: false })
      console.error(error)
    }
  }

  debouncedSearch = debounce(async (query) => {
    try {
      const movies = await this.movieService.getResource(query).then((data) => {
        return data.results
      })
      const totalResult = await this.movieService.getResource(query).then((data) => {
        return data.total_results
      })
      this.setState({ movies, totalResult, query })
    } catch (error) {
      console.error(error)
    }
  }, 1000)

  handleSearch = (value) => {
    this.debouncedSearch(value)
  }

  render() {
    return (
      <div>
        <Online>
          <Form
            name="trigger"
            style={{
              maxWidth: 920,
              margin: 'auto',
            }}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              hasFeedback
              label="Search"
              name="field_b"
              validateDebounce={1000}
              onChange={(e) => {
                // this.handleSearch1(e)
                this.handleSearch(e.target.value)
              }}
              rules={[
                {
                  min: 3,
                },
              ]}
            >
              <Input placeholder="Validate required debounce after 1s" />
            </Form.Item>
          </Form>

          {this.state.loading && (
            <Space style={{ height: '219px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Spin indicator={<LoadingOutlined style={{ color: 'grey' }} spin />} size="large" />
            </Space>
          )}

          <MovieList
            movies={this.state.movies}
            totalResult={this.state.totalResult}
            query={this.state.query}
            handlePageChange={this.handlePageChange}
          />
        </Online>
        <Offline>
          <div>Отсутствует подключение к интернету. Пожалуйста, проверьте ваше подключение и попробуйте снова.</div>
        </Offline>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
