myApp.controller('empController', function($scope, $http, $route, $routeParams){
	//$scope.getEmployees = "Angular JS";
 
	//Service to list employees details
	$scope.getEmployees = function(){
		$http.get('/api/employees').then(function(response){
			console.log(response);
			$scope.employees = response.data;	//puts the data into the html/view
		});
	};

	//Service to show employees details
	$scope.showEmployee = function(){
		var id = $routeParams.id;
		$http.get('/api/employees/' + id).then(function(response){
			console.log(response);
			$scope.employee = response.data;
		});
	};

	//Service to add employees
	$scope.addEmployee = function(){
		//console.log($scope.employee);
		$http.post('/api/employees/', $scope.employee).then(function(response){	//$scope.employee --> input data we are gonna send to server 
			//$scope.employee = response.data;
			window.location.href = '/';
		});
	};

	//Service to update employees
	$scope.updateEmployee = function(){
		var id = $routeParams.id;
		$http.put('/api/employees/' + id, $scope.employee).then(function(response){
			//$scope.employee = response.data;
			window.location.href = '/';
		});
	};

	//Service to delete employees
	$scope.deleteEmployee = function(id){
		var id = id;
		$http.delete('/api/employees/' + id, $scope.employee).then(function(response){
			//$scope.employee = response.data;
			$route.reload();
		});
	};
});