import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { LuClipboardList } from 'react-icons/lu'

import { useGetUserOrdersQuery } from '../../tools/ordersApiSlice'

const UserOrdersList = () => {
  const { data, isLoading, isError } = useGetUserOrdersQuery()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Something went wrong</p>
  }

  const orders = data

  if (orders.length <= 0) {
    return <p>Order list is empty</p>
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
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>DELIVERED</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={index}>
            <th>{order.createdAt.substring(0, 10)}</th>
            <th className='text-success'>${order.totalPrice.toFixed(2)}</th>
            <th className={order.isPaid ? 'text-success' : 'text-warning'}>
              {order.paymentResult}
            </th>
            <th className={order.isDelivered ? 'text-success' : 'text-warning'}>
              {order.shippingStatus}
            </th>
            <td>
              <Link
                className='btn btn-success btn-sm'
                to={`/profile/order/${order._id}`}>
                <LuClipboardList size={'1rem'} />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default UserOrdersList
