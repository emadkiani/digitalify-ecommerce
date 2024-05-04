import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import Meta from '../components/Meta'
import CheckoutProcess from '../components/CheckoutProcess'
import PlaceOrderDeatils from '../components/placeorder/PlaceOrderDeatils'
import PlaceOrderSummary from '../components/placeorder/PlaceOrderSummary'

const PlaceOrderPage = () => {
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    if (!cart?.shippingAddress) {
      navigate('/shipping')
    }

    if (!cart?.paymentMethod) {
      navigate('/payment')
    }
  }, [navigate, cart?.paymentMethod, cart?.shippingAddress])

  return (
    <>
      <Meta />
      <CheckoutProcess
        isSignedInPath={true}
        isShippingPath={true}
        isPaymentPath={true}
        isPlaceOrderPath={true}
      />
      <Row className='justify-content-center'>
        <Col lg={8}>
          <PlaceOrderDeatils
            shippingAddress={cart.shippingAddress}
            paymentMethod={cart.paymentMethod}
            cartItems={cart.cartItems}
          />
        </Col>
        <Col lg={4}>
          <PlaceOrderSummary
            cartItems={cart.cartItems}
            shippingAddress={cart.shippingAddress}
            paymentMethod={cart.paymentMethod}
            itemsPrice={cart.itemsPrice}
            taxPrice={cart.taxPrice}
            shippingPrice={cart.shippingPrice}
            totalPrice={cart.totalPrice}
          />
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderPage
