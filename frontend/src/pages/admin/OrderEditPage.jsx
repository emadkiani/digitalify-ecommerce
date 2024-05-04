import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

import { useGetOrderDetailsQuery } from '../../tools/ordersApiSlice'
import OrderSummary from '../../components/order/OrderSummary'
import OrderDetails from '../../components/order/OrderDetails'
import OrderUpdatePayment from '../../components/order/OrderUpdatePayment'
import OrderUpdateShipping from '../../components/order/OrderUpdateShipping'
import AdminNav from '../../components/AdminNav'
import Meta from '../../components/Meta'

const OrderEditPage = () => {
  const { id } = useParams()
  const { data, refetch, isLoading, isError } = useGetOrderDetailsQuery(id)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Something went wrong</p>
  }

  const order = data

  if (!order) {
    return <p>No order found</p>
  }

  return (
    <>
      <Meta />
      <AdminNav
        isCategoriesPath={false}
        isProductsPath={false}
        isUsersPath={false}
        isOrdersPath={true}
      />
      <Row>
        <Col>
          <h1 className='mb-5'>Order</h1>
        </Col>
        <Col className='text-end'>
          <Link
            to='/admin/orders'
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
          <OrderUpdatePayment
            orderId={order._id}
            isPaid={order.isPaid}
            refetch={refetch}
          />
          <OrderUpdateShipping
            orderId={order._id}
            isDelivered={order.isDelivered}
            refetch={refetch}
          />
        </Col>
      </Row>
    </>
  )
}

export default OrderEditPage
