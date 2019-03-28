const route = require('express').Router()

const db = require('../data/helpers/cohortsDbHelpers')

route.get('/', async (req, res) => {
    try{
        const cohorts = await db.get()
        res.status(200).json(cohorts)
    }catch (e) {
        res.status(500).json({message: 'internal server error'})
    }
})

route.get('/:id', async (req, res) => {
    const {id} = req.params
    try{
        const cohort = await db.get(id)

        if(cohort){
            res.status(200).json(cohort)
        }else {
            res.status(404).json({message: 'not found'})
        }
    }catch (e) {
        res.status(500).json({message: 'internal server error'})
    }
})

route.post('/', async (req, res) => {
    const {name} = req.body

    if(!name){
        res.status(400).json({message: 'need a name'})
        return
    }
    try{
        const newCohortId = await db.post(req.body)
        const newCohort = await db.get(newCohortId[0])
        res.status(201).json(newCohort)
    }catch (e) {
        res.status(500).json({message: 'internal server error'})
    }
})

route.put('/:id', async (req, res) => {
    const {id} = req.params
    const {name} = req.body

    if(!name){
        res.status(400).json({message: 'need a name'})
        return
    }
    try{
        const count = await db.update(id, req.body)
        if(count > 0){
            const updatedCohort = await db.get(id)
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