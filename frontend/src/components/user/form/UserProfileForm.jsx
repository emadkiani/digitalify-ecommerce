import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Form } from 'react-bootstrap'

import { useUpdateProfileMutation } from '../../../tools/usersApiSlice'
import { setCredentials } from '../../../tools/authSlice'
import LoadingButton from '../../ui/LoadingButton'

const UserProfileForm = () => {
  const { userInfo } = useSelector((state) => state.auth)

  const [updateProfile, { isLoading }] = useUpdateProfileMutation()
  const dispatch = useDispatch()

  const updateUserProfileHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const user = {
      name: formData.get('name'),
      email: formData.get('email'),
    }

    try {
      const response = await updateProfile(user).unwrap()

      toast.success('Profile updated')

      dispatch(setCredentials({ ...response }))
    } catch (error) {
      toast.error(error?.data?.message || error.error || 'Something went wrong')
    }
  }

  return (
    <Form onSubmit={updateUserProfileHandler}>
      <Form.Group
        className='my-2'
        controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          size='sm'
          name='name'
          autoComplete='name'
          type='text'
          placeholder='John Dou'
          defaultValue={userInfo.name}
          required
        />
      </Form.Group>
      <Form.Group
        className='my-2'
        controlId='email'>
        <Form.Label>E-Mail</Form.Label>
        <Form.Control
          size='sm'
          name='email'
          autoComplete='email'
          type='email'
          placeholder='name@example.com'
          defaultValue={userInfo.email}
          required
        />
      </Form.Group>
      <div className='d-grid my-3'>
        <LoadingButton
          variant='primary'
          size='sm'
          isLoading={isLoading}>
          Submit
        </LoadingButton>
      </div>
    </Form>
  )
}

export default UserProfileForm
