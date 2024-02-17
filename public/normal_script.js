document.addEventListener("DOMContentLoaded", function() {
    // Get elements
    var volumeSlider = document.getElementById("volume-slider");
    var decreaseBtn = document.getElementById("decrease-btn");
    var increaseBtn = document.getElementById("increase-btn");
    var audioElements = document.querySelectorAll(".audio-element");

    // Decrease volume function
    decreaseBtn.addEventListener("click", function() {
      if (volumeSlider.value > 0) {
        volumeSlider.value = parseInt(volumeSlider.value) - 10;
        // Add your code to adjust the sound volume accordingly
        adjustVolume(-0.1);
      }
    });

    // Increase volume function
    increaseBtn.addEventListener("click", function() {
      if (volumeSlider.value < 100) {
        volumeSlider.value = parseInt(volumeSlider.value) + 10;
        // Add your code to adjust the sound volume accordingly
        adjustVolume(+0.1);
      }
    });

    // Update volume function when slider is changed
    volumeSlider.addEventListener("input", function(e) {
      audio.volume = e.currentTarget.value / 100;
  });

  function adjustVolume(delta) {
    audioElements.forEach(function(audio) {
        if (audio.volume + delta >= 0 && audio.volume + delta <= 1) {
            audio.volume += delta;
        }
    });
  }
});

function play() {
  var audio = document.querySelector(".audio-element");
  audio.play();
}