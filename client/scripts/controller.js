var myApp = angular.module('myApp');

myApp.controller('HomeController', ['$scope', '$http', '$location', 'servicesFactory', function ($scope, $http, $location, servicesFactory) {
    console.log('home controller');
    $scope.services = servicesFactory;
    let serviceIndex = 0;
    $scope.contact = {'name': '', 'email': '', 'message': ''};
    $scope.selectedService = $scope.services[serviceIndex];


    $scope.rightChange = function () {
        fade();
        if (serviceIndex === $scope.services.length - 1) {
            serviceIndex = 0;
        } else {
            serviceIndex++;
        }
        $scope.selectedService = $scope.services[serviceIndex]
    };
    $scope.leftChange = function () {
        fade();
        if (serviceIndex === 0) {
            serviceIndex = $scope.services.length - 1;
        } else {
            serviceIndex--;
        }
        $scope.selectedService = $scope.services[serviceIndex]
    };


    function fade() {
        $scope.fadeIn = true;
        setTimeout(function () {
            $scope.fadeIn = false;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, 500);
    }

    console.log($scope.services);
    console.log($location.hash(), $location.absUrl());
}]);

myApp.controller('AboutController', ['$scope', '$http', function ($scope, $http) {
    $scope.basements = ['../assets/images/fakebasement1.png','../assets/images/fakebasement2.png','../assets/images/fakebasement3.png','../assets/images/fakebasement4.png','../assets/icons/BatteryBackUpIcon.png','../assets/icons/HeaderLogo.png','../assets/icons/InsulationIcon.png','../assets/images/HowDoYouWaterproofBackground.png'];
    $scope.index = 0;

    $scope.rightChange = function(){
        fade();
        if($scope.index < $scope.basements.length -1){
            $scope.index ++;
        }else{
            $scope.index = 0;
        }
    };

    $scope.leftChange = function(){
        fade();
        if($scope.index === 0){
            $scope.index = $scope.basements.length -1;
        }else{
            $scope.index --;
        }
    };
    $scope.openModal = function(i){
        $scope.selectedIndex = i;
        $scope.imageModal = true;
    };
    $scope.closeModal = function(){
        $scope.imageModal = false;
    };
    $scope.stayOpen = function($event){
        $event.stopPropagation();
    };

    $scope.getBasementIndex = function(i){
        var offset = 0;
        if(i > $scope.basements.length -1){
            offset = i-($scope.basements.length);
            return $scope.basements[offset]
        }
        return $scope.basements[i];
    };
    function fade() {
        $scope.fadeIn = true;
        setTimeout(function () {
            $scope.fadeIn = false;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, 500);
    }

}]);

myApp.controller('ProcessController', ['$scope', '$http', function ($scope, $http) {
    console.log('process controller')


}]);

myApp.controller('ServicesController', ['$scope', '$http', 'servicesFactory', function ($scope, $http,servicesFactory) {
    console.log('service controller')
    $scope.services = servicesFactory;
    console.log($scope.services);
}]);

myApp.controller('CausesController', ['$scope', '$http', function ($scope, $http) {
    console.log('causes controller')

}]);

myApp.directive('footer', function(){
    let controller = ['$scope', function($scope){
        $scope.year = new Date().getFullYear();

    }];
    return {
        scope : {},
        restrict: 'EA',
        controller: controller,
        templateUrl: '/assets/views/directives/footer.html'
    }
});

myApp.directive('navbar', function () {
    let controller = ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.showNav = $window.innerWidth < 940 ? false : true;
        $scope.hideNav = false;
        $scope.toggleNav = function () {
            $scope.showNav = !$scope.showNav;
            !$scope.showNav ? $scope.hideNav = true : $scope.hideNav = false;
            console.log($scope.showNav, $scope.hideNav)
        };
        $window.onresize = function () {
            console.log($window.innerWidth)
            if ($window.innerWidth < 940) {
                $scope.showNav = false;
            } else {
                $scope.showNav = true;
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }

        };
        $scope.isActive = function (route) {
            if ($location.path() === route) {
                return true;
            }
            return false;
        }
    }];
    return {
        scope: {},
        restrict: 'EA',
        controller: controller,
        templateUrl: '/assets/views/directives/navbar.html'
    };
});

myApp.factory('servicesFactory', function () {
    const servicesArray = [{
        'title': 'Battery Backup Systems',
        'src': './assets/icons/BatteryBackUpIcon.png',
        'desc': 'Here were going to have some text on battery backup.  Mainly it will just be in a short description on what it is and maybe how its implemented'
    },
        {
            'title': 'New Construction Insulation',
            'src': './assets/icons/InsulationIcon.png',
            'desc': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
        },
        {
            'title': 'Mold Resistant Panels',
            'src': './assets/icons/MoldResistantIcon.png',
            'desc': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
        },
        {
            'title': 'Sump Baskets',
            'src': './assets/icons/SumpBasketIcon.png',
            'desc': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
        },
        {
            'title': 'Sump Pumps',
            'src': './assets/icons/SumpPumpIcon.png',
            'desc': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
        },
        {
            'title': 'Sump Pump Discharge',
            'src': './assets/icons/SumpPumpDischargeIcon.png',
            'desc': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
        },
        {
            'title': 'Wall and Floor Moisture Solutions',
            'src': './assets/icons/WallFloorIcon.png',
            'desc': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
        },
        {
            'title': 'Wall Straightening',
            'src': './assets/icons/WallStraighteningIcon.png',
            'desc': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
        },
        {
            'title': 'Interior Waterproofing Systems',
            'src': './assets/icons/WaterproofSystemsIcon.png',
            'desc': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
        },        {
            'title': 'Window Wells',
            'src': './assets/icons/WindowWellsIcon.png',
            'desc': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
        },
    ];

    return servicesArray;
});

