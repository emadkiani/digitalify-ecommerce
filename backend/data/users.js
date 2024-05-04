import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'admin',
  },
  {
    name: 'John Dou',
    email: 'john@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
