import React from 'react'
import Navbar from '../components/Navbar'
import Header2 from '../components/Header2'
import Dashboard from '../components/Dashboard'
import Page2 from '../components/Page2'
import Page3 from '../components/Page3'


function Home() {
  return (
    <div>
        <Navbar/>
        <Header2/>
        <Page2/>
        <Page3/>
        {/* <Dashboard/> */}
    </div>
    
  )
}

export default Home