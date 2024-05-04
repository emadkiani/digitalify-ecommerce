import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { LuClipboardEdit } from 'react-icons/lu'

import { useGetOrdersQuery } from '../../tools/ordersApiSlice'

const OrdersList = () => {
  const { data, isLoading, isError } = useGetOrdersQuery()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Something went wrong</p>
  }

  const orders = data

  if (orders.length <= 0) {
    return <p>Order list is empty!</p>
  }

  return (
    <Table
      striped
      bordered
      hover
      responsive
      className='table-sm'>
      <thead>
        <tr>
          <th>ID</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>PAID AT</th>
          <th>DELIVERED</th>
          <th>DELIVERED AT</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={index}>
            <td>{order._id}</td>
            <td>{order.createdAt.substring(0, 10)}</td>
            <td>${order.totalPrice}</td>
            <td className={order.isPaid ? 'text-success' : 'text-warning'}>
              {order.paymentResult}
            </td>
            <td className={order.isPaid ? 'text-success' : 'text-warning'}>
              {order.isPaid ? order.paidAt.substring(0, 10) : 'Pending'}
            </td>
            <td className={order.isDelivered ? 'text-success' : 'text-warning'}>
              {order.shippingStatus}
            </td>
            <td className={order.isDelivered ? 'text-success' : 'text-warning'}>
              {order.isDelivered
                ? order.deliveredAt.substring(0, 10)
                : 'Pending'}
            </td>
            <td>
              <Link
                className='btn btn-success btn-sm'
                to={`/admin/order/${order._id}`}>
                <LuClipboardEdit size='1rem' />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default OrdersList
