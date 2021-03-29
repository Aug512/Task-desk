const { Router } = require('express')
const User = require('../models/User')
const config = require('config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = Router()

// /api/auth/register
router.post('/register', async (req, res) => {
  try {    
    const { login, password } = req.body
    const candidate = await User.findOne( { login })

    if (candidate) {
      return res.status(400).json({ message: 'Такой пользователь уже существует'})
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ login, password: hashedPassword })

    await user.save()
    res.status(201).json({ message: `Пользователь ${login} был успешно создан!`})

  } catch (error) {
    res.status(500).json({message: 'Что-то пошло не так...'})
  }
})

// /api/auth/login
router.post('/login', async (req, res) => {
  try {    
    const { login, password } = req.body
    const user = await User.findOne( { login })

    if (!user) {
      return res.status(400).json({ message: `Пользователь ${login} не найден`})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      res.status(500).json({message: 'Проверьте правильность ввода данных'})
    }

    const token = jwt.sign(
      { userId: user.id},
      config.get('jwtSecret'),
      { expiresIn: '24h' }
    )

    res.json({ token, userId: user.id, message: 'Добро пожаловать!' })

  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так...'})
  }
})

module.exports = router
