export function UBase64decode (str) {
  return btoa(encodeURIComponent(str))
}

export function UBase64encode (str) {
  return decodeURIComponent(atob(str))
}
