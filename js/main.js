let audio;
$('#pause').hide();

//Initialize Audio
initAudio($('#playlist li:first-child'));


//Initializer  Function
function initAudio(element) {
    let song = element.attr('song');
    let title = element.text();
    let cover = element.attr('cover');
    let artist = element.attr('artist');

    // Create a New Audio Object
    audio = new Audio('media/'+ song);
    if (!audio.currentTime) {
        $('#duration').html('0:00');
    }
    $('#audio-player.title').text(title);
    $('#audio-player.artist').text(artist);

    //Insert Cover
    $('img.cover').attr('src', 'images/covers/'+ cover);
    $('#playlist li').removeClass('active');
    element.addClass('active');

//After song ends play next song
    audio.addEventListener('ended', function() {
            setTimeout(function(){
                    audio.pause();
                    var next = $('#playlist li.active').next();
                    if (next.length == 0) {
                        next = $('#playlist li:first-child');
                    }
                    initAudio(next);
                    audio.play();
                    showDuration();
             }, 5000);
     });

};

// Play Button
$('#play').click(function() {
    audio.play();
    $('#play').hide();
    $('#pause').show();
    $('#duration').fadeIn(400);
    showDuration();
});

//Pause Button
$('#pause').click(function() {
    audio.pause();
    $('#pause').hide();
    $('#play').show();
});

 // Stop Button
 $('#stop').click(function() {
    audio.pause();
    audio.currentTime = 0;
    $('#play').show();
    $('#pause').hide();
    $('#duration').fadeOut(400);
});

 // Next Button
 $('#next').click(function() {
    audio.pause()
    let next = $('#playlist li.active').next();
    if (next.length == 0 ) {
        next = $('#playlist li:first-child');
    }
    $('#play').hide();
    $('#pause').show();
    initAudio(next);
    audio.play();
    showDuration();
});

//Prev Button
$('#prev').click(function() {
    audio.pause()
    let prev = $('#playlist li.active').prev();
    if (prev.length == 0 ) {
        prev = $('#playlist li:last-child');
    }
    initAudio(prev);
    audio.play();
    showDuration();
});

//Volume Control
$('#volume').change(function() {
    audio.volume = parseFloat(this.value / 10);
});

//Playlist Song Click
$('#playlist li').click(function () {
    audio.pause();
    initAudio($(this));
	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	audio.play();
	showDuration();
});


// Time Duration
function showDuration() {
    $(audio).bind('timeupdate', function() {
        // Get Hours & Minutes
        let s=parseInt(audio.currentTime % 60);
        let m = parseInt((audio.currentTime)/60 % 60);
        // Add 0 if less than 10
        if (s < 10) {
            a = '0' + s;
        }
        $('#duration').html(m + '.' + s);
        let value = 0;
        if (audio.currentTime > 0) {
            value = Math.floor((100 / audio.duration) * audio.currentTime);
        }
        $('#progress').css('width', value+'%');
    })
}

$('#tracker').bind('click', function (ev) {
    console.log("sadf")
    var $div = $(ev.target);
    var $display = $div.find('#progressBar');

    var offset = $div.offset();
    var x = ev.clientX - offset.left;

    $('#progress').width(x);
});

