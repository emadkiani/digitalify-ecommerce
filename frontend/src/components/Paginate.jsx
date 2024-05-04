import { Pagination } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'

const Paginate = ({ pages = 0, page = 1 }) => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
  })

  const navigateHandler = (pageNum) => {
    setSearchParams(
      (prev) => {
        prev.set('page', pageNum)
        return prev
      },
      { replace: true }
    )
  }

  if (pages <= 1) {
    return null
  }

  return (
    <Pagination className='my-5 justify-content-center'>
      {[...Array(pages).keys()].map((num) => (
        <Pagination.Item
          key={num + 1}
          onClick={() => navigateHandler(num + 1)}
          active={num + 1 === page}>
          {num + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  )
}

export default Paginate
