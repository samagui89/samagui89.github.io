const ui = {
	init : function(){
		this.oninit.init();
		if( $('.nav_wrap').length > 0 ) {this.ham.init() }			// Hamburger Evt
		if( $('.animate_wrap').length > 0 ) { this.circle.init() }	// Scroll Evt
		if( $('.visual_wrap').length > 0 ) { this.mouse.init() }	// Mouse Over Evt
		if( $('.sec03').length > 0 ) { this.secEvt.init() }			// Sec03 Evt
	},
	oninit : {
		init : function(){
			//로딩끝

			//시작이벤트
			this.sec02Evt();
		},
		sec02Evt : function(){
			
		}
	},
	ham : {
		init : function(){
			let $target = $('.nav_wrap'),
				$btn = $target.find('.btn_nav'),
				$navBtn = $target.find('nav button');

			this.evtHandler($target, $btn, $navBtn);
		},
		evtHandler : function($t, $b, $nb){
			let _this = this,
				scId;
			$b.on('click', function(){
				if( $t.hasClass('active') ){
					_this.close($t, $b);
				} else {
					_this.open($t, $b);
				}
			});

			$nb.on('click', function(){
				scId = $(this).attr('data-scroll');
				_this.scroll(scId);
			})
		},
		open : function($t, $b){
			$t.addClass('active');
		},
		close : function($t, $b){
			$t.removeClass('active');
		},
		scroll : function(scId){
			$('html, body').animate({scrollTop: $('#'+scId).offset().top}, 400);
		}
	},
	circle : {
		init : function(){
			let _this = this,
				$target = $('.animate_wrap'),
				$btn = $target.find('.btn_main_ment'),
				$cAll = $target.find('.circle_box > div'),
				sec2T = $('section.sec02').offset().top,
				sec3T = $('section.sec03').offset().top,
				scT;

			$(window).on('scroll', function(){
				scT = $(this).scrollTop();
				_this.evtHandler($target, $btn, $cAll, scT, sec2T, sec3T);
			});

			$btn.on('mouseenter', function(){
				if( !$btn.siblings('.circle_box').hasClass('active') ){
					_this.enter($(this));
				}
			});
			$btn.on('mouseleave', function(){
				if( !$btn.siblings('.circle_box').hasClass('active') ){
					_this.leave($(this));
				}
			});
		},
		evtHandler : function($target, $btn, $cAll, scT, sec2T, sec3T){
			let _this = this;
			if( scT <= sec2T ){
				/* 원 Animation */
				let rotMat = (sec2T - scT) / sec2T,
					rotParese = parseInt((100 - rotMat * 100) * 3.6);
				//$target.css({'transform':'translate(-50%, -50%)'})
				$btn.css({'transform':'scale('+rotMat.toFixed(1)+') rotate('+ rotParese +'deg)'});
				if( !$btn.find('.fir_ment').hasClass('disb') ){
					_this.displayEvt($btn, '.fir_ment');
				}

				$cAll.find('span').css({'transform':'scale(0)'});
			} else if ( scT <= sec3T ) {
				/* 원 Animation */
				//$target.css({'transform':'translate(-50%, -50%)'})

				let pagMat = parseInt(100 - ((sec3T - sec2T - scT) / sec3T * 100)),
					harfSec3T = ((sec3T - sec2T) / 2);
					harfMat = parseInt(100 - ((harfSec3T - scT) / (harfSec3T - sec2T) * 100)) / 100;
				if( harfMat <= 1 ){
					/* 원 Animation */
					$btn.css({'transform':'scale(0)  rotate(360deg)'});
					if( !$btn.find('.sec_ment').hasClass('disb') ){
						_this.displayEvt($btn, '.sec_ment');
					}
					$cAll.find('span').css({'transform':'scale('+harfMat + ')'});
					if( $cAll.closest('.circle_box').hasClass('active') ){
						$cAll.closest('.circle_box').removeClass('active');
					}
				} else {
					/* 원 Animation */
					$btn.css({'transform':'scale(1)  rotate(360deg)'});
					$cAll.find('span').css({'transform':'scale(1)'});
					$cAll.closest('.circle_box').addClass('active');
					if( scT >= sec3T - $(window).height() - 200 ) {
						$target.css({'position':'absolute', 'top':sec3T - $(window).height()/2 - 100 + 'px'});
					} else {
						$target.css({'position':'fixed', 'top':'50%'});
					}
				}
			} else {
				/* 원 Animation */
				//$target.css({'transform':'translate(-50%, -50%)'})
			};
		},
		enter : function($this){
			let _this = this,
				$firEle = $this.find('.fir_ment');
			$this.addClass('active');
			if( $firEle.css('display') == 'block' ){
				let i = 0;
				$firEle.find('.txt').removeAttr('style');
				$firEle.find('.txt').css({'-webkit-background-clip':'text'});
				$firEle.find('.txt').each(function(){
					$(this).clearQueue();
					$(this).delay(i*100).queue(function(next) {
						$(this).addClass("on");
						next();
					});
					i++
				}, i*400);
			}
		},
		leave : function($this){
			let _this = this,
			$firEle = $this.find('.fir_ment');
			$this.removeClass('active');

			if( $firEle.css('display') == 'block' ){
				let i = 0;
				$firEle.find('.txt').removeAttr('style');
				$firEle.find('.txt').css({'-webkit-background-clip':'text'});
				$firEle.find('.txt').each(function(){
					$(this).clearQueue();
					$(this).delay(i*100).queue(function(next) {
						$(this).removeClass("on");
						next();
					});
					i++
				}, i*400);
			}
		},
		displayEvt : function($btn, txt){
			let _this  = this;

			$btn.children('div').removeClass('disb');
			$btn.find(txt).addClass('disb');

		}
	},
	mouse : {
		init : function(){
			let _this = this,
				$target = $('.visual_bg'),
				$bgSquare =('.bg_square_box'),
				$circle = $('.circle_box div');

			_this.visualEvt($target);
		},
		visualEvt : function($target){
			$target.on('mousemove', function(e){
				let body = $('.visual_bg');
				let circle = document.createElement('span');
				let x = e.offsetX;
				let y = e.offsetY;
				let pagX = e.pageX;
				let pagY = e.pageY
				circle.style.left = x + "px";
				circle.style.top = y + "px";

				let size = Math.random() * 100;
				circle.style.width = size + "px";
				circle.style.height = size + "px";

				body.append(circle);
				setTimeout(function() {
					circle.remove();
				}, 1800);
			})
		}
	},
	secEvt : {
		init : function(){
			let _this = this,
				$wrap = $('.sec03'),
				$target = $wrap.find('.work_list li');
			
			_this.evtHandler($wrap, $target);
		},
		evtHandler : function(w, t){
			let _this = this;
				tlist = [];
			
			t.each(function(){
				tlist.push($(this).offset().top);
			});

			$(window).on('scroll', function(){
				for(i=0; i<tlist.length; i++){
					if( $(window).scrollTop() >= tlist[i] + t.eq(i).height() -200 ){
						
						if( !t.eq(i).hasClass('rotate') ){
							t.eq(i).addClass('rotate');
						}
					} else if ( $(window).scrollTop() >= tlist[i] - 250 ){
						t.eq(i).removeClass('rotate');
						if( !t.eq(i).hasClass('active') ){
							t.eq(i).addClass('active');
						}
					} else {
						t.eq(i).removeClass('active rotate');
					}
				}
			});
		}
	}
}

$(document).ready(function(){
	ui.init();
})