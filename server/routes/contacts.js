import {createContact, getContactsByUser, updateContact, deleteContact,getContactById} from '../controllers/contacts.js'
import protect from '../middlewares/protect.js'
import express from 'express'

const router = express.Router()

router.post('/create', protect, createContact)
router.get('/get', protect, getContactsByUser)
router.patch('/update/:id', protect, updateContact)
router.delete('/delete/:id', protect, deleteContact)
router.get('/:id', protect, getContactById)


export default router;