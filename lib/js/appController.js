'use strict';
google.load('visualization', '1', {packages: ['corechart']});
myApp.controller('appController', function($scope , $http) {

//Dropdown Select Array
  $scope.datasets=[{title:"overall sales",value:"sales",xTitle:"Sales"},{title:"overall orders",value:"orders",xTitle:"Orders"},
  {title:"page views",value:"pageViews",xTitle:"Page Views"},{title:"page rec clickthru rate",value:"clickThruRate",xTitle:"Click through rate"}];

$scope.dataset=$scope.datasets[0];//Assing dataset to First Value of datasets array

//Watch Dropdown Value changed or not
   $scope.$watch("dataset", function () {
     //draw line chart if chartData Variable have some data
     if($scope.chartData){
       $scope.drawLineChart();
     }
   });

//Call Function to draw Line Chart
   $scope.drawLineChart=function(){
      var data = new google.visualization.DataTable();
      var xaxis=$scope.chartData.xaxis;
      data.addColumn('string', xaxis);
      data.addColumn('number',   $scope.dataset.xTitle);
      var records=[];
      for(var i=0;i<$scope.chartData.records.length;i++){
        var row=[];
        row.push($scope.chartData.records[i][xaxis]);
        row.push($scope.chartData.records[i][$scope.dataset.value]);
        records.push(row);
      }
      data.addRows(records);
      var options = {
        title: $scope.dataset.value,
        legend: { position: 'top',alignment:'center' },
        pointSize: 7
      };

      var chart = {};
      chart.data = data;
      chart.options = options;
      $scope.chart=chart;
      
      var lineChart = new google.visualization.LineChart(document.getElementById('chart_div'));
      lineChart.draw($scope.chart.data, $scope.chart.options);
   }

//Get JSON Data and Fill into Angular Variable
  $scope.getJSONFileData=function(){
    var file="lib/report.json";
      
    $http.get(file).success(function(response){
        console.log(response)
        $scope.chartData = response;
		$scope.drawLineChart();
    },function(error){
      console.log(error);
    });
  }
  $scope.getJSONFileData();
});
