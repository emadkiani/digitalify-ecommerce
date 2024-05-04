import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Col, Row, Form } from 'react-bootstrap'

import Meta from '../components/Meta'
import { useLoginMutation } from '../tools/usersApiSlice'
import { setCredentials } from '../tools/authSlice'
import LoadingButton from '../components/ui/LoadingButton'

const LoginPage = () => {
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

  const [login, { isLoading }] = useLoginMutation()

  const dipatch = useDispatch()

  const loginHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const user = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    try {
      const response = await login(user).unwrap()

      dipatch(setCredentials({ ...response }))
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
          <h1 className='mb-5'>Login</h1>
          <Form onSubmit={loginHandler}>
            <Form.Group
              className='mb-2'
              controlId='email'>
              <Form.Label>E-Mail</Form.Label>
              <Form.Control
                size='sm'
                name='email'
                autoComplete='email'
                placeholder='name@example.com'
                type='email'
                required
              />
            </Form.Group>
            <Form.Group
              className='mb-3'
              controlId='password'>
              <Form.Label>password</Form.Label>
              <Form.Control
                size='sm'
                name='password'
                autoComplete='current-password'
                type='password'
                required
              />
            </Form.Group>
            <div className='d-grid'>
              <LoadingButton
                variant='dark'
                isLoading={isLoading}>
                Login
              </LoadingButton>
            </div>
          </Form>
          <p className='mt-3'>
            New Customer?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              Register
            </Link>
          </p>
        </Col>
      </Row>
    </>
  )
}

export default LoginPage
