const express = require('express')
// const path = require('path')

const router = express.Router()

router.get('/produtos', (req, res) => {
  res.status(200).send({ status: 'ok', message: 'not implemented' })
})

module.exports = router
