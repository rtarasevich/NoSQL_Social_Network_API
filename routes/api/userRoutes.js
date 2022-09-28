const router = require('express').Router();

const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addAccomplice,
    deleteAccomplice
} = require('../../controllers/userController')

router.route('/')
.get(getUser)
.post(createUser);

router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

router.route('/:userId/accomplices')
.post(addAccomplice)

router.route('/:userId/accomplices/:accompliceId')
.delete(deleteAccomplice)

module.exports = router