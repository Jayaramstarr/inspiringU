const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');

const User = require('../models/User');
const Quote = require('../models/Quote');


// @route     GET api/quotes
// @desc      Get all quotes
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const quotes = await Quote.find({}).sort({ date: -1, });
    res.json(quotes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// // @route     GET api/quotes/user
// // @desc      Get all users quotes
// // @access    Private
// router.get('/user', auth, async (req, res) => {
//   try {
//     const quotes = await Quote.find({user: req.user.id}).sort({
//       date: -1,
//     });
//     res.json(quotes);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// @route     POST api/quotes
// @desc      Add new quote
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    try {
      const newquote = new Quote({
        ...req.body,
        user: req.user.id,
      });

      const quote = await newquote.save();

      res.json(quote);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route     PUT api/quotes/:id
// @desc      Update quote
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const {name} = req.body;

  // Build quote object
  const quoteFields = {};
  if (name) quoteFields.name = name

  try {
    let quote = await Quote.findById(req.params.id);

    if (!quote) return res.status(404).json({msg: 'Quote not found'});

    // Make sure user owns quote
    if (quote.user.toString() !== req.user.id) {
      return res.status(401).json({msg: 'Not authorized'});
    }

    quote = await Quote.findByIdAndUpdate(
      req.params.id,
      {$set: quoteFields},
      {new: true},
    );

    res.json(quote);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/quotes/:id
// @desc      Delete quote
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let quote = await Quote.findById(req.params.id);

    if (!quote) return res.status(404).json({msg: 'Quote not found'});

    // Make sure user owns quote
    if (quote.user.toString() !== req.user.id) {
      return res.status(401).json({msg: 'Not authorized'});
    }

    await Quote.findByIdAndRemove(req.params.id);

    res.json({msg: 'Quote removed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
