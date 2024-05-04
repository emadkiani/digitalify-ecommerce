import { Row, Col, ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { useCreateOrderMutation } from '../../tools/ordersApiSlice'
import { clearCartItems } from '../../tools/cartSlice'
import LoadingButton from '../ui/LoadingButton'

const PlaceOrderSummary = ({
  itemsPrice,
  shippingPrice,
  taxPrice,
  totalPrice,
  cartItems,
  shippingAddress,
  paymentMethod,
}) => {
  const [createOrder, { isLoading, isError, error }] = useCreateOrderMutation()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const placeOrderHandler = async (event) => {
    event.preventDefault()
    try {
      const response = await createOrder({
        orderItems: cartItems.map((item, index) => ({
          _id: item._id,
          quantity: item.quantity,
        })),
        shippingAddress,
        paymentMethod,
      }).unwrap()

      dispatch(clearCartItems())
      navigate(`/profile/order/${response._id}`)
    } catch (error) {
      toast.error(error?.data?.message || error.error || 'Something went wrong')
    }
  }

  return (
    <ListGroup className='shadow-sm'>
      <ListGroup.Item>
        <h2 className='my-1'>Order Summary</h2>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>Items:</Col>
          <Col>${itemsPrice}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>Shipping: </Col>
          <Col>${shippingPrice}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>Tax: </Col>
          <Col>${taxPrice}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>Total: </Col>
          <Col>${totalPrice}</Col>
        </Row>
      </ListGroup.Item>
      {isError && (
        <ListGroup.Item>
          <p className='text-danger my-1'>
            {error?.data?.message || error.error || 'Something went wrong'}
          </p>
        </ListGroup.Item>
      )}
      <ListGroup.Item>
        <form
          onSubmit={placeOrderHandler}
          className='d-grid my-2'>
          <LoadingButton
            variant='dark'
            isLoading={isLoading}>
            Place Order
          </LoadingButton>
        </form>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default PlaceOrderSummary
