import { Row, Col } from 'react-bootstrap'

import { useGetFeaturedProductsQuery } from '../tools/productsApiSlice'
import ProductCard from '../components/product/ProductCard'
import ProductCarousel from '../components/product/ProductCarousel'
import Meta from '../components/Meta'

const HomePage = () => {
  const { data, isLoading, isError } = useGetFeaturedProductsQuery()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Something went wrong</p>
  }

  if (data.length <= 0) {
    return <p>No featured products found</p>
  }

  const products = data

  return (
    <>
      <Meta />
      <ProductCarousel />
      <h1 className='mb-5'>Featured products</h1>
      <Row>
        {products.map((product, index) => (
          <Col
            key={index}
            sm={12}
            md={6}
            lg={4}
            xl={3}
            className='pb-3'>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomePage
