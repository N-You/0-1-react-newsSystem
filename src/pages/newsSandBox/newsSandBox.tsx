import SideMenu from '@/commponents/layout/SideMenu/SideMenu'
import TopHeader from '@/commponents/layout/TopHeader/TopHeader'
import axios from 'axios'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

export default function newsSandBox() {
  // useEffect(() => {
  //   axios.get('/api/mmdb/movie/v3/list/hot.json?ct=%E5%B9%BF%E5%B7%9E&ci=20&channelId=4').then((res) => {
  //     console.log(res)
  //   })
  // }, [])
  return (
    <div>
      <SideMenu></SideMenu>
      <TopHeader></TopHeader>
      <Outlet></Outlet>
    </div>
  )
}
