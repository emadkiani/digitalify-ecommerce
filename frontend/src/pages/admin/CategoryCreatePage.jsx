import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'

import Meta from '../../components/Meta'
import AdminNav from '../../components/AdminNav'
import CategoryForm from '../../components/category/form/CategoryForm'
import { useCreateCategoryMutation } from '../../tools/categoriesApiSlice'

const CategoryCreatePage = () => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation()

  const createCategoryFromHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const category = {
      name: formData.get('name'),
    }

    try {
      const response = await createCategory(category).unwrap()

      toast.success('Category updated')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
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
            name=''
            categoryFromHandler={createCategoryFromHandler}
            isLoading={isLoading}
          />
        </Col>
      </Row>
    </>
  )
}

export default CategoryCreatePage
