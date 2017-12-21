var app = angular.module('myapp', [])
app.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        // Allow loading from our assets domain. 
        'http://js.cache.fx168.com/data/quotedata.data'
    ]);
})
app.directive("mask", function() {
    return {
        restrict: 'A',
        link: function(scope, ele, att) {
            console.log(scope, ele, att, "ss")
        }
    }
})
app.controller('myCtrl', function($scope, $interval, $timeout, $http) {
    $scope.data = {}
    $scope.test = '123'
    $scope.jsonpData = {};
    $http.jsonp('http://js.cache.fx168.com/data/quotedata.data?callback=QuoteJson&callback=Jquery', {
        jsonpCallbackParam: 'callback'
    }).success(function(data) {
        console.log(data)
    })
    /*tab切换也页面数据*/
    QuoteJson = function(data) {
        $scope.data = data;
    }
    $interval(function() {})
    $scope.title = ['FOREX', 'SHARES', 'INDICES', 'FUTURES']
    $scope.dataList = [
        [
            [1, 1, 1, 1],
            [2, 2, 2, 2],
            [3, 3, 3, 3],
            [4, 4, 4, 4],
            [5, 5, 5, 5],
            [6, 6, 6, 6]
        ],
        [
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2]
        ],
        [
            [3, 3, 3, 3],
            [3, 3, 3, 3],
            [3, 3, 3, 3],
            [3, 3, 3, 3],
            [3, 3, 3, 3],
            [3, 3, 3, 3]
        ],
        [
            [4, 4, 4, 4],
            [4, 4, 4, 4],
            [4, 4, 4, 4],
            [4, 4, 4, 4],
            [4, 4, 4, 4],
            [4, 4, 4, 4]
        ]
    ]
    $scope.dataBox = [
        [
            [1, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 3, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2]
        ],
        [
            [3, 3, 3, 3],
            [3, 3, 3, 3],
            [3, 3, 3, 3],
            [3, 3, 3, 3],
            [3, 3, 3, 3],
            [3, 3, 3, 3]
        ],
        [
            [4, 4, 4, 4],
            [4, 4, 4, 4],
            [4, 4, 4, 4],
            [4, 4, 4, 4],
            [4, 4, 4, 4],
            [4, 4, 4, 4]
        ],
        [
            [5, 5, 5, 5],
            [5, 5, 5, 5],
            [5, 5, 5, 5],
            [5, 5, 5, 5],
            [5, 5, 5, 5],
            [5, 5, 5, 5]
        ]
    ]
    $scope.dataName = ['dataList', 'shares', 'indices', 'futures']
    $scope.loop = function(index) {
        $interval.cancel($scope.timer)
        $scope.timer = $interval(function() {
            var number = num(0, 3);
            $scope.dataList[index] = $scope.dataBox[number];
        }, 3000)
    }
    $scope.$on('destroy', function() {
        $interval.cancel($scope.timer);
    })
    $scope.loop(0)
    //随机数产生函数
    function num(min, max) {
        var range = max - min;
        var round = Math.random();
        return (min + Math.round(round * range))
    }
    $scope.date = Date()
    $interval(function() {
        $scope.date = Date()
    }, 500)
    $scope.showTag = [true, false, false, false]
    $scope.clickFn = function(index) {
        var position = 40 + index * 90 + 'px';
        $scope.mystyle = {
            'left': position
        }
        $scope.showTag = [false, false, false, false]
        $scope.showTag[index] = !$scope.showTag[index];
        $scope.loop(index)
    }
    /*二级菜单栏*/
    $scope.listData = [{
        name: "首页",
        url: '/123',
        sublist: [{
            name: "我是二级目录",
            url: '/456',
            lastlist: [{
                name: "我是三级目录",
                url: '/3333',
            }, {
                name: "我是三级目录",
                url: '/3333',
            }]
        }, {
            name: "我是二级目录",
            url: '/456',
            lastlist: [{
                name: "我是三级目录",
                url: '/3333',
            }, {
                name: "我是三级目录",
                url: '/3333',
            }]
        }, {
            name: "我是二级目录",
            url: '/456',
            lastlist: [{
                name: "我是三级目录",
                url: '/3333',
            }, {
                name: "我是三级目录",
                url: '/3333',
            }]
        }, {
            name: "我是二级目录",
            url: '/456',
            lastlist: [{
                name: "我是三级目录",
                url: '/3333',
            }, {
                name: "我是三级目录",
                url: '/3333',
            }]
        }]
    }, {
        name: "关于我们",
        url: '/123',
        sublist: [{
            name: "我们二级目录",
            url: '/456',
            lastlist: [{
                name: "我们三级目录",
                url: '/3333',
            }, {
                name: "我们三级目录",
                url: '/3333',
            }]
        }]
    }]
    // 创建新的数据
    $scope.createMenu = function(data) {
        for (var i = 0; i < data.length; i++) {
            data[i].active = false;
            data[i].height = 0;
            var sub = data[i].sublist;
            if (sub) {
                for (var j = 0; j < sub.length; j++) {
                    sub[j].active = false;
                }
            }
        }
        $scope.listData = data;
        console.log($scope.listData)
    }
    $scope.createMenu($scope.listData)
    $scope.showlist = (function() {
        var arr = [];
        for (var i = 0; i < $scope.listData.length; i++) {
            arr.push(false)
        }
        console.log(arr)
        return arr
    })()
    $scope.listStyle = {
        'height': 0
    }
    $scope.showFn = function(el, index) {
        if (el == $scope.listData[index].name) {
            $scope.showlist[index] = !$scope.showlist[index];
            var height = $scope.listData[index].sublist.length * 40 + 'px'
            $scope.listStyle = {
                'height': height
            }
        }
    }
    /*二级菜单栏结束*/
    /*base64格式图片上传部分的代码*/
    loadImage = function() {
        if (document.getElementById("upload").files.length === 0) return
        oFreader = new FileReader();
        oFreader.onload = function(e) {
            url = e.target.result;
            document.getElementById("image").src = e.target.result;
            console.log(e.target.result.length/1024,"压缩前")
            handleImg(e.target.result, {
                width: 200,height: 200
            }, function(base) {
                document.getElementById("transform").src = base;
                console.log("压缩后：" + base.length / 1024 + " " + base);
            })
        }
        var oFile = document.getElementById("upload").files[0]
        console.log(oFile, "ss")
        oFreader.readAsDataURL(oFile)
    }
    //图片压缩功能
    function handleImg(path, obj, callback) {
        var img = new Image();
        img.src = path;
        img.onload = function() {
            var that = this;
            var w = that.width;
            var h = that.height;
            //压缩比
            scale = w / h;
            w = obj.width || w;
            h = obj.height || (w / scale)
            var quality = 0.8;
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var canw = document.createAttribute("width");
            var canh = document.createAttribute("height");
            canh.nodeValue = h;
            canw.nodeValue = w;
            canvas.setAttributeNode(canw);
            canvas.setAttributeNode(canh);
            ctx.drawImage(that, 0, 0, w, h);
            if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
                quality = obj.quality;
            }
            // quality值越小，所绘制出的图像越模糊
            var base64 = canvas.toDataURL('image/jpeg', quality);
            // 回调函数返回base64的值
            callback(base64);
        }
    }
    /*base64 结束*/
    /*Fordata上传图片 二进制流上传图片*/
})