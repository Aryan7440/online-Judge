const express = require('express')
const addProblemsController = require('../controllers/problems/add_problems')


const router = express.Router()
router.post('/addproblem', addProblemsController.addProblem)