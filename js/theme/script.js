window.addEventListener('DOMContentLoaded', () => {
  let videos = document.querySelectorAll('#hero .block .video');
  videos.forEach((video) => {
    video.currentTime = Math.floor(Math.random() * 28);
    video.playbackRate = ((Math.floor(Math.random() * 110)/100) + 0.25);
    video.play();
  });
  let navigationItems = document.querySelectorAll('#navigation .item .link');
  let currentSection = 'null';
  window.addEventListener('scroll', function(){
    if(window.scrollY >= (window.innerWidth/25)){ document.body.classList.add('scrolled'); }
    else if(window.scrollY < (window.innerWidth/20)){ document.body.classList.remove('scrolled'); }
    if(window.scrollY >= (window.innerHeight)){ document.body.classList.add('fold'); }
    else if(window.scrollY < (window.innerHeight)){ document.body.classList.remove('fold'); }
    navigationItems.forEach((item) => { item.classList.remove('active'); });
    var items = document.querySelectorAll('#main > section, #header');
    items.forEach(function(item) {
      let topDistance = item.getBoundingClientRect().top;
      if (topDistance < 100 && topDistance > -100) { currentSection = item.id; };
    });
    document.querySelector('#navigation').classList.add('active');
  });
  const sections = document.querySelectorAll('section:not(#what):not(#approach), #header');
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) { entry.target.classList.add('visible'); }
      else { entry.target.classList.remove('visible'); }
    });
  });
  sections.forEach(section => { observer.observe(section); });
});
$(document).ready(function(){
  $('.owl-carousel').owlCarousel({ loop:true, margin:15, autoplay:true, smartSpeed:1000, autoplayTimeout:2000, mouseDrag:true, touchDrag:true, responsive:{ 0:{items:1}, 768:{items:2}, 980:{items:3} } });
});
$('#popup').on('click', function(){ $('.popup').addClass('active'); });
$('#close').on('click', function(){ $('.popup').removeClass('active'); });
$('.popup-overlay').on('click', function(){ $('.popup').removeClass('active'); });
$("li.contact a.link").on('click', function(){ $('.popup').addClass('active'); });
$(".popupjs").on('click', function(){ $('.popup').addClass('active'); });
$('.burger-menu').on('click', function(){ $('ul.menu').toggleClass('active'); $(this).toggleClass('close'); });
$('ul.menu li a.link').on('click', function(){ $('ul.menu').removeClass('active'); $('.burger-menu').removeClass('close'); });
$(document).ready(function() { $('.menu').onePageNav(); });
$(window).scroll(function() { if($(window).scrollTop() < 980){ $('li.item').removeClass('active'); } });
$(function(){
  $('main.team-members .type-team img').height($('main.team-members .type-team img').width()*0.85);
  $(window).resize(function(){ $('main.team-members .type-team img').height($('main.team-members .type-team img').width()*0.85); });
  if ($("#fixedDiv").length){
    $(document).scroll(function() {
      var $self = $("#fixedDiv"); $self.css('margin-top', 0);
      var fixedDivOffset = $self.offset().top + $self.outerHeight(true);
      if (fixedDivOffset > ($("#footer").offset().top - 30)) { $self.css('margin-top', -(fixedDivOffset - $("#footer").offset().top)); }
      else { $self.css('margin-top', '0px'); }
    });
  }
});
