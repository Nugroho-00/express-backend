const qs = require('querystring')
const { APP_URL } = process.env

module.exports = (req, totalData) => {
  let { page = 1, limit = 5 } = req.query
  page = parseInt(page)
  limit = parseInt(limit)
  if (page < 1) {
    page = 1
  }
  if (limit < 1 || limit > 100) {
    limit = 5
  }
  const totalPage = Math.ceil(totalData / limit)
  const path = req.originalUrl.slice(1).split('?')[0]
  const prev = qs.stringify({ ...req.query, ...{ page: page - 1 } })
  const next = qs.stringify({ ...req.query, ...{ page: page + 1 } })
  const prevLink = page > 1 ? `${APP_URL}${path}?${prev}` : null
  const nextLink = page < totalPage ? `${APP_URL}${path}?${next}` : null

  const offset = (page - 1) * limit
  return {
    offset,
    pageInfo: {
      currentPage: page,
      totalPage,
      totalData,
      limitData: limit,
      prevLink,
      nextLink
    }
  }
}
