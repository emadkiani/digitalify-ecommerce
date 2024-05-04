import { ListGroup } from 'react-bootstrap'

import ProductRating from './ui/ProductRating'

const ProductDetails = ({
  productCategory,
  productBrand,
  productName,
  productDescription,
  productNumReviews,
  productRating,
}) => {
  return (
    <ListGroup variant='flush'>
      <ListGroup.Item>{productCategory}</ListGroup.Item>
      <ListGroup.Item>{productBrand}</ListGroup.Item>
      <ListGroup.Item>{productName}</ListGroup.Item>
      <ListGroup.Item>
        <ProductRating
          rating={productRating}
          numReviews={productNumReviews}
        />
      </ListGroup.Item>
      <ListGroup.Item>{productDescription}</ListGroup.Item>
    </ListGroup>
  )
}

export default ProductDetails
