
var apiKey = "0490112252c7a9dead536c20b8c14c10";
var apiKeyWeather = "2af732ba2ede6878b16ebb929115a2c6";
var city;
var selectedCategory;
var latitude;
var longitude;
var loader = document.querySelector(".loader");
var rainArray = [  "Pakoras",  "Samosas",  "Bhajiyas",  "Masala Chai",  "Pani Puri",  "Aloo Tikki",  "Bhutta",  "Vada Pav",  "Pav Bhaji",  "Kanda Bhaji",  "Mirchi Bajji",  "Aloo Samosa Chaat",  "Aloo Paratha",  "Gobi Manchurian",  "Paneer Pakora",  "Onion Uttapam",  "Keema Pav",  "Vegetable Cutlet",  "Bread Pakora",  "Dahi Vada",  "Chicken Biryani",  "Palak Pakora",  "Chicken Tikka",  "Masala Dosa",  "Mutton Curry",  "Puri Bhaji",  "Chicken 65",  "Vegetable Pulao",  "Aloo Methi",  "Chicken Kebabs",  "Dal Makhani",  "Chicken Korma",  "Malai Kofta",  "Rasam",  "Mysore Masala Dosa",  "Butter Chicken",  "Vegetable Biryani",  "Chicken Curry",  "Chole Bhature",  "Rajma Chawal",  "Pongal",  "Rogan Josh",  "Hyderabadi Biryani",  "Chicken Chettinad",  "Dum Aloo",  "Tomato Soup",  "Chicken Noodles",  "Paneer Butter Masala",  "Vegetable Korma","Gulab Jamun"];
var clearArray = ["Biryani","Butter Chicken","Masala Dosa","Pani Puri","Chole Bhature","Rajma Chawal","Samosas","Paneer Tikka","Dosa","Chicken Curry","Palak Paneer","Gulab Jamun","Aloo Paratha","Vada Pav","Tandoori Chicken","Pav Bhaji","Dal Makhani","Chicken Biryani","Mutton Rogan Josh","Pani Puri","Fish Curry","Idli","Raita","Chicken Tikka Masala","Pulao","Aloo Tikki","Paneer Butter Masala","Samosa Chaat","Malai Kofta","Dahi Vada","Chicken Tandoori","Vegetable Biryani","Kadai Paneer","Lassi","Rasgulla","Matar Paneer","Dum Aloo","Mango Kulfi","Korma","Papdi Chaat","Chicken Kebabs","Gajar Ka Halwa","Chicken 65","Prawn Curry","Aloo Gobi","Jalebi","Kadhi Pakora","Malai Kulfi","Baingan Bharta"];
var clearArrayWarmWeather = ["Mango Lassi", "Watermelon Salad", "Papdi Chaat", "Aam Panna", "Cucumber Raita", "Pani Puri", "Mint Lemonade", "Fruit Chaat", "Mango Sorbet", "Mango Shrikhand", "Cold Coffee", "Corn on the Cob", "Coconut Water", "Dahi Vada", "Mango Ice Cream", "Aloo Chaat", "Mint Chutney", "Kulfi", "Pineapple Juice", "Curd Rice", "Mango Salad", "Mango Smoothie", "Gazpacho", "Mango Salsa", "Thandai", "Aamras Puri", "Mango Popsicle", "Fruit Lassi", "Mango Falooda", "Cucumber Mint Cooler", "Chickpea Salad", "Mango Coconut Water", "Chilled Yogurt Soup", "Mango Mojito", "Cold Pasta Salad", "Mango Mousse", "Mango Lemonade", "Iced Tea", "Mango Tart", "Cucumber Sandwiches", "Mango Phirni", "Mango Yogurt Parfait", "Mango Granita", "Mango Pancakes", "Melon Gazpacho", "Mango Float", "Iced Fruit Punch", "Mango Panna Cotta", "Mango Chia Pudding"]
var cloudArray = ["Hot Samosas", "Masala Chai", "Pakoras", "Dal Fry", "Vegetable Soup", "Aloo Paratha", "Masala Dosa", "Bhutta (Grilled Corn)", "Hot Jalebis", "Pav Bhaji", "Rajma Chawal", "Chicken Curry", "Paneer Tikka", "Hot Gulab Jamun", "Gobi Manchurian", "Chicken Biryani", "Vada Pav", "Hot Chocolate", "Onion Pakoras", "Vegetable Pulao", "Palak Paneer", "Rasam", "Butter Naan", "Vegetable Cutlet", "Matar Paneer", "Mutton Stew", "Chicken Tikka Masala", "Bread Pakora", "Aloo Tikki Chaat", "Dum Aloo", "Fish Curry", "Pongal", "Hot Masala Tea", "Vegetable Korma", "Kadai Paneer", "Mushroom Soup", "Chicken Noodles", "Malai Kofta", "Tomato Soup", "Aloo Gobi", "Kadhi Pakora", "Paneer Butter Masala", "Egg Curry", "Chicken Fried Rice", "Hot Rasgulla", "Chicken 65", "Lemon Rice", "Hot Pho", "Dal Makhani"];

function getCategories() {
  const categoryURL = `https://developers.zomato.com/api/v2.1/categories`;
  $.ajax({
    headers: {
      "user-key": this.apiKey,
      "Content-Type": "application/json"
    },
    url: categoryURL,
    method: "GET"

  }).then(function (response) {
    catResponse = response.categories;
    $('#searchCategory')
      .append($('<option value="0">', 'Select Category')
        .text('Select Category'));
    for (var i = 0; i < catResponse.length; i++) {
      $('#searchCategory')
        .append($('<option value="' + catResponse[i].categories.id + '">', catResponse[i].categories.name)
          .text(catResponse[i].categories.name));
    }
  });
}

function getCityData(city) {
  const cityURL = "https://developers.zomato.com/api/v2.1/cities?q=" + city;
  $.ajax({
    headers: {
      "user-key": this.apiKey,
      "Content-Type": "application/json"
    },
    url: cityURL,
    method: "GET",
    success: function (data) {
      callback(data);
    }
  });
}

function weatherIcon(day, weather) {
  switch (weather) {
    case "Clouds":
      $(day).addClass("fa-cloud");
      break;
    case "Clear":
      $(day).addClass("fa-sun");
      break;
    case "Rain":
      $(day).addClass("fa-cloud-sun-rain");
      break;
    default:
      console.log("Weather Not Found");


  }
}

function getCurrentLocationWeather(currLatitude,currLongitude) {
  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + currLatitude + "&lon=" + currLongitude + "&units=imperial&appid=" + apiKeyWeather;
  var queryUrl2 = "https://api.openweathermap.org/data/2.5/forecast?lat=" + currLatitude + "&lon=" + currLongitude + "&units=metric&appid=" + apiKeyWeather;

  $.ajax({
    url: queryUrl,
    method: "GET"
  })

    .then(function (response) {
      //console.log(response)

      $("#todaysWeather").html(response.main.temp + " &#8451")
      if(response.weather[0].main === "Clear"){
        if(response.main.temp >= 80.00){
          $("#recommendation").html("We recommend: "+ clearArrayWarmWeather[Math.floor(Math.random() * clearArrayWarmWeather.length)]);
        } else {
          $("#recommendation").html("We recommend: "+ clearArray[Math.floor(Math.random() * clearArray.length)]);
        }
      } else if(response.weather[0].main == "Rain") {
        $("#recommendation").html("We recommend: "+ rainArray[Math.floor(Math.random() * rainArray.length)]);
      } else if(response.weather[0].main === "Clouds") {
        $("#recommendation").html("We recommend: "+ cloudArray[Math.floor(Math.random() * cloudArray.length)]);
      }
      $(".degree").html(response.main.temp + " &#8451");



    });

  $.ajax({
    url: queryUrl2,
    method: "GET"
  })

    .then(function (response) {
      console.log(response)
      // $("#day1").html(response.list[4].main.temp + " Degrees " + response.list[4].weather[0].main)
      // $("#day2").html(response.list[12].main.temp + " Degrees " + response.list[12].weather[0].main)
      // $("#day3").html(response.list[20].main.temp + " Degrees " + response.list[20].weather[0].main)
      // $("#day4").html(response.list[28].main.temp + " Degrees " + response.list[28].weather[0].main)
      // $("#day5").html(response.list[36].main.temp + " Degrees " + response.list[36].weather[0].main)

      $(".card-title").html(response.city.name);
      $(".card-text").html(response.list[0].weather[0].main);
      $(".fa-leaf").html(" " + response.list[0].wind.speed + " mi/h Winds")
      $("#dayOneMax").html(response.list[4].main.temp_max + "&#8451 &#47; "
        + response.list[4].main.temp_min + "&#8451 ");
      $("#dayTwoMax").html(response.list[12].main.temp_max + "&#8451 &#47; "
        + response.list[4].main.temp_min + "&#8451 ");
      $("#dayThreeMax").html(response.list[20].main.temp_max + "&#8451 &#47; "
        + response.list[4].main.temp_min + "&#8451 ");
      $("#dayFourMax").html(response.list[28].main.temp_max + "&#8451 &#47; "
        + response.list[4].main.temp_min + "&#8451 ");
      $("#dayFiveMax").html(response.list[36].main.temp_max + "&#8451 &#47; "
        + response.list[4].main.temp_min + "&#8451 ");

      $("#day1").html(moment(response.list[4].dt_txt).format('dddd'));
      $("#day2").html(moment(response.list[12].dt_txt).format('dddd'));
      $("#day3").html(moment(response.list[20].dt_txt).format('dddd'));
      $("#day4").html(moment(response.list[28].dt_txt).format('dddd'));
      $("#day5").html(moment(response.list[36].dt_txt).format('dddd'));

      var dayOneWeather = response.list[4].weather[0].main;
      var dayTwoWeather = response.list[12].weather[0].main
      var dayThreeWeather = response.list[20].weather[0].main
      var dayFourWeather = response.list[28].weather[0].main
      var dayFiveWeather = response.list[36].weather[0].main

      var days = [{ day: "#dayOneIcon", weather: dayOneWeather },
      { day: "#dayTwoIcon", weather: dayTwoWeather },
      { day: "#dayThreeIcon", weather: dayThreeWeather },
      { day: "#dayFourIcon", weather: dayFourWeather },
      { day: "#dayFiveIcon", weather: dayFiveWeather }];
      days.forEach(day => weatherIcon(day.day, day.weather))

      showWeather();
    });

}


var cityID;
function callback(response) {
  //console.log(response.location_suggestions.length);
  if (response.location_suggestions.length === 0) {
    cityID = 0;
  } else {
    cityID = response.location_suggestions[0].id;
  }
  //console.log(cityID);
  //console.log(city);
  if (cityID === 0) {
    //console.log("Enter valid city");
    showFeedback("Please enter a valid city !");
  } else {
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",Burundi&units=imperial&appid=" + apiKeyWeather;
    var queryUrl2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",Burundi&units=imperial&appid=" + apiKeyWeather;

    $.ajax({
      url: queryUrl,
      method: "GET"
    })

      .then(function (response) {
        //console.log(response)

        $("#todaysWeather").html(response.main.temp)
        console.log(response.main.temp)
        response.main.temp = (((response.main.temp-32)*5)/9).toFixed(2)
        if(response.weather[0].main === "Clear"){
          if(response.main.temp >= 26.67){
            $("#recommendation").html("We recommend: "+ clearArrayWarmWeather[Math.floor(Math.random() * clearArrayWarmWeather.length)]);
          } else {
            $("#recommendation").html("We recommend: "+ clearArray[Math.floor(Math.random() * clearArray.length)]);
          }
        } else if(response.weather[0].main == "Rain") {
          $("#recommendation").html("We recommend: "+ rainArray[Math.floor(Math.random() * rainArray.length)]);
        } else if(response.weather[0].main === "Clouds") {
          $("#recommendation").html("We recommend: "+ cloudArray[Math.floor(Math.random() * cloudArray.length)]);
        }
        $(".degree").html(response.main.temp + " &#8451");



      });

    $.ajax({
      url: queryUrl2,
      method: "GET"
    })

      .then(function (response) {
        console.log(response)
        // $("#day1").html(response.list[4].main.temp + " Degrees " + response.list[4].weather[0].main)
        // $("#day2").html(response.list[12].main.temp + " Degrees " + response.list[12].weather[0].main)
        // $("#day3").html(response.list[20].main.temp + " Degrees " + response.list[20].weather[0].main)
        // $("#day4").html(response.list[28].main.temp + " Degrees " + response.list[28].weather[0].main)
        // $("#day5").html(response.list[36].main.temp + " Degrees " + response.list[36].weather[0].main)

        $(".card-title").html(city);
        $(".card-text").html(response.list[0].weather[0].main);
        $(".fa-leaf").html(" " + response.list[0].wind.speed + " mi/h Winds")
        $("#dayOneMax").html(response.list[4].main.temp_max + "&#8451 &#47; "
          + response.list[4].main.temp_min + "&#8451 ");
        $("#dayTwoMax").html(response.list[12].main.temp_max + "&#8451 &#47; "
          + response.list[4].main.temp_min + "&#8451 ");
        $("#dayThreeMax").html(response.list[20].main.temp_max + "&#8451 &#47; "
          + response.list[4].main.temp_min + "&#8451 ");
        $("#dayFourMax").html(response.list[28].main.temp_max + "&#8451 &#47; "
          + response.list[4].main.temp_min + "&#8451 ");
        $("#dayFiveMax").html(response.list[36].main.temp_max + "&#8451 &#47; "
          + response.list[4].main.temp_min + "&#8451 ");

        $("#day1").html(moment(response.list[4].dt_txt).format('dddd'));
        $("#day2").html(moment(response.list[12].dt_txt).format('dddd'));
        $("#day3").html(moment(response.list[20].dt_txt).format('dddd'));
        $("#day4").html(moment(response.list[28].dt_txt).format('dddd'));
        $("#day5").html(moment(response.list[36].dt_txt).format('dddd'));

        var dayOneWeather = response.list[4].weather[0].main;
        var dayTwoWeather = response.list[12].weather[0].main
        var dayThreeWeather = response.list[20].weather[0].main
        var dayFourWeather = response.list[28].weather[0].main
        var dayFiveWeather = response.list[36].weather[0].main

        var days = [{ day: "#dayOneIcon", weather: dayOneWeather },
        { day: "#dayTwoIcon", weather: dayTwoWeather },
        { day: "#dayThreeIcon", weather: dayThreeWeather },
        { day: "#dayFourIcon", weather: dayFourWeather },
        { day: "#dayFiveIcon", weather: dayFiveWeather }];
        days.forEach(day => weatherIcon(day.day, day.weather))

        showWeather();
        getRestaurandInfo(cityID, selectedCategory);
      });
  }
}

function getRestaurandInfo(cityID, categories) {
  // hideLoader();
  const restaurantURL = 'https://developers.zomato.com/api/v2.1/search?entity_id=' + cityID + '&entity_type=city&category=' + categories + '&sort=rating';

  $.ajax({
    headers: {
      "user-key": this.apiKey,
      "Content-Type": "application/json"
    },
    url: restaurantURL,
    method: "GET"

  }).then(function (response) {
    var restResult = response.restaurants;
    console.log(restResult);
    displayRestaurant(restResult);
  });
}

function displayRestaurant(result) {
  for (var i = 0; i <= result.length; i++) {
    var outerDiv = $("<div>");
    var divCard1 = $("<div>");
    var divCard2 = $("<div>");
    var divRowP3 = $("<div>");
    var divCol5 = $("<div>");
    var myImg = $("<img>");
    var divCol5TextCap = $("<div>");
    var h6 = $("<h6>");
    var pAddresss = $("<p>");
    var divCol1 = $("<div>");
    var divBadgeBadgeSuccess = $("<div>");
    var hr = $("<hr>");
    var divRowPy3Ml1 = $("<div>");
    var divCol5TextUppercase = $("<div>");
    var pCousines = $("<p>");
    var pCostForTwo = $("<p>");
    var pOutdoors = $("<p>");
    var divCol7TextUppercase = $("<div>");
    var pCousinesData = $("<p>");
    var pCostForTwoData = $("<p>");
    var pOutdoorsData = $("<p>");
    var hr2 = $("<hr>");
    var divRowTextCenterNoguttersPb3 = $("<div>");
    var divCol6 = $("<div>");
    var aMenu = $("<a>");
    var iMenu = $("<i>");
    var divCol6_2 = $("<div>");
    var aWebsite = $("<a>");
    var iWebsite = $("<i>");

    outerDiv.addClass("col-11 mx-auto my-3 col-md-4");
    divCard1.addClass("card");
    divCard2.addClass("card");
    divRowP3.addClass("row p-3");
    divCol5.addClass("col-5");
    myImg.addClass("mg-fluid img-thumbnail");
    if (result[i].restaurant.thumb === "") {
      myImg.attr("src", "assets/images/cardimage.png");
    } else {
      myImg.attr("src", result[i].restaurant.thumb);
    }
    myImg.attr("alt", "");
    divCol5TextCap.addClass("col-5 text-capitalize");
    h6.addClass("text-uppercase pt-2 redText");
    h6.text(result[i].restaurant.name);
    pAddresss.text(result[i].restaurant.location.address);
    divCol1.addClass("col-1");
    divBadgeBadgeSuccess.addClass("badge badge-success");
    divRowPy3Ml1.addClass("row py-3 ml-1");
    divCol5TextUppercase.addClass("col-5 text-uppercase");
    pCousines.text("cousines :");
    pCostForTwo.text("cost for two :");
    pOutdoors.text("outdoor seating :");
    divCol7TextUppercase.addClass("col-7 text-uppercase");
    pCousinesData.text(result[i].restaurant.cuisines);
    pCostForTwoData.text(result[i].restaurant.currency + " " + result[i].restaurant.average_cost_for_two);
    if (result[i].restaurant.highlights.includes("Outdoor Seating")) {
      pOutdoorsData.text("Yes");
    } else {
      pOutdoorsData.text("No");
    }
    divRowTextCenterNoguttersPb3.addClass("row text-center no-gutters pb-3");
    divCol6.addClass("col-6");
    aMenu.attr("href", result[i].restaurant.menu_url)
    aMenu.attr("target", "_blank")
    aMenu.addClass("btn redBtn  text-uppercase");
    iMenu.addClass("fas fa-book");
    aMenu.text("Menu");
    divCol6_2.addClass("col-6");
    aWebsite.attr("href", result[i].restaurant.url)
    aWebsite.attr("target", "_blank")
    aWebsite.addClass("btn redBtn  text-uppercase");
    iWebsite.addClass("fas fa-book");
    aWebsite.text("Website");



    divCol5TextCap.append(h6);
    divCol5TextCap.append(pAddresss);
    divCol5.append(myImg);
    divRowP3.append(divCol5)
    divRowP3.append(divCol5TextCap);
    divBadgeBadgeSuccess.append();
    divBadgeBadgeSuccess.append(result[i].restaurant.user_rating.aggregate_rating);
    divCol1.append(divBadgeBadgeSuccess);
    divRowP3.append(divCol1);
    divCard2.append(divRowP3);
    divCard2.append(hr)
    divCol5TextUppercase.append(pCousines);
    divCol5TextUppercase.append(pCostForTwo);
    divCol5TextUppercase.append(pOutdoors);
    divRowPy3Ml1.append(divCol5TextUppercase);
    divCol7TextUppercase.append(pCousinesData);
    divCol7TextUppercase.append(pCostForTwoData);
    divCol7TextUppercase.append(pOutdoorsData);
    divRowPy3Ml1.append(divCol7TextUppercase);
    divCard2.append(divRowPy3Ml1);
    divCard2.append(hr2);
    divCol6.append(aMenu);
    divRowTextCenterNoguttersPb3.append(divCol6);
    divCol6_2.append(aWebsite);
    divRowTextCenterNoguttersPb3.append(divCol6_2);
    divCard2.append(divRowTextCenterNoguttersPb3);
    divCard1.append(divCard2);
    outerDiv.append(divCard1);
    $("#restaurant-list").append(outerDiv);
  }
}

function showFeedback(text) {
  const feedback = document.querySelector(".feedback");
  feedback.classList.add("showItem");
  feedback.innerHTML = `<p>${text}</p>`;
  setTimeout(() => {
    feedback.classList.remove("showItem");
  }, 3000);
}

function showWeather() {
  const feedback = document.querySelector(".weather-card");
  feedback.classList.add("showItem");
}

function hideWeather() {
  const feedback = document.querySelector(".weather-card");
  feedback.classList.remove("showItem");
}

function showLoader() {
  this.loader.classList.add("showItem");
  setTimeout(() => {
    this.loader.classList.remove("showItem");
  }, 3000);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    console.log();
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

async function showPosition(position) {
  latitude = await position.coords.latitude;
  longitude = await position.coords.longitude;
  if ((latitude !== undefined || latitude !== "")
    && (longitude !== undefined || longitude !== "")) {
    console.log("call weather api to get weather of current location");
    console.log("Latitude: " + latitude);
    console.log("Longitude: " + longitude);
    getCurrentLocationWeather(latitude, longitude);
  }
}

$(document).ready(function () {
  showLoader();
  getCategories();
  getLocation();
  //$("#weather").hide();
  //$(".weather-card").hide();
  searchForm.addEventListener("submit", event => {
    event.preventDefault();
    showLoader();
    hideWeather();
    $("#restaurant-list").empty();
    //global variables for openweather api
    city = searchCity.value.toLowerCase().trim();
    selectedCategory = parseInt(searchCategory.value);
    //console.log(selectedCategory);
    //console.log(city)
    if (city === "" || selectedCategory === 0) {
      //console.log("show error");
      showFeedback("please enter a city and select category");
    } else {
      getCityData(city);
    }
  })
});
