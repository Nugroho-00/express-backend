module.exports = {
  name: (search) => {
    console.log('cek helpers:', search)
    if (typeof search === 'object') {
      const searchKey = Object.keys(search)[0]
      const searchValue = Object.values(search)[0]
      return { searchKey, searchValue }
    } else {
      const searchKey = 'name'
      const searchValue = search || ''
      return { searchKey, searchValue }
    }
  },
  email: (search) => {
    if (typeof search === 'object') {
      const searchKey = Object.keys(search)[0]
      const searchValue = Object.values(search)[0]
      return { searchKey, searchValue }
    } else {
      const searchKey = 'email'
      const searchValue = search || ''
      return { searchKey, searchValue }
    }
  },
  transaction: (search) => {
    if (typeof search === 'object') {
      const searchKey = Object.keys(search)[0]
      const searchValue = Object.values(search)[0]
      return { searchKey, searchValue }
    } else {
      const searchKey = 'items_name'
      const searchValue = search || ''
      return { searchKey, searchValue }
    }
  }
}
