import { ListGroup, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { useShippingOrderMutation } from '../../tools/ordersApiSlice'
import LoadingButton from '../ui/LoadingButton'

const OrderUpdateShipping = ({ orderId, isDelivered, refetch }) => {
  const [shippingOrder, { isLoading }] = useShippingOrderMutation()

  const updateShippingHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const message = formData.get('message')
    const isDelivered = formData.get('is-delivered') ? true : false

    try {
      await shippingOrder({ orderId, message, isDelivered }).unwrap()
      refetch()
      toast.success('Order shipping status updated')
    } catch (error) {
      toast.error(error.message || error?.data?.message)
    }
  }

  return (
    <ListGroup className='mt-3 shadow-sm'>
      <ListGroup.Item>
        <Form onSubmit={updateShippingHandler}>
          <Form.Group
            controlId='message'
            className='mb-2'>
            <Form.Label>Shipping information</Form.Label>
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
            className='mb-2'
            defaultChecked={isDelivered}
            type='checkbox'
            name='is-delivered'
            id='is-delivered'
            label='Mark as delivered'
          />
          <div className='d-grid mb-2'>
            <LoadingButton
              variant='primary'
              isLoading={isLoading}>
              Update Shipping
            </LoadingButton>
          </div>
        </Form>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default OrderUpdateShipping
