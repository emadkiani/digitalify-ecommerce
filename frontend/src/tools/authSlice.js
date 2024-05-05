import { createSlice } from '@reduxjs/toolkit'

import { setAuthCredentials, logoutUser } from '../utils/authUtils'

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
      setAuthCredentials(state, action)
    },
    logout: (state, action) => {
      logoutUser(state, action)
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer
