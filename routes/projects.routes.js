const { Router } = require('express')
const config = require('config')
const Project = require('../models/Project')
const User = require('../models/User')
const authMiddleware = require('../middleware/auth.middleware')

const router = Router()

router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { title } = req.body

    const isExist = await Project.findOne( { title } )

    const user = await User.findOne({ _id: req.user.userId })

    if (!!isExist && isExist.owner.toString() === req.user.userId) {
      return res.status(400).json({ message: `Проект "${title}" уже существует` })
    }

    const project = new Project({
      owner: req.user.userId,
      title: req.body.title,
      data: { columns: [], tasks: [] },
    })

    user.ownProjects.push(project)

    await project.save()
    await user.save()

    res.status(201).json({ project, message: `Проект ${title} успешно создан!` })

  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так...', error })
  }
})

router.get('/', authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.userId })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так...', error })
  }
})

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    res.json(project)
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так...', error })
  }
})

router.delete('/:id/remove', authMiddleware, async (req, res) => {
  try {
    await Project.findByIdAndDelete({ _id: req.params.id })
    let user = await User.findOne({ _id: req.user.userId })

    const filtered = user.ownProjects.filter(proj => proj.toString() !== req.params.id)

    user = await User.findOneAndUpdate({ _id: req.user.userId }, { ownProjects: filtered })

    await user.save()

    res.json({ message: 'Проект удалён' })
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так...', error })
  }
})

router.put('/:id/update', authMiddleware, async (req, res) => {
  try {

    const project = await Project.findOneAndUpdate({ _id: req.params.id }, {
      owner: req.user.userId,
      title: req.body.title,
      data: req.body.data,
    })

    await project.save()

    res.json({ message: 'Проект успешно обновлён' })
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так...', error })
  }
})

module.exports = router
