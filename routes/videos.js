const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const dbPromise = require('../db');


router.get('/', async function(req, res, next) {
  filter = []
  const category = req.query.category;
  if (category != null) {
    filter.push(`category = "${category}"`)
  }

  const title = req.query.title;
  if (title != null) {
    filter.push(`title like "%${title}%"`)
  }

  let where = '';
  if (filter.length != 0) {
    where = 'where ' + filter.join(' AND ')
  }
  const db = await dbPromise
  rows = await db.all(`select id, category, title, subtitle, episode, start from video ${where} order by end desc limit 100;`)
  res.send(rows)
});

router.get('/:id', async function(req, res) {
  const id = req.params.id;
  const db = await dbPromise
  sql = 'select * from video where id = ? limit 1;'
  video = await db.get(sql, [id])
  res.send(video)
});

router.post('/', async function(req, res, next) {
  let body = req.body
  const db = await dbPromise
  video = await db.get('select id from video where id = ?', [body.id])
  if (video) {
    res.send(body.id+' is already inserted.')
    return
  }

  const insertSql = 'INSERT INTO Video VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  await db.run(insertSql, [
    body.id,
    body.category,
    body.title,
    body.fullTitle,
    body.detail,
    body.start,
    body.end,
    body.seconds,
    body.description,
    body.subTitle,
    body.episode,
    body.recorded,
  ])
  res.send('create video.')
});

module.exports = router;
