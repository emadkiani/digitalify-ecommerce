import { Form, Row, Col } from 'react-bootstrap'

import LoadingButton from '../../ui/LoadingButton'
import { useGetCategoriesQuery } from '../../../tools/categoriesApiSlice'

const ProductForm = ({
  name,
  price,
  salePrice,
  brand,
  category,
  description,
  countInStock,
  productFromHandler,
  featured,
  isLoading,
}) => {
  const {
    data,
    isLoading: isCategoryLoading,
    refetch,
    isError,
  } = useGetCategoriesQuery()

  if (isCategoryLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Something went wrong</p>
  }

  if (data.length <= 0) {
    return <p>No categories found</p>
  }

  const categories = data

  return (
    <Form onSubmit={productFromHandler}>
      <Row className='mb-2'>
        <Col>
          <Form.Group controlId='brand'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              size='sm'
              name='brand'
              type='text'
              placeholder='Brand'
              autoComplete='on'
              defaultValue={brand}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId='name'>
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
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col>
          <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Select
              size='sm'
              name='category'
              defaultValue={category || categories[0]._id}>
              {categories.map((category, index) => (
                <option
                  value={category._id}
                  key={index}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId='count-in-stock'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              size='sm'
              name='count-in-stock'
              type='number'
              placeholder='Count In Stock'
              autoComplete='on'
              defaultValue={countInStock}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col>
          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              step='0.01'
              size='sm'
              name='price'
              type='number'
              placeholder='Price'
              autoComplete='on'
              defaultValue={price}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId='sale-price'>
            <Form.Label>Sale Price</Form.Label>
            <Form.Control
              step='0.01'
              size='sm'
              name='sale-price'
              type='number'
              placeholder='Sale price'
              autoComplete='on'
              defaultValue={salePrice}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group
        className='mb-2'
        controlId='description'>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as='textarea'
          name='description'
          type='text'
          placeholder='Description'
          autoComplete='on'
          defaultValue={description}
          required
        />
      </Form.Group>
      <Form.Check
        className='mb-2'
        defaultChecked={featured}
        type='checkbox'
        name='featured'
        id='featured'
        label='Featured product'
      />
      <div className='text-end'>
        <LoadingButton
          isLoading={isLoading}
          variant='dark'>
          Submit
        </LoadingButton>
      </div>
    </Form>
  )
}

export default ProductForm
