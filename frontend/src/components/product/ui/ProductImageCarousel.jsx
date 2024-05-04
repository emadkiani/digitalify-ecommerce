import { Carousel, Image } from 'react-bootstrap'

const ProductImageCarousel = ({ productImages, productName }) => {
  return (
    <Carousel
      className='shadow-sm'
      data-bs-theme='dark'>
      {productImages.map((image, index) => (
        <Carousel.Item key={index}>
          <div className='wrapper'>
            <Image
              src={`${import.meta.env.VITE_PROXY}/images/${image.url}`}
              alt={productName}
              fluid
            />
            <div className='overlay opacity-small' />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductImageCarousel
