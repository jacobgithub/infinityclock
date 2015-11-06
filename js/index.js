var quotes = [];
quotes.push('My life for Auir!');
quotes.push('En Taro Tassadar!');
quotes.push('I fear no enemy!');
quotes.push('For the Khala is my strength!');
quotes.push('I fear not death.');
quotes.push('I hunger for battle...');
quotes.push('For our strength is eternal.');

$(document).ready(function() {

  var infinityTime = 25;
  var funTime = 5;

  var minutes = 25;
  var seconds = 0;

  var stopped = false;
  var ticking;

  $('.time').html(minutes + ":0" + seconds);

  function count() {

    if (minutes === 0 && seconds === 1) {
      document.getElementById('audio').play();
    }

    if (minutes === 0 && seconds === 0) {
      if ($('.state').html() === 'It only seems like forever!') {
        $('.state').html('The fun never ends!');
        $('.quote').text(quotes[Math.floor(Math.random() * quotes.length)]);
        minutes = funTime;
        $('.time').html(minutes + ":0" + seconds);

      } else if (minutes === 0 && seconds === 0) {
        ($('.state').html() === 'The fun never ends!')
        $('.state').html('It only seems like forever!');
        $('.quote').text(quotes[Math.floor(Math.random() * quotes.length)]);
        minutes = infinityTime;
        $('.time').html(minutes + ":0" + seconds);
      }
    } else {
      if (seconds === 0) {
        seconds = 60;
        minutes--
      }
      seconds--;
      if (seconds < 10) {
        $('.time').html(minutes + ":0" + seconds);
      } else {
        $('.time').html(minutes + ":" + seconds);
      }
    }
  }

  $('#downFun').click(function() {
    if (stopped === false) {
      if (funTime > 1) {
        funTime--;
        $("#fun").html(funTime);
        $('.state').text('It only seems like forever!');

        $(".time").html(infinityTime + ":00");

        seconds = 0;
        minutes = infinityTime;
      }
    }
  });
  $('#upFun').click(function() {
    if (stopped === false) {
      funTime++;
      $("#fun").html(funTime);
      $('.state').text('It only seems like forever!');
      $(".time").html(infinityTime + ":00");
      seconds = 0;
      minutes = infinityTime;
    }
  });
  $('#downInfinity').click(function() {
    if (stopped === false) {
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
  $('#upInfinity').click(function() {
    if (stopped === false) {
      infinityTime++;
      $("#infinity").html(infinityTime);
      $(".time").html(infinityTime + ":00");
      $('.state').text('It only seems like forever!');
      seconds = 0;
      minutes = infinityTime;
    }
  });

  $('.infinity').click(function() {
    if (stopped === false) {
      ticking = setInterval(count, 1000);
      stopped = true;
    } else if (stopped === true) {
      clearInterval(ticking);
      stopped = false;
    }
  });

});