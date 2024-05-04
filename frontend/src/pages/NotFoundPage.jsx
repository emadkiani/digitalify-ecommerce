import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Meta from '../components/Meta'

const NotFound = () => {
  return (
    <>
      <Meta />
      <Row className='justify-content-md-center'>
        <Col md='auto'>
          <h1 className='mb-5'>404 - Not Found</h1>
          <p className='mb-3'>
            Sorry, the page you are looking for does not exist.
          </p>
          <Link
            className='btn btn-bg btn-dark'
            to='/'>
            Back to safety
          </Link>
        </Col>
      </Row>
    </>
  )
}

export default NotFound
