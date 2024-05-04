import { Col, Row, ListGroup } from 'react-bootstrap'

const OrderSummary = ({ itemsPrice, taxPrice, shippingPrice, totalPrice }) => {
  return (
    <ListGroup className='shadow-sm'>
      <ListGroup.Item>
        <h2 className='my-1'>Order Summary</h2>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>
            <strong>Items: </strong>
          </Col>
          <Col>${itemsPrice.toFixed(2)}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>
            <strong>Tax: </strong>
          </Col>
          <Col>${taxPrice.toFixed(2)}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>
            <strong>Shipping: </strong>
          </Col>
          <Col>${shippingPrice.toFixed(2)}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>
            <strong>Total: </strong>
          </Col>
          <Col>${totalPrice.toFixed(2)}</Col>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default OrderSummary
