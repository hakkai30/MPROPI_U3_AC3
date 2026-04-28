export function validateLogin(email, password) {
  if (!email || !password) {
    return { valid: false, error: 'Campos obligatorios' }
  }

  return { valid: true }
}

