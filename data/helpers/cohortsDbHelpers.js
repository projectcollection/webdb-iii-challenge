const knex = require('knex')

const knexConfig = require('../../knexfile').development

const db = knex(knexConfig)
const tbl = 'cohorts'

const get = (id) => {
    if(!id){
        return db(tbl)
    }else{
        return db(tbl).where({id}).first()
    }
}

const post = (data) => {
    return db(tbl).insert(data)
}

const update = (id, data) => {
    return db(tbl).where({id}).update(data)
}

const del = (id) => {
    return db(tbl).where({id}).del()
}

module.exports = {
    get,
    post,
    update,
    del
}