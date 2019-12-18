$(".glitch").glitch({
    minint: 1,
    maxint: 4,
    maxglitch: 20,
    bg: "#0f0",
    direction: "random",
    vshift: 10,
    hshift: 13
  });
  
  $(".f0f").glitch({
    minint: 4,
    maxint: 16,
    maxglitch: 10,
    bg: "#f0f",
    direction: "random",
    vshift: 10,
    hshift: 13
  });
  
  $(".fa-exclamation-triangle").glitch({
    minint: 2,
    maxint: 3,
    maxglitch: 80,
    direction: "random",
    vshift: 5,
    hshift: 7
  });
  
  //
  
  var i = 60;
  setInterval(function(){
    if (i > 0) {
      i--;
      $(".count").text(i)
    }
    else {
      window.location.href = './logout';
    }
  },1000);