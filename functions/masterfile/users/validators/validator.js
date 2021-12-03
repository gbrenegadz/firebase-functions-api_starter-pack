const { check, validationResult } = require('express-validator');

exports.requestValidator = [
    check('name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('User name can not be empty!')
    .bail()
    .isLength({min: 3})
    .withMessage('Minimum 3 characters required!')
    .bail(),
  check('jobTitle')
    .trim()
    .isEmail()
    .withMessage('Invalid email address!')
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage('Required')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
]