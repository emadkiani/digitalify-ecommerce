import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Form } from 'react-bootstrap'

import { logout } from '../../../tools/authSlice'
import { useLogoutMutation } from '../../../tools/usersApiSlice'
import LoadingButton from '../../ui/LoadingButton'

const UserLogoutForm = () => {
  const [logoutApiCall] = useLogoutMutation()
  const dispatch = useDispatch()

  const logOutHandler = async (event) => {
    event.preventDefault()

    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
    } catch (error) {
      toast.error(error?.data?.message || error.error || 'Something went wrong')
    }
  }

  return (
    <Form onSubmit={logOutHandler}>
      <div className='d-grid mb-5'>
        <LoadingButton
          variant='outline-danger'
          size='sm'
          isLoading={false}>
          Logout
        </LoadingButton>
      </div>
    </Form>
  )
}

export default UserLogoutForm
