import { ListGroup, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { usePaymentOrderMutation } from '../../tools/ordersApiSlice'
import LoadingButton from '../ui/LoadingButton'

const OrderUpdatePayment = ({ orderId, isPaid, refetch }) => {
  const [paymentOrder, { isLoading }] = usePaymentOrderMutation()

  const updatePaymentHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const message = formData.get('message')
    const isPaid = formData.get('is-paid') ? true : false

    try {
      await paymentOrder({ orderId, message, isPaid }).unwrap()
      refetch()
      toast.success('Order payment status updated')
    } catch (error) {
      toast.error(error.message || error?.data?.message)
    }
  }

  return (
    <ListGroup className='mt-3 shadow-sm'>
      <ListGroup.Item>
        <Form onSubmit={updatePaymentHandler}>
          <Form.Group
            controlId='message'
            className='mb-2'>
            <Form.Label>Payment information</Form.Label>
            <Form.Control
              name='message'
              autoComplete='on'
              size='sm'
              type='text'
              placeholder='Small text'
              required
            />
          </Form.Group>
          <Form.Check
            defaultChecked={isPaid}
            className='mb-2'
            type='checkbox'
            name='is-paid'
            id='is-paid'
            label='Mark as payed'
          />
          <div className='d-grid mb-2'>
            <LoadingButton
              variant='success'
              isLoading={isLoading}>
              Update Payment
            </LoadingButton>
          </div>
        </Form>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default OrderUpdatePayment
