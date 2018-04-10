
$(document).ready(function(){
    //播放状态
    var index =0;
    var currentTime;
    var allTime;
    var change=true;
    var src =0;
    var width1=1;
    var play1=true;
    var change1=true;
    var arr=['汪峰','陈奕迅/王菲','未知歌手1','未知歌手2','未知歌手3','未知歌手4','阿悄','未知歌手5','陈瑞'];
    src=$("#list_ul li").eq(index).attr("title");
    $("#my_audio").attr("src", src);
    function change_name(){
        $('#personal_name').html(arr[index]);
    }
    //点击播放列表播放
    $("#list_ul li").click(function(){
        var index1 = $("#list_ul li").index(this);
        index= index1;
        bg_color();
        change_pic();
        showProgress();
        play_music();
        change_name()
        /*alert(myi);*/
    }).eq(0).addClass('active');
    $("#list_ul li")[0].click();
    //点击播放开始与暂停
    $('.start_end').click(function(){
        if(change){
            stop_music();
            $(this).css('background','url(image/sk-dark.png) no-repeat -50px -135px');
        }
        else{
            play_music();
            change_name()
            $(this).css('background','url(image/sk-dark.png) no-repeat  -83px -135px');

        }
        change=!change;
    });
    //点击上一首
    $('.prev').click(function(){
        --index;
        play_music();
        bg_color();
        change_pic();
        change_name();
        if(index<0){
            index=8;
        }
    });
    //点击下一首
   $('.next').click(function(){
       ++index;
       if(index>7){
           index=-1;
       }
       play_music();
       bg_color();
       change_pic();
       change_name();




   });
    //点击隐藏与显示
    var state=true;
    $('#scale_small').click(function(){
      if(state){
          $('section').slideUp();
      }
        else{
          $('section').slideDown();
      }
        state=!state;
    });
    //更播放那一首背景颜色就改变的函数
    function bg_color(){
        $("#list_ul li").removeClass('active');
        $("#list_ul li").eq(index).addClass('active');
    }
    //播放函数

    function play_music(){
        src=$("#list_ul li").eq(index).attr("title");
        $("#my_audio").attr("src", src);
        $("#my_audio")[0].play();

    }
    //停止播放的函数
    function stop_music(){
        /*src=$("#list_ul li").eq(index).attr("title");
        $("#my_audio").attr("src", src);*/
        $("#my_audio")[0].pause();

    }
    //更换图片的函数
    function change_pic(){
        $('#play_img_ul li').eq(index).show().siblings().hide();

    }
    //显示时间进度的函数
    function showProgress(){
        allTime = $("#my_audio")[0].duration;
        currentTime =  $("#my_audio")[0].currentTime;
        $("#time").html(timeFormat(currentTime) + '/'+ timeFormat(allTime));
        var width = Math.floor(currentTime)*100/Math.floor(allTime);
        $("#progress #time_thing #t").css({'width':width+'%','background':'purple','height':'5px'});
        if(allTime==currentTime){
            ++index;
        }
        setInterval(showProgress, 1000);
        //alert(currentTime);

    }

    //时间格式化的函数
    function timeFormat(time){
        var m=Math.floor(Math.round(time)/60);
        var s = Math.floor(time - m*60);
        var str =(m>9 ? m:("0"+m)) + ":" +(s>9?s:("0"+s));
        return str;
    }
    //点击音量静音图标静音，并且音量的进度条为0
    $('#click_volume').click(function(){
        if(change1==true){
            $('#my_audio')[0].muted=true;
        }
        else if(change1==false){
            $('#my_audio')[0].muted=false;
        }
        change1=!change1;
    });
    //每一首音乐播放完毕自动播放下一首
    function auto_play(){
        if($('#my_audio')[0].currentTime==$('#my_audio')[0].duration){
            ++index;
            $('#my_audio')[0].currentTime=0;
            currentTime=0;
            play_music();
        }

    }

    //点击播放的进度，进度就在哪个位置
$('#time_thing').mousedown(function(event){
    if(event.offsetX){
        //alert(event.offsetLeft);
       $('#my_audio')[0].currentTime=(Math.floor(event.offsetX)/400)*allTime;

    }
    //alert(event.offsetStart);
});
    //拖动音量图标来改变音量
   $('#volume').mousedown(function(event){
      if(event.offsetX){
           var width0=event.offsetX;
          var left1=$('#volume').offset().left;
          var top1=$('#volume').offset().top;
         width1=(width0/$('#volume').innerWidth())*1;
          $('#my_audio')[0].volume=width1;
          $('#volume div').offset({ top:top1-7, left:width0+left1 });
      }
   }) ;
    //随机播放功能
    $('#random').click(function(){
        index= Math.floor(Math.random()*9);
        play_music();
        change_pic();
        bg_color();
        change_name();
    });
    //单曲循环功能
    $('#one_play').click(function(){

    });

});