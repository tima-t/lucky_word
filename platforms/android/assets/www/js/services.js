var services = angular.module('starter.services',[])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.service('LoginService',function(api,$q,$http,$httpParamSerializerJQLike) {
    return {

        loginUser: function(name, pw) {
					console.log("dadasdasd");
            var deferred = $q.defer();
            var promise = deferred.promise;
						var req =
						{
 							method: 'POST',
 							url: api+'/login',
							data: $httpParamSerializerJQLike({
      				"username":name,
      				"pass":pw
						}),
							headers: {'Content-Type': 'application/x-www-form-urlencoded'}
						}
						$http(req).then(
							function(resp){
								if(resp.data.status.code == 1 ){
									window.localStorage.setItem("token", resp.data.content.token);
									window.localStorage.setItem("username", name);
									deferred.resolve(resp.data);
								}
								else{
									console.log(resp);
								deferred.reject(resp.data);
								}
							},
							function(resp){
								deferred.reject(resp.data);
							});
            return promise;
        }
    }
})

.service('RegisterService',function(api,$q,$http,$httpParamSerializerJQLike) {
    return {

        loginUser: function(name,email,pw) {
            var deferred = $q.defer();
										console.log(name,email,pw);
            var promise = deferred.promise;
						var req =
						{
 							method: 'POST',
 							url: api+'/register',
							data: $httpParamSerializerJQLike({
      				"username":name,
							"email":email,
      				"pass":pw
							}),
							headers: {'Content-Type': 'application/x-www-form-urlencoded'}
						}
						$http(req).then(
							function(resp){
								if(resp.data.status.code == 1 ){
									console.log(resp);
									window.localStorage.setItem("token", resp.data.content.token);
									window.localStorage.setItem("username", name);
									deferred.resolve(resp.data);
								}
								else{
									console.log(resp);
								deferred.reject(resp.data);
								}
							},
							function(resp){
								console.log(resp);
								deferred.reject(resp.data);
							});
            return promise;
        }
    }
})


.service('LogoutService',function(api,$q,$http,$httpParamSerializerJQLike) {
    return {

        logoutUser: function() {
            var deferred = $q.defer();
            var promise = deferred.promise;
						var token = window.localStorage.getItem("token");
						var name = window.localStorage.getItem("username");
						var req =
						{
 							method: 'POST',
 							url: api+'/logout',
							data: $httpParamSerializerJQLike({
								"username": name ,
							}),
							headers:{
								'Content-Type': 'application/x-www-form-urlencoded',
								'token': token
								}
						}
						$http(req).then(
							function(resp){
								if(resp.data.status.code == 1 ){
									console.log(resp);
									window.localStorage.removeItem("token");
									window.localStorage.removeItem("username");
									deferred.resolve(resp.data);
								}
								else{
									console.log(resp);
								deferred.reject(resp.data);
								}
							},
							function(resp){
								console.log(resp);
								deferred.reject(resp.data);
							});
            return promise;
        }
    }
})/*.run(function($http,$httpParamSerializerJQLike) {
	console.log("here");
  $http.defaults.headers.common.Authorization = $httpParamSerializerJQLike({
		"token" : window.localStorage.getItem("token")
	});
  //or try this
  //$http.defaults.headers.common['Auth-Token'] = window.localStorage.getItem("token");
});*/
