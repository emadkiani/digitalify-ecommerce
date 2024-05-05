import { Form, Button } from 'react-bootstrap'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'

import { useGetCategoriesQuery } from '../tools/categoriesApiSlice'

const AdvancedSearchBox = () => {
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams({
    keyword: '',
    page: '',
    categoryId: '',
    minPrice: '',
    maxPrice: '',
    sortBy: '',
    inStock: 'on',
  })

  const searchHandler = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const keyword = formData.get('keyword').trim()
    const categoryId = formData.get('category-id')
    const maxPrice = formData.get('max-price')
    const minPrice = formData.get('min-price')
    const sortBy = formData.get('sort-by')
    const inStock = formData.get('in-stock')

    navigate('/products')

    setSearchParams(
      (prev) => {
        prev.set('keyword', keyword)
        prev.set('categoryId', categoryId)
        prev.set('minPrice', minPrice)
        prev.set('maxPrice', maxPrice)
        prev.set('sortBy', sortBy)
        prev.set('inStock', inStock)
        prev.set('page', 1)
        return prev
      },
      { replace: true }
    )
  }

  const { data: categories, isLoading, isError } = useGetCategoriesQuery()

  return (
    <Form
      className='mb-3'
      onSubmit={searchHandler}>
      <Form.Group
        controlId='search'
        className='mb-2'>
        <Form.Label>Search</Form.Label>
        <Form.Control
          size='sm'
          defaultValue={searchParams.get('keyword')}
          name='keyword'
          type='search'
          placeholder='Keyword'
          aria-label='Search'
        />
      </Form.Group>
      <Form.Group
        controlId='category-id'
        className='mb-2'>
        <Form.Label>Category</Form.Label>
        <Form.Select
          size='sm'
          name='category-id'
          defaultValue={searchParams.get('categoryId')}>
          <option value=''>All</option>
          {!(isLoading || isError) &&
            categories.map((category, index) => (
              <option
                value={category._id}
                key={index}>
                {category.name}
              </option>
            ))}
        </Form.Select>
      </Form.Group>
      <Form.Group
        controlId='max-price'
        className='mb-2'>
        <Form.Label>Max Price</Form.Label>
        <Form.Control
          size='sm'
          placeholder='Maximom price'
          defaultValue={searchParams.get('maxPrice')}
          name='max-price'
          type='number'
        />
      </Form.Group>
      <Form.Group
        controlId='min-price'
        className='mb-2'>
        <Form.Label>Min Price</Form.Label>
        <Form.Control
          size='sm'
          placeholder='Minimum price'
          defaultValue={searchParams.get('minPrice')}
          name='min-price'
          type='number'
        />
      </Form.Group>
      <Form.Group
        controlId='sort-by'
        className='mb-2'>
        <Form.Label>Sort by Price</Form.Label>
        <Form.Select
          size='sm'
          name='sort-by'>
          <option value=''>No sort</option>
          <option value='desc'>Descending</option>
          <option value='asc'>Ascending</option>
        </Form.Select>
      </Form.Group>
      <Form.Check
        defaultChecked={searchParams.get('inStock')}
        className='mb-3'
        type='checkbox'
        name='in-stock'
        id='is-stock'
        label='In Stock'
      />
      <div className='d-grid gap-2'>
        <Button
          size='sm'
          variant='dark'
          type='submit'>
          Search
        </Button>
        <Link
          to='/products'
          className='btn btn-light btn-sm'>
          Reset
        </Link>
      </div>
    </Form>
  )
}

export default AdvancedSearchBox
