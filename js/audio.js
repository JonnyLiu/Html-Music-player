$(document).ready(function() {
    //获取音频工具 
    var audio = document.getElementById("myMusic");
    //开始，暂停按钮
    $("#mainControl")._toggle(function() {
        $(this).removeClass("mainControl").addClass("stopControl");
        if (audio.src == "") {
            var defaultsong = $(".single .songName").eq(0).attr("KV");
            $(".musicBox .processControl .songName").text(Defaultsong);
            $(".single .songName").eq(0).css("color", "#7A8093");
            audio.src = "music/" + defaultsong + ".mp3";
        }
        audio.play();
        TimeSpan();
    },
    function() {
        $(this).removeClass("stopControl").addClass("mainControl");
        audio.pause();
    });

    //歌曲列表的选择操作
    $(".musicList .list .single .songName").click(function() {
        $(".musicList .list .single .songName").css("color", "#fff");
        $("#mainControl").removeClass("mainControl").addClass("stopControl");
        $(this).css("color", "#7A8093");
        var songName = $(this).attr("KV");
        $(".musicBox .processControl .songName").text(songName);
        audio.src = "music/" + songName + ".mp3";
        audio.play();
        TimeSpan();
    });

    //左前进按钮
    $(".leftControl").click(function() {
        $(".musicList .list .single .songName").each(function() {
            if ($(this).css("color") == "RGB(122, 128, 147)") {
                var isTop = $(this).parent(".single").prev(".single").length == 0 ? true: false; //检查是否是最顶端的歌曲
                var prevSong;
                if (isTop) {
                    prevSong = $(".single").last().children(".songName").attr("KV");
                    $(".single").last().children(".songName").css("color", "#7A8093");
                } else {
                    prevSong = $(this).parent(".single").prev(".single").children(".songName").attr("KV");
                    $(this).parent(".single").prev(".single").children(".songName").css("color", "#7A8093");
                }
                audio.src = "music/" + prevSong + ".mp3";
                $(".musicBox .processControl .songName").text(prevSong);
                $(this).css("color", "#fff");
                audio.play();
                return false; //代表break
            }
        })
    });

    //右前进按钮
    $(".rightControl").click(function() {
        $(".musicList .list .single .songName").each(function() {
            if ($(this).css("color") == "RGB(122, 128, 147)") {
                var isBottom = $(this).parent(".single").next(".single").length == 0 ? true: false; //检查是否是最尾端的歌曲
                var nextSong;
                if (isBottom) {
                    nextSong = $(".single").first().children(".songName").attr("KV");
                    $(".single").first().children(".songName").css("color", "#7A8093");
                } else {
                    nextSong = $(this).parent(".single").next(".single").children(".songName").attr("KV");
                    $(this).parent(".single").next(".single").children(".songName").css("color", "#7A8093");
                }
                audio.src = "music/" + nextSong + ".mp3";
                $(".musicBox .processControl .songName").text(nextSong);
                $(this).css("color", "#fff");
                audio.play();
                return false; //代表break
            }
        })
    });

    //静音按钮
    $(".voiceEmp").click(function() {
        $(".voidProcessYet").css("width", "0");
        audio.volume = 0;
    });

    //满音量按钮
    $(".voiceFull").click(function() {
        $(".voidProcessYet").css("width", "66px");
        audio.volume = 1;
    });

    /*
    之前一直考虑进度条的原理，这边进度条的做法启发自腾讯一款播放器的做法，采用两个2px高度的div，重叠，
    上面那个与下面那个div的颜色不一样，用于区分进度,顶层div的width是根据播放的长度来调整的，width越长，说明播放越长，
    知道上层的div完全覆盖下面的div，达到长度的一致，说明播放完毕。我们的播放进度条和音量进度条都是这样做的
    */

    // 音频进度条事件（进度增加）
    $(".process").click(function(e) {
        //播放进度条的基准参数
        var process = $(".process").offset();
        var processStart = process.left;
        var processLength = $(".process").width();
        var currentProces = e.clientX - processStart;
        DurationprocessRange(currentProces / processLength);
        $(".processYet").css("width", currentProces);
    });

    //音频进度条事件（进度减少）
    $(".processYet").click(function(e) {
        //播放进度条的基准参数
        var process = $(".process").offset();
        var processStart = process.left;
        var processLength = $(".process").width();
        var currentProces = e.clientX - processStart;
        DurationprocessRange(currentProces / processLength);
        $(".processYet").css("width", currentProces);
    });

    //音量进度条事件（进度增加）
    $(".voidProcess").click(function(e) {
        //音量进度条的基准参数
        var voidProcess = $(".voidProcess").offset();
        var voidProcessStart = voidProcess.left;
        var voidProcessLength = $(".voidProcess").width();
        var currentProces = e.clientX - voidProcessStart;
        VolumeprocessRange(currentProces / voidProcessLength);
        $(".voidProcessYet").css("width", currentProces);
    });

    //音量进度条时间（进度减少）
    $(".voidProcessYet").click(function(e) {
        //音量进度条的基准参数
        var voidProcess = $(".voidProcess").offset();
        var voidProcessStart = voidProcess.left;
        var voidProcessLength = $(".voidProcess").width();
        var currentProces = e.clientX - voidProcessStart;
        VolumeprocessRange(currentProces / voidProcessLength);
        $(".voidProcessYet").css("width", currentProces);
    });

    //显示音乐列表事件
    $(".showMusicList").toggle(function() {
        $(".musicList").show();
        var musicBoxRight = $(".musicBox").offset().left + $(".musicBox").width();
        var musicBoxBottom = $(".musicBox").offset().top + $(".musicBox").height();
        $(".musicList").css("left", musicBoxRight - $(".musicList").width());
        $(".musicList").css("top", musicBoxBottom + 15);
    },
    function() {
        $(".musicList").hide();
    });

    //监听媒体文件结束的事件（ended），这边一首歌曲结束就读取下一首歌曲，实现播放上的循环播放
    audio.addEventListener('ended', function() {
        $(".musicList .list .single .songName").each(function() {
            if ($(this).css("color") == "RGB(122, 128, 147)") {
                var isBottom = $(this).parent(".single").next(".single").length == 0 ? true: false; //检查是否是最尾端的歌曲
                var nextSong;
                if (isBottom) {
                    nextSong = $(".single").first().children(".songName").attr("KV");
                    $(".single").first().children(".songName").css("color", "#7A8093");
                } else {
                    nextSong = $(this).parent(".single").next(".single").children(".songName").attr("KV");
                    $(this).parent(".single").next(".single").children(".songName").css("color", "#7A8093");
                }
                audio.src = "music/" + nextSong + ".mp3";
                $(".musicBox .processControl .songName").text(nextSong);
                $(this).css("color", "#fff");
                audio.play();
                return false; //代表break
            }
        });
    }, false);
});

//音量进度条的转变事件
function VolumeprocessRange(rangeVal) {
    var audio = document.getElementById("myMusic");
    audio.volume = parseFloat(rangeVal);
}

//播放进度条的转变事件
function DurationprocessRange(rangeVal) {
    var audio = document.getElementById("myMusic");
    audio.currentTime = rangeVal * audio.duration;
    audio.play();
}

//播放事件
function Play(obj) {
    var songUrl = obj.getAttribute("songUrl");
    var audio = document.getElementById("myMusic");
    audio.src = "music/" + songUrl + ".mp3";
    audio.play();
    TimeSpan();
}

//暂停事件
function Pause() {
    var audio = document.getElementById("myMusic");
    $("#pauseTime").val(audio.currentTime);
    audio.pause();
}

//继续播放事件
function Continue() {
    var audio = document.getElementById("myMusic");
    audio.startTime = $("pauseTime").val();
    audio.play();
}

//时间进度处理程序
function TimeSpan() {
    var audio = document.getElementById("myMusic");
    var processYet = 0;
    setInterval(function() {
        var processYet = (audio.currentTime / audio.duration) * 500;
        $(".processYet").css("width", processYet);
        var currentTime = timeDispose(audio.currentTime);
        var timeAll = timeDispose(TimeAll());
        $(".songTime").html(currentTime + "&nbsp;|&nbsp;" + timeAll);
    },
    1000);
}

//时间处理，因为时间是以为单位算的，所以这边执行格式处理一下
function timeDispose(number) {
    var minute = parseInt(number / 60);
    var second = parseInt(number % 60);
    minute = minute >= 10 ? minute: "0" + minute;
    second = second >= 10 ? second: "0" + second;
    return minute + ":" + second;
}

//当前歌曲的总时间
function TimeAll() {
    var audio = document.getElementById("myMusic");
    return audio.duration;
}