const createDownloadChartOptions = (type) => {
  let color = '';
  switch (type) {
    case 'js':
      color = "#f0db4f";
      break;
    case 'react':
      color = "#61dafb";
      break;
    case 'vue':
      color = "#41b883";
      break;
    case 'angular':
      color = "#b52e31";
      break;
    default:
      color = "#000000"
      break;
  }
  return {
    colors: [color],
    chart: {
      animations: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      x: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      forceNiceScale: true,
      labels: {
        show: false,
      },
      max: function (max) {
        return max + 10;
      },
      min: -10,
    },
  }
};
