import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import ShippingAddressForm from '../components/form/ShippingAddressForm'
import CheckoutProcess from '../components/CheckoutProcess'
import Meta from '../components/Meta'
import { saveShippingAddress } from '../tools/cartSlice'

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const shippingAddressFormHandler = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    dispatch(
      saveShippingAddress({
        contact: formData.get('contact'),
        fullAddress: formData.get('full-address'),
        city: formData.get('city'),
        postalCode: formData.get('postal-code'),
        country: formData.get('country'),
      })
    )

    navigate('/payment')
  }

  return (
    <>
      <Meta />
      <CheckoutProcess
        isSignedInPath={true}
        isShippingPath={true}
        isPaymentPath={false}
        isPlaceOrderPath={false}
      />
      <Row className='justify-content-center'>
        <Col
          sm={12}
          md={8}
          lg={6}>
          <h2 className='mb-3'>Shipping</h2>
          <ShippingAddressForm
            userContact={shippingAddress.contact}
            userFullAddress={shippingAddress.fullAddress}
            userCity={shippingAddress.city}
            userPostalCode={shippingAddress.postalCode}
            userCountry={shippingAddress.country}
            shippingAddressFormHandler={shippingAddressFormHandler}
          />
        </Col>
      </Row>
    </>
  )
}

export default ShippingPage
