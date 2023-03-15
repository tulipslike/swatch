$(function(){
  
  var $all = $('#all-wrap'),
      $gnb = $all.find('.gnb'),
      $main = $all.find('#main'),
      $section = $main.find('section'),
      $title = $section.find('.title-box'),
      
      winH = $(window).height(),
      sp = 1000,
      easing = 'easeOutBounce';
  
  //섹션의 높이 == 윈도우 높이
  $section.height(winH);
  
  //(창크기 변화) 섹션의 높이 == 윈도우 높이
  $(window).resize(function(){
    winH = $(window).height();
    $section.height(winH);
  })
  
  //(gnb)li 클릭하면? 
  //클릭한 li의 순서값 ==> 섹션으로 이동
  $gnb.on('click', 'li', function(e){
    e.preventDefault();
    
    var i = $(this).index(),
        posY = i * winH;
    
    if($(this).hasClass('on')) {
      return
    }
    
    $title.fadeOut(200).animate({top: 400})
    
    $('html, body').stop().animate({
      scrollTop: posY
    }, sp, function(){
      $title.fadeIn();
      $title.stop().animate({top: 450});
    });
    
  });
  
  //스크롤 이벤트 처리
  $section.on('mousewheel', function(event, delta){
    event.preventDefault();
    
    var firstIndex = 0,
        lastIndex = $section.length - 1,
        currentIndex = $(this).index();
    
    $title.fadeOut(200).animate({top: 400});//초기값
    
    if(delta > 0 && currentIndex != firstIndex) {
      //위로 스크롤 했을 때
      var prevTop = $(this).prev().offset().top;
      $('html, body').stop().animate({
        scrollTop: prevTop
      }, sp, function(){
        $title.stop().fadeIn();
        $title.stop().animate({top: 450});
      })
    } else if(delta < 0 && currentIndex != lastIndex) {
      //아래로 스크롤 했을 때
      var nextTop = $(this).next().offset().top;
      $('html, body').stop().animate({
        scrollTop: nextTop
      }, sp, function(){
        $title.stop().fadeIn();
        $title.stop().animate({top: 450});
      })
    }
    
  })
  
  //현재 섹션 순서 == li 켜기
  $(window).scroll(function(){
    var scroll = $(window).scrollTop() + winH/2;
    
    //방법1 
    /*
    if(scroll >= winH*0 && scroll < winH*1) {}
    if(scroll >= winH*1 && scroll < winH*2) {}
    if(scroll >= winH*2 && scroll < winH*3) {}
    if(scroll >= winH*3 && scroll < winH*4) {}*/
    
    //방법2
    for(var j = 0; j < $section.length; j++) {
      if(scroll >= winH*j && scroll < winH*(j+1)) {
        $gnb.children().removeClass();
        $gnb.find('li').eq(j).addClass('on');
      }
    }
    
  });
  
  //사용자 대신 => 이벤트 실행
  $(window).trigger('scroll');
  //$gnb.find('li').first().trigger('click');
  
  //마우스 좌표값 활용 ==> 이미지 움직이기
  $section.mousemove(function(e){
    var posX = e.pageX,
        posY = e.pageY;
    
    $section.find('.obj11').css({
      right: 20 - (posX/30),
      bottom: 20 - (posY/30)
    })
    $section.find('.obj12').css({
      right: 150 + (posX/15),
      bottom: 50 + (posY/20)
    })
    $section.find('.obj13').css({
      top: 200 - (posY/25),
      left: 200 + (posX/25)
    })
    
    $section.find('.obj21').css({
      right: -200 - (posX/30),
      bottom: -300 - (posY/35)
    })
    $section.find('.obj22').css({
      right: 150 + (posX/50),
      bottom: 0 + (posY/45)
    })
    
    $section.find('.obj31').css({
      right: 200 - (posX/30),
      bottom: 50 - (posY/30)
    })
    $section.find('.obj32').css({
      right: 100 + (posX/25),
      bottom: 0 + (posY/20)
    })
    $section.find('.obj33').css({
      right: -50 - (posX/15),
      bottom: -50 - (posY/15)
    })
    
    $section.find('.obj41').css({
      right: 20 - (posX/45),
      bottom: 100 - (posY/40)
    })
    $section.find('.obj42').css({
      right: 0 + (posX/35),
      bottom: -100 + (posY/30)
    })

  })
  
});







