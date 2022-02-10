$(document).ready(function () {
  $('#phone-search-container').hide();
  $('#btn-show-by-email').click(function(){
    $('#email-search-container').show();
    $('#phone-search-container').hide();
    $(this).addClass("active").siblings().removeClass("active");
  })

  $('#btn-show-by-phone').click(function(){
    $('#email-search-container').hide();
    $('#phone-search-container').show();
    $(this).addClass("active").siblings().removeClass("active");
  })

  $("#btn-search").on("click", function (e) {
    e.preventDefault();
    localStorage.clear(); //Clears storage for next request
    email = $('#input-search-email').val().toLowerCase();

    var x, y;
    regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(regEx)) {
      x = true;
    } else {
      x = false;
    }

    if (x === true) {
      document.querySelector('#input-search-email').parentNode.classList.remove("error");
      const proxyurl = "";
      const url =
        'https://ltv-data-api.herokuapp.com/api/v1/records.json?email=' + email;
      fetch(proxyurl + url)
        .then((response) => response.text())
        .then(function (contents) {
          localStorage.setItem("userObject", contents);
          window.location.href = "result.html";
        })
        .catch((e) => console.log(e));
    } else if (x !== true) {
      document.querySelector('#input-search-email').parentNode.classList.add("error");
    }
  });

  $('#input-search-email').keypress(function (event) {
    email = $('#input-search-email').val().toLowerCase();
    regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(regEx)) {
      x = true;
      document.querySelector('#input-search-email').parentNode.classList.remove("error");
    } else {
      x = false;
    }
    keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      /**
       * Makes a request to ltv API to search an specific email address.
       * If there's a response, it gets stored in the local storage and redirects to results page
       */
      event.preventDefault();
      localStorage.clear(); //Clears storage for next request

      var x, y;


      if (x === true) {
        const proxyurl = "";
        const url =
          'https://ltv-data-api.herokuapp.com/api/v1/records.json?email=' + email;
        fetch(proxyurl + url)
          .then((response) => response.text())
          .then(function (contents) {
            localStorage.setItem("userObject", contents);
            window.location.href = "result.html";
          })
          .catch((e) => console.log(e));
      } else if (x !== true) {
        document.querySelector('#input-search-email').parentNode.classList.add("error");
      }
    }
  });
  
  $("#btn-search-phone").on("click", function (e) {
    e.preventDefault();
    localStorage.clear(); //Clears storage for next request
    let phone = $('#input-search-phone').val().toLowerCase();    
    let regEx = /^\d{10}$/;    

    getApiData(regEx, phone); //Calling a common function which holds API related logic 
  });

  $('#input-search-phone').keypress(function (event) {
    let phone = $('#input-search-phone').val().toLowerCase(); 
    let regEx = /^\d{10}$/;    
    let keycode = (event.keyCode ? event.keyCode : event.which);    
    
    if (keycode == '13') {
      /**
       * Makes a request to ltv API to search an specific email address.
       * If there's a response, it gets stored in the local storage and redirects to results page
       */
      event.preventDefault();
      localStorage.clear(); //Clears storage for next request      
      getApiData(regEx, phone); //Calling a common function which holds API related logic 
    }
  });

  function getApiData(regEx, phone) {  
    if (phone.match(regEx)) {
      document.querySelector('#input-search-phone').parentNode.classList.remove("error");
      const proxyurl = "";
      const url =
        'https://ltv-data-api.herokuapp.com/api/v1/records.json?phone=' + phone;
      fetch(proxyurl + url)
        .then((response) => response.text())
        .then(function (contents) {
          localStorage.setItem("userObject", contents);
          window.location.href = "result.html";
        })
        .catch((e) => console.log(e));
    } else {
      document.querySelector('#input-search-phone').parentNode.classList.add("error");
    }
  }

});
