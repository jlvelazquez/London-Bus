'use strict';

/**
 * @ngdoc function
 * @name stopBusApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stopBusApp
 */

var app = angular.module('stopBusApp');
/**** Function service (serviceBus) *****/
app.service('serviceBus', function($q, $rootScope, $http) {
    var dataBusStop = function() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'scripts/data/service.json'
        }).success(function(data) {
            deferred.resolve(data);
        }).error(function() {
            alert('Error loading service');
        });
        return deferred.promise;
    }
    return {
        dataBusStop: dataBusStop
    }
});

/**** Function controller (MainCtrl) *****/
app.controller('MainCtrl', function($scope, serviceBus) {
    serviceBus.dataBusStop().then(function(data) {
        $scope.markers = data.markers;

    });

    /* ==== Open infoWindows ====*/
    $scope.onMarkerClicked = function(marker) {
        _.each($scope.map.markers, function(mker) {
            mker.showWindow = false;
        });
        marker.showWindow = true;
    };

    /* ==== Initial location ====*/
    $scope.map = {
        current_marker: {},
        control: {},
        markers: [],
        center: {
            latitude: 51.51562765960321,
            longitude: -0.07228660115673055,
        },
        zoom: 15
    };

    $scope.markClick = true; // Click Markers
});