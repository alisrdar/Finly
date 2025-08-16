import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'

const Home = () => {
  return (
    <div className='text-2xl text-black'>
      <DashboardLayout activeMenu={"dashboard"}>
        <div className='my-5 mx-auto'>
        </div>
      </DashboardLayout>
    </div>
  )
}

export default Home
