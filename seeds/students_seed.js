
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'coolKid', cohort_id: 1},
        {name: 'emoKid', cohort_id: 2},
        {name: 'smartKid', cohort_id: 3}
      ]);
    });
};
