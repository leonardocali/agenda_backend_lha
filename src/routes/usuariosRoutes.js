const { Router } = require('express');
const router = Router();

const { getUser, getInfo, getUserByID, deletePersonByID, addPerson, updatePerson } = require('../controllers/usuariosController')

router.get('/', getUser);
router.get('/info', getInfo);
router.get('/:id', getUserByID);
router.delete('/:id', deletePersonByID);
router.post('/', addPerson);
router.patch('/:id', updatePerson)

module.exports = router;