import React from 'react'
import Layout from './components/Layout/Layout'
import FoodSearch from './components/FoodSearch'
import FoodList from './components/FoodList'


const Top = () => {

  return (
    <Layout>
      <div>
        <FoodSearch />
        <FoodList />
      </div>
    </Layout>
  )
}

export default Top
