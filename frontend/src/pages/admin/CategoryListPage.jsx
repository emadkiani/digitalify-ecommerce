import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import AdminNav from '../../components/AdminNav'
import CategoryList from '../../components/category/CategoryList'
import Meta from '../../components/Meta'

const CategoryListPage = () => {
  return (
    <>
      <Meta />
      <AdminNav
        isCategoriesPath={true}
        isProductsPath={false}
        isUsersPath={false}
        isOrdersPath={false}
      />
      <Row className='mb-5'>
        <Col>
          <h1>Categories</h1>
        </Col>
        <Col className='text-end'>
          <Link
            to='/admin/category/new'
            className='btn btn-lg btn-primary'>
            Create
          </Link>
        </Col>
      </Row>
      <Row>
        <CategoryList />
      </Row>
    </>
  )
}

export default CategoryListPage
