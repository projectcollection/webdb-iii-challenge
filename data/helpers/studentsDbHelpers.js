const knex = require('knex')

const knexConfig = require('../../knexfile').development

const db = knex(knexConfig)
const tbl = 'students'

const get = async (id) => {
    if(!id){
        return db(tbl)
    }else{
        const student = await db(tbl).where({id}).first()
        return db(tbl).join('cohorts', `${tbl}.cohort_id`, '=', 'cohorts.id')
            .select(`${tbl}.id`, `${tbl}.name`, db.ref('cohorts.name').as('cohort'))
            .where({'students.id': id})
            .first()
    }
}

const post = async (data) => {
    const cohort = await get(data.cohort_id)
    if(cohort){
        return db(tbl).insert(data)
    }else {
        return -1
    }
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