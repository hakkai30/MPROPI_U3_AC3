import express from 'express'

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, '../frontend')))

app.post('/login', (req, res) => {
  const { email, password } = req.body

  if (email === 'test@test.com' && password === '12345678') {
    return res.json({ message: 'Login correcto' })
  }

  res.status(401).json({ message: 'Credenciales incorrectas' })
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})