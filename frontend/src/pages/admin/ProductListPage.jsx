import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import AdminNav from '../../components/AdminNav'
import ProductList from '../../components/product/ProductList'
import Meta from '../../components/Meta'

const ProductListPage = () => {
  return (
    <>
      <Meta />
      <AdminNav
        isCategoriesPath={false}
        isProductsPath={true}
        isUsersPath={false}
        isOrdersPath={false}
      />
      <Row className='my-5'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Link
            to='/admin/product/new'
            className='btn btn-lg btn-primary'>
            Create
          </Link>
        </Col>
      </Row>
      <Row>
        <ProductList />
      </Row>
    </>
  )
}

export default ProductListPage
