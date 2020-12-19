module.exports = (response, message, aditionalData = {}, status = 200, success = true) => {
    return response.status(status).send({
      success,
      message: message || 'Success',
      ...aditionalData
    })
  }