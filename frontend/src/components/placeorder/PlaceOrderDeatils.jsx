import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image } from 'react-bootstrap'

const PlaceOrderDeatils = ({ shippingAddress, paymentMethod, cartItems }) => {
  return (
    <ListGroup variant='flush'>
      <ListGroup.Item>
        <h3 className='mb-3'>Shipping</h3>
        <p>
          <strong>Address: </strong>
          {`${shippingAddress.fullAddress}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}
        </p>
      </ListGroup.Item>

      <ListGroup.Item>
        <h3 className='mb-3'>Payment Method</h3>
        <p>
          <strong>Method: </strong>
          {paymentMethod}
        </p>
      </ListGroup.Item>

      <ListGroup.Item>
        <h3 className='mb-3'>Order Items</h3>
        {cartItems.length > 0 && (
          <ListGroup variant='flush'>
            {cartItems.map((item, index) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col
                    className='mb-3'
                    md={3}>
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
                    className='mb-3'
                    md={5}>
                    <Link to={`/product/${item._id}`}>
                      {`${item.brand} ${item.name}`}
                    </Link>
                  </Col>
                  <Col
                    className='mb-3'
                    md={4}>
                    {`${item.quantity}x $${item.salePrice.toFixed(2)}`}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </ListGroup.Item>
    </ListGroup>
  )
}

export default PlaceOrderDeatils
