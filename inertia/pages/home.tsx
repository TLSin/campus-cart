import { Head } from '@inertiajs/react'
import Slider from "./components/slider"
import Navigation from './components/navBar'
import Footer from "./components/footer"
import Feature from './components/feature'
import TopProduct from './components/topProduct'
import DailyProduct from './components/dailyProduct'
import Category from './components/category'

export default function Home() {
  return (
    <>
      {/* 
        Note: Settings here are for screen size 1280 * 1024
        TODO: Modify it for screen size 1920 * 1080 
        */}
      <Head title="Homepage" />
      {/* whole screen */}
      <div className="w-screen h-screen bg-[#8698BC] overflow-x-hidden">

        {/* navigation bar */}
        <Navigation />

        {/* carousel */}
        <Slider />

        {/* showcase */}
        <Category />
        <Feature />
        <TopProduct />
        <DailyProduct />

        {/* footer */}
        <Footer />
      </div>
    </>
  )
}