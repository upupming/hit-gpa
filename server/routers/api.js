const router = require('koa-router')()
const api = require('../controllers/api')

router.post('/grade', api.getGrade)

module.exports = router
