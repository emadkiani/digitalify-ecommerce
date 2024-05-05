import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import Layout from './Layout'
import ProtectPrivateRoute from './routes/ProtectPrivateRoute'
import ProtectAdminRoute from './routes/ProtectAdminRoute'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import CartPage from './pages/CartPage'
import ShippingPage from './pages/ShippingPage'
import PaymentPage from './pages/PaymentPage'
import PlaceOrderPage from './pages/PlaceOrderPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import CategoryListPage from './pages/admin/CategoryListPage'
import CategoryCreatePage from './pages/admin/CategoryCreatePage'
import CategoryEditPage from './pages/admin/CategoryEditPage'
import ProductListPage from './pages/admin/ProductListPage'
import ProductCreatePage from './pages/admin/ProductCreatePage'
import ProductEditPage from './pages/admin/ProductEditPage'
import UserListPage from './pages/admin/UserListPage'
import UserEditPage from './pages/admin/UserEditPage'
import OrderListPage from './pages/admin/OrderListPage'
import OrderEditPage from './pages/admin/OrderEditPage'
import NotFound from './pages/NotFoundPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<Layout />}>
      <Route
        index={true}
        path='/'
        element={<HomePage />}
      />
      <Route
        path='/products'
        element={<ProductsPage />}
      />
      <Route
        path='product/:id'
        element={<ProductDetailsPage />}
      />
      <Route
        path='/cart'
        element={<CartPage />}
      />
      <Route
        path='/login'
        element={<LoginPage />}
      />
      <Route
        path='/register'
        element={<RegisterPage />}
      />
      <Route
        path=''
        element={<ProtectPrivateRoute />}>
        <Route
          path='/profile'
          element={<ProfilePage />}
        />
        <Route
          path='/profile/order/:id'
          element={<OrderDetailsPage />}
        />
        <Route
          path='/shipping'
          element={<ShippingPage />}
        />
        <Route
          path='/payment'
          element={<PaymentPage />}
        />
        <Route
          path='/placeorder'
          element={<PlaceOrderPage />}
        />
      </Route>
      <Route
        path=''
        element={<ProtectAdminRoute />}>
        <Route
          path='/admin/categories'
          element={<CategoryListPage />}
        />
        <Route
          path='/admin/category/new'
          element={<CategoryCreatePage />}
        />
        <Route
          path='/admin/category/:id'
          element={<CategoryEditPage />}
        />
        <Route
          path='/admin/products'
          element={<ProductListPage />}
        />
        <Route
          path='/admin/product/new'
          element={<ProductCreatePage />}
        />
        <Route
          path='/admin/product/:id'
          element={<ProductEditPage />}
        />
        <Route
          path='/admin/users'
          element={<UserListPage />}
        />
        <Route
          path='/admin/user/:id'
          element={<UserEditPage />}
        />
        <Route
          path='/admin/orders'
          element={<OrderListPage />}
        />
        <Route
          path='/admin/order/:id'
          element={<OrderEditPage />}
        />
      </Route>
      <Route
        path='*'
        element={<NotFound />}
      />
    </Route>
  )
)

export default router
