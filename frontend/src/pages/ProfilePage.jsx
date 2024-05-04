import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import UserLogoutForm from '../components/user/form/UserLogoutForm'
import UserProfileForm from '../components/user/form/UserProfileForm'
import UserOrdersList from '../components/user/UserOrdersList'
import Meta from '../components/Meta'

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth)

  return (
    <>
      <Meta />
      <h1 className='mb-5'>Profile</h1>
      <Row className='justify-content-center'>
        <Col
          md={4}
          lg={3}>
          <UserProfileForm />
          <UserLogoutForm />
        </Col>
        <Col
          md={8}
          lg={9}>
          <UserOrdersList />
        </Col>
      </Row>
    </>
  )
}

export default ProfilePage
