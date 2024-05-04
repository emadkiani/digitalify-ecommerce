import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'

import Meta from '../../components/Meta'
import AdminNav from '../../components/AdminNav'
import CategoryForm from '../../components/category/form/CategoryForm'
import {
  useUpdateCategoryMutation,
  useGetCategoryDetailsQuery,
} from '../../tools/categoriesApiSlice'

const CategoryUpdatePage = () => {
  const { id } = useParams()

  const [updateCategory, { isLoading: isUpdateLoading }] =
    useUpdateCategoryMutation()

  const { data, isLoading, refetch, isError } = useGetCategoryDetailsQuery(id)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Something went wrong</p>
  }

  if (!data) {
    return <p>No category found</p>
  }

  const category = data

  const updateCategoryFromHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const editedCategory = {
      categoryId: id,
      name: formData.get('name'),
    }

    try {
      const response = await updateCategory(editedCategory).unwrap()

      toast.success('Category updated')

      refetch()
    } catch (error) {
      toast.error(error?.data?.message || error.error || 'Something went wrong')
    }
  }

  return (
    <>
      <Meta />
      <AdminNav
        isCategoriesPath={true}
        isProductsPath={false}
        isUsersPath={false}
        isOrdersPath={false}
      />
      <Row className='justify-content-center'>
        <Col
          sm={10}
          md={8}
          lg={6}>
          <Row>
            <Col>
              <h3 className='mb-5'>Category</h3>
            </Col>
            <Col className='text-end'>
              <Link
                to='/admin/categories'
                className='btn btn-lg btn-light'>
                Go back
              </Link>
            </Col>
          </Row>
          <CategoryForm
            name={category.name}
            categoryFromHandler={updateCategoryFromHandler}
            isLoading={isUpdateLoading}
          />
        </Col>
      </Row>
    </>
  )
}

export default CategoryUpdatePage
