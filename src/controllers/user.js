const { qs } = require('querystring')
const { createUserModel, getIdUserModel, getAllUserModel, userModel, updatePartialUserModel, deleteUserModel } = require('../models/user')

module.exports = {
  getUserId: (req, res) => {
    const { id } = req.params
    getIdUserModel(id, result => {
      if (result.length) {
        res.status(201).send({
          succes: true,
          message: `User with id ${id}`,
          data: result[0]
        })
      } else {
        res.send({
          succes: false,
          message: 'user id not found!'
        })
      }
    })
  },
  getAllUser: (req, res) => {
    let { page, limit, search, sort } = req.query
    let searchKey = ''
    let searchValue = ''
    let sortColumn = ''
    let sortValue = ''
    console.log(typeof search)
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'userName'
      searchValue = search || ''
    }
    if (typeof sort === 'object') {
      sortColumn = Object.keys(sort)[0]
      sortValue = Object.values(sort)[0]
    } else {
      sortColumn = 'id'
      sortValue = sort || ''
    }
    if (!limit) {
      limit = 5
    } else {
      limit = parseInt(limit)
    }
    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }
    const offset = (page - 1) * limit
    getAllUserModel(searchKey, searchValue, sortColumn, sortValue, limit, offset, (err, result) => {
      if (!err) {
        const pageInfo = {
          count: 0,
          pages: 0,
          currentPage: page,
          limitPage: limit,
          nextLink: null,
          prevLink: null
        }
        if (result.length) {
          userModel([searchKey, searchValue], data => {
            const {
              count
            } = data[0]
            pageInfo.count = count
            pageInfo.pages = Math.ceil(count / limit)
            const {
              pages,
              currentPage
            } = pageInfo
            if (currentPage < pages) {
              pageInfo.nextLink = `http://localhost:8080/user?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`
            }
            if (currentPage > 1) {
              pageInfo.prevLink = `http://localhost:8080/user?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`
            }
            res.send({
              success: true,
              message: 'List of User',
              data: result,
              pageInfo
            })
          })
        } else {
          res.send({
            success: true,
            message: 'There is no list User'
          })
        }
      } else {
        console.log(err)
        res.status(500).send({
          success: false,
          message: 'Internal server Error'
        })
      }
    })
  },
  createUser: (req, res) => {
    const { userName, email, password } = req.body
    if (userName && email && password) {
      createUserModel([userName, email, password], (err, result) => {
        if (!err) {
          res.send({
            success: true,
            message: 'User has been created',
            data: {
              id: result.insertId,
              ...req.body
            }
          })
        } else {
          res.send({
            success: false,
            message: 'Failed create User'
          })
        }
      })
    } else {
      res.send({
        success: false,
        message: 'all field must be filled'
      })
    }
  },
  updatePartialUser: (req, res) => {
    const { id } = req.params
    const { userName = '', email = '', password = '' } = req.body
    if (userName.trim() || email.trim() || password.trim()) {
      getIdUserModel(id, result => {
        if (result.length) {
          const data = Object.entries(req.body).map(item => {
            return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
          })
          updatePartialUserModel(id, data, result => {
            if (result.affectedRows) {
              res.send({
                success: true,
                message: `User with id ${id} updated`,
                data: req.body
              })
            } else {
              res.send({
                success: false,
                message: 'Failed to update user!!!'
              })
            }
          })
        } else {
          res.send({
            success: false,
            message: 'internal server error'
          })
        }
      })
    }
  },
  deleteUser: (req, res) => {
    const { id } = req.params
    getIdUserModel(id, result => {
      if (result.length) {
        deleteUserModel(id, result => {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `user with id ${id} deleted`
            })
          } else {
            res.send({
              success: false,
              message: 'Failed delete user'
            })
          }
        })
      } else {
        res.send({
          success: false,
          message: `user with ${id} not found`
        })
      }
    })
  }
}
