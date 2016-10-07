angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password)
				.then(
					function(data){
						  $state.go('tab.dash');
					}
					,function(error){
						var alertPopup = $ionicPopup.alert({
								title: 'Login failed!',
								template: (error.status.message || "our server is down , try later")
						});
					}
				)
    }
})

.controller('RegisterCtrl', function($scope, RegisterService, $ionicPopup, $state) {
    $scope.data = {};
    $scope.register = function() {
        RegisterService.loginUser($scope.data.username, $scope.data.email, $scope.data.pass)
				.then(
					function(data){
						  $state.go('tab.dash');
					}
					,function(error){
						var alertPopup = $ionicPopup.alert({
								title: 'Register failed!',
								template: (error.status.message || "our server is down , try later")
						});
					}
				)
    }
})
.controller('LogoutCtrl', function($scope, LogoutService, $ionicPopup, $state) {
    $scope.data = {};
    $scope.logout = function() {
        LogoutService.logoutUser()
				.then(
					function(data){
						var alertPopup = $ionicPopup.alert({
								title: 'Logged out!',
								template: (data.status.message || "our server is down , try later")
						});
						  $state.go('login');
					}
					,function(error){
						var alertPopup = $ionicPopup.alert({
								title: 'Logout failed!',
								template: (error.status.message || "our server is down , try later")
						});
						$state.go('tab.dash');
					}
				)
    }
})
