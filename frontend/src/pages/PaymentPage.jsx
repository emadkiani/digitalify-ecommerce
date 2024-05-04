import { Row, Col } from 'react-bootstrap'

import CheckoutProcess from '../components/CheckoutProcess'
import PaymentMethodForm from '../components/form/PaymentMethodForm'
import Meta from '../components/Meta'

const PaymentPage = () => {
  return (
    <>
      <Meta />
      <CheckoutProcess
        isSignedInPath={true}
        isShippingPath={true}
        isPaymentPath={true}
        isPlaceOrderPath={false}
      />
      <Row className='justify-content-center mt-5'>
        <Col
          sm={12}
          md={8}
          lg={6}>
          <h2 className='mb-3'>Payment Method</h2>
          <PaymentMethodForm />
        </Col>
      </Row>
    </>
  )
}

export default PaymentPage
