import React, { Component } from 'react'
import { List } from 'antd'
import MovieCard from '../movie-card/movie-card'
import themovieDbService from '../../services/themoviedb-service.js'

const test = new themovieDbService()

test.getResource().then((b) => console.log('name:', b))

const data = Array.from({
  length: 23,
}).map((_, i) => ({
  title: `ant design part ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}))

export default class MovieList extends Component {
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <List
          itemLayout="horizontal"
          size="small"
          style={{ maxWidth: '950px', align: 'center' }}
          pagination={{
            onChange: (page) => {
              console.log(page)
            },
            pageSize: 6,
            position: 'bottom',
            align: 'center',
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <MovieCard item={item} />
            </List.Item>
          )}
          grid={{
            gutter: 3,
            xs: 1,
            sm: 4,
            md: 2,
            lg: 2,
            xl: 2,
            xxl: 3,
          }}
        />
      </div>
    )
  }
}
