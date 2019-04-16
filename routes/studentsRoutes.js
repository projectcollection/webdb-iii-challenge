const route = require('express').Router()

const db = require('../data/helpers/studentsDbHelpers')

route.get('/', async (req, res) => {
    try{
        const students = await db.get()
        res.status(200).json(students)
    }catch (e) {
        res.status(500).json({message: 'internal server error'})
    }
})

route.get('/:id', async (req, res) => {
    const {id} = req.params
    try{
        const student = await db.get(id)
        if(student){
            res.status(200).json(student)
        }else {
            res.status(404).json({message: 'not found'})
        }
    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'internal server error'})
    }
})

route.post('/', async (req, res) => {
    const {name, cohort_id} = req.body

    if(!name || !cohort_id){
        res.status(400).json({message: 'data incomplete'})
        return
    }
    try{
        const newStudentId = await db.post(req.body)
        if(newStudentId === -1){
            res.status(404).json({message: 'cohort not found'})
        }
        const newStudent = await db.get(newStudentId[0])
        res.status(201).json(newStudent)
    }catch (e) {
        res.status(500).json({message: 'internal server error'})
    }
})

route.put('/:id', async (req, res) => {
    const {id} = req.params
    // const {name} = req.body

    if(!name){
        res.status(400).json({message: 'need a name'})
        return
    }
    try{
        const count = await db.update(id, req.body)
        if(count > 0){
            const updatedStudent = await db.get(id)
            res.status(200).json(updatedCohort)
        }else{
            res.status(404).json({message: 'not found'})
        }
    }catch (e) {
        res.status(500).json({message: 'internal server error'})
    }
})

route.delete('/:id', async (req, res) => {
    const {id} = req.params
    try{
        const count = await db.del(id)
        if(count > 0){
            res.status(200).json({message: 'successfully deleted'})
        }else{
            res.status(404).json({message: 'not found'})
        }
    }catch (e) {
        res.status(500).json({message: 'internal server error'})
    }
})

module.exports = route