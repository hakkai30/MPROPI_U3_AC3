import express from 'express'

const app = express()
app.use(express.json())

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