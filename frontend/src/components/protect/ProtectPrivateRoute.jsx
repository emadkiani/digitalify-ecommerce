import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectPrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)

  if (userInfo) {
    return <Outlet />
  }

  return (
    <Navigate
      to='/login'
      replace
    />
  )
}

export default ProtectPrivateRoute
