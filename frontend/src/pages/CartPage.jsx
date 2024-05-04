import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'

import Meta from '../components/Meta'
import CartItems from '../components/cart/CartItems'
import CartAction from '../components/cart/CartAction'

const CartPage = () => {
  const cart = useSelector((state) => state.cart)
  const { totalPrice, taxPrice, shippingPrice, itemsPrice, cartItems } = cart

  return (
    <>
      <Meta />
      <Row>
        <Col>
          <h1 className='mb-5'>Cart</h1>
        </Col>
        <Col className='text-end'>
          <Link
            to='/products'
            className='btn btn-lg btn-light'>
            Go back
          </Link>
        </Col>
      </Row>
      {cartItems.length <= 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <Row>
          <Col lg={8}>
            <CartItems cartItems={cartItems} />
          </Col>
          <Col
            lg={4}
            className='mb-3'>
            <CartAction
              itemsPrice={itemsPrice}
              taxPrice={taxPrice}
              shippingPrice={shippingPrice}
              totalPrice={totalPrice}
              cartItems={cartItems}
            />
          </Col>
        </Row>
      )}
    </>
  )
}

export default CartPage
