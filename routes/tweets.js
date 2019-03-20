const express = require('express')
const bodyParser = require('body-parser')
const rounter = express.Router()
const urlencodedParser = bodyParser.urlencoded({ extended: true})


const User = require('../models/user.js')

const Tweet = require('../models/tweet.js')

rounter.route('/new').get(function(rq, rs){
  let user = ""
  if(User.isLogin())
    user = User.session
  else
    rs.redirect('/users/login')
  rs.render('tweets/new', { user : user})
})

rounter.route('/:id/edit').get(urlencodedParser, function(rq, rs){
  const { id } = rq.params
  const tweet = Tweet.findById(id)
  if(tweet.length > 0)
    rs.render('tweets/edit', { user : tweet[0].user, id : id, msg : tweet[0].msg })
  else
    rs.redirect('/tweets')
})

rounter.route('/:id').get(urlencodedParser, function(rq, rs){
  console.log("GET rq.query", rq.query)
  const { id } = rq.params
  const tweet = Tweet.findById(id)
  if(tweet.length > 0)
    rs.render('tweets/get', { user : tweet[0].user, id : id, msg : tweet[0].msg })
  else
    rs.redirect('/tweets')
}).put(urlencodedParser, function(rq, rs){
  console.log("PUT rq.body", rq.body)
  const { id } = rq.params
  const { msg } = rq.body
  Tweet.update(id, msg);
  
  rs.redirect('/tweets')
}).delete(urlencodedParser, function(rq, rs){
  console.log("DELETE rq.params", rq.params)
  const { id } = rq.params
  Tweet.delete(id);
  
  rs.redirect('/tweets')
})

rounter.route('/').get(function(rq, rs){
  let user = ""
  if(User.isLogin()){
    user = User.session
  }else
    rs.redirect('/users/login')
  const tweets = Tweet.findAll()
  rs.render('tweets/index', { tweets: tweets, user : user})
}).post(urlencodedParser, function(rq, rs){
  const { user, msg } = rq.body
  Tweet.create(msg, user)
  rs.redirect(`/tweets`)
})

// rounter.route('/session').post(function(rq, rs){
//   rs.redirect('/tweets')
// })

module.exports = rounter