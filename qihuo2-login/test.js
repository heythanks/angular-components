var app = angular.module('myapp', [])
app.controller('myCtrl', function($scope, $interval,$timeout) {
    $scope.login = true;
    $scope.clickFn = function() {
        console.log($scope.login, "dd")

        $scope.timeDelay();
        
        $scope.login = !$scope.login;
    }
    $scope.step = 0; //0第一步，1第二步，2第三步
    $scope.goStep = function(step) {
        $scope.step = step;
        if (step === 2) {
            //开始倒计时
            $scope.start()
        }
    }
    //延时执行
    $scope.timeDelay = function(){
    	timerTwo = $timeout(function(){
    		console.log("我延时执行了")
    		$scope.initTimer()
    		$scope.step = 0;
    	},1000)
    }
    $scope.second = 5;
    //倒计时初始化
    $scope.initTimer = function(){
    	$scope.second = 5;
    	$interval.cancel($scope.timer)
    }
    $scope.initTimer();
    $scope.start = function() {
        $scope.timer = $interval(function() {
            $scope.second--
                if ($scope.second === 1) {
                    $scope.clickFn();
                    $interval.cancel($scope.timer)
                    console.log($scope.timer, $scope.second)
                }
        }, 1000)
    }
})