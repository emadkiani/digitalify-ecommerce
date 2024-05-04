import { useNavigate } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

const AdminNav = ({
  isCategoriesPath,
  isProductsPath,
  isUsersPath,
  isOrdersPath,
}) => {
  const navigate = useNavigate()

  const navigateHandler = (path) => {
    navigate(path)
  }

  return (
    <Nav className='justify-content-center mb-5'>
      <Nav.Item>
        <Nav.Link
          onClick={() => navigateHandler('/admin/orders')}
          disabled={isOrdersPath}>
          Orders
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={() => navigateHandler('/admin/users')}
          disabled={isUsersPath}>
          Users
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={() => navigateHandler('/admin/categories')}
          disabled={isCategoriesPath}>
          Categories
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={() => navigateHandler('/admin/products')}
          disabled={isProductsPath}>
          Products
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default AdminNav
