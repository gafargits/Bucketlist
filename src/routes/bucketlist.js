const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const BucketList = require('../models/BucketList');
const Items = require('../models/Items');
const validateBucketListInput = require('../validation/bucketlist');

//create new bucketlist
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

  const { errors, isValid } = validateBucketListInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const newBucketList = new BucketList({
    name: req.body.name,
    date_created: req.body.date_created,
    date_modified: req.body.date_modified,
    created_by: req.user.id
  });

  newBucketList.save()
    .then(post => res.json(post))

})

//get all bucketlist created by a particular user
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const match = {};

  if (req.query.q) {
    match.q = req.query.q
    BucketList.find({ created_by: req.user.id, name: match.q })
    .then(bucketlist => res.json(bucketlist))
    .catch(err => res.status(404).json({ err: 'No bucketlist found' }))
  }
  if(req.query.limit){
    BucketList.find
  }
 
  BucketList.find({ created_by: req.user.id })
    .then(bucketlist => res.json(bucketlist))
    .catch(err => res.status(404).json({ err: 'No bucketlist found' }))
})

//get a specific bucketlist
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  BucketList.findById(req.params.id)
    .then(bucketlist => res.json(bucketlist))
    .catch(err => res.status(404).json({ bucketlist: "No such bucketlist" }))
})

//update a bucketlist
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  BucketList.findByIdAndUpdate(req.params.id, { name: req.body.name })
    .then(bucketlist => res.status(200).json({ update: "Bucketlist updated" }))
    .catch(err => res.status(404).json({ bucketlist: 'not found' }))
})

//delete a bucketlist
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  BucketList.findByIdAndDelete(req.params.id)
    .then(bucketlist => res.status(200).json({ bucketlist: "deleted" }))
    .catch(err => res.status(404).json({ bucketlist: 'not found' }))
})

//create a new item in bucketlist
router.post('/:id/items', passport.authenticate('jwt', { session: false }), (req, res) => {
  BucketList.findById(req.params.id)
    .then(bucketlist => {
      // const {id, name, date_created, date_modified, created_by} = bucketlist
      const newItem = new Items({
        name: req.body.name,
        done: req.body.done,
        id: req.body.id
      })
      bucketlist.items.unshift(newItem)
      bucketlist.save()
        .then(item => res.status(200).json({ item: "Saved!" }))
        .catch(err => res.status(400).json({ err: 'Unable to save item' }))
    })
    .catch(err => res.status(404).json({ error: "post not found" }))
})

//list all created item in a bucketlist
router.get('/:id/items', passport.authenticate('jwt', { session: false }), (req, res) => {
  BucketList.findById(req.params.id)
    .then(bucketlist => res.status(200).json(bucketlist.items))
    .catch(err => res.status(400).json({ err: 'No such bucketlist' }))
})

//get a single item in a bucketlist
router.get('/:id/items/:item_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  BucketList.findById(req.params.id)
    .then(bucketlist => bucketlist.items)
    .then(items => items.filter(item => item.id === +req.params.item_id))
    .then(ite => res.status(200).json(ite))
    .catch(err => res.json({ error: "no such item" }))
})

//update a bucket list item
router.put('/:id/items/:item_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  BucketList.findById(req.params.id)
    .then(bucketlist => bucketlist.items)
    .then(items => items.filter(item => item.id === +req.params.item_id))
    .then(updatedItem => {
      updatedItem.name = res.body.name,
        updatedItem.done = res.body.done,
        updatedItem.id = res.body.id
    })
})


module.exports = router;