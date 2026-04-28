import { describe, it, expect } from 'vitest'  
import { validateLogin } from './validation'  
  
describe('validateLogin', () => {    
  it('fails if email is empty', () => {      
    expect(validateLogin('', '12345678').valid).toBe(false)    
  })    
  it('fails if password is empty', () => {      
    expect(validateLogin('test@test.com', '').valid).toBe(false)    
  })    
  it('passes with valid input', () => {      
    expect(validateLogin('test@test.com', '12345678').valid).toBe(true)    
  })  

  // Edge cases
  it('fails if no arguments are provided', () => {
    const result = validateLogin()
    expect(result.valid).toBe(false)
    expect(result.error).toBe('Campos obligatorios')
  })

  it('fails if arguments are null', () => {
    expect(validateLogin(null, null).valid).toBe(false)
  })

  it('fails if email is null', () => {
    expect(validateLogin(null, '12345678').valid).toBe(false)
  })

  it('fails if password is null', () => {
    expect(validateLogin('test@test.com', null).valid).toBe(false)
  })

  it('fails if email is undefined', () => {
    expect(validateLogin(undefined, '12345678').valid).toBe(false)
  })

  it('fails if password is undefined', () => {
    expect(validateLogin('test@test.com', undefined).valid).toBe(false)
  })

  it('returns the correct error message on empty strings', () => {
    expect(validateLogin('', '').error).toBe('Campos obligatorios')
  })
})