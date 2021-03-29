export const setMessage = message => {
  return { type: 'SHOW_MESSAGE', message }
}

export const setError = message => {
  return { type: 'SHOW_ERROR', message }
}
