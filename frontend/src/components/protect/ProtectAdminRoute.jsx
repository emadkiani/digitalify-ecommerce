import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectAdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)

  if (userInfo && userInfo?.role === 'admin') {
    return <Outlet />
  }

  return (
    <Navigate
      to='/login'
      replace
    />
  )
}

export default ProtectAdminRoute
