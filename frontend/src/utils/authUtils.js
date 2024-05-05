export const setAuthCredentials = (state, action) => {
  state.userInfo = action.payload
  localStorage.setItem('userInfo', JSON.stringify(action.payload))
}

export const logoutUser = (state, action) => {
  state.userInfo = null
  localStorage.clear()
}
