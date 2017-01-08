/***
Application: Infinity Work Clock - Pomodoro Technique Timer
Author: Jacob C. Ting
Use: The application contains a counting timer that rotates between two states. One state is meant for timing a work session. The other state is meant for timing a break.

Clicking the large middle timer starts and pauses the timer.

The left buttons/number represent the time for breaks, the buttons can increase/decrease this time.

The right buttons/number represent the time for breaks, the buttons can increase/decrease this time.
***/

// Quotes
var quotes = [];
quotes.push('breathe');
quotes.push('listen');
quotes.push('relax');
quotes.push('stretch');
quotes.push('pause');

$(document).ready(function() {
  // Variables for the buttons that increase and decrease timers.
  var infinityTime = 25;
  var funTime = 5;
  
  // Variables for the main timer.
  var minutes = 25;
  var seconds = 0;
  
  // Variable controlling whether the clock is running or not.
  var stopped = true;
  
  // Variable holding our function that counts the timer down.
  var ticking;

  // Set the display time of the main timer.
  $('.time').html(minutes + ":0" + seconds);

  // This function controls the state of the timer (either 'break' or 'work'),
  // displays the random quote from the Quotes section, and play audio when timer is over.
  function count() {

    // Play sound as timer finishes.
    if (minutes === 0 && seconds === 1) {
      document.getElementById('audio').play();
    }

    // When the timer finishes, if the state is the 'work' state, change it to the break state.
    // Set the timer for the break timer, display a random quote, and update the timer display.
    if (minutes === 0 && seconds === 0) {
      if ($('.state').html() === 'It only seems like forever!') {
        $('.state').html('The fun never ends!');
        $('.quote').text(quotes[Math.floor(Math.random() * quotes.length)]);
        minutes = funTime;
        $('.time').html(minutes + ":0" + seconds);
      // Same as above, but change the state if it is in the 'break' state.
      } else if (minutes === 0 && seconds === 0) {
        ($('.state').html() === 'The fun never ends!')
        $('.state').html('It only seems like forever!');
        $('.quote').text(quotes[Math.floor(Math.random() * quotes.length)]);
        minutes = infinityTime;
        $('.time').html(minutes + ":0" + seconds);
      }
    } else {                                          // Controls the accurate display of the clock.
      if (seconds === 0) {                            // When seconds is equal to 0
        seconds = 60;                                 // reset them to 60,
        minutes--                                     // and reduce minutes by 1.
      }
      seconds--;                                      // Otherwise just reduce the seconds by 1.
      if (seconds < 10) {                             // When there are not double digit seconds,
        $('.time').html(minutes + ":0" + seconds);    // Only display one 0.
      } else {
        $('.time').html(minutes + ":" + seconds);     // Otherwise just display the second variable.
      }
    }
  }

  // Events for controling the buttons that reduce the work and break times.
  // They all essentially function the same. Possibly reduce repetition in future.
  
  // Reduce break time.
  $('#downFun').click(function() {                           // When button is clicked
    if (stopped === true) {                                 // if the timer has been stopped,
      if (funTime > 1) {                                     // and the timer isn't already at the minimum
        funTime--;                                           // decrease its amount by 1.
        $("#fun").html(funTime);                             // Update the break time display.
        $('.state').text('It only seems like forever!');     // Reset to the 'work' state.
        $(".time").html(infinityTime + ":00");               // Update the display timer.
        seconds = 0;                                         // Reset the second to 0, and
        minutes = infinityTime;                              // reset the minutes to the appropriate value.
      }
    }
  });
  
  // Increase break time.
  $('#upFun').click(function() {
    if (stopped === true) {
      funTime++;
      $("#fun").html(funTime);
      $('.state').text('It only seems like forever!');
      $(".time").html(infinityTime + ":00");
      seconds = 0;
      minutes = infinityTime;
    }
  });
  
  // Reduce work time.
  $('#downInfinity').click(function() {
    if (stopped === true) {
      if (infinityTime > 1) {
        infinityTime--;
        $("#infinity").html(infinityTime);
        $(".time").html(infinityTime + ":00");
        $('.state').text('It only seems like forever!');
      }
      seconds = 0;
      minutes = infinityTime;
    }
  });
  
  // Increase work time.
  $('#upInfinity').click(function() {
    if (stopped === true) {
      infinityTime++;
      $("#infinity").html(infinityTime);
      $(".time").html(infinityTime + ":00");
      $('.state').text('It only seems like forever!');
      seconds = 0;
      minutes = infinityTime;
    }
  });
  
  // Event that starts the timer when it is clicked.
  // Sets the states of the 'stopped' variable.
  $('.infinity').click(function() {
    if (stopped === true) {
      ticking = setInterval(count, 1000);
      stopped = false;
    } else if (stopped === false) {
      clearInterval(ticking);
      stopped = true;
    }
  });

});