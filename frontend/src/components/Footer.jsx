import { Container } from 'react-bootstrap'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <Container className='text-center py-5'>
        <p className='text-secondary'>Emad Kiani (c) {currentYear}</p>
      </Container>
    </footer>
  )
}
export default Footer
