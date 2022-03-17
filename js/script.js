const select = document.getElementById('cities');
const tempElem = document.getElementById('temp');
const humidityElem = document.getElementById('humidity');
const pressureElem = document.getElementById('pressure');

const cities = [
  'lat=45.0448&lon=38.976',
  'lat=55.7522&lon=37.6156',
  'lat=55.154&lon=61.4291',
];

const getWeather = (city) => {
  fetch(`https://api.openweathermap.org/data/2.5/onecall?${city}&units=metric&lang=ru&appid=c08fa350f6c63a8def7a0a13ac327462`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('status network not 200');
      }
      return (response.json());
    })
    .then((response) => {
      getResult(response);
      createTable();
    })
    .catch((error) => console.error(error));
};

getWeather(cities[0]);
select.addEventListener('change', () => {getWeather(cities[select.value]);});
setInterval(() => {getWeather(cities[select.value]);}, 5 * 60 * 1000);

const weatherData = {
  humidity: [],
  tempMax: [],
  tempMin: [],
  pressure: [],
};

const getResult = (data) => {

  for (let i = 0; i < data.daily.length; i++) {
    if (i > 4) break;
    let dayData = data.daily[i];
    weatherData.humidity[i] = dayData.humidity;
    weatherData.tempMax[i] = Math.round(dayData.temp.max);
    weatherData.tempMin[i] = Math.round(dayData.temp.min);
    weatherData.pressure[i] = Math.round(dayData.pressure * 0.75);
  }
};

const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря' ];

const createTable = () => {

  tempElem.textContent = '';
  humidityElem.textContent = '';
  pressureElem.textContent = '';

  const now = new Date;
  const categories = [];
  for (let i = 0; i < 5; i++) {
    categories.push(`${now.getDate()} ${months[now.getMonth()]}`);
    now.setDate(now.getDate() + 1);
  }

  const maxTemp = Math.max(...weatherData.tempMax) + 2;
  const minTemp = Math.min(...weatherData.tempMin) - 2;
    
  const tempOptions = {
    series: [
    {
      name: 'температура максимальная',
      data: weatherData.tempMax
    },
    {
      name: 'температура минимальная',
      data: weatherData.tempMin
    }
  ],
    chart: {
    height: 350,
    type: 'line',
    dropShadow: {
      enabled: true,
      color: '#000',
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2
    },
    toolbar: {
      show: false
    }
  },
  colors: ['#77B6EA', '#545454'],
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: 'smooth'
  },
  title: {
    text: 'Температура',
    align: 'left'
  },
  grid: {
    borderColor: '#e7e7e7',
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  markers: {
    size: 1
  },
  xaxis: {
    categories: categories,
  },
  yaxis: {
    title: {
      text: 'градусы цельсия'
    },
    min: minTemp,
    max: maxTemp
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    floating: true,
    offsetY: -25,
    offsetX: -5
  }
  };

  const temp = new ApexCharts(tempElem, tempOptions);
  temp.render();

  const maxHumidity = Math.max(...weatherData.humidity) + 2;
  const minHumidity = Math.min(...weatherData.humidity) - 2;

  const humidityOptions = {
    series: [
    {
      name: 'влажность',
      data: weatherData.humidity
    },
  ],
    chart: {
    height: 350,
    type: 'line',
    dropShadow: {
      enabled: true,
      color: '#000',
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2
    },
    toolbar: {
      show: false
    }
  },
  colors: ['#77B6EA'],
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: 'smooth'
  },
  title: {
    text: 'Влажность',
    align: 'left'
  },
  grid: {
    borderColor: '#e7e7e7',
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  markers: {
    size: 1
  },
  xaxis: {
    categories: categories,
  },
  yaxis: {
    title: {
      text: '%'
    },
    min: minHumidity,
    max: maxHumidity
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    floating: true,
    offsetY: -25,
    offsetX: -5
  }
  };

  const humidity = new ApexCharts(humidityElem, humidityOptions);
  humidity.render();

  const maxPressure = Math.max(...weatherData.pressure) + 2;
  const minPressure = Math.min(...weatherData.pressure) - 2;

  const pressureOptions = {
    series: [
    {
      name: 'атмосферное давление',
      data: weatherData.pressure
    },
  ],
    chart: {
    height: 350,
    type: 'line',
    dropShadow: {
      enabled: true,
      color: '#000',
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2
    },
    toolbar: {
      show: false
    }
  },
  colors: ['#545454'],
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: 'smooth'
  },
  title: {
    text: 'Атмосферное давление',
    align: 'left'
  },
  grid: {
    borderColor: '#e7e7e7',
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  markers: {
    size: 1
  },
  xaxis: {
    categories: categories,
  },
  yaxis: {
    title: {
      text: 'мм рт ст'
    },
    min: minPressure,
    max: maxPressure
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    floating: true,
    offsetY: -25,
    offsetX: -5
  }
  };

  const pressure = new ApexCharts(pressureElem, pressureOptions);
  pressure.render();
};
