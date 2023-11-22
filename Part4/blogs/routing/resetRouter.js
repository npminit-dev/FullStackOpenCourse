const resetRouter = require('express').Router()
const { blogModel, userModel } = require('../mongodb/models')

resetRouter.get('/resetDB', async (req, res) => {
  try {
    await Promise.all([
      blogModel.deleteMany({}),
      userModel.deleteMany({})
    ])
    res.status(200).send('Database restarted')
  } catch(error) {
    throw new Error(`Error restarting database: ${error}`)
  }
})

module.exports = resetRouter