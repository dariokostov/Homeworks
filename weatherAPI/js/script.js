$(document).ready(function () {
  $("#table").hide();
  $("#majorDiv").hide();
  $("#btnHourly").hide();
  $("#btnWeatherStats").hide();

  let btnWeatherStats = $("#btnWeatherStats");
  let btnHourly = $("#btnHourly");
  let btnSearch = $("#btnSearch");

  btnSearch.on("click", () => {
    let inputValue = $("#input").val();
    ajaxCall(`https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&units=metric&APPID=4edb82433a59b22f22982e685c6bf707`, getWeatherStats);
  });

  btnHourly.on("click", () => {
    $("#table").show();
    $("#majorDiv").hide();
  });

  btnWeatherStats.on("click", () => {
    $("#majorDiv").show();
    $("#table").hide();
  });

  function getTemp(res) {
    let minTemp = res.map(element => element.main.temp_min).sort((a, b) => a - b);
    let maxTemp = res.map(element => element.main.temp_max).sort((a, b) => b - a);
    let averageTemp = res.map(element => element.main.temp).reduce((sum, temp) => sum += temp, 0) / res.length;
    $(".divFirst").append(`<p>Min Temperature: ${Math.round(minTemp[0])}℃</p>`);
    $(".divFirst").append(`<p>Max Temperature: ${Math.round(maxTemp[0])}℃</p>`);
    $(".divFirst").append(`<p>Average Temperature: ${Math.round(averageTemp)}℃<br></p>`);
  }

  function getHum(res) {
    let minHum = res.map(element => element.main.humidity).sort((a, b) => a - b);
    let maxHum = res.map(element => element.main.humidity).sort((a, b) => b - a);
    let averageHum = res.map(element => element.main.humidity).reduce((sum, temp) => sum += temp, 0) / res.length;
    $(".divSecond").append(`<p>Min Humidity: ${Math.round(minHum[0])}%</p>`);
    $(".divSecond").append(`<p>Max Humidity: ${Math.round(maxHum[0])}%</p>`);
    $(".divSecond").append(`<p>Average Humidity: ${Math.round(averageHum)}%<br></p>`);
  }

  function getWarmColdTime (res) {
    let warmestTime = [...res].sort(((a, b) => b.main.temp_max - a.main.temp_max));
    let coldestTime = [...res].sort(((a, b) => a.main.temp_min - b.main.temp_min));
    $(".divFirst").append(`<p>Warmest Time:<br>${warmestTime[0].dt_txt}</p>`);
    $(".divSecond").append(`<p>Coldest Time:<br>${coldestTime[0].dt_txt}</p>`);
  }

  function createTable (res) {
    res.forEach(e => {
      e.weather[0].icon;

      let tr = $("<tr>");

      tr.append(`<td><img src="http://openweathermap.org/img/w/${e.weather[0].icon}.png"></td>`);
      tr.append(`<td>${e.weather[0].description}</td>`);
      tr.append(`<td>${e.dt_txt}</td>`);
      tr.append(`<td>${Math.round(e.main.temp)}</td>`);
      tr.append(`<td>${Math.round(e.main.humidity)}</td>`);
      tr.append(`<td>${Math.round(e.wind.speed)}</td>`);

      $("tbody").append(tr);
    });
  }

  function getWeatherStats(res) {
    $("#majorDiv").show();
    btnWeatherStats.show();
    btnHourly.show();
    $("#table").hide();
    $("p").remove();
    $("tbody>tr").remove();

    getTemp(res.list);
    getHum(res.list);
    getWarmColdTime(res.list);
    createTable(res.list);
  };

  function ajaxCall(url, callBackAjax) {
    $.ajax({
      url: url,
      success: function (response) {
        callBackAjax(response)
      },
      error: function (response) {
        alert(`The request failed! ${response.responseText}`);
      }
    });
  };
});
