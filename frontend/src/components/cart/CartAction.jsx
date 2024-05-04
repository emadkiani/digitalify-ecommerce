import { useNavigate } from 'react-router-dom'
import { ListGroup, Button, Row, Col } from 'react-bootstrap'

const CartAction = ({
  cartItems,
  itemsPrice,
  taxPrice,
  shippingPrice,
  totalPrice,
}) => {
  const navigate = useNavigate()
  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  return (
    <ListGroup className='shadow-sm'>
      <ListGroup.Item>
        <h2 className='my-1'>Cart Summary</h2>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>
            <strong>Subtotal: </strong>
          </Col>
          <Col>
            {`${cartItems.reduce((acc, item) => acc + item.quantity, 0)} items`}
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>
            <strong>Items: </strong>
          </Col>
          <Col>{`$${itemsPrice}`}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>
            <strong>Tax: </strong>
          </Col>
          <Col>{`$${taxPrice}`}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>
            <strong>Shipping: </strong>
          </Col>
          <Col>{`$${shippingPrice}`}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>
            <strong>Total: </strong>
          </Col>
          <Col>{`$${totalPrice}`}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <div className='d-grid'>
          <Button
            type='button'
            className='my-1'
            onClick={checkoutHandler}
            variant='dark'>
            Procced to Checkout
          </Button>
        </div>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default CartAction
