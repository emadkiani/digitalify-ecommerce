import AdminNav from '../../components/AdminNav'
import UserList from '../../components/user/UserList'
import Meta from '../../components/Meta'

const UserListPage = () => {
  return (
    <>
      <Meta />
      <AdminNav
        isCategoriesPath={false}
        isProductsPath={false}
        isUsersPath={true}
        isOrdersPath={false}
      />
      <h1 className='my-5'>Users</h1>
      <UserList />
    </>
  )
}

export default UserListPage
