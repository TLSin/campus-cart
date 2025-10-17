import { Head, router } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import Slider from "./components/slider"
import Navigation from './components/navBar'
import Footer from "./components/footer"
import Feature from './components/feature'
import TopProduct from './components/topProduct'
import DailyProduct from './components/dailyProduct'
import Category from './components/category'

interface Product {
  productId: number
  productName: string
  productPrice: number
  imgUrl: string | null
}

export default function Home() {
  const [dailyProducts, setDailyProducts] = useState<Product[] | null>(null)
  const [topProducts, setTopProducts] = useState<Product[] | null>(null)
  const [feature, setFeature] = useState<Product[] | null>(null)
  const [loading, setLoading] = useState(true)

  // UseEffect for fetching the data into database
  useEffect(() => {
    // Fetch products data dynamically
    router.get('/home', {}, {
      preserveState: true,
      onSuccess: page => {
        setDailyProducts(page.props.dailyProducts || [])
        setTopProducts(page.props.topProducts || [])
        setFeature(page.props.feature || [])
        setLoading(false)
      },
      onError: () => setLoading(false),
    })
  }, [])


  if (loading) {
    return (
      <div className="flex-col gap-4 w-full flex items-center justify-center w-screen h-screen bg-white">
        <div
          className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
        >
          <div
            className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
          ></div>
        </div>
      </div>
      )
  }

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
        <div>
          <Category />
          {feature && feature.length > 0 && <Feature products={feature} />}
          {topProducts && topProducts.length > 0 && <TopProduct products={topProducts} />}
          {dailyProducts && dailyProducts && <DailyProduct products={dailyProducts} />}
        </div>

        {/* footer */}
        <Footer />
      </div>
    </>
  )
}