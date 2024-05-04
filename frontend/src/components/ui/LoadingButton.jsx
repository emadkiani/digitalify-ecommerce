import { Button, Spinner } from 'react-bootstrap'

const LoadingButton = ({ children, isLoading, variant }) => {
  return (
    <Button
      disabled={isLoading}
      variant={variant}
      size='sm'
      type='submit'>
      {isLoading && (
        <Spinner
          as='span'
          animation='border'
          size='sm'
          role='status'
          aria-hidden='true'
        />
      )}
      {children}
    </Button>
  )
}

export default LoadingButton
