$(document).ready(function(){

    var audio = $("#myAudio");
    var a = audio[0];
    var doc = $(document);
    var win = $(window);
    var audio_hover = false;
    var ae_body = $('body,html');
    var ae_btn_play = $('.audio-btn-play');
    var ae_time_bar = $('.audio-timeBar');
    var ae_time_max = $('.audio-timeMax');
    var ae_caption = $('.audio-caption');
    var ae_current = $('.audio-current');
    var audioContainer = $('.audio-player');
    var ae_duration = $('.audio-duration');
    var ae_progress_click = $('.audio-progressClick');
    var ae_showed_time = $('#audio-showed_time');
    var ae_show_bar = $('.audio-showBar');
    var ae_progress = $('.audio-progress');
    var ae_volume_bar_bg = $('.audio-volumeBar_bg');
    var ae_volume_bar = $('.audio-volumeBar');
    var ae_btn_sound = $('.audio-btn-sound');
    var ae_volume_bg_bar = $('.audio-volumeBg,.audio-volumeBar_bg');
    var ae_volume_max = $('.audio-volumeMax');
    var ae_audio_panel = $('.audio-panel');
    var ae_audio_playing = $('.audio-playing');
    var ae_loop_div = $('.audio-loop-div');
    var ae_cover = $('.audio-cover');
    var ae_playlist = $('.audio-playlist');
    var ae_cover_img = ae_cover.find('img');
    var audioUpdateTime,audioMetaLoaded,audio_duration,curVol,hover_playlist;
    var audioShowedTimeOver = false,audioTimeDrag = false,isMobile = false,audioVolumeDrag = false,audio_replay_index = false;
    var audioVolume_back = 0;
    var mode = 1;

    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

    var hasSource = true;
    if(audioPlayer.cover_height && audioPlayer.cover_url){
        ae_cover.css('height',audioPlayer.cover_height)
    }
    if(!audioPlayer.assets_url){
        audioPlayer.assets_url = '/';
    }
    if(audioPlayer.width){
        var a_width = parseFloat(audioPlayer.width);
        audioContainer.css('width',a_width);
    }
    if(audioPlayer.cover_url){
        if(audioPlayer.cover_url=='default'){
            ae_cover_img.attr('src',audioPlayer.assets_url+'images/cover.png');
        }
        else {
            ae_cover_img.attr('src', audioPlayer.cover_url);
        }
    }
    else{
        ae_cover.remove();
    }
    if(playlist[1].title){
        ae_caption.html(playlist[1].title);
        var h = ae_caption.outerHeight() + audioContainer.outerHeight();
        audioContainer.css('height',h + ae_cover.outerHeight());
        ae_audio_panel.css('height',h);
        if(audioPlayer.cover_url){
            ae_audio_panel.css('top',ae_cover.outerHeight());
        }
        var audio_panel_h = parseFloat(ae_audio_panel.outerHeight());
        if(audio_panel_h==70){
            ae_audio_playing.css({'top':'5px'});
        }
        else{
            ae_audio_playing.css('top',(audio_panel_h-55)/2);
        }
    }
    else{
        ae_caption.css('padding',0);
        var hx = ae_caption.outerHeight() + audioContainer.outerHeight();
        audioContainer.css('height',hx + ae_cover.outerHeight());
        ae_audio_panel.css('height',hx);
        if(audioPlayer.cover_url){
            ae_audio_panel.css('top',ae_cover.outerHeight());
        }
        ae_audio_playing.css({'top':-10});
    }
    if(playlist[1].source){
        var sourceType =  playlist[1].source.split('.');
        sourceType = sourceType[sourceType.length-1];
        if(sourceType=='mp3'){
            sourceType = 'mpeg'
        }
        sourceType = 'audio/' + sourceType;
        audio.append("<source src=" + playlist[1].source +" type=" + sourceType + " />");
    }
    else{
        ae_caption.remove();
    }
    var metaInterval = setInterval(metaDataAudio,50);

    ae_btn_play.on('click',function(){
        playPauseAudio();
    });
    checkResize();
    win.add(audioContainer).resize(function(){
        checkResize();
        changeProgressWidth();
    });
    function checkResize(){
        if(audioPlayer.width) {
            if (win.width() <= (parseFloat(audioPlayer.width))) {
                audioContainer.css('width', '100%');
            }
            else {
                var res_w_p = audioPlayer.width;
                audioContainer.css('width', res_w_p);
            }
        }
        else{
            if (win.width() <= 450) {
                audioContainer.css('width', '100%');
            }
            else{
                audioContainer.css('width', '450px');
            }
        }
        var ac_w = parseFloat(audioContainer.width());
        var win_w = parseFloat(win.width());
        if(win_w < ac_w){
            ae_body.css('overflow-x','auto');
        }
        else{
            ae_body.css('overflow-x','hidden');
        }

    }
    audio.on('ended',function(){
        if(mode===2){
            replayAudio(true);
            updateAudioVolume(1,curVol);
        }
        else if(mode===1 || mode===3){
            if(!audioTimeDrag) {
                nextSource();
            }
        }
        else{
            pauseAudio();
            toPaused();
            clearInterval(audioUpdateTime);
        }
    });
    doc.on('mouseup',function(e){
        if(audioVolumeDrag && !isMobile) {
            audioVolumeDrag = false;
            updateAudioVolume(e.pageX);
        }
        if(e.which != 3) {
            if (audioTimeDrag) {
                audioTimeDrag = false;
                updateAudioBar(e.pageX);
                if(a.ended){
                    if(mode===2){
                        replayAudio(true);
                    }
                }
            }
        }
    }).on('mousemove', function(e) {
        if(a.ended){
            if(mode===2){
                replayAudio(true);
            }
            if(mode===1 || mode===3){
                if(!audioTimeDrag) {
                    nextSource();
                }
            }
        }
        e.preventDefault();
        if(audioVolumeDrag && !isMobile) {
            updateAudioVolume(e.pageX);
        }
        if(e.which != 3) {
            if (audioTimeDrag) {
                updateAudioBar(e.pageX);
            }
        }
    });
    // UPDATE PROGRESS
    var a_vol_before;
    ae_progress_click.bind('mousedown', function(e) {
        if(e.which != 3) {
            audioTimeDrag = true;
            updateAudioBar(e.pageX);
        }
    }).bind('touchstart', function(e) {
        e.preventDefault();
        audioTimeDrag = true;
        updateAudioBar(event.touches[0].pageX);
    }).bind('touchend', function(e) {
        e.preventDefault();
        if(audioTimeDrag) {
            audioTimeDrag = false;
            updateAudioBar(event.touches[0].pageX);
        }
    }).bind('touchmove', function(e) {
        e.preventDefault();
        if(audioTimeDrag) {
            updateAudioBar(event.touches[0].pageX);
        }
    });
    ae_volume_bg_bar.bind('mousedown', function(e) {
        if(e.which != 3) {
            audioVolumeDrag = true;
            updateAudioVolume(e.pageX);
        }
    }).bind('touchstart', function(e) {
        e.preventDefault();
        audioVolumeDrag = true;
        updateAudioVolume(event.touches[0].pageX);
    }).bind('touchend', function(e) {
        e.preventDefault();
        if(audioVolumeDrag) {
            audioVolumeDrag = false;
            updateAudioVolume(event.touches[0].pageX);
        }
    }).bind('touchmove', function(e) {
        e.preventDefault();
        if(audioVolumeDrag) {
            updateAudioVolume(event.touches[0].pageX);
        }
    });
    ae_btn_sound.on('click touchstart',function(e) {
        if(!isMobile) {
            e.preventDefault();
            var cur_vol = a.volume;
            var q = $(this);
            var src = q.attr("src");

            if (cur_vol == 0) {
                if (audioVolume_back) {
                    updateAudioVolume(0,audioVolume_back);
                }
                else {
                    updateAudioVolume(0,1);
                }
                audioVolume_back = 0;
            }
            else {
                audioVolume_back = cur_vol;
                updateAudioVolume(0,0);
            }
            var percents;
            percents = Math.round(a.volume * 100);
            ae_volume_bar.css('width', percents + '%');
        }
    });
    // CHANGE VOLUME
    ae_volume_bg_bar.on('mousedown', function(e) {
        audioVolumeDrag = true;
        a.muted = false;
        ae_btn_sound.removeClass('muted');
        updateAudioVolume(e.pageX);
    }).bind('touchstart', function(e) {
        e.preventDefault();
        audioVolumeDrag = true;
        a.muted = false;
        ae_btn_sound.removeClass('muted');
        updateAudioVolume(event.touches[0].pageX);
    });
    // SHOWED TIME HOVERING
    ae_progress_click.on('mousemove',function(e){
        if(!audioShowedTimeOver) {
            audioProgressHover(e.pageX);
        }
    }).on('mouseleave',function(){
        ae_showed_time.fadeOut(0);
        ae_show_bar.css({'width':0});
    });
    ae_showed_time.on('mouseenter', function(){
        audioShowedTimeOver = true;
        ae_showed_time.fadeOut(0);
    }).on('mouseleave',function(){
        audioShowedTimeOver = false;
    });
    // UPDATE VOLUME BAR
    var updateAudioVolume = function(x, vol) {
        var percentage;
        curVol = a.volume;

        if(vol || vol===0) {
            percentage = vol * 100;
        }
        else {
            var positionVol =  x - ae_volume_bar_bg.offset().left;
            percentage = 100 * positionVol / ae_volume_bar_bg.width();
        }
        if(percentage > 100) {
            percentage = 100;
        }
        if(percentage < 0) {
            percentage = 0;
        }

        ae_volume_bar.css('width',percentage+'%');
        a.volume = percentage / 100;

        if(a.volume == 0){
            ae_btn_sound.attr("src",audioPlayer.assets_url+"images/muted_dark.png");
        }
        else if(a.volume > 0 && a.volume < 0.5){
            ae_btn_sound.attr("src",audioPlayer.assets_url+"images/volume1_dark.png");
        }
        else{
            ae_btn_sound.attr("src",audioPlayer.assets_url+"images/volume2_dark.png");
        }
    };
    // UPDATE PROGRESS BAR
    function updateAudioBar(x) {
        var progress = ae_progress;

        var maxduration = a.duration;
        ae_current.text(timeFormat(a.currentTime));
        var position = x - progress.offset().left;
        var percentage = 100 * position / progress.width();
        if(percentage > 100) {
            percentage = 100;
        }
        if(percentage < 0) {
            percentage = 0;
        }
        ae_time_bar.css('width',percentage+'%');
        a.currentTime = maxduration * percentage / 100;
    }
    function playPauseAudio(){
        if(a.paused || a.ended) {
            playAudio();
            toPlaying();
        }
        else {
            pauseAudio();
            toPaused();
        }
    }
    function playAudio(){
        ae_btn_play.attr('src',audioPlayer.assets_url+"images/pause_dark.png");
        a.play();
        curVol = a.volume;
        clearInterval(audioUpdateTime);
        audioUpdateTime = setInterval(updateAudioTimeBar, 40);
    }
    function pauseAudio(){
        ae_btn_play.attr('src',audioPlayer.assets_url+"images/play_dark.png");
        a.pause();
        clearInterval(audioUpdateTime);
    }
    function updateAudioTimeBar(){
        var currentPos = a.currentTime;
        var maxduration = a.duration;
        var perc = 100 * currentPos / maxduration;
        if(perc>100){
            perc = 100;
        }
        ae_time_bar.css('width',perc+'%');
        ae_duration.text(timeFormat(maxduration));
        ae_current.text(timeFormat(currentPos));
    }
    // PROGRESS HOVER
    function audioProgressHover(x){
        var showed_time_dur = a.duration;
        var showed_timeraw = x - ae_progress.offset().left;

        var showed_time_percentage = 100 * showed_timeraw / ae_progress.width();
        ae_show_bar.css('width',showed_time_percentage+'%');
        var showed_time3 = showed_time_percentage / 100 * showed_time_dur;
        var showed_time;

        if(showed_time3>0){
            if(showed_time3<=showed_time_dur) {
                showed_time = timeFormat(showed_time3);
            }
            else{
                showed_time = timeFormat(showed_time_dur);
            }
        }
        else{
            showed_time =  timeFormat(0);
        }

        ae_showed_time.html(showed_time);
        var showed_time_left =  showed_timeraw - (ae_showed_time.outerWidth() / 2);
        ae_showed_time.css('left',showed_time_left);
        ae_showed_time.fadeIn(0);
    }
    // TIME CONVERTER
    function timeFormat(seconds){
        var m = Math.floor(seconds/60)<10 ? "0"+Math.floor(seconds/60) : Math.floor(seconds/60);
        var s = Math.floor(seconds-(m*60))<10 ? "0"+Math.floor(seconds-(m*60)) : Math.floor(seconds-(m*60));
        return m+":"+s;
    }
    // SET PROGRESS WIDTH AT START
    function changeProgressWidth(){
        var e_dur_width = ae_duration.width();
        var fs_length_control = parseInt(audioContainer.width());
        var fs_length_time2 = e_dur_width;
        fs_length_time2 = Math.round(parseFloat(fs_length_time2));
        var remaining_width = 248 + (2*fs_length_time2) + 20;
        var fs_clear_length = fs_length_control - remaining_width;
        ae_progress_click.css("width",fs_clear_length);
    }
    // WHEN METADATA LOADED
    function metaDataAudio(){
        if (a.readyState > 0) {
            audioMetaLoaded = true;
            audio_duration = a.duration;
            ae_duration.text(timeFormat(audio_duration));
            clearInterval(metaInterval);
            changeProgressWidth();
        }
    }
    function toPlaying(){
        $(".audio-playing1").fadeIn();
        $(".audio-playing2").fadeOut();
    }
    function toPaused(){
        $(".audio-playing1").fadeOut();
        $(".audio-playing2").fadeIn();
    }
    function replayAudio(x){
        if(x && !audioTimeDrag){
            playAudio();
        }

    }
    ae_loop_div.on('click',function() {
            mode++;
            if (mode > 3) {
                mode = 1;
            }
            if (mode === 1) {
                ae_loop_div.find('img').attr('src', audioPlayer.assets_url + 'images/replay_all.png');
            }
            else if (mode === 2) {
                ae_loop_div.find('img').attr('src', audioPlayer.assets_url + 'images/replay_one.png');
                if (!audioTimeDrag) {
                    replayAudio();
                    if (a.ended) {
                        toPlaying();
                    }
                }
            }
            else if (mode === 3) {
                ae_loop_div.find('img').attr('src', audioPlayer.assets_url + 'images/replay_all_one.png');
            }
    });
    //---------------------------------- KEY BINDS --------------------------------------
    win.on('keyup',function(event){
        var key = event.which;
        if( (key === 80 || key === 75 || key ===32 ) ){
            playPauseAudio();
        }
        else if( key === 37 || key === 74 ){
            // if(audio_hover){
            if(hover_playlist){
                prevSource();
            }
            else{
                a.currentTime -= 10;
                updateAudioTimeBar();
            }
            // }
        }
        else if( key === 38 ){
            if(hover_playlist){
                prevSource();
            }
        }
        else if( key === 39 || key === 76 ){
            // if(audio_hover){
            if(hover_playlist){
                nextSource();
            }
            else{
                a.currentTime += 10;
                updateAudioTimeBar();
            }
            // }
        }
        else if( key === 40 ){
                if(hover_playlist){
                    nextSource();
                }
        }
        else if( key === 109 || key === 40 ){
            if(audio_hover && !hover_playlist){
                event.preventDefault();
                updateAudioVolume(0,a.volume-0.1);
                updateAudioTimeBar();
            }
        }
        else if( key === 107 || key === 38 ){
            if(audio_hover && !hover_playlist){
                event.preventDefault();
                updateAudioVolume(0,a.volume+0.1);
                updateAudioTimeBar();
            }
        }
        else if( key === 35 ){
            event.preventDefault();
            nextSource();
        }
        else if( key === 34 ){
            prevSource();
        }
    });
    audioContainer.on('mouseenter',function(){
        audio_hover = true;
    }).on('mouseleave',function(){
        audio_hover = false;
    });
    // CUSTOM COLOR THEMES
    if(audioPlayer.color){
        customColor(audioPlayer.color);
    }
    function customColor(colorTheme) {
        var color1, color2;
        switch (colorTheme) {
            case('blue'): {
                color1 = '#1976D2';
                color2 = '#2196F3';
                break;
            }
            case('red'): {
                color1 = '#DE0E0E';
                color2 = '#e92419';
                break;
            }
            case('green'): {
                color1 = '#07a100';
                color2 = '#4CAF50';
                break;
            }
            case('yellow'): {
                color1 = '#cacf00';
                color2 = '#d7dc29';
                break;
            }
            case('pink'): {
                color1 = '#C2185B';
                color2 = '#E91E63';
                break;
            }
            case('purple'): {
                color1 = '#7B1FA2';
                color2 = '#9C27B0';
                break;
            }
            case('brown'): {
                color1 = '#77321b';
                color2 = '#89462e';
                break;
            }
            case('grey'): {
                color1 = '#455A64';
                color2 = '#607D8B';
                break;
            }
            case('black'): {
                color1 = '#111111';
                color2 = '#333333';
                break;
            }
            default: {
                break;
            }
        }
        if (!colorTheme || colorTheme == 'default' || colorTheme == 'none' || colorTheme == 'orange' || colorTheme == 'null') {
        }
        else {
            ae_audio_panel.add(ae_time_bar).add(ae_time_max).add(ae_volume_max).add(ae_volume_bar).css('background', color1);
            ae_show_bar.add(ae_showed_time).css('background',color2);
        }
    }
    // Playlist API

    function changeAudio(q){
        var pl_item = $('.audio-playlist-item');
        pl_item.removeClass('audio-playlist-item-active');
        pl_item.find('img').attr('src',audioPlayer.assets_url +'images/play_white.png');
        q.addClass('audio-playlist-item-active');
        var titleChanged = q.find('.audio-playlist-title').text();
        ae_caption.text(titleChanged);
        var imgChanged = audioPlayer.assets_url +'images/music2.png';
        q.find('img').attr('src',imgChanged);
        var changedIndex = parseInt(q.find('.audio-playlist-id').text());
        var srcChanged = playlist[changedIndex].source;
        var typeChanged = playlist[changedIndex].source.split('/');
        typeChanged = typeChanged[typeChanged.length-1].split('.')[1];
        audio.find('source').first().attr('src',srcChanged).attr('type','audio/'+typeChanged);
        a.load();
        playAudio();
    }
    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
    var playlistSize;
    if(playlist){
        playlistSize = Object.size(playlist);
        if(playlistSize && playlistSize>1){
            var aj=1;
            while(aj<playlistSize+1){
                var curp = playlist[aj];
                $('.audio-playlist').append("<span class='audio-playlist-item'>" +
                "<span><img src='assets/images/play_white.png' draggable='false' /></span>" +
                        "<span class='audio-playlist-title'>" + curp.title + "</span>" +
                        "<span class='audio-playlist-id'>" + aj+ "</span>" + "</span>");
                aj++;
            }
            var ae_playlist_item = $('.audio-playlist-item');
            ae_playlist_item.first().addClass('audio-playlist-item-active');
            ae_playlist_item.first().find('img').attr('src',audioPlayer.assets_url +'images/music2.png');
            ae_playlist_item.on('click',function(){changeAudio($(this))});

        }
    }
    function prevSource(){
        if(playlistSize && playlistSize>1) {
            var curItem = $('.audio-playlist-item-active');
            var curSource = parseInt(curItem.find('.audio-playlist-id').text());
            var prevSrc = curSource;
            prevSrc--;
            var firstItem = false;
            if (prevSrc < 1) {
                prevSrc = playlistSize;
                curItem = $('.audio-playlist-item').last();
                firstItem = true;
            }
            srcPrev = playlist[prevSrc].source;
            var typePrev = playlist[prevSrc].source.split('/');
            typePrev = typePrev[typePrev.length - 1].split('.')[1];
            audio.find('source').first().attr('src', srcPrev).attr('type', 'audio/' + typePrev);
            var pl_item = $('.audio-playlist-item');
            pl_item.removeClass('audio-playlist-item-active');
            pl_item.find('img').attr('src', audioPlayer.assets_url + 'images/play_white.png');
            if (firstItem) {
                curItem.addClass('audio-playlist-item-active');
                curItem.find('img').attr('src', audioPlayer.assets_url + 'images/music2.png');
                ae_caption.text(curItem.find('.audio-playlist-title').text());
                a.load();
                playAudio();
                if (mode === 3) {
                    pauseAudio();
                }
                updateAudioVolume(1, curVol);
                var adw = $('.audio-playlist-item').length;
                var hPl = ae_playlist.height() * (adw/4);
                ae_playlist.animate({scrollTop:hPl},300);
            }
            else {
                curItem.prev().addClass('audio-playlist-item-active');
                curItem.prev().find('img').attr('src', audioPlayer.assets_url + 'images/music2.png');
                ae_caption.text(curItem.prev().find('.audio-playlist-title').text());
                a.load();
                playAudio();
                updateAudioVolume(1, curVol);
            }
        }
    }
    function nextSource(){
        if(playlistSize && playlistSize>1) {
            var curItem = $('.audio-playlist-item-active');
            var curSource = parseInt(curItem.find('.audio-playlist-id').text());
            var nextSrc = curSource;
            nextSrc++;
            var lastItem = false;
            if (nextSrc > playlistSize) {
                nextSrc = 1;
                curItem = $('.audio-playlist-item').first();
                lastItem = true;
            }
            srcNext = playlist[nextSrc].source;
            var typeNext = playlist[nextSrc].source.split('/');
            typeNext = typeNext[typeNext.length - 1].split('.')[1];
            audio.find('source').first().attr('src', srcNext).attr('type', 'audio/' + typeNext);
            var pl_item = $('.audio-playlist-item');
            pl_item.removeClass('audio-playlist-item-active');
            pl_item.find('img').attr('src', audioPlayer.assets_url + 'images/play_white.png');
            if (lastItem) {
                curItem.addClass('audio-playlist-item-active');
                curItem.find('img').attr('src', audioPlayer.assets_url + 'images/music2.png');
                ae_caption.text(curItem.find('.audio-playlist-title').text());
                a.load();
                playAudio();
                if (mode === 3) {
                    pauseAudio();
                }
                updateAudioVolume(1, curVol);
                ae_playlist.animate({scrollTop:0},300);
            }
            else {
                curItem.next().addClass('audio-playlist-item-active');
                curItem.next().find('img').attr('src', audioPlayer.assets_url + 'images/music2.png');
                ae_caption.text(curItem.next().find('.audio-playlist-title').text());
                a.load();
                playAudio();
                updateAudioVolume(1, curVol);
            }
        }
    }
    ae_playlist.on('mouseenter',function () {
        hover_playlist = true;
    }).on('mouseleave',function () {
        hover_playlist = false;
    });
});