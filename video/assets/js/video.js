$(document).ready(function(){
	// INITIALIZE
    var remaining_coeficient = 179;
    var size_height = 70;
    var hide_controls_timeout = 2500;
    var volume_back = 0;
    var vId = [],vFormat = [];
    var init_exist = true;
    var vPath,updateTime,video_duration,e_dur_width,firstClickTiming,bufferTimeout,controlsTimer,checkLoading,remove_ad_timeout;
    var settings_showing = false,context_showing = false,edge = false,wscript = false,qchanged = false,isMobile = false,
        autoreplay = false,showedTimeOver = false,video_hover = false,timeDrag = false,volumeDrag = false,
        completeloaded = false,menu_showing = false,btn_size_clicked = false,videoMetaLoaded = false,endedVol = false,
        isFullscreen = false,videoClicked = false,control_hover = false,ad_finished = false,ad_clicked = false,ad_can_finish = false,
        ad_image_clicked = false,subAppended = false,IEBroken = false,audio_hover = false;
    // HTML ELEMENTS
    var win = $(window);
    var doc = $(document);
    var window_height = win.height();
    var e_body = $('body');
    var e_body_video = $('body,video');
    var video = $('#myVideo');
    var v = video[0];
    var e_player = $('.player');
    var videoContainer = $('.videoContainer');
    var vc = videoContainer[0];
    var e_btn_title = $('.btn_title');
    var e_control = $('.control');
    var e_caption = $('.caption');
    var e_caption_bg = $('.caption-bg');
    var e_control_bg = $('.control-bg');
    var e_caption_title = $('.caption_title');
    var e_caption_right = $('.caption_right');
    var e_control_children = e_control.children();
    var e_caption_children = e_caption.children();
    var e_progress_click = $('.progressClick');
    var e_size_bar = $('.sizeBar');
    var e_size_bar_bg = $('.sizeBar_bg');
    var e_btn_play = $('.btn-play');
    var e_current_duration = $('.current,.duration');
    var e_showed_time = $('#showed_time');
    var e_btn = $('.btn');
    var e_btn_fs = $('.btn-fs');
    var e_btn_size = $('.btn-size');
    var e_btn_sound = $('.btn-sound');
    var e_btn_settings = $('.btn-settings');
    var e_volume_btn_sound = $('.volume,.btn-sound');
    var e_progress = $('.progress');
    var e_duration = $('.duration');
    var e_time_max = $('.timeMax');
    var e_volume = $('.volume');
    var e_volume_bg = $('.volumeBg');
    var e_volume_bar_bg = $('.volumeBar_bg');
    var e_volume_bar = $('.volumeBar');
    var e_size = $('.size');
    var e_size_bg = $('.sizeBg');
    var e_volume_max = $('.volumeMax');
    var e_size_max = $('.sizeMax');
    var e_btn_title_size = $('#btn_title_size');
    var e_btn_title_sound = $('#btn_title_sound');
    var e_loading = $('.loading');
    var e_size_btn_size = $('.size,.btn-size');
    var e_volume_div = $('.volume_div');
    var e_size_div = $('.size_div');
    var e_btn_title_fullscreen = $('#btn_title_fullscreen');
    var e_current = $('.current');
    var e_play_big_div = $('.play_big_div');
    var e_replay_big_div = $('.replay_big_div');
    var e_time_bar = $('.timeBar');
    var e_show_bar = $('.showBar');
    var e_volume_bg_bar = $('.videoContainer div.volumeBg,.videoContainer div.volumeBar_bg');
    var e_size_bg_bar = $('.sizeBg,.sizeBar_bg');
    var e_buffer_bar = $('.bufferBar');
    var e_speed_btn = $('.speedBtn');
    var e_speed_btn3 = $('.speedBtn:nth-child(3)');
    var e_settings = $('.settings');
    var e_context_menu = $('.context_menu');
    var e_shadow = $('#shadow');
    var e_context_play = $('.context_play');
    var e_context_stop = $('.context_stop');
    var e_context_copy = $('.context_copy');
    var e_context_html = $('.context_html');
    var e_context_yioplayer = $('.context_yioplayer');
    var e_context_repeat = $('.context_repeat');
    var e_copyUrl = $('.copyUrlInput');
    var e_subtitle_div = $('.subtitle_div');
    var e_settings_title = $('.settings-title');
    var e_quality_div = $('.quality_div');
    var e_settings_element = $('.settings-element');
    var e_quality = $('.quality');
    var e_videoShadow = $('#videoShadow');
    var e_speed_div_header = $('.speed_div_header');
    var e_subtitles_div_header = $('.subtitles_div_header');
    var e_quality_div_header = $('.quality_div_header');
    var e_advert = $('#advert');
    var ad = e_advert[0];
    var e_advert_div = $('#advert_div');
    var e_watermark = $('#watermark');
    var e_ad_title = $('.advert_title');
    var e_ad_title_span = e_ad_title.find('span');
    var ad_exist = !!player.advert;
    var e_ad_banner = $('#advert_banner');
    var e_ad_close = $('#advert_banner .close-ad');
    var e_for_init = $('#for_init');
    var e_advert_image = $('#advert_image');
    var e_advert_link = e_ad_banner.find('a');
    var ieVersionCheck = getIEVersion();
    //--------------------------------------INIT-------------------------------

    // INITIALIZING CUSTOM SETTINGS OF USER

    if(!ad_exist){
        e_advert_div.remove();
    }
    else{
        if(player.advert_time){
            e_ad_title_span.text(player.advert_time)
        }
        else{
            e_ad_title.text('Advert will end at');
        }
        var e_ad_type = "video/" + player.advert.split('.')[1];
        e_advert.find('source').attr('src',player.advert).attr('type',e_ad_type);
    }
    if(player.width && player.height){
        e_player.css({'max-width':player.width,'height':player.height});
    }
    if(player.poster){
        video.attr('poster',player.poster)
    }
    if(player.watermark){
        e_watermark.attr('src',player.watermark)
    }
    if(player.advert_image){
        e_ad_banner.fadeIn(0);
        e_advert_image.attr('src',player.advert_image);
        if(player.advert_url){
            e_advert_link.attr('href',player.advert_url);
        }
        else{

        }
    }
    else{
        ad_image_clicked = true;
        e_ad_banner.remove();
    }
    for (var video_url in video_urls) {
        var cur_video_url = video_urls[video_url];
        var cur_video_type = cur_video_url.split('.');
        cur_video_type = "video/" + cur_video_type[cur_video_type.length-1];
        video.append("<source src=" + cur_video_url + " type=" + cur_video_type + " />");
    }
    if(typeof(video_subtitles) != 'undefined') {
        for (var video_subtitle in video_subtitles) {
            var cur_video_subtitle = video_subtitles[video_subtitle];
            var appended_v_sub = "<track src='" + cur_video_subtitle.src + "' label='" + cur_video_subtitle.label +
                "' kind='subtitles' srclang='" + cur_video_subtitle.lang + "' />";
            video.append(appended_v_sub);
        }
        var tracks = v.textTracks;
        trackChange('off');
    }
    var sources = video.find('source');
    e_caption_title.text(player['title']);


    // DEVICE DETECTION
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

    if (/Edge\/\d+./i.test(navigator.userAgent)){
        edge = true;
    }
    var AXO = false;
    if(ieVersionCheck>0){
        try {
            wscript = new ActiveXObject("WScript.shell");
        }catch(e){
            AXO = e;
        }
        if(!AXO){
            wscript = new ActiveXObject("WScript.shell");
        }
        else{
            alert('Player (certainly FullScreen) will not work properly because you do not have right settings for ActiveX in Internet Explorer.');
            IEBroken = true;
        }
    }
    if( (window.innerHeight == screen.height) || ( (screen.availHeight || screen.height-30) <= window.innerHeight)) {
        if(!isMobile && ieVersionCheck>0){
            emulate();
            emulation();
        }
    }
    if(!(typeof v.playbackRate !='undefined')){
        e_speed_div_header.fadeOut(0);
    }
    if(!(typeof tracks !='undefined')){
        e_subtitles_div_header.fadeOut(0);
    }
    var tracksExist = video.find('track').length;
    if(!tracksExist){
        e_subtitles_div_header.fadeOut(0);
    }
    if(isMobile){
        e_speed_div_header.fadeOut(0);
        hide_controls_timeout = 4000;
    }
    // PREPARING
    v.removeAttribute('controls');
    // NO-CACHE - RANDOM URL
    var randomNumber = getRandom();
    video.find('source').each(function(){
        var q = $(this);
        q.attr('src',q.attr('src')+'?'+randomNumber)
    });
    e_subtitle_div.on('click touchstart','.subtitle',function(){
        var q = $(this);
        trackChange(q.attr('data-value'));
        e_subtitle_div.find('.subtitle').removeClass('active');
        q.addClass('active');
    });

    getPath();
    if(objectSize(video_urls)>1){
        addQualities();
    }
    else{
        e_quality_div_header.remove();
    }
    // bigPlayShow();
    //--------------------------------------END [INIT]-------------------------------

    // WHEN RESIZING
    win.add(videoContainer).resize(function(){
        window_height = win.height();
        if(isFullscreen){
            var nq = parseInt(e_size_bar.height());
            var RESIZE_scale = (nq+30)/100;

            if(RESIZE_scale>1){RESIZE_scale=1}
            else if(RESIZE_scale<.3){RESIZE_scale=.3}

            var scaleFSraw2 = window_height*RESIZE_scale;
            var scaleFS = (window_height - scaleFSraw2)/2;
            video.css("padding", scaleFS + "px");
        }
        changeLengthOnFs();
    });
    //---------------------------------- WHEN METADATA LOADED - PREPARE EVERYTHING --------------------------------------
    var metaInterval = setInterval(metaDataVideo,50);
	video.on('loadedmetadata', function() {
        if(!qchanged) {
            if (endedVol || endedVol===0) {
                updateVolume(0, endedVol);
            }
            else {
                updateVolume(0, 1);
            }
            videoMetaLoaded = true;
            var caption_text = e_caption_title.text();
            if (!caption_text) {
                e_caption_title.css({"height": 0, "padding": 0});
            }
            e_duration.text(timeFormat(video_duration));
            changeLengthOnFs();
        }
	});

    //---------------------------------- CLICKS --------------------------------------
	video.add(e_videoShadow).add(e_caption_bg).add(e_control_bg).add(e_loading).add(e_watermark).on('click', function() {
        if(videoMetaLoaded){
            playPause();
            if(isMobile) {
                sizeDivHide();
                volumeDivHide();
                timeDrag = false;
                sizeDrag = false;
                volumeDrag = false;
            }
            showControlsTimeout();
        }
    });
    e_shadow.add(e_context_menu).add(e_play_big_div).add(e_replay_big_div).add(e_watermark).on('click',function(){
        hideSettings();
        contextHide();
    });
    e_caption_title.on('click',function(){
        hideSettings();
    });
    e_caption.on('click', function () {
        if(isMobile){
            sizeDivHide();
            volumeDivHide();
        }
    });
    e_control.on('click',function(){
        hideSettings();
    });
    e_for_init.html('<div id="init"></div>');
    videoContainer
        .on('mousemove',function(event){
            if(window.lastX !== event.clientX || window.lastY !== event.clientY){
                if(!init_exist){
                    showControls();
                    clearTimeout(controlsTimer);
                    if(!control_hover && !sizeDrag){
                        controlsTimer = setTimeout(hideControls, hide_controls_timeout);
                    }
                }
            }
            window.lastX = event.clientX;
            window.lastY = event.clientY;
        })
        .hover(function() {
            if(!init_exist){
        	    if(!volumeDrag && !timeDrag && !sizeDrag){
        		    clearTimeout(controlsTimer);
                    controlsTimer = setTimeout(hideControlsWithoutMouse, hide_controls_timeout);
                }
        	}
        })
        .on('click', function() {
                if ((videoMetaLoaded || v.readyState > 0)) {
                    firstClick();
                }
                else {
                    clearInterval(firstClickTiming);
                    firstClickTiming = setInterval(firstClick, 1000);
                    showLoading();
                    bigPlayHide();
                }
        });
    e_btn_play.on('click touchstart', function(e){
        e.preventDefault();
        playPause();
        showControlsTimeout();
    });
    e_play_big_div.on('click touchstart',function(e){
        e.preventDefault();
        play();
        if(isMobile){
            timeDrag = false;
            sizeDrag = false;
            volumeDrag = false;
        }
    });
    e_btn_fs.on('click', function(e) {
        e.preventDefault();
        toFullScreen();
        changeLengthOnFs();
	});
    video.add(e_play_big_div).add(e_videoShadow).on('dblclick',function() {
        toFullScreen();
        changeLengthOnFs();
	});
    // ON FULLSCREEN CHANGE
    doc.on('webkitfullscreenchange', function(){
        if(isFullscreen){
            isFullscreen = false;
            fullScreenOn();
        }
        else{
            isFullscreen = true;
            fullScreenOff();
        }
        resetSizeOnFs();
        e_dur_width = e_duration.width();
        changeLengthOnFs();
    }).on('mozfullscreenchange fullscreenchange msFullscreenChange', function(){
        if(document.mozFullScreen){
            fullScreenOff();
        }
        else if(!document.mozFullScreen){
            if(isFullscreen){
                fullScreenOn();
            }
            else{
                fullScreenOff();
            }
        }
        isFullscreen = !isFullscreen;
        resetSizeOnFs();
        e_dur_width = e_duration.width();
        changeLengthOnFs();
    });
    e_speed_btn.on('click touchstart',function(e){
        e.preventDefault();
        var q = $(this);
        e_speed_btn.removeClass('active');
        q.addClass('active');
        v.playbackRate = parseFloat(q.text());
    });
    e_ad_close.add(e_advert_link).on('click',function(){
        setTimeout(function(){ad_image_clicked = true;},2);
        e_ad_banner.fadeOut(100);
    });
    //---------------------------------- VIDEO ON EVENTS --------------------------------------
	video.on('canplaythrough', function() {
		completeloaded = true;
	}).on('ended', function() {
		pause();
        bigPlayHide();
        hideControls();
        clearInterval(updateTime);
        if(autoreplay){
            replayVideo();
        }
        else{
            replayShow();
        }
	}).on('progress', function() {
        startBuffer();
    });
    var lastWidth = Math.ceil(parseFloat(e_time_bar.css('width')));
    function checkForChanges(){
        var t = 0;
        if(v.playbackRate<1) {
            t = 1 - v.playbackRate;
        }
        var curTimeW = Math.ceil(parseFloat(e_time_bar.css('width')));
        curTimeW = Math.ceil(curTimeW + t);
        if (curTimeW != lastWidth)
        {
            lastWidth = Math.ceil(parseFloat(e_time_bar.css('width')));
            hideLoading();
        }
        else if(!v.ended && !v.paused){
            showLoading();
        }
    }

    // BTN SIZE CLICK
    e_btn_size.on('click touchstart',function(e){
        e.preventDefault();
        var sizebar_height_click = parseInt(e_size_bar.css("height"));
        if(!isMobile) {
            if (sizebar_height_click == 0) {
                e_size_bar.css("height", "70px");
                video.css("padding", 0);
                transform(video,'scale',1);
                btn_size_clicked = true;
            }
            else if (sizebar_height_click == size_height) {
                e_size_bar.css("height", 0);
                btn_size_clicked = false;
                if (isFullscreen) {
                    transform(video,'scale',1);
                    var overSizeHeight = win.height();
                    var scaleFSraw2 = overSizeHeight * 0.3;
                    var scaleFS = (overSizeHeight - scaleFSraw2) / 2;
                    video.css("padding", scaleFS + "px");
                }
                else {
                    video.css("padding", 0);
                    transform(video,'scale',.3);
                }
            }
            else if (sizebar_height_click > 0 && sizebar_height_click < size_height) {
                if (!btn_size_clicked) {
                    e_size_bar.css("height", size_height);
                    video.css("padding", 0);
                    transform(video,'scale',1);
                    btn_size_clicked = true;
                    e_size_bar.css("height", size_height);
                }
                else {
                    e_size_bar.css("height", 0);
                    btn_size_clicked = false;
                    if (isFullscreen) {
                        video.css("padding", "25%");
                        transform(video,'scale',1);
                    }
                    else {
                        video.css("padding", 0);
                        transform(video,'scale',.3);
                    }
                }

            }
        }
    });
    // BTN SOUND CLICK
    e_btn_sound.on('click touchstart',function(e) {
        if(!isMobile) {
            e.preventDefault();
            var cur_vol = v.volume;
            var q = $(this);
            var src = q.attr("src");

            if (cur_vol == 0) {
                if (volume_back) {
                    updateVolume(0,volume_back);
                }
                else {
                    updateVolume(0,1);
                }
                volume_back = 0;
            }
            else {
                volume_back = cur_vol;
                updateVolume(0,0);
            }
            var percents;
            percents = Math.round(v.volume * 100);
            e_volume_bar.css('height', percents + '%');
        }
    });
    // CAPTION RIGHT CLICK
    e_caption_right.on('click touchend touchstart',function(e){
        e.preventDefault();
        showControlsTimeout();
    });
    // REPLAY CLICK
    e_replay_big_div.on('click touchstart',function (e) {
        e.preventDefault();
        replayVideo();
    });
    // SETTINGS BTN CLICK
    e_btn_settings.on('click touchstart',function(e){
        e.preventDefault();
        if(e_settings.css('display')=='none'){
            showSettings();
        }
        else{
            hideSettings();
        }
    });
    //---------------------------------- KEY BINDS --------------------------------------
    win.on('keyup',function(event){
        var key = event.which;
        if( (key === 80 || key === 75 || key ===32 ) && !init_exist && !audio_hover ){
            playPause();
        }
        else if( key === 76 && !init_exist && !audio_hover ){
            v.currentTime += 10;
            updateTimeBar();
        }
        else if( key === 74 && !init_exist && !audio_hover ){
            v.currentTime -= 10;
            updateTimeBar();
        }
        else if( key === 122 ){
            if(wscript) {
                emulation();
            }
            else if(isFullscreen && !edge){
                resetSizeOnFs();
                changeLengthOnFs();
                fullScreenOn();
            }
        }
        else if( key === 27 ){
            if(!wscript && isFullscreen) {
                resetSizeOnFs();
                changeLengthOnFs();
                fullScreenOn();
            }
            else if (wscript && isFullscreen){
                wscript.SendKeys("{F11}");
            }
        }
        else if( key === 37 && !init_exist && !audio_hover ){
            if(video_hover){
                v.currentTime -= 10;
                updateTimeBar();
            }
        }
        else if( key === 39 && !init_exist && !audio_hover ){
            if(video_hover){
                v.currentTime += 10;
                updateTimeBar();
            }
        }
        else if( key === 109 || key === 40 ){
            if(!audio_hover && !init_exist && video_hover){
                event.preventDefault();
                updateVolume(0,v.volume-0.1);
                updateTimeBar();
            }
        }
        else if( key === 107 || key === 38 ){
            if(!audio_hover && !init_exist && video_hover){
                event.preventDefault();
                updateVolume(0,v.volume+0.1);
                updateTimeBar();
            }
        }
    });
    //---------------------------------- MOUSE MOVES --------------------------------------
    // RIGHT CLICK KONTEXT MENU
    videoContainer.on('mousedown',function(event){
        var key = event.which;
        if (key === 3 && !init_exist) {
            contextShow(event);
            shadowShow();
            if(v.paused || v.ended){
                e_context_play.text('Play');
            }
            else{
                e_context_play.text('Pause');
            }
        }
    }).on('mouseenter',function(){
        video_hover = true;
    }).on('mouseleave',function(){
        video_hover = false;
    });
    e_shadow.on('mousedown',function(event){
        showControlsTimeout();
        if (event.which === 3) {
            contextShow(event);
            shadowShow();
        }
    });
    // CONTEXT MENU CLICKS
    e_context_play.on('click touchstart',function(e){
        e.preventDefault();
        if(v.paused || v.ended){
            e_context_play.text('Pause');
        }
        else{
            e_context_play.text('Play');
        }
        playPause();
        showControlsTimeout();
    });
    e_context_stop.on('click touchstart',function(e){
        e.preventDefault();
        stopVideo();
    });
    e_context_html.on('click touchstart',function(e){
        e.preventDefault();
        window.open("https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video",'_blank');
    });
    e_context_yioplayer.on('click touchstart',function(e){
        e.preventDefault();
        window.open("http://yioplayer.com",'_blank');
    });
    e_context_repeat.on('click touchstart',function(e){
        e.preventDefault();
        var q = $(this);
        if(autoreplay){
            autoreplay = false;
            q.removeClass('active');
            q.text('Turn ON auto replay');
        }
        else{
            autoreplay = true;
            q.addClass('active');
            q.text('Turn OFF auto replay');
        }
    });
    e_context_copy.on('click touchstart',function(e){
        e.preventDefault();
        e_copyUrl.val(window.location.href);
        var copySupported = document.queryCommandSupported('copy');
        if(!copySupported){
            alert('Copy is not supported by your browser. Please try to update your browser.');
        }
        e_copyUrl.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            if(msg=='unsuccessful') {
                console.log('Copying text command was ' + msg);
            }
        } catch (err) {
            console.log('Sorry, unable to copy');
        }
    });
    // CAPTION + CONTROL HIDING
    e_caption_children.add(e_control_children).on('mouseover',function(){
        clearTimeout(controlsTimer);
        control_hover = true;
    }).on('mouseout',function(){
        clearTimeout(controlsTimer);
        control_hover = false;
    });

    // UPDATE PROGRESS
    var vol_before;
    e_progress_click.bind('mousedown', function(e) {
        if(e.which != 3) {
            timeDrag = true;
            updateBar(e.pageX);
            vol_before = v.volume;
            v.volume = 0;
        }
    }).bind('mouseup',function(){
        if(vol_before>=0 && vol_before<=1) {
            v.volume = vol_before;
        }
    }).bind('touchstart', function(e) {
        e.preventDefault();
        timeDrag = true;
        updateBar(event.touches[0].pageX);
    }).bind('touchend', function(e) {
        e.preventDefault();
        if(timeDrag) {
            timeDrag = false;
            updateBar(event.touches[0].pageX);
        }
    }).bind('touchmove', function(e) {
        e.preventDefault();
        if(timeDrag) {
            updateBar(event.touches[0].pageX);
        }
    });
    // CHANGE VOLUME
    e_volume_bg_bar.on('mousedown', function(e) {
        volumeDrag = true;
        v.muted = false;
        e_btn_sound.removeClass('muted');
        updateVolume(e.pageY);
    }).bind('touchstart', function(e) {
        e.preventDefault();
        volumeDrag = true;
        v.muted = false;
        e_btn_sound.removeClass('muted');
        updateVolume(event.touches[0].pageY);
    });
    doc.on('mouseup', function(e) {
        var size_top_y;
        var size_top_x;
        if(volumeDrag && !isMobile) {
            volumeDrag = false;
            updateVolume(e.pageY);
            var volHeight = parseInt(e_volume_bar_bg.css('height')) + 30;
            size_top_y = e.pageY - e_volume_bar_bg.offset().top;
            size_top_x = e.pageX - e_volume_bar_bg.offset().left;
            if( (size_top_y>=-15 && size_top_y<= volHeight) && (size_top_x>=-15 && size_top_x<= 15) ){
                volumeDivShow();
            }
            else{
                volumeDivHide();
            }
        }
        if(e.which != 3) {
            if (timeDrag) {
                timeDrag = false;
                updateBar(e.pageX);
            }
        }
        if(sizeDrag && !isMobile) {
            sizeDrag = false;
            updateSize(e.pageY);
            var sizeHeight = parseInt(e_size_bar_bg.css('height')) + 30;
            size_top_y = e.pageY - e_size_bar_bg.offset().top;
            size_top_x = e.pageX - e_size_bar_bg.offset().left;
            if( (size_top_y>=-15 && size_top_y<= sizeHeight) && (size_top_x>=-15 && size_top_x<= 15) ){
                sizeDivShow();
            }
            else{
                sizeDivHide();
            }
        }
    }).on('mousemove', function(e) {
        e.preventDefault();
        if(volumeDrag && !isMobile) {
            updateVolume(e.pageY);
        }
        if(e.which != 3) {
            if (timeDrag) {
                updateBar(e.pageX);
            }
        }
        if(sizeDrag && !isMobile) {
            updateSize(e.pageY);
        }
    });
    e_volume_bg_bar.on('touchmove', function(e) {
        e.preventDefault();
        if(volumeDrag) {
            updateVolume(event.touches[0].pageY);
        }
    });
    e_volume_btn_sound.on('mousemove',function(){
        if(!isMobile) {
            volumeDivShow();
        }
    }).on('mouseleave',function(){
        if(!volumeDrag && !isMobile){
            volumeDivHide();
        }
    });
    e_btn_sound.on('click touchstart',function(e){
        e.preventDefault();
        if(isMobile){
            if(e_volume.css('display')=='none'){
                volumeDivShow();
            }
            else{
                volumeDivHide();
            }
            sizeDivHide();
        }
    });
    // CHANGE SIZE OF VIDEO
    var sizeDrag = false;
    e_size_bg_bar.on('mousedown', function(e) {
        sizeDrag = true;
        updateSize(e.pageY);
    }).on('touchstart', function(e) {
        e.preventDefault();
        sizeDrag = true;
        updateSize(event.touches[0].pageY);
    }).on('touchmove', function(e) {
        e.preventDefault();
        if(sizeDrag) {
            updateSize(event.touches[0].pageY);
        }
    });
    e_size_btn_size.on('mouseover',function(e){
        if(!isMobile) {
            e.preventDefault();
            sizeDivShow();
        }
    }).on('mouseout',function(){
        if(!sizeDrag && !isMobile){
            sizeDivHide();
        }
    });
    e_btn_size.on('click touchstart',function(e){
        e.preventDefault();
        if(isMobile){
            if(e_size.css('display')=='none'){
                sizeDivShow();
            }
            else{
                sizeDivHide();
            }
            volumeDivHide();
        }
    });
    e_progress_click.on('mousemove',function(e){
        if(!showedTimeOver) {
            progressHover(e.pageX);
        }
    }).on('mouseleave',function(){
        e_showed_time.fadeOut(0);
        e_show_bar.css({'width':0});
    });
    e_showed_time.on('mouseenter', function(){
        showedTimeOver = true;
        e_showed_time.fadeOut(0);
    }).on('mouseleave',function(){
        showedTimeOver = false;
    });
    if(!isMobile) {
        e_volume_div.on('mouseenter', function () {
            e_btn_title.stop(true).fadeOut(0);
            e_btn_title_sound.stop(true).fadeIn(100);
        }).on('mouseleave', function () {
            e_btn_title_sound.fadeOut(100);
        });
        e_size_div.on('mouseenter', function () {
            e_btn_title.stop(true).fadeOut(0);
            e_btn_title_size.stop(true).fadeIn(100);
        }).on('mouseleave', function () {
            e_btn_title_size.fadeOut(100);
        });
        e_btn_fs.on('mouseenter', function () {
            e_btn_title.stop(true).fadeOut(0);
            e_btn_title_fullscreen.stop(true).fadeIn(100);
        }).on('mouseleave', function () {
            e_btn_title_fullscreen.fadeOut(100);
        });
    }
    e_settings_title.on('click touchstart',function(e){
        e.preventDefault();
        var q = $(this);
        var nextQ = q.next('div.settings-element');
            if (nextQ.css('display') == 'none') {
                transform(q.find('img'), 'rotate', '180deg');
            }
            else {
                transform(q.find('img'), 'rotate', 0);
            }
            e_settings_element.not(nextQ).slideUp(100);
            nextQ.slideToggle(100);
            transform(e_settings_title.not(q).find('img'), 'rotate', 0);
    });
    e_quality.on('click touchstart',function(){
        var q = $(this);
        var thisQuality = parseInt(q.text());
        var x = vId[q.index()] + '-' + thisQuality + '.' + vFormat[q.index()];
        e_quality.removeClass('active');
        q.addClass('active');
        changeQuality(x);
    });
    // ------------------------------------------FUNCTIONS----------------------------------------------------
    // FIRST CLICK INIT
    function firstClick(){
        if((videoMetaLoaded || v.readyState > 0) && ad_image_clicked) {
            if (!videoClicked) {
                if((ad_exist && ad_finished) || (!ad_exist)) {
                        videoClicked = true;
                        $('#init').remove();
                        init_exist = false;
                        updateTime = setInterval(updateTimeBar, 20);
                        clearInterval(checkLoading);
                        checkLoading = setInterval(checkForChanges, 300);
                        bigPlayHide();
                        e_btn_play.attr('src', player.assets_url + "images/pause.png");
                        v.load();
                        v.play();
                        showControlsTimeout();
                        resetSizeOnFs();
                        e_dur_width = e_duration.width();
                        changeLengthOnFs();
                        video.removeAttr('poster');
                    if(!subAppended && typeof(video_subtitles) != 'undefined' && objectSize(video_subtitles)>0) {
                        for (var i = 0; i < tracks.length; i++) {
                            var curTrack = tracks[i];
                            e_subtitle_div.append("<div class='subtitle item'  data-value=" + curTrack.kind + "-" + curTrack.language + ">" + curTrack.label + "</div>");
                            subAppended = true;
                        }
                    }
                }
            }
            else {
            }
            clearInterval(firstClickTiming);
        }
    }
    function changeQuality(x){
        qchanged = true;
        var length = v.currentTime;
        var cqv = v.volume;
        var cqp = v.playbackRate;
        var f = vPath + x + '?' + randomNumber;
        var y = x.split('.')[1];
        video.find('source').first().attr('src',f).attr('type','video/'+y);
        var paused = false;
        if(v.paused){
            paused = true;
        }
        v.load();
        updateVolume(0,cqv);
        v.playbackRate = cqp;
        video.on('loadedmetadata',function(){
            video_duration = v.duration;
            e_duration.text(timeFormat(video_duration));
            qchanged = false;
            v.currentTime = length;
        });
        if (paused) {
            pause();
        }
        else {
            play();
        }
    }
    // SHOW AND HIDE FUNCTIONS
    function contextShow(event){
        menu_showing = true;
        context_showing = true;
        e_context_menu.fadeIn(200);
        var o = videoContainer.offset();
        var top;
        var left;
        var menuHeight = parseInt(e_context_menu.outerHeight());
        var menuWidth = parseInt(e_context_menu.outerWidth());
        var max_h = parseInt(videoContainer.height()) - menuHeight;
        var max_w = parseInt(videoContainer.width()) - menuWidth;
        if(!isFullscreen) {
            top = event.pageY - o.top;
            left = event.pageX - o.left;
        }
        else{
            top = event.pageY;
            left = event.pageX;
        }
        if(top>max_h){
            top = max_h;
        }
        if(left>max_w){
            left = max_w;
        }
        e_context_menu.css({'top':top,'left':left});
    }
    function contextHide(){
        menu_showing = false;
        context_showing = false;
        e_context_menu.fadeOut(100);
    }
    // SETTINGS SHOWING
    function showSettings(){
        menu_showing = true;
        settings_showing = true;
        shadowShow();
        e_settings.slideDown(200);
        transform(e_btn_settings,'rotate','50deg');
    }
    function hideSettings(){
        menu_showing = false;
        settings_showing = false;
        shadowHide();
        e_settings.slideUp(100);
        transform(e_btn_settings,'rotate',0);
    }
    // SHADOW SHOWING
    function shadowHide(){
        e_shadow.fadeOut(100);
    }
    function shadowShow(){
        e_shadow.fadeIn(200);
    }
    // REPLAY VIDEO
    function replayVideo(){
        completeloaded = false;
        e_time_bar.css('width','0');
        endedVol = v.volume;
        var RVSpeed = v.playbackRate;
        v.currentTime = 0;
        v.playbackRate = RVSpeed;
        play();
    }
    function stopVideo(){
        e_time_bar.css('width','0');
        endedVol = v.volume;
        v.currentTime = 0;
        e_speed_btn3.click();
        v.load();
        e_context_play.text('Play');
        e_btn_play.attr('src',player.assets_url+"images/play.png");
        bigPlayShow();
        clearInterval(updateTime);
        e_current.text(timeFormat(0));
    }
    // LOADING HIDING
    function showLoading(){
        e_loading.fadeIn(100);
    }
    function hideLoading(){
        if(e_loading.css('display')!='none') {
            e_loading.fadeOut(100);
        }
    }
    // BUFFERING
    function startBuffer() {
        var perc;
        if(v.buffered.length>0 && v.buffered.end) {
            var currentBuffer = v.buffered.end(v.buffered.length-1);
        }
        var maxduration = v.duration;
        if(currentBuffer && maxduration && maxduration>0) {
            perc = 100 * currentBuffer / maxduration;
        }
        else{
            perc = 0;
        }
        e_buffer_bar.css('width',perc+'%');
        if(currentBuffer < maxduration) {
            clearTimeout(bufferTimeout);
            bufferTimeout = setTimeout(startBuffer, 20);
        }
    }
    // WHEN META LOADED
    function metaDataVideo(){
        if (v.readyState > 0) {
            videoMetaLoaded = true;
            video_duration = v.duration;
            e_duration.text(timeFormat(video_duration));
            changeLengthOnFs();
            clearInterval(metaInterval);
        }
    }
    // PLAY / PAUSE
    function playPause(){
        if(v.paused || v.ended) {
            play();
        }
        else {
            pause();
        }
    }
    function play(){
        e_btn_play.attr('src',player.assets_url+"images/pause.png");
        v.play();
        bigPlayHide();
        replayHide();
        showControlsTimeout();
        clearInterval(updateTime);
        updateTime = setInterval(updateTimeBar, 100);
        clearInterval(checkLoading);
        checkLoading = setInterval(checkForChanges, 300);
    }
    function pause(){
        e_btn_play.attr('src',player.assets_url+"images/play.png");
        v.pause();
        bigPlayShow();
        hideLoading();
        clearInterval(updateTime);
    }
    e_body.on('click',function () {
        if(context_showing && !settings_showing){
            shadowHide();
        }
        contextHide();
    });
    // HIDING CONTROLS
    function bigPlayHide(){
        e_play_big_div.stop(true);
        e_play_big_div.fadeOut(200);
        transform(e_play_big_div,'scale',1.5);
    }
    function bigPlayShow(){
        e_play_big_div.fadeIn(200);
        transform(e_play_big_div,'scale',1);
    }
    function replayHide(){
        e_replay_big_div.fadeOut(200);
        transform(e_replay_big_div,'scale',1.5);
    }
    function replayShow(){
        e_replay_big_div.fadeIn(200);
        transform(e_replay_big_div,'scale',1);
    }
    function hideControls(){
        if(!volumeDrag && !sizeDrag && !timeDrag) {
            if(!(isMobile && settings_showing)){
                e_caption.add(e_caption_bg).add(e_control_bg).add(e_control).css({'visibility':'hidden','opacity':0});
                e_body_video.css("cursor", "none");
                hideSettings();
            }
        }
    }
    function hideControlsWithoutMouse(){
        if(!volumeDrag && !sizeDrag && !timeDrag) {
            if(!(isMobile && settings_showing)) {
                e_caption.add(e_caption_bg).add(e_control_bg).add(e_control).css({'visibility':'hidden','opacity':0});
                e_body_video.css("cursor", "default");
                hideSettings();
            }
        }
    }
    function showControls(){
        e_caption.add(e_caption_bg).add(e_control_bg).add(e_control).css({'visibility':'visible','opacity':1});
        e_body_video.css("cursor","default");
    }
    function showControlsTimeout(){
        clearTimeout(controlsTimer);
        showControls();
        if(!control_hover){
            controlsTimer = setTimeout(hideControls, hide_controls_timeout);
        }
    }
    // PROGRESS HOVER
    function progressHover(x){
        var showed_time_dur = v.duration;
        var showed_timeraw = x - e_progress.offset().left;

        var showed_time_percentage = 100 * showed_timeraw / e_progress.width();
        e_show_bar.css('width',showed_time_percentage+'%');
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

        e_showed_time.html(showed_time);
        var showed_time_left =  showed_timeraw - (e_showed_time.outerWidth() / 2);
        e_showed_time.css('left',showed_time_left);
        e_showed_time.fadeIn(0);
    }
    // GET PATH AND QUALITY
    function getPath(){
        vPath = $(sources[sources.length - 1]).attr('src').split('/');
        vPath.pop();
        vPath = vPath.join('/') + '/';
    }
    function addQualities() {
        for (var i = 0; i < sources.length; i++) {
            var q = $(sources[i]).attr('src');
            q = q.split('?');
            q = q[0].split('/');
            q = q.pop();
            q = q.split('.');
            vFormat[i] = q.pop();
            q = q.toString().split('-');
            vId[i] = q[0];
            var qq = q[1];
            if (vId && qq) {
                if (qq >= 720) {
                    e_quality_div.append("<div class='quality item' >" + qq + "p <span>HD</span></div>")
                }
                else {
                    e_quality_div.append("<div class='quality item' >" + qq + "p</div>")
                }
            }
            else {
                e_quality_div.append("<div class='quality hide' >error</div>")
            }

        }
        e_quality = $('.quality');
        e_quality.not('.hide').first().addClass('active');
        if (e_quality.length <= 1) {
            e_quality_div_header.fadeOut(0);
        }
    }
    // FULLSCREEN RESETS
    function resetSizeOnFs(){
        video.css("padding", 0);
        transform(video,'scale',1);
        e_size_bar.css("height","100%");
        if(!isMobile){
        if(isFullscreen){
            remaining_coeficient = 264;
            videoContainer.css('position','fixed');
            e_btn_play.css({'width':'60px','height':'50px','margin-top':'0'});
            e_current_duration.css('top','16px');
            e_showed_time.css('bottom','32px');
            e_btn.css({'width':'25px','height':'25px','padding':'11px 12px 17px 12px'});
            e_btn_settings.css({'width':'25px','height':'25px','margin-bottom':'-10px'});
            e_settings.css({'top':'50px','width':'240px','font-size':'18px'});
            e_speed_btn.css({'font-size':'13px','padding':'12px 0'});
            e_settings_element.css('font-size','13px');
            e_settings_element.find('div').not('.reset,.speedBtn').css('padding','12px 16px');
            e_progress.css({'top':'24px','height':'3px'});
            e_progress_click.css('margin-left','25px');
            e_duration.css({'margin-left':'15px','top':'14px'});
            e_caption.css('font-size','26px');
            e_caption_bg.add(e_control_bg).css('height','85px');
            e_control.css({'padding-bottom':'18px','font-size':'14px'});
            e_time_max.css({'width':'15px','height':'15px','top':'-6px','right':'-6px'});
            e_volume.css({'right':'104px','padding':'5px 18px 55px 18px'});
            e_volume_bg.add(e_size_bg).css('height','145px');
            e_volume_bar_bg.css({'left':'18px','width':'3px'});
            e_size.css({'right':'55px','padding':'5px 18px 55px 18px'});
            e_size_bar_bg.css({'left':'18px','width':'3px'});
            e_volume_max.add(e_size_max).css({'width':'15px','height':'15px','right':'-6px','top':'-6px'});
            e_btn_title.css('top','-44px');
            e_btn_title_size.css('right','110px');
            e_btn_title_sound.css('right','160px');
            e_play_big_div.add(e_replay_big_div).css({'width':'120px','height':'120px','margin':'-60px 0 0 -60px'});
            e_caption_title.css('top','20px');
        }
        else{
            remaining_coeficient = 179;
            videoContainer.css('position','relative');
            e_btn_play.css({'width':'34px','height':'28px','margin-top':'6px'});
            e_current_duration.css('top','13px');
            e_showed_time.css('bottom','26px');
            e_btn.css({'width':'16px','height':'16px','padding':'12px 9px'});
            e_btn_settings.css({'width':'16px','height':'16px','margin-bottom':'0'});
            e_settings.css({'top':'30px','width':'180px','font-size':'14px'});
            e_speed_btn.css({'font-size':'10px','padding':'8px 0'});
            e_settings_element.css('font-size','11px');
            e_settings_element.find('div').not('.reset,.speedBtn').css('padding','10px 14px 10px 20px');
            e_progress.css({'top':'21px','height':'2px'});
            e_progress_click.css('margin-left','15px');
            e_duration.css({'margin-left':'10px'});
            e_caption.css('font-size','18px');
            e_caption_bg.add(e_control_bg).css('height','70px');
            e_control.css({'padding-bottom':'3px','font-size':'12px'});
            e_time_max.css({'width':'12px','height':'12px','top':'-5px','right':'-5px'});
            e_volume.css({'right':'70px','padding':'5px 15px 35px 15px'});
            e_volume_bg.add(e_size_bg).css('height','120px');
            e_volume_bar_bg.add(e_size_bar_bg).css({'left':'15px','width':'2px'});
            e_size.css({'right':'35px','padding':'5px 15px 35px 15px'});
            e_volume_max.add(e_size_max).css({'width':'12px','height':'12px','right':'-5px','top':'-5px'});
            e_btn_title.css('top','-30px');
            e_btn_title_size.css('right','85px');
            e_btn_title_sound.css('right','120px');
            e_play_big_div.add(e_replay_big_div).css({'width':'80px','height':'80px','margin':'-40px 0 0 -40px'});
            e_caption_title.css('top','12px');
        }
        }
    }
    function changeLengthOnFs(){
        var fs_length_control = parseInt(e_control.width());
        var fs_length_time2 = e_dur_width;
        fs_length_time2 = Math.round(parseFloat(fs_length_time2));
        var remaining_width = remaining_coeficient + (2 * fs_length_time2) + 20;
        var fs_clear_length = fs_length_control - remaining_width;
        e_progress_click.css("width", fs_clear_length);
        var hv = parseInt(videoContainer.outerHeight()) - 97;
        e_settings.css('max-height', hv);
    }
    // TIME CONVERTER
	function timeFormat(seconds){
		var m = Math.floor(seconds/60)<10 ? "0"+Math.floor(seconds/60) : Math.floor(seconds/60);
		var s = Math.floor(seconds-(m*60))<10 ? "0"+Math.floor(seconds-(m*60)) : Math.floor(seconds-(m*60));
		return m+":"+s;
	}
    // UPDATE PROGRESS AUTO
    function updateTimeBar(){
        var currentPos = v.currentTime;
        var maxduration = v.duration;
        var perc = 100 * currentPos / maxduration;
        e_time_bar.css('width',perc+'%');
        e_current.text(timeFormat(currentPos));
    }
    // UPDATE PROGRESS ON CHANGE
    function updateBar(x) {
        var progress = e_progress;

        var maxduration = v.duration;
        e_current.text(timeFormat(v.currentTime));
        var position = x - progress.offset().left;
        var percentage = 100 * position / progress.width();
        if(percentage > 100) {
            percentage = 100;
        }
        else{
            replayHide();
        }
        if(percentage < 0) {
            percentage = 0;
        }
        e_time_bar.css('width',percentage+'%');
        v.currentTime = maxduration * percentage / 100;
    }

    // UPDATE VOLUME BAR
    var updateVolume = function(x, vol) {
        var percentage;

        if(vol || vol===0) {
            percentage = vol * 100;
        }
        else {
            var positionVol =  e_volume_bar_bg.offset().top - x + parseInt(e_volume_bar_bg.css("height"));
            percentage = 100 * positionVol / e_volume_bar_bg.height();
        }

        if(percentage > 100) {
            percentage = 100;
        }
        if(percentage < 0) {
            percentage = 0;
        }

        e_volume_bar.css('height',percentage+'%');
        v.volume = percentage / 100;

        if(v.volume == 0){
            e_btn_sound.attr("src",player.assets_url+"images/muted.png");
        }
        else if(v.volume > 0 && v.volume < 0.5){
            e_btn_sound.attr("src",player.assets_url+"images/volume1.png");
        }
        else{
            e_btn_sound.attr("src",player.assets_url+"images/volume2.png");
        }
    };
    // UPDATE SIZE BAR
    var updateSize = function(x, y) {
        var size = e_size;
        var bg_size = e_size_bar_bg;
        var percentageSize;
        var size_h = size.height();

        if(y) {
            percentageSize = y * 100;
        }
        else {
            var positionSize;
            if(!isFullscreen){
                positionSize =  bg_size.offset().top - x + size_height;
                percentageSize = 100 * positionSize / size_h;
            }
            else{
                var positionSizeFS = window_height - x - size_h;
                percentageSize = (100 * positionSizeFS / size_h)+12;
                if(isMobile){
                    percentageSize += 28;
                }
            }
        }
        if(percentageSize > 100) {
            percentageSize = 100;
        }
        if(percentageSize < 0) {
            percentageSize = 0;
        }
        e_size_bar.css('height',percentageSize+'%');
        var scale = ((percentageSize * .7)+30)/100;

        if(scale > 1){scale = 1}
        else if(scale < 0.3){scale = 0.3}

        if(isFullscreen){
            transform(video,'scale',1);
            var scaleFS = (window_height - (window_height*scale))/2;
            video.css("padding", scaleFS + "px");
        }
        else{
            video.css("padding", 0);
            transform(video,'scale',scale);
        }
    };
    // NO CACHE RANDOM NUMBER
    function getRandom() {
        var random1 = Math.random();
        var random2 = Math.random();
        return random1 + random2;
    }
    // FULLSCREEN
    function toFullScreen(){
        if(!IEBroken) {
            clearTimeout(controlsTimer);
            controlsTimer = setTimeout(hideControls, hide_controls_timeout);
            if (!isFullscreen) {
                if (vc.requestFullscreen) {
                    vc.requestFullscreen();
                }
                else if ($.isFunction(vc.webkitRequestFullScreen)) {
                    vc.webkitRequestFullScreen();
                }
                else if ($.isFunction(vc.mozRequestFullScreen)) {
                    vc.mozRequestFullScreen();
                }
                else if ($.isFunction(vc.msRequestFullScreen)) {
                    vc.msRequestFullScreen();
                }
                else {
                    emulate();
                }
                fullScreenOff();
                resetSizeOnFs();
            }
            else {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                }
                else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                }
                else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
                else if (document.msCancelFullScreen) {
                    document.msCancelFullScreen();
                }
                else {
                    emulate();
                }
                resetSizeOnFs();
                fullScreenOn();
            }
        }
        else{
            e_btn_fs.css('cursor','default');
        }
    }
    function hideTracks() {
        for (var i = 0; i < tracks.length; i++) {
            tracks[i].mode = 'hidden';
        }
    }
    function trackChange(value) {
        hideTracks();
        if(value === 'off') {
            for (var ii = 0; ii < tracks.length; ii++) {
                for (var iai = 0; iai < tracks[ii].cues.length; iai++) {
                    tracks[ii].cues[iai].line = -3;
                }
            }
        }
        else {
            var splitValue = value.split('-');
            for (var i = 0; i < tracks.length; i++) {
                if(tracks[i].kind === splitValue[0]) {
                    if(tracks[i].language === splitValue[1]) {
                        for (var ia = 0; ia < tracks[i].cues.length; ia++) {
                            tracks[i].cues[ia].line = -3;
                        }
                        tracks[i].mode = 'showing';
                    }
                }
            }
        }
    }
    function transform(t_el,t_type,t_val){
        t_el.css({'-webkit-transform':t_type+'('+t_val+')','-moz-transform':t_type+'('+t_val+')',
            '-ms-transform':t_type+'('+t_val+')','transform':t_type+'('+t_val+')'});
    }
    function emulate(){
        if(wscript) {
            wscript.SendKeys("{F11}");
        }
    }
    function emulation(){
        if (!isFullscreen) {
            videoContainer.css('position', 'fixed');
            e_body.css('overflow','hidden');
            fullScreenOff();
        }
        else if (isFullscreen) {
            videoContainer.css('position', 'relative');
            e_body.css('overflow','auto');
            fullScreenOn();
        }
        isFullscreen = !isFullscreen;
        resetSizeOnFs();
        changeLengthOnFs();
    }
    function getIEVersion(){
        var rv = -1;
        var ua;
        var re;
        if (navigator.appName == 'Microsoft Internet Explorer')
        {
            ua = navigator.userAgent;
            re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat( RegExp.$1 );
        }
        else if (navigator.appName == 'Netscape')
        {
            ua = navigator.userAgent;
            re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat( RegExp.$1 );
        }
        return rv;
    }
    function fullScreenOn(){
        e_btn_fs.attr("src",player.assets_url+"images/fullscreen.png");
    }
    function fullScreenOff(){
        e_btn_fs.attr("src",player.assets_url+"images/fullscreen_off.png");
    }
    function volumeDivShow(){
        e_volume.stop(true).fadeIn(0);
    }
    function volumeDivHide(){
        e_volume.stop(true).fadeOut(0);
    }
    function sizeDivShow(){
        e_size.stop(true).fadeIn(0);
    }
    function sizeDivHide(){
        e_size.stop(true).fadeOut(0);
    }
    // VIDEO ADVERT API
    if(ad_exist) {
        var e_ad_btn = $('.ad_play_btn');
        e_advert.attr('poster',video.attr('poster'));
        $('#init').on('click', function () {
            playAd();
            e_ad_btn.fadeOut(200);
            transform(e_ad_btn, 'scale', 1.5);
            ad_clicked = true;
        });
    }
    function playAd(){
        if(!ad_clicked) {
            ad.load();
            ad.play();
            $('.advert_title').fadeIn(500);
            setTimeout(removeAd, 1000);
            $('#init').remove();
        }
    }
    var ad_length_full;
    var ad_first_count = true;
    function removeAd(){
        var ad_time = parseInt(e_ad_title_span.text());
        if(ad_time!==1){
            ad_time--;
            e_ad_title_span.text(ad_time);
            remove_ad_timeout = setTimeout(removeAd,1000);
        }
        else{
            e_ad_title.html('Skip Advert &nbsp;&#x3E;&#x3E;');
            ad_can_finish = true;
            clearTimeout(remove_ad_timeout);
        }
        if(player.advert && !player.advert_time && ad_first_count){
            ad_length_full = Math.ceil(ad.duration);
        }
        if(!player.advert_time || player.advert_time=='null' || player.advert_time=='none'){
            if(ad_length_full>0) {
                ad_first_count = false;
                ad_length_full--;
                e_ad_title.text('Advert ends at ' + ad_length_full + ' seconds');
            }
            else{
                ad_can_finish = true;
                clearTimeout(remove_ad_timeout);
                skipAd()
            }
        }
    }
    e_ad_title.on('click',function(){skipAd()});
    function skipAd(){
        if(ad_can_finish){
            ad.src = '';
            ad.load();
            e_advert_div.remove();
            ad_finished = true;
            firstClick();
            clearTimeout(remove_ad_timeout);
        }
    }
    e_advert.on('ended',function(){
        skipAd()
    });

    // CUSTOM COLOR THEMES
    if(player.color){
        customColor(player.color);
    }
    else{
        e_play_big_div.css({'background':'#ff4900'});
        bigPlayShow();
    }
    function customColor(colorTheme){
        var color1,color2;
        switch(colorTheme){
            case('blue'):{
                color1 = '#1976D2';
                color2 = '#2196F3';
                break;
            }
            case('red'):{
                color1 = '#DE0E0E';
                color2 = '#e92419';
                break;
            }
            case('green'):{
                color1 = '#07a100';
                color2 = '#4CAF50';
                break;
            }
            case('yellow'):{
                color1 = '#cacf00';
                color2 = '#d7dc29';
                break;
            }
            case('pink'):{
                color1 = '#C2185B';
                color2 = '#E91E63';
                break;
            }
            case('purple'):{
                color1 = '#7B1FA2';
                color2 = '#9C27B0';
                break;
            }
            case('brown'):{
                color1 = '#77321b';
                color2 = '#89462e';
                break;
            }
            case('grey'):{
                color1 = '#455A64';
                color2 = '#607D8B';
                break;
            }
            case('black'):{
                color1 = '#111111';
                color2 = '#333333';
                break;
            }
            default:{
                break;
            }
        }
        if(!colorTheme || colorTheme=='default' || colorTheme=='none' || colorTheme=='orange' || colorTheme=='null'){
            e_play_big_div.css({'background':'#ff4900'});
        }
        else{
            e_time_bar.add(e_play_big_div).add(e_replay_big_div).add(e_time_max).add(e_volume_bar).add(e_size_bar).add(e_volume_max).add(e_size_max).css('background',color1);
            e_show_bar.add(e_showed_time).css('background',color2);
            e_quality.find('span').css('color',color2);
            e_loading.attr('src',player.assets_url+'images/loading_'+ colorTheme +'.png');
            if(e_ad_btn){
                e_ad_btn.css('background',color1);
            }
            if(player.advert_image){
                e_ad_close.css('background',color1);
            }
        }
        bigPlayShow();
    }
    function objectSize(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
}).on('error',function(){
    throw Error;
});