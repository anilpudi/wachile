!function(){angular.module("components",[])}(),function(){angular.module("components").directive("customBrand",[function(){return{template:'<a class="navbar-brand" href="#">{{brandName}}</a>',restrict:"E,A,C,M"}}])}(),function(){angular.module("components").directive("customHeader",[function(){return{templateUrl:"app/templates/header.html",restrict:"A",controller:"headerCtrl",link:function(e,t,n){console.log(e),console.log(t),console.log(n)}}}])}(),function(){angular.module("components").directive("numbersOnly",[function(){return{restrict:"A",link:function(e,t,n){t.bind("keypress",function(e){console.log(this.value);var t=RegExp(/^\d+$/);(!t.test(e.key)||this.value.length>n.length)&&e.preventDefault()})}}}]),angular.module("components").directive("alphabetsOnly",[function(){return{restrict:"A",link:function(e,t,n){t.bind("keypress",function(e){var t=RegExp(/^[a-zA-z. ]+$/);t.test(e.key)||e.preventDefault()})}}}]),angular.module("components").directive("customDatepicker",[function(){return{restrict:"A",link:function(e,t,n){var o={};n.mindate&&(o.minDate=n.mindate),n.maxdate&&(o.maxDate=n.maxdate),t.datepicker(o)}}}]),angular.module("components").directive("parent",[function(){return{restrict:"A",template:"<h1>I am the parent. <div child-dir></div></h1>",controller:function(e){console.log("I am the controller")},compile:function(e,t){return console.log(e),{pre:function(e,t,n){e.parentName="John",console.log("i am the parent"),console.log("pre Link")},post:function(e,t,n){console.log("Post Link")}}}}}]),angular.module("components").directive("childDir",[function(){return{restrict:"A",template:"<h1>Hey i am the child:{{parentName}}</h1>",compile:function(e,t){return console.log(e),{pre:function(e,t,n){console.log("pre Link")},post:function(e,t,n){console.log(e.parentName),console.log("i am the child"),console.log("Post Link")}}}}}])}(),function(){angular.module("components").filter("rangeFilter",[function(){return function(e,t){var n=[];return t&&t.min&&t.max?(_.each(e,function(e){e.Price>=t.min&&e.Price<t.max&&n.push(e)}),n):e}}])}(),angular.module("header",[]),function(){angular.module("header").controller("headerCtrl",["$scope","build","$translate",function(e,t,n){console.log(t),e.vehicleCount=0,e.total=0,e.brandName="VehicleDeals App",e.$on("VEHICLE-ADDED",function(t,n){e.total+=n.veh.Price,e.vehicleCount++}),e.$on("VEHICLE-REMOVED",function(t,n){e.total-=n.veh.Price,e.vehicleCount--}),e.changeLanguage=function(e){n.use(e)}}])}(),function(){"use strict";angular.module("home",[])}(),function(){angular.module("home").controller("homeCtrl",function(e,t){console.log(t.params)})}(),function(){"use strict";angular.module("login",[]),angular.module("login").config([function(){console.log("I am the login Module")}])}(),function(){angular.module("lookup",[])}(),function(){angular.module("lookup").factory("lookupFact",[function(){return{getCountryList:function(){return[{key:"IN",value:"India"},{key:"US",value:"United States"}]},getStateList:function(){return[{countryCode:"IN",key:"TG",value:"Telangana"},{countryCode:"IN",key:"AP",value:"Andhra Pradesh"},{countryCode:"US",key:"TX",value:"Texas"},{countryCode:"US",key:"NY",value:"New York"}]}}}])}(),function(){angular.module("lookup").service("lookupSvc",function(){this.getCountryList=function(){return[{key:"IN",value:"India"},{key:"US",value:"United States"}]},this.getStateList=function(){return[{countryCode:"IN",key:"TG",value:"Telangana"},{countryCode:"IN",key:"AP",value:"Andhra Pradesh"},{countryCode:"US",key:"TX",value:"Texas"},{countryCode:"US",key:"NY",value:"New York"}]}})}(),angular.module("vehicleDealsApp",[]).provider("build",[function(){this.version="1.0.0",this.$get=function(){return this.version}}]),function(){"use strict";angular.module("register",[])}(),function(){"use strict";angular.module("register").controller("registerCtrl",function(e,t,n,o){e.userDetails={terms:!1},e.countries=o.getCountryList();var r=n.getStateList();e.loadStates=function(){e.stateList=[],angular.forEach(r,function(t){t.countryCode===e.selectedCountry.key&&e.stateList.push(t)}),console.log(e.stateList)},e.registerUser=function(){console.log(e.userDetails),t.go("home",{userDetails:e.userDetails})}})}(),angular.module("vehicles",[]),function(){angular.module("vehicles").controller("vehicleCtrl",["$scope","vehicleSvc","$rootScope",function(e,t,n){e.filterRange=[{range:"between 100000 to 300000",min:1e5,max:3e5},{range:"between 300000 to 500000",min:3e5,max:5e5},{range:"between 800000 to 1200000",min:8e5,max:12e5},{range:"between 1000000 to 1500000",min:1e6,max:15e5},{range:"between 1000000 to 9900000",min:1e6,max:99e5}],t.getVehicles().then(function(t){e.vehicles=t.data.vehicles}).catch(function(t){e.showError=t}),e.changeSort=function(){"Price"==e.sortBy?e.sortBy="=Price":e.sortBy="-Price"},e.selectVehicle=function(e){e.isSelected=!0,n.$broadcast("VEHICLE-ADDED",{veh:e})},e.removeVehicle=function(e){e.isSelected=!1,n.$broadcast("VEHICLE-REMOVED",{veh:e})},e.$watch("searchByModel",function(e,t){console.log("Old Value is: "+t),console.log("New Value is: "+e)}),setTimeout(function(){e.searchByModel="WagonR",e.$apply()},3e3)}])}(),function(){angular.module("vehicles").service("vehicleSvc",["$http","$q",function(e,t){function n(e){return _.each(e.data.vehicles,function(e){e.discount=.1}),e}var o;this.getVehicles=function(){var r=t.defer();return o?r.resolve(o):e.get("app/api/vehicles.json").then(function(e){var t=n(e);o=t,r.resolve(o)}).catch(function(e){r.reject(e)}),r.promise}}])}(),function(){"use strict";angular.module("vehicleDeals",["login","register","ui.router","home","lookup","vehicles","components","header","vehicleDealsApp","pascalprecht.translate"]),angular.module("vehicleDeals").config(["$stateProvider","buildProvider","$translateProvider",function(e,t,n){console.log(t.version),n.translations("en",{LOGIN:"Login",TOTAL:"This is a paragraph.",CART:"Cart",REGISTER:"Register",VEHICLES:"Vehicles",HOME:"Home"}),n.translations("de",{LOGIN:"Anmeldung",TOTAL:"Gesamt",CART:"Carte",REGISTER:"Neu registrieren",VEHICLES:"Fahrzeug",HOME:"Zuhause"}),n.preferredLanguage("de");var o="app/templates/",r={templateUrl:o+"home.html",params:{userDetails:""},controller:"homeCtrl"},l={templateUrl:o+"register.html",controller:"registerCtrl"},a={templateUrl:o+"login.html"},i={templateUrl:o+"vehicles.html",controller:"vehicleCtrl"};e.state("home",r),e.state("vehicles",i),e.state("login",a),e.state("register",l)}]).run(function(){console.log("finally")})}();