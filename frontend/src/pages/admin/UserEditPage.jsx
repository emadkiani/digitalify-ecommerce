import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'

import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../tools/usersApiSlice'
import UserForm from '../../components/user/form/UserForm'
import AdminNav from '../../components/AdminNav'
import Meta from '../../components/Meta'

const UserEditPage = () => {
  const { id } = useParams()

  const [updateUser, { isLoading: isUpdateUserLoading }] =
    useUpdateUserMutation()

  const { data, isLoading, isError, refetch } = useGetUserDetailsQuery(id)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error</p>
  }

  if (!data) {
    return <p>No user found</p>
  }

  const user = data

  const updateUserHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const user = {
      _id: id,
      name: formData.get('name'),
      email: formData.get('email'),
      role: formData.get('role'),
    }

    try {
      const response = await updateUser(user).unwrap()
      toast.success('User updated')
      refetch()
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Something went wrong')
    }
  }

  return (
    <>
      <Meta />
      <AdminNav
        isCategoriesPath={false}
        isProductsPath={false}
        isUsersPath={true}
        isOrdersPath={false}
      />
      <Row className='justify-content-center'>
        <Col
          lg={4}
          md={6}
          sm={8}>
          <Row>
            <Col>
              <h3 className='mb-5'>User</h3>
            </Col>
            <Col className='text-end'>
              <Link
                to='/admin/users'
                className='btn btn-lg btn-light'>
                Go back
              </Link>
            </Col>
          </Row>
          <UserForm
            name={user.name}
            email={user.email}
            role={user.role}
            isLoading={isUpdateUserLoading}
            submitHandler={updateUserHandler}
          />
        </Col>
      </Row>
    </>
  )
}

export default UserEditPage
