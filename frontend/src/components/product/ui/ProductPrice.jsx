const ProductPrice = ({ price, salePrice, countInStock }) => {
  if (countInStock <= 0) {
    return <span className='text-secondary'>Out of stock</span>
  }

  if (price === salePrice) {
    return <span className='text-success'>${salePrice}</span>
  }

  return (
    <>
      <span className='text-danger line-through'>${price}</span>{' '}
      <span className='text-success'>${salePrice}</span>
    </>
  )
}

export default ProductPrice
