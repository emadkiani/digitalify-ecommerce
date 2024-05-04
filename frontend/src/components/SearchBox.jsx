import { Form, Button } from 'react-bootstrap'
import { useSearchParams, useNavigate } from 'react-router-dom'

const SearchBox = () => {
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams({
    keyword: '',
  })

  const searchHandler = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const keyword = formData.get('keyword')

    navigate('/products')

    setSearchParams(
      (prev) => {
        prev.set('keyword', keyword)
        return prev
      },
      { replace: true }
    )
  }

  return (
    <Form
      onSubmit={searchHandler}
      className='d-flex'>
      <Form.Control
        defaultValue={searchParams.get('keyword')}
        name='keyword'
        type='search'
        placeholder='Search'
        aria-label='Search'
        className='me-2'
      />
      <Button
        variant='outline-secondary'
        type='submit'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
