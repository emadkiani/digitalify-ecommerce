import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import ProductRating from './ui/ProductRating'
import ProductPrice from './ui/ProductPrice'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const navigateToProductPageHandler = () => {
    navigate(`/product/${product._id}`)
  }

  return (
    <Card
      onClick={navigateToProductPageHandler}
      className='cursor-pointer shadow-sm'>
      <Card.Img
        variant='top'
        src={`${import.meta.env.VITE_PROXY}/images/${product.images[0]?.url}`}
      />
      <Card.Body>
        <Card.Title className='product-cart-title'>{`${product.brand} ${product.name}`}</Card.Title>
        <Card.Text>
          <ProductRating
            numReviews={product.numReviews}
            rating={product.rating}
          />
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <ProductPrice
          countInStock={product.countInStock}
          price={product.price}
          salePrice={product.salePrice}
        />
      </Card.Footer>
    </Card>
  )
}

export default ProductCard
