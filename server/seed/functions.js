export const randomNumber = (max) => {
  return Math.floor(Math.random() * max)
}

export const generateCompanyCode = (amount) => {
  return Array.from(Array(amount).keys())
}
