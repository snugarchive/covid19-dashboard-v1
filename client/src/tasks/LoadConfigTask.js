class LoadConfigTask {
    createDataset = (
        label, data, type = undefined, fill = true, backgroundColor = "lightgray", borderColor = "lightgray", tension = 0.1, yAxisID = 'y', stack = undefined) => {
        return { 
            label: label, 
            data: data, 
            type: type, 
            fill: fill, 
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            tension: tension, 
            pointRadius: 2, 
            yAxisID: yAxisID, 
            stack: stack 
        };
    };

    setDefaultOption = (text_title, indexAxis = 'x', stacked = false, formatter = undefined, tooltip_callbacks_sum = undefined, annotations = undefined) => {
        return {
            indexAxis: indexAxis,
            maintainAspectRatio: false,
            responsive: true,
            scales: { 
                y: { stacked: stacked, ticks: { autoSkip: false, maxRotation: 0}, beginAtZero: true, grid: { display: false } },
                x: { stacked: stacked, ticks: { display: true, maxRotation: 0 }, grid: { display: false }}},
            interaction: { intersect: false, mode: 'index' },
            plugins: {
                title: { display: true, text: text_title, font: { size: 16, family: 'rubik' }, padding: { bottom: 20 },},
                // subtitle: { display: true, text: text_subtitle, font: { size: 12, family: 'rubik' }, padding: { bottom: 20 },},
                legend: { display: true, position: 'bottom' },
                datalabels: { anchor: 'center', align: 'center', font: { size: 10 }, formatter: formatter },
                tooltip: { 
                    itemSort: (a, b) => {
                        return b.datasetIndex - a.datasetIndex;
                    },
                    callbacks: { 
                        afterTitle: tooltip_callbacks_sum, 
                        label: (context) => { 
                            if (context.label !== '총 검사 수') {
                                return `${context.dataset.label}: ${context.raw.toLocaleString()}명`;
                            }
                            else {
                                return `${context.dataset.label}: ${context.raw.toLocaleString()}건`;
                            }
                        }
                    }
                },
                annotation: { annotations : annotations }
            },
            layout: { padding: { top: 20, bottom: 2.5, left: 20, right: 40 } },
        };
    };
    
    formatter_vaccinated = function(value) {
        return (value/51662290*100).toFixed(0) + '%';
    };

    formatter_stacked_percentage = function(value, context) {
        let arr = [...Array(context.chart.data.datasets.length).keys()].map(i => context.chart.data.datasets[i].data[0]);
        let sum = arr.reduce((acc, cur) => acc + cur);
        let percentage = Math.round((value / sum * 100)) + "%";
        return percentage;
    };

    formatter_bar_percentage = function(value, context) {
        let arr = context.chart.data.datasets[0].data
        let sum = arr.reduce((acc, cur) => acc + cur);
        let percentage = Math.round((value / sum * 100));
        if (percentage !== 0) {
            return percentage + "%";
        } else {
            return null;
        }
    };

    tooltip_sum = (context) => {
        let sum = 0;
        const label = context.map(i => i.label);

        context.forEach((tooltipitem) => {
            sum += tooltipitem.raw;
        });
        if (label[0] !== '총 검사 수') {
            return `${sum.toLocaleString()}명 중`;
        }
        else {
            return `${sum.toLocaleString()}건 중`;
        }
    };

    annotations_verticalLine = (value, scaleID, content = undefined, xAdjust = 19, color = 'rgb(58, 58, 58)') => {
        const annotation1 = {
            type: 'line', mode: 'vertical', scaleID: scaleID, borderWidth: 1.5, borderColor: color, value: value,
            label: {
                content: content,
                backgroundColor: color,
                position: 'start',
                enabled: true,
                    xAdjust: xAdjust,
                    yAdjust: -30
            },
            drawTime: 'afterDatasetsDraw'
        };
        return { annotation1 };
    };

}

export default LoadConfigTask;