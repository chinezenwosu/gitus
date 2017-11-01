export const toQueryString = (paramsObj) => {
  let query = ''
  let searchWord = ''
  const esc = encodeURIComponent
  const validQuery = Object.keys(paramsObj).filter(key => paramsObj[key] && key !== 'search')
  query = validQuery.map(param => {
    if (param !== 'stars') {
      return `${esc(param)}:${esc(paramsObj[param])}`
    }
    return `${param}:${paramsObj[param]}`
  }).join('&')
  if (paramsObj.search && query.length) {
    searchWord = `${paramsObj.search}+`
  } else if (paramsObj.search) {
    searchWord = `${paramsObj.search}`
  }
  return `?q=${searchWord}${query}`
}