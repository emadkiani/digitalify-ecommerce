import { useNavigate } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

const CheckoutProcess = ({
  isSignedInPath,
  isShippingPath,
  isPaymentPath,
  isPlaceOrderPath,
}) => {
  const navigate = useNavigate()

  const navigateHandler = (path) => {
    navigate(path)
  }

  return (
    <Nav className='justify-content-center mb-5'>
      <Nav.Item>
        <Nav.Link
          onClick={() => navigateHandler('/profile')}
          disabled={!isSignedInPath}>
          Signed In
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={() => navigateHandler('/shipping')}
          disabled={!isShippingPath}>
          Shipping
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={() => navigateHandler('/payment')}
          disabled={!isPaymentPath}>
          Payment
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={() => navigateHandler('/placeorder')}
          disabled={!isPlaceOrderPath}>
          Place Order
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutProcess
