const express = require('express')
const bodyParser = require('body-parser')
const rounter = express.Router()

const urlencodedParser = bodyParser.urlencoded({ extended: true})

const User = require('../models/user.js')

rounter.route('/login').get(function(rq, rs){
  rs.render('users/login', { loginPage : true })
})

rounter.route('/session').post(urlencodedParser, function(rq, rs){
  const { name } = rq.body
  User.create(name)
  User.login(name)
  rs.redirect(`/tweets`)
})

module.exports = rounter