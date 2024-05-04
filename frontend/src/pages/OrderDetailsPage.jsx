import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

import { useGetUserOrderDetailsQuery } from '../tools/ordersApiSlice'
import OrderSummary from '../components/order/OrderSummary'
import OrderDetails from '../components/order/OrderDetails'
import PayOrder from '../components/order/PayOrder'
import Meta from '../components/Meta'

const OrderDetailsPage = () => {
  const { id } = useParams()
  const { data, refetch, isLoading, isError } = useGetUserOrderDetailsQuery(id)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Something went wrong</p>
  }

  const order = data

  return (
    <>
      <Meta />
      <Row>
        <Col>
          <h1 className='mb-5'>Order</h1>
        </Col>
        <Col className='text-end'>
          <Link
            to='/profile'
            className='btn btn-lg btn-light'>
            Go back
          </Link>
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <OrderDetails
            user={order.user}
            shippingAddress={order.shippingAddress}
            isDelivered={order.isDelivered}
            shippingStatus={order.shippingStatus}
            isPaid={order.isPaid}
            paymentResult={order.paymentResult}
            paymentMethod={order.paymentMethod}
            orderItems={order.orderItems}
          />
        </Col>
        <Col lg={4}>
          <OrderSummary
            orderId={order._id}
            itemsPrice={order.itemsPrice}
            taxPrice={order.taxPrice}
            shippingPrice={order.shippingPrice}
            totalPrice={order.totalPrice}
          />
          {!order.isPaid && (
            <PayOrder
              orderId={order._id}
              refetch={refetch}
            />
          )}
        </Col>
      </Row>
    </>
  )
}

export default OrderDetailsPage
