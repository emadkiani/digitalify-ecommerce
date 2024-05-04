import { Form } from 'react-bootstrap'
import LoadingButton from '../../ui/LoadingButton'

const CategoryForm = ({ name, categoryFromHandler, isLoading }) => {
  return (
    <Form onSubmit={categoryFromHandler}>
      <Form.Group
        controlId='name'
        className='mb-3'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          size='sm'
          name='name'
          type='text'
          placeholder='Name'
          autoComplete='on'
          defaultValue={name}
          required
        />
      </Form.Group>
      <div className='text-end'>
        <LoadingButton
          variant='dark'
          isLoading={isLoading}>
          Submit
        </LoadingButton>
      </div>
    </Form>
  )
}

export default CategoryForm
