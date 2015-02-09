
function showTemplate()
{
  document.querySelector("#LoginTemplate")
}

var mediaApp = angular.module('mediaApp', []);


mediaApp.service('userData', function() {
  this.objUsers = {};

  this.addUser = function(_strUsername, _strPassword){
    if (!this.objUsers[_strUsername]){
      var useUser = new objUser(_strUsername, _strPassword)
      this.objUsers[_strUsername] = useUser;
    }
  }
  this.checkPassword = function (username, password){
    objUser = this.objUsers[username]
    if (objUser && password == objUser.strPassword){
      return objUser
    }
    else{
      return false
    }
  }

  objUser = function(_strUsername, _strPassword){
    this.strUsername = _strUsername;
    this.strPassword = _strPassword;
    this.arrMedia = [];
  }
  objUser.prototype.funGetMedia = function(){
      return "shutup"
  }
});


mediaApp.service('mediaData', function() {

  //this.objCurrMediaItem = null;
  this.arrAlbums = [];
  this.arrMediaItems = [];
  this.arrGenreOptions = [];
  this.arrTypeOptions = ["Audio", "Video"];

  this.addAlbum = function(_arrArtists, _strName, _strType, _strGenre, _arrMediaItems){
    var albAlbum = new objAlbum(_arrArtists, _strName, _strType, _strGenre, _arrMediaItems)
    this.arrAlbums.push(albAlbum)
  }
  this.addMediaItem = function(_arrArtists, _strName, _strType, _strGenre){
    var medMediaItem = new objMediaItem(_arrArtists, _strName, _strType, _strGenre)
    this.arrMediaItems.push(medMediaItem)
  }

  var objAlbum = function(_arrArtists, _strName, _strType, _strGenre, _arrMediaItems){
    this.arrArtists = _arrArtists;
    this.strName = _strName;
    this.strType = _strType;
    this.strGenre = _strGenre;
    this.arrMediaItems = _arrMediaItems;
  }
  var objMediaItem = function(_arrArtists, _strName, _strType, _strGenre){
    this.arrArtists = _arrArtists;
    this.strName = _strName;
    this.strType = _strType;
    this.strGenre = _strGenre;
  }

});

mediaApp.controller('mediaController', ['$scope', 'userData', 'mediaData',  function ($scope, userData, mediaData) {

  $scope.userData = userData;
  $scope.userData.addUser("testing", "123")

  $scope.loginPage = 'login.html'
  $scope.tabs = [{
        title: 'Profile',
        url: 'profile.html'
      }, {
        title: 'Accounts',
        url: 'accounts.html'
      }, {
        title: 'Media',
        url: 'media.html'
      }
  ];

  $scope.currentPage = $scope.loginPage;
  $scope.currUser = null;

  $scope.onClickTab = function (tab) {
    $scope.showTab(tab.url)
   }
  $scope.showTab = function(url){
    $scope.currentPage = ($scope.currUser? url : $scope.loginPage);
    $scope.currentPage = ($scope.currUser? url : "");
  }
  $scope.isActiveTab = function(tabUrl) {
    return (tabUrl == $scope.currentPage ? "active" : "")
  }

  $scope.onLoginClick = function(username, password){
    $scope.currUser = userData.checkPassword(username, password)
    $scope.showTab('profile.html')
  }

  $scope.saveUser = function(){
    $scope.userData.addUser(newUserData.strUsername, newUserData.strPassword)
  }
  
}]);

