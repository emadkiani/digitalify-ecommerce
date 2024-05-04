const notFound = (req, res, next) => {
  const error = new Error('Not Found')
  res.status(404)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode < 400 ? 500 : res.statusCode
  let message = err.message

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  })
}

export { notFound, errorHandler }
