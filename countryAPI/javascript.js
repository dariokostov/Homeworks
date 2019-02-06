$(document).ready(function () {
  const elPerPage = 5;

  let sort = {
    area: 1,
    population: 2
  }

  let state = {
    countries: null,
    sortBy: null,
    dataPages: [],
    page: 0,
  }

  $("#table").hide();
  $("#population_btn").on("click", function () {
    arrangeByPopulation(state.countries)
  })

  $("#area_btn").on("click", function () {
    arrangeByArea(state.countries)
  })

  $("#prev").on("click", (e) => {
    state.page -= 1
    populateTable(state.dataPages[state.page])
  })

  $("#next").on("click", (e) => {
    state.page += 1
    populateTable(state.dataPages[state.page])
  })

  function arrangeByArea(sortArea) {
    if (state.sortBy !== sort.area) {
      state.sortBy = sort.area;
      sortArea.sort((a, b) => a.area - b.area);
    } else {
      sortArea.reverse();
    }
    state.countries = [...sortArea]
    state.dataPages = makePages(state.countries, elPerPage)
    populateTable(state.dataPages[state.page])
  };

  function arrangeByPopulation(sortPopulation) {
    if (state.sortBy !== sort.population) {
      state.sortBy = sort.population;
      sortPopulation.sort((a, b) => a.population - b.population);
    } else {
      sortPopulation.reverse();
    }
    state.countries = [...sortPopulation]
    state.dataPages = makePages(state.countries, elPerPage)
    populateTable(state.dataPages[state.page])
  };

  function populateTable(data) {
    $("tbody").html("");
    data.forEach(element => {
      $("tbody").append($(`<tr>
  <td><img src="${element.flag}" width="100px"></td>
  <td>${element.name}</td>
  <td>${element.population}</td>
  <td>${element.region}</td>
  <td>${element.area}</td>
  <td>${element.currencies.map(element => {
    return `(${element.symbol}) <br> ${element.name}<br>`
  })} </td>
  <td>${element.languages.map(element => {
      return `${element.name}(${element.nativeName})<br>`
  })}</td>
  </tr>`));
    })
    $("#pageRender").text(state.page + 1)
  }

  $("#btn").on("click", function () {
    let input = $("#input").val();
    ajaxCall(`https://restcountries.eu/rest/v2/name/${input}`, proccessCountries);
  });

  function proccessCountries(res) {
    state.sortBy = null;
    state.countries = res;
    state.dataPages = makePages(res, elPerPage)
    createTable(state.dataPages[state.page]);
  };

  function createTable(res) {
    $("#table").show();
    populateTable(res)
  };

  function ajaxCall(url, callback) {
    $.ajax({
      type: "GET",
      url: url,
      success: function (response) {
        callback(response);
      },
      error: function (response) {
        console.log('The request failed!');
        console.log(response.responseText);
      }
    });
  }

  function makePages(data, elPerPage) {
    let pages = []
    let counter = elPerPage;
    data.forEach(e => {
      if (counter < elPerPage) {
        counter = counter + 1
        pages[pages.length - 1].push(e)
      } else {
        counter = 1
        pages.push([e])
      }
    })
    return pages
  }
});
