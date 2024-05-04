import { Link, useParams } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { LuClipboardEdit, LuTrash } from 'react-icons/lu'

import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from '../../tools/productsApiSlice'

const ProductList = () => {
  const { page } = useParams()

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation()

  const { data, isLoading, refetch, isError } = useGetProductsQuery({ page })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Something went wrong</p>
  }

  if (data.length === 0) {
    return <p>No products found</p>
  }

  const products = data

  if (products.length === 0) {
    return <p>Product list is empty!</p>
  }

  const deleteProductHandler = async (productId) => {
    if (window.confirm('Are you sure')) {
      try {
        const response = await deleteProduct(productId).unwrap()
        refetch()
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  return (
    <Table
      striped
      bordered
      hover
      responsive
      className='table-sm'>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>BRAND</th>
          <th>CATEGORY</th>
          <th>PRICE</th>
          <th>SALE PRICE</th>
          <th>COUNT IN STOCK</th>
          <th>FEATURED</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{product.brand}</td>
            <td>{product.category.name}</td>
            <td>${product.price}</td>
            <td>${product.salePrice}</td>
            <td
              className={
                product.countInStock > 0 ? 'text-success' : 'text-danger'
              }>
              {product.countInStock}
            </td>
            <td className={product.featured ? 'text-success' : 'text-danger'}>
              {product.featured ? 'Yes' : 'No'}
            </td>
            <td>
              <Link
                className='btn btn-success btn-sm mx-1'
                to={`/admin/product/${product._id}`}>
                <LuClipboardEdit size='1rem' />
              </Link>
            </td>
            <td>
              <Button
                disabled={loadingDelete}
                className='mx-1'
                onClick={() => deleteProductHandler(product._id)}
                type='button'
                variant='outline-danger'
                size='sm'>
                <LuTrash size='1rem' />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default ProductList
