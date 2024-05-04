import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Nav, Navbar, Badge } from 'react-bootstrap'
import SearchBox from './SearchBox'

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)

  const navigate = useNavigate()

  const navigateHandler = (path) => {
    navigate(path)
  }

  return (
    <Navbar
      expand='lg'
      bg='dark'
      data-bs-theme='dark'>
      <Container className='my-1'>
        <Navbar.Brand onClick={() => navigateHandler('/')}>
          Digitalify
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            navbarScroll>
            <Nav.Link onClick={() => navigateHandler('/products')}>
              Products
            </Nav.Link>
            <Nav.Link onClick={() => navigateHandler('/cart')}>
              Cart
              {cartItems.length > 0 && (
                <Badge
                  className='mx-1'
                  pill
                  bg='primary'>
                  {cartItems.reduce((acc, itm) => acc + itm.quantity, 0)}
                </Badge>
              )}
            </Nav.Link>
            {userInfo ? (
              <Nav.Link onClick={() => navigateHandler('/profile')}>
                {userInfo.name}
              </Nav.Link>
            ) : (
              <Nav.Link onClick={() => navigateHandler('/login')}>
                Login
              </Nav.Link>
            )}
            {userInfo?.role === 'admin' && (
              <Nav.Link onClick={() => navigateHandler('/admin/orders')}>
                Admin Panel
              </Nav.Link>
            )}
          </Nav>
          <SearchBox />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
