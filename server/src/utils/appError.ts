class AppError extends Error {
  status: string
  statusCode: number
  isOperational: true

  constructor(statusCode: number, message: string) {
    super(message)

    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.statusCode = statusCode
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

export default AppError
