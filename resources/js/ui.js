var Init = {
	defaults : function(){
		var bodyHeight = 0;
		var bodyWidth = 0;
		var breakpoint;
		this.scrollDirection();
		this.resize();
		window.addEventListener("resize", this.resize);
	},
	scrollDirection : function(){
		window.__scrollPosition = document.documentElement.scrollTop || 0;

		document.addEventListener('scroll', function() {
			var _documentY = document.documentElement.scrollTop;
			var _direction = _documentY - window.__scrollPosition >= 0 ? 1 : -1;

			if(_direction === 1){
				$('html').removeClass('is-scroll-up');
				$('html').addClass('is-scroll-down');
			}else if(_direction === -1){
				$('html').removeClass('is-scroll-down');
				$('html').addClass('is-scroll-up');
			}

			window.__scrollPosition = _documentY; // Update scrollY
		});
	},
	resize : function(){
		Init.getBrowserSize();
		Init.drawBreakPoint();

		Init.breakpoint = window.matchMedia('(min-width:992px)').matches;
		if(!Init.breakpoint){
			$('html').removeClass('is-desktop');
			$('html').addClass('is-mobile');
		}else{
			$('html').removeClass('is-mobile');
			$('html').addClass('is-desktop');
		}
	},
	getBrowserSize : function(){
		this.bodyHeight = Math.max(
			document.body.scrollHeight,
			document.body.offsetHeight,
			document.documentElement.clientHeight,
			document.documentElement.scrollHeight,
			document.documentElement.offsetHeight
		);
		this.bodyWidth = Math.max(
			document.body.scrollWidth,
			document.body.offsetWidth,
			document.documentElement.clientWidth,
			document.documentElement.scrollWidth,
			document.documentElement.offsetWidth
		);
	},
	drawBreakPoint : function(){
		$('html').attr('data-width',this.bodyWidth);
		$('html').attr('data-height',this.bodyHeight);
	},
};

var Header = {
	init : function(){
        this.scrolling();
		window.addEventListener('mousewheel', Header.scrolling);
		window.addEventListener('touchmove', Header.scrolling);

		$(window).scroll(function(){
			Header.scrolling();
		});


	},
	scrolling : function(e){
		var scrollTop = $(window).scrollTop();

		if(scrollTop > 0){
			$('html').addClass('is-scrolled');
		}else{
			$('html').removeClass('is-scrolled');
		}

		if(scrollTop > 85){
			$('html').addClass('header-hidden');
		}else{
			$('html').removeClass('header-hidden');
		}

		if($('.tab').length > 0){
			if(scrollTop > $('.tab').offset().top + 70){
				$('html').addClass('depth2-show');
			}else{
				$('html').removeClass('depth2-show');
			}
		}
	},
};

var Common = {
	init : function(){
        this.revealed();

        //select
		$('select').selectmenu();
	},
	revealed : function(){
		$('[data-event="revealed"]').each(function (i) {
			if ($(window).scrollTop() + $(window).height() > $(this).offset().top + $(this).outerHeight()) {
				$(this).removeClass('in');
			}
		});
		$(window).scroll(function () {
			$('[data-event="revealed"]').each(function (i) {
				if (($(window).scrollTop() + $(window).height()) - ($(window).height() / 3) > $(this).offset().top) {
					$(this).removeClass('in');
				}
			});
		});
		//counter animation
		var countFlag = false;
		$(window).scroll(function () {
			$('.count').not('.finish').each(function() {
				if (($(window).scrollTop() + $(window).height()) - ($(window).height() / 3) > $(this).offset().top) {
					var $this = $(this),
						countTo = $this.attr('data-count');
					$this.addClass('finish');
					$({
						countNum: $this.text()
					}).stop().animate({
							countNum: countTo
						},
						{
							duration: 1500,
							easing: 'linear',
							step: function() {
								$this.text(commaSeparateNumber(Math.floor(this.countNum)));
							},
							complete: function() {
								$this.text(commaSeparateNumber(this.countNum));
								//$this.addClass('finish');
							}
						}
					);
				};
				function commaSeparateNumber(val) {
					while (/(\d+)(\d{3})/.test(val.toString())) {
						val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
					}
					return val;
				}
			});
		});
    },
};

$('#header-block').load('../_include/header.html');
$('#footer-block').load('../_include/footer.html');

$(function() {

	Init.defaults();

	$(window).on('load', function(){
		Common.init();
		Header.init();

		$('select').selectmenu();

		skrollr.init();
	});

});