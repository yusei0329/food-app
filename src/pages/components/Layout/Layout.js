import React from 'react'
import Header from '../Header/Header'
import Grid from '@mui/material/Grid'
import Style from '../Styles/Layout.css'

const Layout = ({ children }) => {
  return (
    <div className={Style.footerFixed}>
      <Grid
        container
        spacing={4}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Header />
        {children}
      </Grid>
    </div>
  )
}

export default Layout
