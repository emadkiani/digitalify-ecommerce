import AdminNav from '../../components/AdminNav'
import OrderList from '../../components/order/OrderList'
import Meta from '../../components/Meta'

const OrderListPage = () => {
  return (
    <>
      <Meta />
      <AdminNav
        isCategoriesPath={false}
        isProductsPath={false}
        isUsersPath={false}
        isOrdersPath={true}
      />
      <h1 className='my-5'>Orders</h1>
      <OrderList />
    </>
  )
}

export default OrderListPage
