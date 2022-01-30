import React from 'react'
import Layout from './components/Layout/Layout'
import FoodSearch from './components/FoodSearch'
import FoodList from './components/FoodList'
import Hero from './components/Hero/Hero'
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
    </Layout>
  )
}

export default Top
