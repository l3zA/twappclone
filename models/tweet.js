module.exports = {
  tweets : [],
  findAll: function(){
    return this.tweets
  },
  findById: function(id){
    if(typeof id !== 'undefined'){
      const tweet = this.tweets.filter(function(tweet){
        return tweet.id == id
      })
      return tweet;
    }else{
      return null
    }
  },
  update: function(id, msg){
    if(typeof id !== 'undefined' && typeof msg !== 'undefined'){
      this.tweets.filter(function(tweet){
        console.log('tweet', tweet)
        if(tweet.id == id){
          tweet.msg = msg
        }
      })
    }else{
      return null
    }
  },
  delete: function(id){
    if(typeof id !== 'undefined'){
      const index = this.tweets.findIndex(tweet => tweet.id == id);
      this.tweets.splice(index, 1);
    }else{
      return null
    }
  },
  create : function(msg, user){
    if(this.tweets){
      const tweet = {
        id : this.id++,
        msg : msg,
        user : user
      }
      this.tweets.unshift(tweet)
    }else{
      const tweet = {
        id : this.id++,
        msg : msg,
        user : user
      }
      this.tweets.unshift(tweet)
    }
  }
}