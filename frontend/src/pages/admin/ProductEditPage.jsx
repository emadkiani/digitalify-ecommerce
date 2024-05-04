import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'

import Meta from '../../components/Meta'
import AdminNav from '../../components/AdminNav'
import ProductForm from '../../components/product/form/ProductForm'
import UploadForm from '../../components/form/UploadForm'
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
} from '../../tools/productsApiSlice'

const ProductEditPage = () => {
  const [images, setImages] = useState([])
  const { id } = useParams()

  const [updateProduct, { isLoading: isUpdateLoading }] =
    useUpdateProductMutation()

  const { data, isLoading, refetch, isError } = useGetProductDetailsQuery(id)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Something went wrong</p>
  }

  if (!data) {
    return <p>No product found</p>
  }

  const product = data

  const updateProductFromHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const editedProduct = {
      productId: id,
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
      const response = await updateProduct(editedProduct).unwrap()

      toast.success('Product updated')

      refetch()
    } catch (error) {
      toast.error(error?.data?.message || error.error || 'Something went wrong')
    }
  }

  const handleImageChange = (updatedImages) => {
    setImages(updatedImages)
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
          <UploadForm
            uploadedImages={product.images}
            onImageChange={handleImageChange}
            isEditMode
          />
          <ProductForm
            name={product.name}
            price={product.price}
            salePrice={product.salePrice}
            brand={product.brand}
            category={product.category}
            description={product.description}
            countInStock={product.countInStock}
            featured={product.featured}
            productFromHandler={updateProductFromHandler}
            isLoading={isUpdateLoading}
          />
        </Col>
      </Row>
    </>
  )
}

export default ProductEditPage
