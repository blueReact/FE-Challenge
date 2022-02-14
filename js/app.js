(function ($) {
  let elementPhoneSearch = $("#phone-search-container");
  let elementEmailSearch = $("#email-search-container");
  let inputSearchPhone = $("#input-search-phone");
  let inputSearchEmail = $("#input-search-email");  
  let resultPreload = $('#result-preload');
  elementPhoneSearch.hide();
  resultPreload.hide();
  
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

  //Validation Object
  var validation = {
    //Email validation function accepting sanitized value as parameter 
    emailValidation : function(sanitizedValue) {
      const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      return regEx.test(sanitizedValue);
    },

    //Phone validation function accepting sanitized value as parameter 
    phoneValidation : function(sanitizedValue) {
      const regEx = /^\d{10}$/; //Regex for 10 digit phone numbers
      return regEx.test(sanitizedValue);
    }    
  };

  $("#btn-search-email").on("click", function (e) {
    e.preventDefault();
    localStorage.clear(); //Clears storage for next request
    let sanitizedValue = inputSearchEmail.val().trim().toLowerCase(); //Trimmed white spaces
    let isValidated = validation.emailValidation(sanitizedValue); //Calling validation Object 
    getApiData(isValidated, sanitizedValue, false, $(this)); //Calling getApiData function which holds API related logic
  });

  inputSearchEmail.keypress(function (event) {
    let sanitizedValue = inputSearchEmail.val().trim().toLowerCase(); //Trimmed white spaces
    let keyCodeValue = event.keyCode ? event.keyCode : event.which;
    if (keyCodeValue == "13") {
      /**
       * Makes a request to ltv API to search an specific email address.
       * If there's a response, it gets stored in the local storage and redirects to results page
       */
      event.preventDefault();
      localStorage.clear(); //Clears storage for next request   
      let isValidated = validation.emailValidation(sanitizedValue); //Calling validation Object 
      getApiData(isValidated, sanitizedValue, false, $(this)); //Calling getApiData function which holds API related logic
    }
  });

  $("#btn-search-phone").on("click", function (e) {
    e.preventDefault();
    localStorage.clear(); //Clears storage for next request
    let sanitizedValue = inputSearchPhone.val().trim().toLowerCase(); //trimmed white spaces
    let isPhone = true;
    let isValidated = validation.phoneValidation(sanitizedValue); //Calling validation Object    
    getApiData(isValidated, sanitizedValue, isPhone, $(this)); //Calling getApiData function which holds API related logic
  });

  inputSearchPhone.keypress(function (event) {
    let sanitizedValue = inputSearchPhone.val().trim().toLowerCase(); //trimmed white spaces
    let isPhone = true;
    let keyCodeValue = event.keyCode ? event.keyCode : event.which;
    if (keyCodeValue == "13") {
      /**
       * Makes a request to ltv API to search an specific email address.
       * If there's a response, it gets stored in the local storage and redirects to results page
       */
      event.preventDefault();
      localStorage.clear(); //Clears storage for next request
      let isValidated = validation.phoneValidation(sanitizedValue); //Calling validation Object
      getApiData(isValidated, sanitizedValue, isPhone, $(this)); //Calling getApiData function which holds API related logic
    }
  });  


  function getApiData(isValidated, sanitizedValue, isPhone, thisObject) {
    if (isValidated) {      
      thisObject.parent().removeClass("error");  
      resultPreload.show();    
      const url = isPhone ? "https://ltv-data-api.herokuapp.com/api/v1/records.json?phone=" + sanitizedValue : "https://ltv-data-api.herokuapp.com/api/v1/records.json?email=" + sanitizedValue;
      return fetchApiData(url); //Calling actual API to fetch data
    } else {
      thisObject.parent().addClass("error");
      return;
    }
  }

  function fetchApiData(url) {
    const proxyurl = "";
    fetch(proxyurl + url)
      .then((response) => response.text())
      .then(function (contents) {
        localStorage.setItem("userObject", contents);
        resultPreload.hide();
        window.location.href = "result.html";
      })
      .catch((e) => console.log(e));
  }
})(jQuery);
