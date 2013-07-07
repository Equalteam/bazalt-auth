define('bazalt-login/controllers/RegisterCtrl', ['bazalt-login/app'], function(module) {

    module.controller('RegisterCtrl', ['$scope', '$location', 'UserResource', 'bazaltLogin', '$q', function($scope, $location, UserResource, bazaltLogin, $q) {
        $scope.form = {};
        $scope.registerUser = function () {
            var user = new UserResource($scope.form);
            user.$register(function(res) {
                $location.path(bazaltLogin.baseUrl() + '/activationSent');
            }, function(res) {
                if (res.status == 400) $scope.register.invalidForm(res.data);
            });
        };
        $scope.checkEmail = function(email) {
            var d = $q.defer();
            UserResource.checkEmail({'email': email}, function(data) {
                d.resolve(data.valid);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };
        $scope.resendActivation = function () {
            $http.post('/account/resendActivation', $scope.form)
            .success(function(data) {
                $location.path('/activationResent');
            })
            .error(function(data, status, headers, config) {
                $scope.error = data.error.message;
            });
        };

    }]);

});