import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'

import Meta from '../../components/Meta'
import AdminNav from '../../components/AdminNav'
import ProductForm from '../../components/product/form/ProductForm'
import UploadForm from '../../components/form/UploadForm'
import { useCreateProductMutation } from '../../tools/productsApiSlice'

const ProductCreatePage = () => {
  const [images, setImages] = useState([])

  const [createProduct, { isLoading }] = useCreateProductMutation()

  const createProductFromHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const product = {
      name: formData.get('name'),
      price: formData.get('price'),
      salePrice: formData.get('sale-price'),
      brand: formData.get('brand'),
      categoryId: formData.get('category'),
      images,
      description: formData.get('description'),
      countInStock: formData.get('count-in-stock'),
      featured: formData.get('featured') ? true : false,
    }

    try {
      const response = await createProduct(product).unwrap()

      toast.success('Product created')
    } catch (error) {
      toast.error(error?.data?.message || error.error || 'Something went wrong')
    }
  }

  const handleImageChange = (allImages) => {
    setImages(allImages)
  }

  return (
    <>
      <Meta />
      <AdminNav
        isCategoriesPath={false}
        isProductsPath={true}
        isUsersPath={false}
        isOrdersPath={false}
      />
      <Row className='justify-content-center'>
        <Col
          lg={8}
          sm={12}>
          <Row>
            <Col>
              <h3 className='mb-5'>Product</h3>
            </Col>
            <Col className='text-end'>
              <Link
                to='/admin/products'
                className='btn btn-lg btn-light'>
                Go back
              </Link>
            </Col>
          </Row>
          <UploadForm onImageChange={handleImageChange} />
          <ProductForm
            name=''
            price=''
            salePrice=''
            brand=''
            categoryId=''
            imageUrl={images}
            description=''
            countInStock=''
            featured={false}
            productFromHandler={createProductFromHandler}
            isLoading={isLoading}
          />
        </Col>
      </Row>
    </>
  )
}

export default ProductCreatePage
