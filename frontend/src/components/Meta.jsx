import { Helmet } from 'react-helmet-async'

const Meta = ({
  title = 'Digitalify',
  description = 'Welcome to Digitalify.',
  keywords = 'Smartphone Deals, Laptop Offers, Tablet Discounts',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta
        name='description'
        content={description}
      />
      <meta
        name='keyword'
        content={keywords}
      />
    </Helmet>
  )
}

export default Meta
