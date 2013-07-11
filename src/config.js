require.config({
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-resource': {
            deps: ['angular']
        }
    },
    paths: {
        'jquery': '../bower_components/jquery/jquery.min',
        'angular': '../bower_components/angular/angular.min',
        'angular-resource': '../bower_components/angular/angular-resource',
        'angular-cookies': '../bower_components/angular/angular-cookies'
    }
});