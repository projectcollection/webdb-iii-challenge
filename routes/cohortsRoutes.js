const route = require('express').Router()
const knex = require('knex')

const knexConfig = require('../knexfile').development

const db = knex(knexConfig)

route.get('/', async (req, res) => {
    try{
        const cohorts = await db('cohorts')
        res.status(200).json(cohorts)
    }catch (e) {
        res.status(500).json({message: 'internal server error'})
    }
})

route.get('/:id', async (req, res) => {
    const {id} = req.params
    try{
        const cohort = await db('cohorts').where({id}).first()

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
        const newCohortId = await db('cohorts').insert(req.body)
        const newCohort = await db('cohorts').where({id: newCohortId[0]})
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
        const count = await db('cohorts').where({id}).update(req.body)
        if(count > 0){
            const updatedCohort = await db('cohorts').where({id})
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
        const count = await db('cohorts').where({id}).del()
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