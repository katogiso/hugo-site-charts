+++
title = "Bar Chart"
date  = "2016-11-12T13:54:07+09:00"

[menu.main]
parent     = "Chartjs"
identifire = "/chartjs/barchart"
weight     = 0
+++

<canvas id="chart"></chart>

<script>
 var data = {
    type:   'bar',
    labels: [ "Day1", "Day2", "Day3" ],
    datasets:[
      {
        label: "fail",
        style: 'star',
        value: [ 10, 15, 22 ],
        color: "#c9302c",
      },
      {
        label: "pass",
        style: 'triangle',
        value: [ 27, 33, 49 ],
        color: "#5cb85c", 
      },
    ]
 };

 genChart(data);

</script>
