import { Form, Button, Row, Col } from 'react-bootstrap'

const ShippingAddressForm = ({
  userContact,
  userFullAddress,
  userCity,
  userPostalCode,
  userCountry,
  shippingAddressFormHandler,
}) => {
  return (
    <Form onSubmit={shippingAddressFormHandler}>
      <Row>
        <Col sm={6}>
          <Form.Group
            className='mb-3'
            controlId='receiver-contact'>
            <Form.Label>Contact</Form.Label>
            <Form.Control
              name='contact'
              autoComplete='tel'
              placeholder='+1 234 555 6789'
              type='number'
              defaultValue={userContact}
              required
            />
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group
            className='mb-3'
            controlId='postal-code'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              name='postal-code'
              autoComplete='postal-code'
              placeholder='12345'
              type='number'
              defaultValue={userPostalCode}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <Form.Group
            className='mb-3'
            controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control
              name='city'
              autoComplete='street-address'
              placeholder='New York'
              type='text'
              defaultValue={userCity}
              required
            />
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group
            className='mb-3'
            controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              name='country'
              autoComplete='country-name'
              placeholder='United States'
              type='text'
              defaultValue={userCountry}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group
        className='mb-3'
        controlId='full-address'>
        <Form.Label>Full Address</Form.Label>
        <Form.Control
          name='full-address'
          autoComplete='shipping street-address'
          placeholder='Some where street...'
          type='text'
          defaultValue={userFullAddress}
          required
        />
      </Form.Group>
      <div className='text-end'>
        <Button
          type='submit'
          variant='dark'>
          Continue
        </Button>
      </div>
    </Form>
  )
}

export default ShippingAddressForm
