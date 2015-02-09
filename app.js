
function showTemplate()
{
  document.querySelector("#LoginTemplate")
}

var mediaApp = angular.module('mediaApp', []);


mediaApp.service('userData', function() {
  this.objUsers = {};

  objUser = function(_strUsername, _strPassword){
    this.strUsername = _strUsername;
    this.strPassword = _strPassword;
    this.arrMedia = [];
  }

  objUser.prototype.funGetMedia = function(){
      return "Hi"
  }

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

  this.addUser("testing", "123");
});


mediaApp.service('mediaData', function() {

  //this.objCurrMediaItem = null;
  this.arrAlbums = [];
  this.arrMediaItems = [];
  this.objGenres = {} // {name : count} // will increment as media Types are added - can then be added to a drop down hopefully!
  this.objTypeOptions = { // {name : count} // will increment as media Types are added - can then be added to a drop down hopefully!
    "Audio" : 0,
    "Video" : 0
  };

  this.addAlbum = function(_arrArtists, _strName, _strType, _strGenre, _arrMediaItems){
    var albAlbum = new objAlbum(_arrArtists, _strName, _strType, _strGenre, _arrMediaItems)
    this.arrAlbums.push(albAlbum)
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

  this.addMediaItem = function(_arrArtists, _strName, _strType, _strGenre){
    var medMediaItem = new objMediaItem(_arrArtists, _strName, _strType, _strGenre)
    this.arrMediaItems.push(medMediaItem)

    if(!this.objTypeOptions[_strType]){
      this.objTypeOptions[_strType] = 0
    }else{
        this.objTypeOptions[_strType]++
    }
    if(!this.objGenres[_strGenre]){
      this.objGenres[_strGenre] = 0
    }else{
        this.objGenres[_strGenre]++
    }
  }

  this.addMediaItem(["Curtis Mayfield"], "Move On Up", "Audio", "FUNK")
  this.addMediaItem(["Groove Armada"], "At the River", "Audio", "Trip Hop")
  this.addMediaItem(["SL2", "Someone else"], "On a Ragga Tip", "Audio", "Jungle")

});

mediaApp.controller('mediaController', ['$scope', 'userData', 'mediaData',  function ($scope, userData, mediaData) {

  $scope.userData = userData;
  $scope.mediaData = mediaData;

  $scope.loginPage = {
        strTitle: 'Login',
        strMainUrl: 'login.html',
        strSideUrl: ''
      }
  $scope.tabs = [{
        strTitle: 'Accounts',
        strMainUrl: 'accounts.html',
        strSideUrl: 'sideAccounts.html'
      }, {
        strTitle: 'Media',
        strMainUrl: 'media.html',
        strSideUrl: 'sideMedia.html'
      }
  ];

  $scope.currentPage = $scope.loginPage;
  $scope.currUser = false;

  $scope.onClickTab = function (tab) {
    $scope.showTab(tab)
   }
  $scope.showTab = function(tab){
    $scope.currentPage = ($scope.currUser? tab : $scope.loginPage);
  }
  $scope.isActiveTab = function(tabUrl) {
    return (tabUrl == $scope.currentPage ? "active" : "")
  }

  $scope.onLoginClick = function(username, password){
    $scope.currUser = userData.checkPassword(username, password)
    $scope.showTab($scope.tabs[0])
  }

  $scope.saveUser = function(){
    $scope.userData.addUser(newUserData.strUsername, newUserData.strPassword)
  }
  
}]);

