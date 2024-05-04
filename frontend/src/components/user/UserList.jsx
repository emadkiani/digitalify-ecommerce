import { useNavigate } from 'react-router-dom'
import { LuClipboardEdit, LuTrash } from 'react-icons/lu'

import { Table, Button } from 'react-bootstrap'
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../../tools/usersApiSlice'
import { toast } from 'react-toastify'

const UserList = () => {
  const [deleteUser] = useDeleteUserMutation()

  const deleteUserHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        const response = await deleteUser(id).unwrap()
        refetch()
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  const navigate = useNavigate()

  const navigateHandler = (path) => {
    navigate(path)
  }

  const { data, refetch, isLoading, isError } = useGetUsersQuery()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error</p>
  }

  if (data.length <= 0) {
    return <p>No users found</p>
  }

  const users = data

  return (
    <Table
      striped
      bordered
      hover
      responsive
      className='table-sm'>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>E-MAIL</th>
          <th>ROLE</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <Button
                variant='success mx-1'
                size='sm'
                type='button'
                onClick={() => navigateHandler(`/admin/user/${user._id}`)}>
                <LuClipboardEdit size='1rem' />
              </Button>
            </td>
            <td>
              <Button
                variant='outline-danger mx-1'
                size='sm'
                type='button'
                onClick={() => deleteUserHandler(user._id)}>
                <LuTrash size='1rem' />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default UserList
