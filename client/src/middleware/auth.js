const storageName = 'userData'

export const login = (jwtToken, id) => {
  localStorage.setItem(storageName, JSON.stringify({token: jwtToken, userId: id}))
}

export const logout = () => {
  localStorage.removeItem(storageName)
}

export const checkStorage = () => {
  const data = JSON.parse(localStorage.getItem(storageName))

  if (data && data.token) {
    return data
  }
}

