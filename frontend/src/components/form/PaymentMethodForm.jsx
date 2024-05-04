import { useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { savePaymentMethod } from '../../tools/cartSlice'

const PaymentMethodForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping')
    }
  }, [shippingAddress, navigate])

  const paymentMethodHandler = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const paymentMethod = formData.get('payment-method')

    dispatch(savePaymentMethod(paymentMethod))

    navigate('/placeorder')
  }

  return (
    <Form onSubmit={paymentMethodHandler}>
      <Form.Group
        className='mb-3'
        controlId='credit-card'>
        <Form.Label>Payment Method</Form.Label>
        <Form.Check
          className='mb-2'
          type='radio'
          label='Credit cart'
          name='payment-method'
          value='credit-card'
          id='credit-card'
          defaultChecked
        />
        <Form.Check
          type='radio'
          label='Pay cash'
          name='payment-method'
          value='pay-cash'
          id='pay-cash'
        />
      </Form.Group>
      <div className='text-end'>
        <Button
          variant='dark'
          type='submit'>
          Continue
        </Button>
      </div>
    </Form>
  )
}

export default PaymentMethodForm
