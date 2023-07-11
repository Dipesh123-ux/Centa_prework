const express = require('express')
const router = express.Router()
const {userRegister, verifyUser,userLogin,getStates,getCities,getSubjects,getDatesforSubject,getSlotsForSubject,addUserData} = require('../controllers/user')

router.get('/subjects',getSubjects);
router.get('/date/:subject',getDatesforSubject)
router.get('/states',getStates);
router.get('/cities/:state',getCities);
router.post('/getslots',getSlotsForSubject);
router.post('/register',userRegister)
router.post('/verify',verifyUser)
router.post('/login',userLogin)
router.post('/add',addUserData)

module.exports = router;