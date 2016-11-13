function getOption ( data ){
    if( data.type == 'bar' ){
        return getOptionBar(data);
    } else if( data.type == 'line' ){
        return getOptionLine(data);
    } else if( data.type == 'scatter' ){
        return getOptionScatter(data);
    }
    return {
        responsive: true,
    };
}

function getOptionBar(data){
    return {
        responsive: true,
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero: true,
                    min: 0
                }
            }]
        }
    };
}

function getOptionLine(data){
    return {
        responsive: true,
        legend: {
            position: 'bottom',
            lineWidth: 0,
            labels: {
                fontSize: 12,
                boxWidth: 12,
                usePointStyle: true,
                generateLabels: function(chart){
                    return  chart.data.datasets.map( function( dataset, i ){
                        return {
                            text:           dataset.label,
                            fillStyle:      dataset.backgroundColor,
                            hidden:         !chart.isDatasetVisible(i),
                            lineCap:        dataset.borderCapStyle,
                            lineDash:       [], 
                            lineDashOffset: 0,
                            lineJoin:       dataset.borderJoinStyle,
                            lineWidth:      dataset.pointBorderWidth, 
                            strokeStyle:    dataset.borderColor,
                            pointStyle:     dataset.pointStyle,
                            datasetIndex:   i  // extra data used for toggling the datasets
                        };
                    })
                }
            }
        },
        title: {
            display: true,
            text: 'Multi line chart',
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        min: 0
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Values"
                    }
                }
            ],
            xAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: "Date"
                    }
                }
            ],
        }
    };
}

function getOptionScatter(data){
    return {
        responsive: true,
        legend: {
            position: 'bottom',
            lineWidth: 0,
            labels: {
                fontSize: 12,
                boxWidth: 12,
                usePointStyle: true,
                generateLabels: function(chart){
                    return  chart.data.datasets.map( function( dataset, i ){
                        return {
                            text:           dataset.label,
                            fillStyle:      dataset.backgroundColor,
                            hidden:         !chart.isDatasetVisible(i),
                            lineCap:        dataset.borderCapStyle,
                            lineDash:       [], 
                            lineDashOffset: 0,
                            lineJoin:       dataset.borderJoinStyle,
                            lineWidth:      dataset.pointBorderWidth, 
                            strokeStyle:    dataset.borderColor,
                            pointStyle:     dataset.pointStyle,
                            datasetIndex:   i  // extra data used for toggling the datasets
                        };
                    })
                }
            }
        },
        title: {
            display: true,
            text: 'Multi line chart',
        },
        scales: {
            yAxes: [{
                    ticks: {
                        min: 0,
                        max: data.ymax,
                    },
                    scaleLabel: {
                        display:     true,
                        labelString: "Values"
                    }
            }],
            xAxes: [{
                    type:       'linear',
                    position:   'bottom',
                    scaleLabel: {
                        display:     true,
                        labelString: "Date"
                    }
            }],
        }
    };
}

function renameType( type ){
    if( type == 'scatter'){
        return 'line';
    }
    return type;
}

function genChart( data ){

    var ctx = document.getElementById("chart").getContext("2d");

    // Global
    Chart.defaults.global.animation             = 0;
    Chart.defaults.global.elements.line.fill    = false;
    Chart.defaults.global.elements.line.tension = 0;

    var datasets = [];

    for( var i = 0; i < data.datasets.length ; i++ ){
        datasets.push({
            label:           ( 'label' in data.datasets[i] )? data.datasets[i].label : null,
            data:            data.datasets[i].value,
            borderColor:     data.datasets[i].color,
            backgroundColor: data.datasets[i].color,
            borderWidth:     2,
            pointRadius:     8,
            pointStyle:      'star',
            pointBorderWidth: 2,
        });
    }

    var myChart = new Chart( ctx, {
        type: renameType(data.type),
        data: {
            labels: data.labels,
            datasets: datasets,
        },
        options: getOption(data),
    })
}
