import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import axios from 'axios'
import ArticlesApi from '../modules/ArticlesApi'
import { Link } from 'react-router-dom'
import { Container, Card, Image, Grid, Item } from 'semantic-ui-react'

const Articles = () => {
  //const dispatch = useDispatch()
  const { articles } = useSelector((state) => state)

  // const fetchArticles = async () => {
  //   const response = await axios.get('api/articles')
  //   dispatch({ type: 'SET_ARTICLES', payload: response.data.articles })
  // }

  const displayArticles = (articles) => {
    let articlesArray = []
    Object.entries(articles).map((category) => {
      articlesArray.push(category[1])
    })
    return articlesArray.flat()
  }

  useEffect(() => {
    ArticlesApi.index()
    //fetchArticles()
  }, [])

  const articleList = displayArticles(articles).map((article) => {
    return (
      <div key={article.id} style={{ listStyleType: 'none' }}>
        <Grid columns={3} divided>
          <Grid.Column>
            <Container>
              <Link to={`/article/${article.id}`}>
                <div data-cy="head-lines">
                  <h5>{article.title}</h5>{' '}
                </div>
                <Image
                  src={article.image}
                  alt=""
                  size="small"
                  style={{ height: 100 + 'px', width: 'auto' }}
                />
              </Link>
            </Container>
          </Grid.Column>
        </Grid>
      </div>
    )
  })
  return (
    <Grid columns={3} divided>
      <div data-cy="articles-list">
        <Grid.Column>{articleList}</Grid.Column>
      </div>
    </Grid>
  )
}

export default Articles
