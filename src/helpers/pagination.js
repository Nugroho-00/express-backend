const qs = require('querystring')
const { BACKEND_URL } = process.env

module.exports = (req, totalData) => {
  let { page = 1, limit = 10 } = req.query
  page = parseInt(page)
  limit = parseInt(limit)
  if (page < 1) {
    page = 1
  }
  if (limit < 1 || limit > 100) {
    limit = 10
  }
  const totalPage = Math.ceil(totalData / limit)
  const path = req.originalUrl.slice(1).split('?')[0]
  const prev = qs.stringify({ ...req.query, ...{ page: page - 1 } })
  const next = qs.stringify({ ...req.query, ...{ page: page + 1 } })
  const prevLink = page > 1 ? `${BACKEND_URL}${path}?${prev}` : null
  const nextLink = page < totalPage ? `${BACKEND_URL}${path}?${next}` : null
  const offset = (page - 1) * limit

  return {
    offset,
    pageInfo: {
      currentPage: page,
      totalPage,
      totalData: totalData,
      limitData: limit,
      prevLink,
      nextLink
    }
  }
}
