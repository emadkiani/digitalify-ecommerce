import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Col, Row, Form } from 'react-bootstrap'

import LoadingButton from '../components/ui/LoadingButton'
import Meta from '../components/Meta'
import { useRegisterMutation } from '../tools/usersApiSlice'
import { setCredentials } from '../tools/authSlice'

const RegisterPage = () => {
  const { userInfo } = useSelector((state) => state.auth)

  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const redirect = searchParams.get('redirect') || '/'

  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const [register, { isLoading }] = useRegisterMutation()

  const dispatch = useDispatch()

  const registerHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const user = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    }

    try {
      const response = await register(user).unwrap()

      dispatch(setCredentials({ ...response }))
      navigate(redirect)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <>
      <Meta />
      <Row className='justify-content-center'>
        <Col
          sm={8}
          md={6}
          lg={4}>
          <h1 className='mb-5'>Register</h1>
          <Form onSubmit={registerHandler}>
            <Form.Group
              className='mb-2'
              controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                size='sm'
                name='name'
                autoComplete='name'
                type='text'
                placeholder='John Dou'
                required
              />
            </Form.Group>
            <Form.Group
              className='mb-2'
              controlId='email'>
              <Form.Label>E-Mail</Form.Label>
              <Form.Control
                size='sm'
                name='email'
                autoComplete='email'
                type='email'
                placeholder='name@example.com'
                required
              />
            </Form.Group>
            <Form.Group
              className='mb-3'
              controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                size='sm'
                name='password'
                autoComplete='new-password'
                type='password'
                required
              />
            </Form.Group>
            <div className='d-grid'>
              <LoadingButton
                variant='dark'
                isLoading={isLoading}>
                Register
              </LoadingButton>
            </div>
          </Form>
          <p className='mt-3'>
            Already have an account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </p>
        </Col>
      </Row>
    </>
  )
}

export default RegisterPage
