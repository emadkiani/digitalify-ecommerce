import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

import Meta from '../components/Meta'
import { useGetProductDetailsQuery } from '../tools/productsApiSlice'
import ProductDetails from '../components/product/ProductDetails'
import ProductImageCarousel from '../components/product/ui/ProductImageCarousel'
import ProductAction from '../components/product/ProductAction'

const ProductDetailsPage = () => {
  const { id } = useParams()
  const { data, isLoading, isError } = useGetProductDetailsQuery(id)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Something went wrong</p>
  }

  const product = data

  return (
    <>
      <Meta
        title={product.name}
        description={product.description}
        keywords={`${product.brand}, ${product.name}`}
      />
      <Row>
        <Col>
          <h1 className='mb-5'>{`${product.brand} ${product.name}`}</h1>
        </Col>
        <Col className='text-end'>
          <Link
            to='/products'
            className='btn btn-lg btn-light'>
            Go back
          </Link>
        </Col>
      </Row>
      <Row>
        <Col
          lg={5}
          md={6}
          sm={12}
          className='mb-3'>
          <ProductImageCarousel
            productImages={product.images}
            productName={product.name}
          />
        </Col>
        <Col
          lg={{ span: 3, order: 'last' }}
          md={6}
          sm={12}
          className='mb-3'>
          <ProductAction productDetails={product} />
        </Col>
        <Col
          lg={4}
          md={6}
          sm={12}
          className='mb-3'>
          <ProductDetails
            productCategory={product.category.name}
            productBrand={product.brand}
            productName={product.name}
            productDescription={product.description}
            productNumReviews={product.numReviews}
            productRating={product.rating}
          />
        </Col>
      </Row>
    </>
  )
}

export default ProductDetailsPage
