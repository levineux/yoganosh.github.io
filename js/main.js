function onclickJSSocial() {
    $('.jssocials-more').hide();
    $('.jssocials-more').find(' ~ .jssocials-share').toggleClass('visible');
}

$(document).ready(function(){
    // $("img").unveil();

	$('.js-bar').click(function(e){
        e.preventDefault();
		$('body').toggleClass('side-menu-active');
	});
	$('#background-overlay, #close-sidebar').click(function(){
		$('body').removeClass('side-menu-active');
	});
	$(".js-share").jsSocials({
		showLabel: false,
		showCount: false,
        shares: ["facebook", "twitter", "pinterest", "googleplus", "stumbleupon", "linkedin"]
    });
    $(".js-share-story").jsSocials({
		showCount: false,
        shares: [{share: "facebook", label: "Share on Facebook"}, {share: "twitter", label: "Share on Twitter"},
        {
            renderer: function() {
                var $result = $("<div class=\"jssocials-more\">");

                $("<div>").addClass("jssocial-more")
                    .attr("data-layout", "button_count")
                    .attr("onclick", "onclickJSSocial()")
                    .appendTo($result);

                return $result;
            },
        },
        "pinterest", "googleplus",  "stumbleupon", "linkedin"
        ]
    });
    $(".js-share-header").jsSocials({
        showCount: false,
        showLabel: false,
        shares: [{share: "facebook", label: "Share"}, {share: "twitter", label: "Tweet"},
        "pinterest"
        ]
    });
    $('.js-show-share').click(function(e){
    	e.preventDefault();
    	$(this).hide();
    	$(this).parent().find('.js-share').show();
    	$(this).parent().find('.js-hide-share').css("display", "block");
    });
    $('.js-hide-share').click(function(e){
    	e.preventDefault();
    	$(this).hide();
    	$(this).parent().find('.js-share').hide();
    	$(this).parent().find('.js-show-share').show();
    });
    $('.js-search').click(function(){
    	$('.js-toggle-search').toggleClass('visible');

    	$(this).parent().find('.js-toggle-search').find('input').focus();
    });
    $('.js-search-close').click(function(){
        $('.js-toggle-search').removeClass('visible');
    });
    if (window.innerWidth < 767){
        $('.js-toggle-search').find('input').css('width', $('#header').find('.container').width() - 15);
    }else{
        $('.js-toggle-search').each(function(){
            var logo_width = $(this).closest('.header').find('.logo').width();
            var header_width = $(this).closest('.header > .container').width();
            $(this).find('input').css('width', header_width - logo_width - 115);
        })
    }
    $('.js-show-share-header').click(function(e){
        e.preventDefault();
        $(this).hide();
        $('.js-hide-share-header').show();
        $('.js-share-header').addClass('visible');
    });
    $('.js-hide-share-header').click(function(e){
        e.preventDefault();
        $(this).hide();
        $('.js-show-share-header').show();
        $('.js-share-header').removeClass('visible');
    });

    $('time').each(function( index, element ) {
        var date1 = new Date();
        var date2 = new Date($(element).attr('datetime'));
        var timeDiff = date1.getTime() - date2.getTime();
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (diffDays == 1) {
            $(element).text(diffDays + " day ago");
        } else {
            $(element).text(diffDays + " days ago");
        }
    });

    postsSize = $(".content article").size();
    var pageNum = window.location.hash.substr(1);
    x=5;
    if (pageNum > 0) x=x*pageNum;
    $('.content article:lt('+x+')').show();
    if (x >= postsSize) $('#loadMore').hide();
    $('#loadMore').click(function (e) {
      e.preventDefault;
      x= (x+5 <= postsSize) ? x+5 : postsSize;
      $('.content article:lt('+x+')').show();
      if(x == postsSize) {
        $('#loadMore').hide();
      } else {
        if (pageNum == "") {
          pageNum = 2;
        } else {
          pageNum += 1;
        }
        this.setAttribute('href', "#" + pageNum);
      }
    });

    $("#mc-embedded-subscribe-form").submit(function(e) {
      e.preventDefault();

      var $form = $(this);
      $.post($form.attr("action"), $form.serialize()).then(function() {
        alert("Thank you!");
      });
    });

});
$(window).resize(function(){
    if (window.innerWidth < 767){
        $('.js-toggle-search').find('input').css('width', $('#header').find('.container').width() - 15);
    }else{
        $('.js-toggle-search').each(function(){
            var logo_width = $(this).closest('.header').find('.logo').width();
            var header_width = $(this).closest('.header > .container').width();
            $(this).find('input').css('width', header_width - logo_width - 115);
        })
    }
});
 var lastScrollTop = 0;
$(window).on('scroll', function() {
    var st = $(this).scrollTop();
    if (st > 200){
        if(st < lastScrollTop) {

            $('.js-header-scroll-hide').removeClass('story-header');
            $('.js-header-scroll').addClass('story-header');
            $('.js-wrapper').removeClass('down');
            $('.js-hide-share-header').hide();
            $('.js-share-header').removeClass('visible');
            $('.js-show-share-header').show();
        }
        else {
            $('.js-header-scroll-hide').addClass('story-header');
            $('.js-header-scroll').removeClass('story-header');
            $('.js-wrapper').addClass('scroll');
            $('.js-header').addClass('minimized');
            if (st > 300){
                $('#header').addClass('visible');
            }
            if (st > 600){
                $('.js-wrapper').addClass('down');
            }
        }
        lastScrollTop = st;
    }else{

        $('.js-wrapper:not(.page-story) #header').removeClass('visible');
        if (st < 100){
            // $('.js-wrapper:not(.page-story)').removeClass('scroll');
            // $('.js-header').removeClass('minimized');
            // $('.js-header-scroll-hide').removeClass('story-header');
            // $('.js-header-scroll').addClass('story-header');
        }
    }
});