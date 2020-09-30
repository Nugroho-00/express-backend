module.exports = (response, message, additionalData, status = 200, success = true) => {
  return response.status(status).send({
    success,
    message: message || 'Success',
    ...additionalData
  })
}
