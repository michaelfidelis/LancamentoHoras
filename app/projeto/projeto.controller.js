(function () {
    'use strict';
    angular.module('app')
        .controller('ProjetoController', ProjetoController);

    ProjetoController.$inject = ['ProjetoService'];

    function ProjetoController(ProjetoService) {
        var vm = this;
        vm.projetos = [];
        vm.lancamento = {
            dataInicial: new Date(),
            dataFinal: new Date()
        };
        vm.lancamento.datas = [];

        vm.listarProjetos = listarProjetos;
        vm.listarDatas = listarDatas;

        vm.listarProjetos();

        function listarProjetos() {
            ProjetoService.listarProjetos().then(isSuccess, isError);

            function isSuccess(data) {
                vm.projetos = data.data;
            }

            function isError() {
                console.log("Erro ao obter projetos...");
            }
        }

        function listarDatas() {
            var dataInicial = angular.copy(vm.lancamento.dataInicial);
            var dataFinal = angular.copy(vm.lancamento.dataFinal);

            vm.lancamento.datas = [];
            while (dataInicial <= dataFinal) {
                var diaFormatado = dataInicial.getDate() > 9 ? dataInicial.getDate() : '0' + dataInicial.getDate();
                var mesFormatado =
                    (dataInicial.getMonth() + 1) > 9 ? (dataInicial.getMonth() + 1) : '0' + (dataInicial.getMonth() + 1);
                var dataFormatada = diaFormatado + '/' + mesFormatado + '/' + dataInicial.getFullYear();

                dataInicial = new Date(dataInicial.getTime() + (24 * 60 * 60 * 1000));
                vm.lancamento.datas.push({
                    data: angular.copy(dataFormatada),
                    horas: 0,
                    descricao: ''
                });
                console.info(dataFormatada);
            }
        }

    }
}());
