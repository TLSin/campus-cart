import { Head, usePage, router } from '@inertiajs/react'
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
  imageUrl: string | null
}

export default function Home() {
  // const { dailyProducts, topProducts, feature } = usePage<PageProps>().props
  const [dailyProducts, setDailyProducts] = useState<Product[] | null>(null)
  const [topProducts, setTopProducts] = useState<Product[] | null>(null)
  const [feature, setFeature] = useState<Product[] | null>(null)
  const [loading, setLoading] = useState(true)

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
    return (<p className="text-center text-white mt-10">Loading products...</p>)
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
        <Category />
        {feature && feature.length > 0 && <Feature products={feature} />}
        {topProducts && topProducts.length > 0 && <TopProduct products={topProducts} />}
        {dailyProducts && dailyProducts && <DailyProduct products={dailyProducts} />}

        {/* footer */}
        <Footer />
      </div>
    </>
  )
}