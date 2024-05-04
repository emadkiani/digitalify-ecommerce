import { useState, useEffect } from 'react'
import { Form, Figure, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { LuX } from 'react-icons/lu'

import { useUploadImageMutation } from '../../tools/uploadApiSlice'

const UploadForm = ({
  onImageChange,
  uploadedImages = [],
  isEditMode = false,
}) => {
  const [images, setImages] = useState(uploadedImages)

  useEffect(() => {
    if (isEditMode) {
      onImageChange(() => [...uploadedImages])
    }
  }, [uploadedImages])

  const [uploadImage, { isLoading }] = useUploadImageMutation()

  const uploadFileHandler = async (event) => {
    const formData = new FormData()
    formData.append('image', event.target.files[0])
    try {
      const response = await uploadImage(formData).unwrap()
      toast.success('Image uploaded')
      onImageChange((prevImages) => [...prevImages, { url: response.image }])
      setImages((prevImages) => [...prevImages, { url: response.image }])
    } catch (error) {
      toast.error(error?.data?.message || error.error || 'Something went wrong')
    }
  }

  const removeImage = (indexImage) => {
    toast.success('Image removed')
    onImageChange((prevImages) =>
      prevImages.filter((image, index) => index !== indexImage)
    )
    setImages((prevImages) =>
      prevImages.filter((image, index) => index !== indexImage)
    )
  }

  return (
    <>
      <Form>
        <Form.Group
          controlId='image'
          className='mb-3'>
          <Form.Label>Image</Form.Label>
          <Form.Control
            size='sm'
            disabled={isLoading}
            label='Choose File'
            onChange={uploadFileHandler}
            type='file'
          />
        </Form.Group>
      </Form>
      {isLoading && <p className='my-3'>Loading image...</p>}
      <Row>
        {images.map((image, index) => (
          <Col
            className='mb-2'
            sm={6}
            md={4}
            lg={3}
            xl={2}
            key={index}>
            <Figure>
              <div className='wrapper'>
                <Figure.Image
                  src={`${import.meta.env.VITE_PROXY}/images/${image.url}`}
                  alt='Uploaded image'
                  fluid
                  rounded
                />
                <div className='overlay opacity-small' />
              </div>
              <Figure.Caption
                onClick={() => removeImage(index)}
                className='cursor-pointer text-danger'>
                <LuX size={'0.75rem'} />
                Remove
              </Figure.Caption>
            </Figure>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default UploadForm
