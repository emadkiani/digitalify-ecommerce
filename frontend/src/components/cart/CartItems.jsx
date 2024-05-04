import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button } from 'react-bootstrap'
import { LuTrash2 } from 'react-icons/lu'

import { addToCart, removeFromCart } from '../../tools/cartSlice'

const CartItems = ({ cartItems }) => {
  const dispatch = useDispatch()
  const addToCartHandler = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }))
  }

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId))
  }

  return (
    <ListGroup
      variant='flush'
      className='mb-3'>
      {cartItems.map((item, index) => (
        <ListGroup.Item key={index}>
          <Row>
            <Col
              sm={2}
              className='mb-3'>
              <div className='wrapper shadow-sm'>
                <Image
                  src={`${import.meta.env.VITE_PROXY}/images/${
                    item.images[0]?.url
                  }`}
                  alt={item.name}
                  fluid
                  rounded
                />
                <div className='overlay opacity-small' />
              </div>
            </Col>
            <Col
              sm={3}
              className='mb-3'>
              <Link to={`/product/${item._id}`}>
                {item.brand + ' ' + item.name}
              </Link>
            </Col>
            <Col
              sm={3}
              className='mb-3'>
              {item.quantity + 'x $' + item.salePrice.toFixed(2)}
            </Col>
            <Col
              sm={3}
              className='mb-3'>
              <Form.Select
                onChange={(event) =>
                  addToCartHandler(item, Number(event.target.value))
                }
                value={item.quantity}
                name='quantity'>
                {[...Array(item.countInStock).keys()].map((qty) => (
                  <option
                    key={qty + 1}
                    value={qty + 1}>
                    {qty + 1}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col sm={1}>
              <Button
                type='button'
                onClick={() => removeFromCartHandler(item._id)}
                variant='light'>
                <LuTrash2 size={'1rem'} />
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default CartItems
