/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('store')
        .constant('SERVER_URL', '/api/products')
        .factory('products', ['SERVER_URL', '$http', function (server, $http) {
                var o = {products: []};
                o.getAll = function (limit, skip, sort) {
                    $http.get(server, {
                        params: {
                            limit: limit,
                            skip: skip,
                            sort: sort
                        }
                    })
                            .success(function (data) {
                                o.products = data;
                            })
                            .error(function (data) {
                                o.products = [];
                            });
                };

                return o;
            }])
        .controller('ProductsController', ['products', '$scope', function ($products, $scope) {
                var skip = 0;
                $scope.products = [];
        
                $scope.loadProducts = function(){
                    skip +=20;
                };
                
        }])
        .directive('whenScrolled', function () {
            return function (scope, elm, attr) {
                var raw = elm[0];

                elm.bind('scroll', function () {
                    if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                        scope.$apply(attr.whenScrolled);
                    }
                });
            };
        });
        