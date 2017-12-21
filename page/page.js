//分页流程   给后台传当前页面和页面容量
//后端返回  当前页码，总条数，页面容量
var app = angular.module('myapp', [])
//一开始发请求当前页为1，页面容量为5，返回当前页和页面容量和总页数

app.controller('my-page', function($scope,$http, $interval, $timeout) {
    // //登录
    $http.post('http://localhost:5000/Login/Login',{
      LoginName: '6',
      LoginPwd: '123123'
    })
    //第一次拉取的数据
    $scope.count = 0;
    $scope.p_pernum = 10;//页面容量
    //初始化数据
    $scope.p_current = 1;
    $scope.p_all_page = 0;
    $scope.pages = [];
     //分页算法
    var calculateIndexes = function(current,length,displaylength){
      console.log(111,displaylength,current,length)
      var index = [];
      var start = Math.round(current-parseInt(displaylength)/2);
      var end = Math.round(current+parseInt(displaylength)/2);
      if(start<=1){
        start = 1;
        end = start+parseInt(displaylength)- 1;
        if(end>=length-1){
          end = length - 1;
        }
      }
      if(end>= length - 1){
        end = length;
        start = end-parseInt(displaylength)+ 1;
        if(start <= 1){
          start = 1;
        }
      }
      for(var i = start; i<= end; i++){
        index.push(i);
      }
      return index
    }
     var reloadPno = function(){
      $scope.pages = calculateIndexes($scope.p_current,$scope.p_all_page,$scope.p_pernum)
    }
    //加载某一页
    $scope.getpage = function(page){
        _get(page,$scope.p_pernum,function(){})
        console.log(page,$scope.p_pernum,"发给后端数据")
    }
    //获取数据
    var _get = function(page, size, callback) {
        //进行http请求，http第一次返回数据
        $http.post('http://192.168.2.82:5000/CourseWare/QueryCoureWare',{
          Page_current: page,
          Row_per_page: size
        }).success(function(response){
            console.log(response,"xxxx")
        })
        res = {
            count: 100,
            page_size: 10,
            page: 1,
        }
        $scope.count = res.count;
        $scope.p_current = res.page;
        $scope.p_all_page = Math.ceil(res.count/res.page_size);
        reloadPno()
        console.log($scope.pages,'我是分页数据')
        
    }
    //当前页为1，页面容量为10
  _get($scope.p_current,$scope.p_pernum,function(){console.log("我是第一次执行")})

  //下一页跳转
  $scope.next = function(){
    $scope.p_current += 1;
    _get($scope.p_current,$scope.p_pernum,function(){
      console.log("我跳到了下一页")
    })
  }
  
   

})