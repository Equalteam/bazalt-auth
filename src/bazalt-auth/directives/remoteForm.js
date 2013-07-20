define('bazalt-auth/directives/remoteForm', ['bazalt-auth/app'], function(module) {

    module.directive('remoteForm', ['$log', function ($log) {
        return {
            'restrict':'A',
            'scope':false,
            'require': 'form',
            'controller': ['$scope', function ($scope) {
                $scope.invalidForm = function() {
                    
                }
            }],

            'link': function (scope, element, attrs, ctrl) {
                ctrl.invalidForm = function(data) {
                    ctrl.$setDirty();
                    $log.error(data);
                    angular.forEach(data, function(field, fieldName) {
                        var ctr = ctrl[fieldName] || null;
                        if (!ctr) {
                            $log.error('Field not found', fieldName);
                        }
                        angular.forEach(field, function(error, validator) {
                            if (!ctr) {
                                $log.error(ctr, error);
                            } else {
                                ctr.$dirty = true;
                                ctr.$setValidity(validator, false);
                            }
                        });
                    });
                }
            }
        }
    }])

});