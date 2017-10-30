export const toQueryString = (paramsObj) => {
  let query = ''
  const esc = encodeURIComponent
  const validQuery = Object.keys(paramsObj).filter(key => paramsObj[key])
  if (validQuery.length) {
    query = validQuery.map(param => `${esc(param)}:${esc(paramsObj[param])}`).join('&')
    return `?q=${query}`
  }
  return query
}