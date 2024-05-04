import { useSearchParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import { useSearchProductsQuery } from '../tools/productsApiSlice'
import AdvancedSearchBox from '../components/AdvancedSearchBox'
import ProductCard from '../components/product/ProductCard'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    keyword: '',
    page: '',
    categoryId: '',
    minPrice: '',
    maxPrice: '',
    sortBy: '',
    inStock: true,
  })

  const { data, isLoading, isError } = useSearchProductsQuery({
    keyword: searchParams.get('keyword'),
    page: searchParams.get('page'),
    categoryId: searchParams.get('categoryId'),
    minPrice: searchParams.get('minPrice'),
    maxPrice: searchParams.get('maxPrice'),
    sortBy: searchParams.get('sortBy'),
    inStock: searchParams.get('inStock'),
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Something went wrong</p>
  }

  return (
    <>
      <Meta />
      <h1 className='mb-5'>Prodcuts</h1>
      <Row>
        <Col
          sm={6}
          md={4}
          lg={3}
          xl={2}>
          <AdvancedSearchBox />
        </Col>
        <Col
          sm={6}
          md={8}
          lg={9}
          xl={10}>
          <Row>
            {data.products.length > 0 ? (
              data.products.map((product, index) => (
                <Col
                  key={index}
                  sm={12}
                  md={6}
                  lg={4}
                  className='pb-3'>
                  <ProductCard product={product} />
                </Col>
              ))
            ) : (
              <p>No products found</p>
            )}
          </Row>
        </Col>
      </Row>
      <Paginate
        pages={data.pages}
        page={data.page}
      />
    </>
  )
}

export default ProductsPage
