---
layout: lolnada/post
title:  Botón para cambio de nivel
date:   2022-06-07 13:41:00 -0400
source: https://codepen.io/coswise/pen/YzyVZgJ
---
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script type="text/javascript" src="/assets/jquery.transit.min.js"></script>
<script type="text/javascript" src="/assets/jquery.bez.js"></script>

<style type="text/css">
@import url("https://fonts.googleapis.com/css?family=Muli:300,400,700,900");
.btn-wrap {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

html {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f1f3f9;
  height: 100vh;
  font-family: "Muli", Arial, sans-serif;
}

#dribbble {
  position: fixed;
  display: block;
  right: 70px;
  bottom: 16px;
}
#dribbble svg {
  display: block;
  width: 76px;
  height: 24px;
  fill: rgba(146, 156, 208, 0.8);
}

#twitter {
  position: fixed;
  display: block;
  right: 25px;
  bottom: 11px;
}
#twitter svg {
  width: 24px;
  height: 24px;
  fill: rgba(146, 156, 208, 0.8);
}

#hicon {
  position: fixed;
  display: block;
  left: 25px;
  bottom: -42px;
}
#hicon svg {
  width: 78px;
  height: 78px;
  fill: rgba(146, 156, 208, 0.8);
}

.cnt, .btn-cnt {
  display: flex;
  justify-content: center;
  align-items: center;
}

.lock-on, .cnt, .btn-wrap, .concept-wrap {
  width: 200px;
  height: 70px;
}

.concept-wrap {
  position: relative;
  cursor: pointer;
}

.btn-wrap {
  cursor: pointer;
  position: absolute;
  background: #1462ff;
  border-radius: 12px;
  box-shadow: 0 6px 30px -10px #4a74c9;
  overflow: hidden;
  transform: translateX(0);
}

.btn-cnt {
  position: absolute;
  top: 0;
  right: 0;
  flex-direction: row;
  height: 70px;
  width: 800px;
  z-index: 9;
}

.cnt {
  justify-content: space-around;
  box-sizing: border-box;
  padding: 0 25px;
}
.cnt .text {
  text-align: left;
  font-size: 1.4em;
  margin-right: auto;
  color: #fff;
}
.cnt .icon {
  margin-top: 3px;
  color: #fff;
}

.tap {
  width: 140px;
  height: 140px;
  position: absolute;
  background: transparent;
  opacity: 0.4;
  top: calc(50% - 69px);
  right: -32px;
  border-radius: 50%;
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}

.wave {
  width: 30px;
  height: 30px;
  background: #4784ff;
  border-radius: 50%;
  opacity: 0;
}

.wave-act {
  animation: t-wave 599ms cubic-bezier(0.77, 0.06, 0, 0.99) forwards;
}

@keyframes t-wave {
  0% {
    width: 50px;
    height: 50px;
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  20% {
    width: 40px;
    height: 40px;
  }
  50% {
    opacity: 0.9;
  }
  80% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    width: 140px;
    height: 140px;
  }
}
.lock-on {
  background: transparent;
  position: absolute;
  z-index: 11;
  cursor: pointer;
}
</style>

<div class='lock'></div>
<div class='concept-wrap' id='mainWrap'>
  <div class='tap'>
    <div class='wave'></div>
  </div>
  <div class='btn-wrap' id='btn'>
    <div class='btn-cnt' id='content'>
      <div class='cnt cnt-1'><p class='text'>Expert</p>
        <i class='icon' data-feather="chevron-right"></i>
      </div>
      <div class='cnt cnt-2'><p class='text'>Hard</p>
        <i class='icon' data-feather="chevron-right"></i>
      </div>
      <div class='cnt cnt-3'><p class='text'>Normal</p>
        <i class='icon' data-feather="chevron-right"></i>
      </div>
      <div class='cnt cnt-4'><p class='text'>Easy</p>
        <i class='icon' data-feather="chevron-right"></i>
      </div>
    </div>
  </div>
</div>

<!-- References Dribbble / Twitter / Hicon Pack -->
<div class='cs-ref'>
  <a class='cs-dribbble' href="https://dribbble.com/shots/14106091-UI-Custom-Select-Tag" target='_blank'>
    <div id='svgDribbble'></div>
  </a>
  <a class='cs-twitter' target='_blank' href="https://twitter.com/CosWiSe">
    <div id='svgTwitter'></div>
  </a>
    <a class="cs-hicon" target="_new" href="https://hicon.cosm.ws">
    <div id='svgHicon'></div>
  </a>
</div>


<script type="text/javascript">
// ICONS CALLBACK
feather.replace();

// SVGs
$('#svgDribbble').load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/373860/references.html #dribbble');
$('#svgTwitter').load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/373860/references.html #twitter');
$('#svgHicon').load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/373860/references.html #hicon');

// NEW CODE HERE

// Variables
var btnSz = 200;
var c = 0;
var bezierEasing = 'cubic-bezier(.69,-0.49,0,1)';
var t1 = 299;
var t2 = 1198;

var bZ2 = 'cubic-bezier(.46,.56,0,.88)'

$('#mainWrap').on('click', function() {
  c++;
  console.log(c);
  
  // Lock
  $('.lock').addClass('lock-on');
  setTimeout(function() {
    $('.lock').removeClass('lock-on');
  }, 1200);
  
  // Wave
  $('.wave').addClass('wave-act');
  setTimeout(function() {
    $('.wave').removeClass('wave-act');
  }, 1000);

  // Move Button
  setTimeout(function() {
    $('#btn').transition({
      x: '+=10px'
    }, 289, bZ2, function() {
      $('#btn').transition({
        x: '0px'
      }, 289, bZ2);
    }); 
  }, 399);


  // Move Content
  setTimeout(function() {
    if (c <= 2) {
      $('#content').transition({
        x: '+=220px'
      }, t1, bezierEasing, function() {
        $('#content').transition({
          x: '-=20'
        }, 699, 'cubic-bezier(.25,.49,.2,1)');
      });

    } else if (c == 3) {
      $('#content').transition({
        x: '+=220px'
      }, t1, bezierEasing, function() {
        $('#content').transition({
          x: '-=20'
        }, 699, 'cubic-bezier(.25,.49,.2,1)');
      });
      setTimeout(function() {
        $('.cnt-1').css('order', '4');
        $('#content').transition({
          x: '0'
        }, 0);
      }, t2);
    } else if (c == 4) {
      $('#content').transition({
        x: '+=220px'
      }, t1, bezierEasing, function() {
        $('#content').transition({
          x: '-=20'
        }, 699, 'cubic-bezier(.25,.49,.2,1)');
      });
      setTimeout(function() {
        $('#content').transition({
          x: '0'
        }, 0);
        $('.cnt-1').css('order', '0');
      }, t2);
      c = 0;
    } 
  }, 399)


});
</script>