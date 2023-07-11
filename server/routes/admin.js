const express = require('express')
const router = express.Router()
const {adminRegister, verifyAdmin,adminLogin, addCity,addSubject,getRegistrations,deleteRegistration,getRegistration,updateRegistration} = require('../controllers/admin')

router.get('/registrations',getRegistrations)
router.get('/registration/:id',getRegistration)
router.put('/registration/:id',updateRegistration)
router.post('/register',adminRegister)
router.post('/verify',verifyAdmin)
router.post('/login',adminLogin)
router.post('/addcity',addCity)
router.post('/addsubject',addSubject)
router.delete('/delete/:id',deleteRegistration)

module.exports = router;