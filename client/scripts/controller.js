var myApp = angular.module('myApp');

myApp.controller('HomeController', ['$scope', '$http', '$location', 'servicesFactory', function ($scope, $http, $location, servicesFactory) {
    console.log('home controller');
    $scope.services = servicesFactory;
    let serviceIndex = 0;
    $scope.showSent = false;
    $scope.messageSuccess = false;
    $scope.sendingMessage = false;
    $scope.contact = {'firstName': '','lastName': '', 'number': '','email': '','city': '','state': '', 'address': ''};
    $scope.selectedService = $scope.services[serviceIndex];

    $scope.sendMessage = function(contact){
        $scope.sendingMessage = true;
        $scope.showSent = false;
        $scope.messageSuccess = false;
        $http.post('/emailRequest',contact).then(function(res){
            $scope.sendingMessage = false;
            $scope.showSent = true;
            console.log(res);
            if(res.err === false){
                $scope.messageSuccess = false;
            }else{
                $scope.messageSuccess = true;
            }

        })
    };
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
    $scope.basements = ['../assets/images/fakebasement1.png', '../assets/images/fakebasement2.png', '../assets/images/fakebasement3.png', '../assets/images/fakebasement4.png'];
    $scope.index = 0;

    $scope.rightChange = function () {
        fade();
        if ($scope.index < $scope.basements.length - 1) {
            $scope.index++;
        } else {
            $scope.index = 0;
        }
    };

    $scope.leftChange = function () {
        fade();
        if ($scope.index === 0) {
            $scope.index = $scope.basements.length - 1;
        } else {
            $scope.index--;
        }
    };
    $scope.openModal = function (i) {
        $scope.selectedIndex = i;
        $scope.imageModal = true;
    };
    $scope.closeModal = function () {
        $scope.imageModal = false;
    };
    $scope.stayOpen = function ($event) {
        $event.stopPropagation();
    };

    $scope.getBasementIndex = function (i) {
        var offset = 0;
        if (i > $scope.basements.length - 1) {
            offset = i - ($scope.basements.length);
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

myApp.controller('ServicesController', ['$scope', '$http', 'servicesFactory', function ($scope, $http, servicesFactory) {
    console.log('service controller')
    $scope.services = servicesFactory;

    $scope.openDescriptionImageModal = function (image) {
        $scope.imageModal = true;
        $scope.selectedDescriptionImage = image;
    };
    $scope.closeModal = function () {
        $scope.imageModal = false;
    };
}]);

myApp.controller('CausesController', ['$scope', '$http', function ($scope, $http) {
    console.log('causes controller')

}]);

myApp.directive('footer', function () {
    let controller = ['$scope', function ($scope) {
        $scope.year = new Date().getFullYear();

    }];
    return {
        scope: {},
        restrict: 'EA',
        controller: controller,
        templateUrl: '/assets/views/directives/footer.html'
    }
});
myApp.directive('pageheader', function(){
    let controller = ['$scope','$rootScope', function ($scope,$rootScope) {
        $scope.openContract = function(){
            $rootScope.showContactForm = true;
        }

    }];
    return {
        scope: {},
        restrict: 'EA',
        controller: controller,
        templateUrl: '/assets/views/directives/pageheader.html'
    }
});

myApp.directive('estimate', function () {
    let controller = ['$scope', '$location', '$http','$rootScope', function ($scope, $location, $http, $rootScope) {
        $scope.contact = {'firstName': '','lastName': '', 'number': '','email': '','city': '','state': '', 'address': ''};
        $scope.showSent = false;
        $scope.messageSuccess = false;
        $scope.sendingMessage = false;

        $rootScope.closeEstimate = function(){
            $rootScope.showContactForm = false;
        };
        $scope.stayOpen = function($event){
            $event.stopPropagation();
        };
        $scope.sendMessage = function(contact){
            $scope.sendingMessage = true;
            $scope.showSent = false;
            $scope.messageSuccess = false;
            $http.post('/emailRequest',contact).then(function(res){
                $scope.sendingMessage = false;
                $scope.showSent = true;
                console.log(res);
                if(res.err === false){
                    $scope.messageSuccess = false;
                }else{
                    $scope.messageSuccess = true;
                }

            })
        };
    }];
    return {
        scope: {},
        restrict: 'EA',
        controller: controller,
        templateUrl: '/assets/views/directives/estimate.html'
    };
});

myApp.directive('navbar', function () {
    let controller = ['$scope', '$location', '$window','$rootScope', function ($scope, $location, $window,$rootScope) {
        $scope.showNav = $window.innerWidth < 940 ? false : true;
        $scope.hideNav = false;
        $rootScope.showContactForm = false;
        $scope.toggleNav = function () {
            $scope.showNav = !$scope.showNav;
            !$scope.showNav ? $scope.hideNav = true : $scope.hideNav = false;
        };
        $window.onresize = function () {
            if ($window.innerWidth < 940) {
                $scope.showNav = false;
            } else {
                $scope.showNav = true;
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }

        };
        $scope.openContactModal = function(){
            $rootScope.showContactForm = true;
            console.log('roooot',$rootScope.showContactForm);

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
    const servicesArray = [
        {
            'title': 'Interior Waterproofing Systems',
            'src': './assets/icons/WaterproofSystemsIcon.png',
            'imageDescription': true,
            'imageDescriptionPath': '../assets/images/waterproofing-system.png',
            'desc': 'Drain tile installation for any amount of space for the inside of your home.'
        },
        {
            'title': 'Sump Baskets',
            'src': './assets/icons/SumpBasketIcon.png',
            'imageDescription': true,
            'imageDescriptionPath': '../assets/images/sump-basket.png',
            'desc': 'Water collection basket nested airtight into the ground of your basement.'
        },
        {
            'title': 'Sump Pumps',
            'src': './assets/icons/SumpPumpIcon.png',
            'imageDescription': true,
            'imageDescriptionPath': '../assets/images/sump-pump-closeup.png',
            'desc': 'Reliable, cast-iron pump system fitting pushes water to the exterior and away from your home.'
        },
        {
            'title': 'Battery Backup Systems',
            'src': './assets/icons/BatteryBackUpIcon.png',
            'imageDescription': true,
            'imageDescriptionPath': '../assets/images/battery-backup.png',
            'desc': 'Backup system installation for potential power outages or primary battery failure.'
        },
        {
            'title': 'New Construction Installation',
            'src': './assets/icons/InsulationIcon.png',
            'imageDescription': false,
            'imageDescriptionPath': '',
            'desc': 'Ensuring waterproofing is done correctly before final construction of homes and saving money for home buyers.'
        },
        {
            'title': 'Mold Resistant Panels',
            'src': './assets/icons/MoldResistantIcon.png',
            'imageDescription': true,
            'imageDescriptionPath': '../assets/images/mold-resistant-panels.png',
            'desc': 'Setting of panels over block or poured foundations, or prior to framing to avoid moisture within the walls.'
        },
        {
            'title': 'Sump Pump Discharge',
            'src': './assets/icons/SumpPumpDischargeIcon.png',
            'imageDescription': true,
            'imageDescriptionPath': '../assets/images/sump-pump-discharge.png',
            'desc': 'Underground or above ground water discharge system.'
        },
        {
            'title': 'Wall and Floor Moisture Solutions',
            'src': './assets/icons/WallFloorIcon.png',
            'imageDescription': false,
            'imageDescriptionPath': '',
            'desc': 'Waterproof painting, crack repair and vapor barriers to prevent mold or moisture.'

        },
        {
            'title': 'Window Wells',
            'src': './assets/icons/WindowWellsIcon.png',
            'imageDescription': true,
            'imageDescriptionPath': '../assets/images/window-wells.png',
            'desc': 'Water drainage of your window well into our waterproofing system.'
        },
    ];

    return servicesArray;
});

