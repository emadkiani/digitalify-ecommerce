import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'

import { useGetFeaturedProductsQuery } from '../../tools/productsApiSlice'

const ProductCarousel = () => {
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
    <Carousel className='shadow-sm mb-5'>
      {products.map((product, index) => (
        <Carousel.Item key={index}>
          <Link to={`product/${product._id}`}>
            <div className='wrapper text-center py-3 px-3'>
              <Image
                style={{ height: '20rem' }}
                src={`${import.meta.env.VITE_PROXY}/images/${
                  product.images[0]?.url
                }`}
                alt={product.name}
                fluid
              />
              <div className='overlay opacity-25' />
            </div>
            <Carousel.Caption>
              <h3>{`${product.name} ($${product.price})`}</h3>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
