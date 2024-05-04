import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ListGroup, Button, Form } from 'react-bootstrap'

import ProductPrice from './ui/ProductPrice'
import { addToCart } from '../../tools/cartSlice'

const ProductAction = ({ productDetails }) => {
  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addToCartHandler = () => {
    dispatch(addToCart({ ...productDetails, quantity }))
    navigate('/cart')
  }

  return (
    <ListGroup className='shadow-sm'>
      <ListGroup.Item>
        <ProductPrice
          countInStock={productDetails.countInStock}
          price={productDetails.price}
          salePrice={productDetails.salePrice}
        />
      </ListGroup.Item>
      {productDetails.countInStock > 0 ? (
        <>
          <ListGroup.Item>
            <Form.Select
              aria-label='Default select example'
              onChange={(event) => setQuantity(Number(event.target.value))}
              value={quantity}
              name='quantity'>
              {[...Array(productDetails.countInStock).keys()].map((qty) => (
                <option
                  key={qty + 1}
                  value={qty + 1}>
                  {qty + 1}
                </option>
              ))}
            </Form.Select>
          </ListGroup.Item>
          <ListGroup.Item className='d-grid'>
            <Button
              type='button'
              onClick={addToCartHandler}
              variant='dark'
              className='my-1'>
              Add to Card
            </Button>
          </ListGroup.Item>
        </>
      ) : null}
    </ListGroup>
  )
}

export default ProductAction
