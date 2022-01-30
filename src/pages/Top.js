import React from 'react'
import Layout from './components/Layout/Layout'
import FoodSearch from './components/FoodSearch'
import FoodList from './components/FoodList'
import Hero from './components/Hero/Hero'
import View from './components/View/View'
import { Grid } from '@mui/material'

const Top = () => {
  return (
    <Layout>
      <Hero />
      <div>
        <Grid
          container 
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <FoodSearch />
          <FoodList />
        </Grid>
      </div>
      <View />
    </Layout>
  )
}

export default Top
