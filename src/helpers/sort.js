module.exports = {
    name: (sort) => {
      if (typeof sort === 'object') {
        const sortKey = Object.keys(sort)[0]
        const sortBy = Object.values(sort)[0] || 'ASC'
        return { sortKey, sortBy }
      } else {
        const sortKey = 'name'
        const sortBy = sort || 'ASC'
        return { sortKey, sortBy }
      }
    },
    email: (sort) => {
      if (typeof sort === 'object') {
        const sortKey = Object.keys(sort)[0]
        const sortBy = Object.values(sort)[0] || 'ASC'
        return { sortKey, sortBy }
      } else {
        const sortKey = 'email'
        const sortBy = sort || 'ASC'
        return { sortKey, sortBy }
      }
    }
  }
  
  