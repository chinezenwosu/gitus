export const toQueryString = (searchWord, paramsObj) => {
  let query = ''
  const esc = encodeURIComponent
  const validQuery = Object.keys(paramsObj).filter(key => paramsObj[key])
  if (validQuery.length) {
    query = validQuery.map(param => `${esc(param)}:${esc(paramsObj[param])}`).join('&')
    if (searchWord && query.length) searchWord = `${searchWord}&`
    return `?q=${searchWord}${query}`
  }
  return query
}