$(document).ready(function () {

  var timeBlockDiv = $('.time-block')
  var selectDate = dayjs().format('DD/MM/YY');

  $( "#datepicker" ).datepicker({
    dateFormat: 'DD, dd M yy',
    changeMonth: true,
    changeYear: true,
    onSelect: function (dateText, inst) {
      date(dateText);
      var dateVal = $("#datepicker").datepicker('option', 'dateFormat', 'dd/mm/y')
      selectDate = dateVal[0].value
      renderUserData()
    }

  });

  // Saves the key and text parsed into it.
  function saveText(key, text) {
    localStorage.setItem(key, JSON.stringify(text)); 
  }
  // Grabs the localstorage data
  function getUserData(localKey) {
    return JSON.parse(localStorage.getItem(localKey));
  }
  
  // Click event listener on save buttons. Will run once the button is pressed.
  $('.saveBtn').on('click', function(event) {
    event.preventDefault();
    // Grabs the ID from the HTML Element.
    var classID = ($(this).parent().attr('id'));
    // Grabs the day it was saved in the format below.
    var dayID = selectDate
    // Saved as both class ID with a date seperately. This allows it be called upon using either the ID and the date.
    var userKey = (classID + " " + dayID)
    // Takes the value from the textinput area.
    var userText = $(this).prev().val().trim();
    // Parses the data into the saveText function.
    saveText(userKey, userText);
})

  // Renders the userData from localstorage.
  function renderUserData() {
    // Calls upon each timeblock div.
    timeBlockDiv.each(function (index) {
      // Grabs the id of each timeblock div to use for later.
      var currentID = timeBlockDiv.get(index).id;
      // A loop that will check if a key in localStorage matches a div container and is the correct date.
      for (i = 0; i < localStorage.length; i++) {
        // Splits the key into two parts. The hour ID and day are now seperate.
        var keyValue = localStorage.key(i).split(' ')
        // Checks if the current key matches the current div AND matches current day.
        if (currentID === keyValue[0] && selectDate === keyValue[1]) {
          // Renders the localstroage data if true.
          var textArea = this.children[1];
          var localKey = localStorage.key(i);
          textArea.value = getUserData(localKey);
        }
      }
    });
  }

  // Will set the Class depending if it is past, present or future.
  function classTime() {
    // Current hour in 2 digits.
    var currTime = dayjs().format('HH')
    // Loops through all divs, compares the data-time value with the current hour to determine if it past, present or future.
    for (var i = 0; i < timeBlockDiv.length; i++) {
     var timeData = $(timeBlockDiv[i]).attr('data-time')
     var currDiv = $(timeBlockDiv[i])
      if (currTime > timeData) {
        currDiv.attr('class', 'row time-block past')
      } else if (currTime === timeData) {
        currDiv.attr('class', 'row time-block present') 
      } else {
        currDiv.attr('class', 'row time-block future')
      }
    }
  }

  // Gets the current day and renders it in the header.
  function date(day) {
    var currentDay = ""
    if (day === null || day === undefined) {
      currentDay = dayjs().format('dddd, DD of MMM YYYY')
    } else {
      currentDay = dayjs(day).format('dddd, DD of MMM YYYY')
    }
      console.log(selectDate)
    $('#currentDay').text(currentDay)
  }

  // Event listen for clear local storage button, remove all items from local storage.
  $('#clear-storage').on('click', function(event) {
    event.preventDefault();
    if (confirm("Are you sure you want to remove all locally saved data? (Note: This CANNOT be undone")) {
      localStorage.clear
    } else {
      return;
    }
  })

  // Calls upon the functions to renderuserdata, class time and render the date in the header..
  renderUserData();
  classTime()
  date()

});
