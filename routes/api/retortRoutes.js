const router = require('express').Router();

const {
    getRetort,
    getSingleRetort,
    createRetort,
    updateRetort,
    deleteRetort,
    createCounter,
    deleteCounter
} = require('../../controllers/retortController');

router.route('/')
.get(getRetort)
.post(createRetort)

router.route('/:retortId')
.get(getSingleRetort)
.put(updateRetort)
.delete(deleteRetort)

router.route('/:retortId/counters')
.post(createCounter)

router.route('/:retortId/counters/:counterId')
.delete(deleteCounter)

module.exports = router;