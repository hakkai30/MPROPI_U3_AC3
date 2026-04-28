// 0. Importamos JSDOM para simular DOM
// @vitest-environment jsdom    
import { test, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { initApp } from './app.js'

test('login correcto', async () => {
  // 1. Crear DOM
  document.body.innerHTML = `
    <input id="email" />
    <input id="password" />
    <button id="loginBtn">Login</button>
    <p id="message"></p>
  `
  // 2. Inicializar app
  initApp()
  // 3. Mock fetch
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ message: 'Login correcto' })
    })
  )
  // 4. Simular usuario
  await userEvent.type(document.getElementById('email'), 'test@test.com')
  await userEvent.type(document.getElementById('password'), '12345678')
  await userEvent.click(document.getElementById('loginBtn'))
  // 5. Verificar
  expect(document.getElementById('message').textContent).toBe('Login correcto')
})

test('login falla', async () => {
  // 1. Crear DOM
  document.body.innerHTML = `
    <input id="email" />
    <input id="password" />
    <button id="loginBtn">Login</button>
    <p id="message"></p>
  `
  // 2. Inicializar app
  initApp()
  // 3. Mock fetch para simular error
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ message: 'Credenciales inválidas' })
    })
  )
  // 4. Simular usuario con datos incorrectos
  await userEvent.type(document.getElementById('email'), 'wrong@test.com')
  await userEvent.type(document.getElementById('password'), 'wrongpass')
  await userEvent.click(document.getElementById('loginBtn'))
  // 5. Verificar que el mensaje de error se muestra
  expect(document.getElementById('message').textContent).toBe('Credenciales inválidas')
})