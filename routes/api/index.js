const router = require('express').Router();
const userRoutes = require('./userRoutes')
const retortRoutes = require('./retortRoutes')

router.use('/users', userRoutes)
router.use('/retorts', retortRoutes)

module.exports = router;