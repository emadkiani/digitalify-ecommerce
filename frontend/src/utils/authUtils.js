class Auth {
  constructor(state, action) {
    this.state = state
    this.action = action
  }

  setCredentials() {
    this.state.userInfo = this.action.payload
    localStorage.setItem('userInfo', JSON.stringify(this.action.payload))
  }

  logout() {
    this.state.userInfo = null
    localStorage.clear()
  }
}

export default Auth
