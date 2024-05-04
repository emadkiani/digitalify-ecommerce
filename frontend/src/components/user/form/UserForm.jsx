import { Form } from 'react-bootstrap'
import LoadingButton from '../../ui/LoadingButton'

const UserForm = ({ name, email, role, isLoading, submitHandler }) => {
  return (
    <Form onSubmit={submitHandler}>
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
          defaultValue={name}
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
          defaultValue={email}
          required
        />
      </Form.Group>
      <Form.Group
        className='mb-3'
        controlId='role'>
        <Form.Label>Role</Form.Label>
        <Form.Select
          size='sm'
          name='role'
          defaultValue={role}>
          <option value='user'>User</option>
          <option value='admin'>Admin</option>
        </Form.Select>
      </Form.Group>
      <div className='d-grid'>
        <LoadingButton
          variant='dark'
          isLoading={isLoading}>
          Submit
        </LoadingButton>
      </div>
    </Form>
  )
}

export default UserForm
