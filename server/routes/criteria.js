const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/', (req, res) => {
  connection.query(`SELECT * FROM criteria`, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json(results);
    }
  });
});

router.get('/:id', (req, res) => {
  const criteria = req.params.id;
  connection.query(
    `SELECT * FROM project JOIN img ON project.id = img.project_id
    JOIN project_criteria ON project.id = project_criteria.project_id 
    JOIN criteria ON project_criteria.criteria_id = criteria.id
    WHERE criteria.id = ?
    ORDER BY project.id DESC`,
    criteria,
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json(results);
      }
    }
  );
});

module.exports = router;
