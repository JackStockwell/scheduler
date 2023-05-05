// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {

  var timeBlockDiv = $('.time-block')

  // Saves the time and text parsed into it.
  function saveText(time, text) {
    localStorage.setItem(time, JSON.stringify(text)); 
  }
  // Grabs the localstorage data
  function getUserData(localKey) {
    return JSON.parse(localStorage.getItem(localKey));
  }

  
  function renderUserData() {
    // Calls upon each div
    timeBlockDiv.each(function (index) {
      var currentID = timeBlockDiv.get(index).id;
      // Loops through the local storage, checks if the current ID is equal to a localstorage key.
      for (i = 0; i < localStorage.length; i++) {
       
        var keyValue = localStorage.key(i).split(' ')
        if (currentID === keyValue[0] && dayjs().format('DD/MM/YY')) {
          var textArea = this.children[1];
          var localKey = localStorage.key(i);
          textArea.value = getUserData(localKey);
        }
      }
    });
  }

  // Will set the Class depending if it is past, present or future.
  function classTime() {

    var currTime = dayjs().format('HH')

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

  $('.saveBtn').on('click', function(event) {
      event.preventDefault();
      $('.alert').show()
      // Grabs the ID from the HTML Element.
      var classID = ($(this).parent().attr('id'));
      // Grabs the day it was saved in the format below.
      var dayID = dayjs().format('DD/MM/YY');
      // Saved as both class ID with a date seperately. This allows it be called upon using either the ID and the date.
      var userKey = (classID + " " + dayID)

      var userText = $(this).prev().val().trim();

      saveText(userKey, userText);
  })

  renderUserData();
  classTime()

  function date() {
    var currentDay = dayjs().format('dddd, DD of MMM YYYY')
    $('#currentDay').text(currentDay)
  }
  date();
});
