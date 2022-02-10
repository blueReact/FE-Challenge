(function ($) {
  let elementPhoneSearch = $("#phone-search-container");
  let elementEmailSearch = $("#email-search-container");
  let inputSearchPhone = $("#input-search-phone");
  let inputSearchEmail = $("#input-search-email");  
  elementPhoneSearch.hide();
  
  $("#btn-show-by-email").on("click", function () {
    elementEmailSearch.show();
    elementPhoneSearch.hide();
    $(this).addClass("active").siblings().removeClass("active");
  });

  $("#btn-show-by-phone").on("click", function () {
    elementEmailSearch.hide();
    elementPhoneSearch.show();
    $(this).addClass("active").siblings().removeClass("active");
  });

  $("#btn-search-email").on("click", function (e) {
    e.preventDefault();
    localStorage.clear(); //Clears storage for next request
    let email = inputSearchEmail.val().trim().toLowerCase(); //trimmed white spaces
    let regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    getEmailApiData(regEx, email); //Calling getEmailApiData function which holds email API related logic
  });

  inputSearchEmail.keypress(function (event) {
    let email = inputSearchEmail.val().trim().toLowerCase(); //trimmed white spaces
    let regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let keyCodeValue = event.keyCode ? event.keyCode : event.which;
    if (keyCodeValue == "13") {
      /**
       * Makes a request to ltv API to search an specific email address.
       * If there's a response, it gets stored in the local storage and redirects to results page
       */
      event.preventDefault();
      localStorage.clear(); //Clears storage for next request
      getEmailApiData(regEx, email); //Calling getEmailApiData function which holds email API related logic
    }
  });

  $("#btn-search-phone").on("click", function (e) {
    e.preventDefault();
    localStorage.clear(); //Clears storage for next request
    let phone = inputSearchPhone.val().trim().toLowerCase(); //trimmed white spaces
    let regEx = /^\d{10}$/;
    getPhoneApiData(regEx, phone); //Calling getPhoneApiData function which holds phone API related logic
  });

  inputSearchPhone.keypress(function (event) {
    let phone = inputSearchPhone.val().trim().toLowerCase(); //trimmed white spaces
    let regEx = /^\d{10}$/;
    let keyCodeValue = event.keyCode ? event.keyCode : event.which;
    if (keyCodeValue == "13") {
      /**
       * Makes a request to ltv API to search an specific email address.
       * If there's a response, it gets stored in the local storage and redirects to results page
       */
      event.preventDefault();
      localStorage.clear(); //Clears storage for next request
      getPhoneApiData(regEx, phone); //Calling getPhoneApiData function which holds phone API related logic
    }
  });

  function getEmailApiData(regEx, email) {
    if (email.match(regEx)) {
      inputSearchEmail.parent().removeClass("error");
      const url =
        "https://ltv-data-api.herokuapp.com/api/v1/records.json?email=" + email;
      fetchApiData(url); //Calling actual API to fetch data
    } else {
      inputSearchEmail.parent().addClass("error");
    }
  }

  function getPhoneApiData(regEx, phone) {
    if (phone.match(regEx)) {
      inputSearchPhone.parent().removeClass("error");
      const url =
        "https://ltv-data-api.herokuapp.com/api/v1/records.json?phone=" + phone;
      fetchApiData(url); //Calling actual API to fetch data
    } else {
      inputSearchPhone.parent().addClass("error");
    }
  }

  function fetchApiData(url) {
    const proxyurl = "";
    fetch(proxyurl + url)
      .then((response) => response.text())
      .then(function (contents) {
        localStorage.setItem("userObject", contents);
        window.location.href = "result.html";
      })
      .catch((e) => console.log(e));
  }
})(jQuery);
