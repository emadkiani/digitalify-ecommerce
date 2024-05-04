import { ListGroup, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { usePayOrderMutation } from '../../tools/ordersApiSlice'
import LoadingButton from '../ui/LoadingButton'

const PayOrder = ({ orderId, refetch }) => {
  const [payOrder, { isLoading }] = usePayOrderMutation()

  const updatePaymentHandler = async (event) => {
    event.preventDefault()

    const data = {
      orderId,
    }

    try {
      await payOrder(data).unwrap()
      refetch()
      toast.success('Order shipping status updated!')
    } catch (error) {
      toast.error(error.message || error?.data?.message)
    }
  }

  return (
    <ListGroup className='mt-3 shadow-sm'>
      <ListGroup.Item>
        <Form onSubmit={updatePaymentHandler}>
          <div className='d-grid my-2'>
            <LoadingButton
              variant='success'
              isLoading={isLoading}>
              Pay by Credit Card
            </LoadingButton>
          </div>
        </Form>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default PayOrder
