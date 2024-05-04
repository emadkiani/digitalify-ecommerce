import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { LuClipboardEdit, LuTrash } from 'react-icons/lu'

import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from '../../tools/categoriesApiSlice'

const CategoryList = () => {
  const [deleteCategory, { isLoading: loadingDelete }] =
    useDeleteCategoryMutation()

  const { data, isLoading, refetch, isError } = useGetCategoriesQuery()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Something went wrong</p>
  }

  const categories = data

  if (categories.length === 0) {
    return <p>Product list is empty!</p>
  }

  const deleteCategoryHandler = async (categoryId) => {
    if (window.confirm('Are you sure')) {
      try {
        const response = await deleteCategory(categoryId).unwrap()
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
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category, index) => (
          <tr key={index}>
            <td>{category._id}</td>
            <td>{category.name}</td>
            <td>
              <Link
                className='btn btn-success btn-sm mx-1'
                to={`/admin/category/${category._id}`}>
                <LuClipboardEdit size='1rem' />
              </Link>
            </td>
            <td>
              <Button
                disabled={loadingDelete}
                className='mx-1'
                onClick={() => deleteCategoryHandler(category._id)}
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

export default CategoryList
