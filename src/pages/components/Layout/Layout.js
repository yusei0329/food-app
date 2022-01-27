import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Grid from '@mui/material/Grid'
import Style from '../Styles/Layout.css'

const Layout = ({ children }) => {
  return (
    <div className={Style.footerFixed}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Header />
        {children}
        <Footer />
      </Grid>
    </div>
  )
}

export default Layout