import Cookies from 'js-cookie'

export const setCookies = (key, value) => {
  value && Cookies.set(key, value)
}

export const getCookies = (key) => {
  return Cookies.get(key)
}

export const removeCookies = (key) => {
  return Cookies.remove(key)
}
