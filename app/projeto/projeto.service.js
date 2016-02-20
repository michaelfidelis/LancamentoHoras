(function () {
    'use strict';
    angular.module('app')
        .factory('ProjetoService', ProjetoService);

    ProjetoService.$inject = ['$http'];

    function ProjetoService($http) {

        var service = {
            listarProjetos: listarProjetos
        };
        return service;

        function listarProjetos() {
            return $http.get('./app/projeto/projetos.json');
        }
    }

}());
