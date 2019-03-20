module.exports = {
  session: "",
  users : [],
  find: function(name){
    return this.tweets[name]
  },
  create : function(name){
    this.users.push(name)
  },
  login: function(name){
    this.session = name;
  },
  isLogin: function(){
    return this.session != ""
  }
}