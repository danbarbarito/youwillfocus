function pauseAllAudio() {
  $("audio").each(function(){this.pause()})
}

function setAudioStates() {
  var music_seed = Math.floor((Math.random() * 50) + 1);
  if (music_seed > 25) {
    window.music_playing = false;
  } else {
    window.music_playing = true;
  }
  var rain_seed = Math.floor((Math.random() * 50) + 1);
  if (rain_seed > 25) {
    window.rain_playing = false;
  } else {
    window.rain_playing = true;
  }
  var white_noise_seed = Math.floor((Math.random() * 50) + 1);
  if (white_noise_seed > 25) {
    window.white_noise_playing = false;
  } else {
    window.white_noise_playing = true;
  }

}

function setInitialVolumes() {
  $("audio#music")[0].volume = 1;
  $(".current-volume#music").html($("audio#music")[0].volume * 10);
  $("audio#rain")[0].volume = 1;
  $(".current-volume#rain").html($("audio#rain")[0].volume * 10);
  $("audio#white-noise")[0].volume = .3;
  $(".current-volume#white-noise").html($("audio#white-noise")[0].volume * 10);
}

function printAudioStates() {
  console.log("Music Playing: " + window.music_playing);
  console.log("Rain Playing: " + window.rain_playing);
  console.log("White Noise Playing: " + window.white_noise_playing);
}

$(document).ready(function(){
  setAudioStates();
  printAudioStates();
  setInitialVolumes();

  // Play/pause sounds
  if (window.music_playing) {
    $("audio#music")[0].play();
  } else {
    $("audio#music")[0].pause();
  }
  $("a#music").on("click", function(t) {
    if (window.music_playing) {
      $("audio#music")[0].pause();
      window.music_playing = false;
    } else {
      $("audio#music")[0].play();
      window.music_playing = true;
    }
  });
  if (window.rain_playing) {
    $("audio#rain")[0].play();
  } else {
    $("audio#rain")[0].pause();
  }
  $("a#rain").on("click", function(t) {
    if (window.rain_playing) {
      $("audio#rain")[0].pause();
      window.rain_playing = false;
    } else {
      $("audio#rain")[0].play();
      window.rain_playing = true;
    }
  });
  if (window.white_noise_playing) {
    $("audio#white-noise")[0].play();
  } else {
    $("audio#white-noise")[0].pause();
  }
  $("a#white-noise").on("click", function(t) {
    if (window.white_noise_playing) {
      $("audio#white-noise")[0].pause();
      window.white_noise_playing = false;
    } else {
      $("audio#white-noise")[0].play();
      window.white_noise_playing = true;
    }
  });

  // Handle volume buttons

  $("a#music-vol.volume-increase").on("click", function(t) {
    $("audio#music")[0].volume += 0.1;
    $(".current-volume#music").html(parseInt($("audio#music")[0].volume * 10));
  });
  $("a#music-vol.volume-decrease").on("click", function(t) {
    $("audio#music")[0].volume -= 0.1;
    $(".current-volume#music").html(parseInt($("audio#music")[0].volume * 10));
  });
  $("a#rain-vol.volume-increase").on("click", function(t) {
    $("audio#rain")[0].volume += 0.1;
    $(".current-volume#rain").html(parseInt($("audio#rain")[0].volume * 10));
  });
  $("a#rain-vol.volume-decrease").on("click", function(t) {
    $("audio#rain")[0].volume -= 0.1;
    $(".current-volume#rain").html(parseInt($("audio#rain")[0].volume * 10));
  });
  $("a#white-noise-vol.volume-increase").on("click", function(t) {
    $("audio#white-noise")[0].volume += 0.1;
    $(".current-volume#white-noise").html(parseInt($("audio#white-noise")[0].volume * 10));
  });
  $("a#white-noise-vol.volume-decrease").on("click", function(t) {
    $("audio#white-noise")[0].volume -= 0.1;
    $(".current-volume#white-noise").html(parseInt($("audio#white-noise")[0].volume * 10));
  });

});
