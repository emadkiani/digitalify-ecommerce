import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'

import Header from '../components/Header'
import Footer from '../components/Footer'

const Layout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const expirationTime = localStorage.getItem('expirationTime')
    if (expirationTime) {
      const currentTime = new Date().getTime()

      if (currentTime > expirationTime) {
        dispatch(logout())
      }
    }
  }, [dispatch])

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container className='my-5'>
          <Outlet />
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
      <ToastContainer />
    </>
  )
}

export default Layout
