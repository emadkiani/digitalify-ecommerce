import { Link } from 'react-router-dom'
import { Col, Row, ListGroup, Image, Alert } from 'react-bootstrap'

const OrderDetails = ({
  user,
  shippingAddress,
  isDelivered,
  shippingStatus,
  isPaid,
  paymentResult,
  paymentMethod,
  orderItems,
}) => {
  return (
    <ListGroup variant='flush'>
      <ListGroup.Item>
        <h3 className='mb-3'>Shipping</h3>
        <p>
          <strong>Name: </strong>
          {user.name}
        </p>
        <p>
          <strong>E-Mail: </strong>
          {user.email}
        </p>
        <p>
          <strong>Address: </strong>
          {`${shippingAddress.fullAddress} ${shippingAddress.city} ${shippingAddress.postalCode} ${shippingAddress.country} ${shippingAddress.contact}`}
        </p>
        <Alert variant={isDelivered ? 'success' : 'warning'}>
          {shippingStatus}
        </Alert>
      </ListGroup.Item>

      <ListGroup.Item>
        <h3 className='mb-3'>Payment Method</h3>
        <p>
          <strong>Method: </strong>
          {paymentMethod}
        </p>
        <Alert variant={isPaid ? 'success' : 'warning'}>{paymentResult}</Alert>
      </ListGroup.Item>

      {orderItems.map((item, index) => (
        <ListGroup.Item key={index}>
          <Row>
            <Col
              className='mb-3'
              md={3}>
              <div className='wrapper shadow-sm'>
                <Image
                  src={`${import.meta.env.VITE_PROXY}/images/${item.imageUrl}`}
                  alt={item.name}
                  fluid
                  rounded
                />
                <div className='overlay opacity-small' />
              </div>
            </Col>
            <Col
              className='mb-3'
              md={5}>
              <Link
                to={`/product/${item.product}`}>{`${item.brand} ${item.name}`}</Link>
            </Col>
            <Col
              className='mb-3'
              md={4}>
              <p>{`${item.quantity}x $${item.price}`}</p>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default OrderDetails
