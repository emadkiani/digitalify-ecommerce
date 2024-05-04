import { createSlice } from '@reduxjs/toolkit'

import Auth from '../utils/authUtils'

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const auth = new Auth(state, action)

      auth.setCredentials()
    },
    logout: (state, action) => {
      const auth = new Auth(state, action)

      auth.logout()
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer
