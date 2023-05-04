// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {

  // Saves the time and text parsed into it.
  function saveText(time, text) {
    localStorage.setItem(time, JSON.stringify(text)); 
  }
  // Grabs the localstorage dat
  function getUserData(localKey) {
    return JSON.parse(localStorage.getItem(localKey));
  }
  // Will set the Class depending if it is past, present or future.
  function classTime() {

    var timeDiv = $('.time-block')
    var currTime = dayjs().format('HH')

    console.log(timeDiv)


    for (var i = 0; timeDiv.length; i++) {
      var timeEl = timeDiv[i].attributes[2].value

      // timeDiv = timeDiv[i]
      if (currTime > timeEl) {
        console.log(timeDiv)
        console.log("early")
        timeDiv.attr('class', 'row time-block past')
      } else if (currTime === timeEl) {
        console.log("otime")
        timeDiv.attr('class', 'row time-block present') 
      } else {
        timeDiv.attr('class', 'row time-block future')
        console.log("dwd")
      }
    }
  }


  $('.saveBtn').on('click', function(event) {
      event.preventDefault();
      // Grabs the ID from the HTML Element.
      var classID = ($(this).parent().attr('id'));
      // Grabs the day it was saved in the format below.
      var dayID = dayjs().format('DD/MM/YY');
      // Saved as both class ID with a date seperately. This allows it be called upon using either the ID and the date.
      var userKey = (classID + " " + dayID)
      console.log(userKey)
      var userText = $(this).prev().val().trim();

      saveText(userKey, userText);


      console.log();
  })

  function renderUserData() {

    $('div').each(function (index) {
      var currentID = $('div').get(index).id;
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

  
  
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. 
  // HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

  renderUserData();
  classTime()

  function date() {
    var currentDay = dayjs().format('dddd, DD of MMM YYYY')
    $('#currentDay').text(currentDay)
  }
  date();
});
