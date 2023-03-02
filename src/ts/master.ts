import Lazy from 'vanilla-lazyload';
import * as $ from 'jquery';
import * as M from 'materialize-css';
import Swiper, {Pagination, Controller, Autoplay, Manipulation, SwiperOptions} from 'swiper';
Swiper.use([Pagination, Controller, Manipulation, Autoplay]);

let currentCity:string;

declare var ymaps:any;
let map:any;
let pointCoords = [
	[44.891134, 37.336481], //Анапа1
	[44.865106, 37.355264], //Анапа2
	[45.002448, 37.295230], //Анапа3
	[44.928114, 37.979836], //Крымск
	[44.757288, 37.725065], //Новороссийск
	[44.861701, 38.173468], //Абинск1
	[44.862040, 38.143446], //Абинск2
	[45.260433, 38.125147], //Славянск-на-Кубани
];

//#region Parallax
let lazy = new Lazy({}, document.querySelectorAll('.lazy'));
let sidenav = M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
let modals = M.Modal.init(document.querySelectorAll('.modal'), {});
let scrollSpy = M.ScrollSpy.init(document.querySelectorAll('.scrollspy'));
let parallax = M.Parallax.init(document.querySelectorAll('.parallax'));
//#endregion

//#region Инициализация слайдеров
if($('.fasad-swiper1').length && $('.fasad-swiper2').length){
	let fasadSwiper1 = new Swiper('.fasad-swiper1', {
		loop: true, 
		pagination: {
			el: ".swiper1-pagination",
			type: 'bullets'
		}
	});
	let fasadInfoSwiper1 = new Swiper('.fasad-info-swiper1', {loop: true});
	fasadSwiper1.controller.control = fasadInfoSwiper1;
	fasadInfoSwiper1.controller.control = fasadSwiper1;
	
	let fasadSwiper2 = new Swiper('.fasad-swiper2', {
		loop: true,
		pagination: {
			el: ".swiper2-pagination",
			type: 'bullets'
		}
	});
	let fasadInfoSwiper2 = new Swiper('.fasad-info-swiper2', {loop: true});
	fasadSwiper2.controller.control = fasadInfoSwiper2;
	fasadInfoSwiper2.controller.control = fasadSwiper2;
}

if($('.product-swiper').length){
	let productSwiper = new Swiper('.product-swiper', {
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		}
	});
}

if($('.water-swiper').length){
	let waterSlider = new Swiper('.water-swiper', {
		spaceBetween: 10,
		pagination:{
			el: '.main-water-pagination',
			type: 'bullets',
			dynamicBullets: true,
			dynamicMainBullets: 5
		},
		breakpoints: {
			300:{
				slidesPerView: 2
			},
			800:{
				slidesPerView: 3
			},
			1200:{
				slidesPerView: 4
			},
			1700:{
				slidesPerView: 5
			}
		}
	});
}

if($('.offers-swiper').length){
	let offersSlider = new Swiper('.offers-swiper', {
		slidesPerView: 'auto',
		spaceBetween: 20,
		pagination: {
			el: '.offers-pagination',
			type: 'bullets'
		}
	});
}

if($('.actions-swiper').length){

	$('.actions-swiper').each((index, el) => {

		let id = el.id;
		let swiperClass = '.' + id + "-swiper";
		let paginationClass = "." + id + "-pagination";
		
		new Swiper(swiperClass, {
			slidesPerView: 'auto',
			spaceBetween: 20,
			pagination: {
				el: paginationClass,
				type: 'bullets',
				bulletClass: 'actions-bullet',
				bulletActiveClass: 'actions-active',
				modifierClass: 'actions-pagination-'
			}
		});
	});
}

if($('.partners-slider').length){

	let partnersSwiper = new Swiper('.partners-slider', {
		slidesPerView: "auto",
		spaceBetween: 40,
		centeredSlides: true,
		loop: true,
		centerInsufficientSlides: true,
		speed: 800,
		autoplay: {
			delay: 1000
		}
	});
}
//#endregion

//#region Обработчики событий

$('body').on('click', '.sidenav .folder', (e:JQuery.ClickEvent) => {
	e.preventDefault();

	let el = e.currentTarget;

	$(el).next().slideToggle();
})

$('body').on('mouseenter', '.image-trigger', (e:JQuery.MouseOverEvent) => {
	let el = e.currentTarget;
	let src = el.dataset['src'];
	let $image = $(el).parents('.image-wrapper').find('.image');
	let $triggers = $(el).parents('.image-wrapper').find('.image-trigger');
	
	$image.attr('src', src);

	$triggers.removeClass('active');
	$(el).addClass('active');
});

$('body').on('click', '.buy', (e:JQuery.ClickEvent) => {
	e.preventDefault();
	let el = e.currentTarget;
	let $parent = $(el).parents('.action');
	let input = $parent.find('input')[0];

	input.value = (parseInt(input.value) + 1).toString();
	$parent.addClass('flip');

});

$('body').on('click', '.card-button.minus', (e:JQuery.ClickEvent) => {
	e.preventDefault();
	let el = e.currentTarget;
	let $parent = $(el).parents('.action');
	let input = $parent.find('input')[0];

	input.value = (parseInt(input.value) - 1).toString();

	if(input.value === "0")
		$parent.removeClass('flip');

});

$('body').on('click', '.card-button.plus', (e:JQuery.ClickEvent) => {
	e.preventDefault();
	let el = e.currentTarget;
	let $parent = $(el).parents('.action');
	let input = $parent.find('input')[0];

	if(parseInt(input.value) <= 98){
		input.value = (parseInt(input.value) + 1).toString();
	}
});

$('body').on('click', '.popup-trigger', (e:JQuery.ClickEvent) => {
	let el = e.currentTarget;
	var already = $(el).parent().find('.popup').hasClass('open');
    var newClass = already ? '' : 'open';
    $('.popup-wrapper .popup').removeClass('open');
    $(el).parent().find('.popup').addClass(newClass);
})

$('body').on('click', (e:JQuery.ClickEvent) => {
	
	
	if(e.originalEvent){
		
		var path:Array<EventTarget> = e.originalEvent.composedPath();
        var dropdownIndex = path.filter(el => {
			return $(el).hasClass('popup');
        });
		
        var popups = path.filter(el => {
            return $(el).hasClass('popup-wrapper');
        });
    
        if(!dropdownIndex.length){
            $('.dropdown-wrapper .popup').removeClass('open');
        }
    
        if(!popups.length){
            $('.popup-wrapper .popup').removeClass('open');
        }
    }
});

$('body').on('click', '.order', (e:JQuery.ClickEvent) => {

	let _this = e.currentTarget;

	var already = $(_this).hasClass('expanded');
	var newClass = already ? '' : 'expanded'
	var path = e.originalEvent.composedPath();

	var link_in_path = path.filter(el => {
		return ((<HTMLElement>el).tagName == 'A' && !$(el).hasClass('expander-trigger'))
	});

	if(!link_in_path.length){
		$('tr.order').removeClass('expanded');    
		$(_this).addClass(newClass);
	}
});

$('body').on('change', '#change-password-trigger', (e:JQuery.ChangeEvent) => {
	$('#change-password').toggleClass('visible');
});

$('body').on('click', '.map-navi', (e:JQuery.ClickEvent) => {
	e.preventDefault();

	let city = e.currentTarget.dataset['city'];
	let lon = e.currentTarget.dataset['lon'];
	let lat = e.currentTarget.dataset['lat'];
	let zoom = e.currentTarget.dataset['zoom'];
	let index = e.currentTarget.dataset['index'];

	if(index == currentCity) return;

	if(map != null || map != undefined){
		map.destroy();
	}

	$('.map-navi').removeClass('active');
	$(e.target).addClass('active');

	$('[data-city] .city-description').hide();
	$("[data-city=" + index + "] .city-description").show();

	currentCity = index;

	initMap(null, [lon, lat], zoom);
});

$('body').on('click', '[data-city]', (e:JQuery.ClickEvent) => {
	e.preventDefault();

	let city = e.currentTarget.dataset['city'];
	let lon = e.currentTarget.dataset['lon'];
	let lat = e.currentTarget.dataset['lat'];
	let zoom = e.currentTarget.dataset['zoom'];

	if(city == currentCity) return;

	$('[data-city] .city-description').hide();
	$('[data-index]').removeClass('active');
	$('[data-index='+city+']').addClass('active');
	$(e.currentTarget).find('.city-description').show();

	if(map != null || map != undefined){
		map.destroy();
	}

	currentCity = city;

	initMap(null, [lon, lat], zoom);

	
});

$('body').on('change', '[name="account-type"]', (e:JQuery.ChangeEvent) => {
    let newVal = $(e.currentTarget).val();
    $('#fieldset').attr('data-mode', newVal.toString());
});

$('body').on('change', '[name="address"]', (e:JQuery.ChangeEvent) => {
	if($(e.target).val() == "user-address"){
        $('#user-address').removeClass('hidden');
    }else{
        $('#user-address').addClass('hidden');
    }
});

$('body').on('change', '.action-calculator input', (e:JQuery.ChangeEvent) => {

	let $form = $(e.currentTarget).parents('form');
	let discount = parseInt($form.data('discount'));
	let taraInput = <HTMLInputElement>$form.find('[name="include_empty"]').get(0);
	let waterInput = $form.find('[name="water"]:checked');
	let pumpInput = $form.find('[name="pump"]:checked');

	let waterPrice = parseFloat(waterInput.data('price')) * 2;
	let pumpPrice = parseFloat(pumpInput.data('price'));

	let bottlePrice = taraInput.checked ? 0 : parseFloat(taraInput.dataset['price']) * 2;

	let summ = waterPrice + pumpPrice + bottlePrice;

	let percent = summ * (discount / 100);

	let discountPrice = summ - percent;

	$('#old-price').text(summ.toString());
	$('#new-price').text(discountPrice.toString());

	let num = "";
	switch(true){
		case (waterInput.attr('id') == "water1" && pumpInput.attr("id") == "pump1" && taraInput.checked == false): num = "1"; break;
		case (waterInput.attr('id') == "water1" && pumpInput.attr("id") == "pump2" && taraInput.checked == false): num = "2"; break;
		case (waterInput.attr('id') == "water1" && pumpInput.attr("id") == "pump1" && taraInput.checked): num = "3"; break;
		case (waterInput.attr('id') == "water1" && pumpInput.attr("id") == "pump2" && taraInput.checked): num = "4"; break;
		case (waterInput.attr('id') == "water2" && pumpInput.attr("id") == "pump1" && taraInput.checked == false): num = "5"; break;
		case (waterInput.attr('id') == "water2" && pumpInput.attr("id") == "pump2" && taraInput.checked == false): num = "6"; break;
		case (waterInput.attr('id') == "water2" && pumpInput.attr("id") == "pump1" && taraInput.checked): num = "7"; break;
		case (waterInput.attr('id') == "water2" && pumpInput.attr("id") == "pump2" && taraInput.checked): num = "8"; break;
		case (waterInput.attr('id') == "water3" && pumpInput.attr("id") == "pump1" && taraInput.checked == false): num = "9"; break;
		case (waterInput.attr('id') == "water3" && pumpInput.attr("id") == "pump2" && taraInput.checked == false): num = "10"; break;
		case (waterInput.attr('id') == "water3" && pumpInput.attr("id") == "pump1" && taraInput.checked): num = "11"; break;
		case (waterInput.attr('id') == "water3" && pumpInput.attr("id") == "pump2" && taraInput.checked): num = "12"; break;
	}

	let actionText = "Акция №"+num;
	$('#action-label').text(actionText);
	
});

//#endregion

//#region Функции

// Загрузка внешних скриптов
function loadScript(url:string, callback:() => void){

	var script = <any>document.createElement("script")
	script.type = "text/javascript";

	if (script.readyState){  //IE
		script.onreadystatechange = function(){
			if (script.readyState == "loaded" ||
					script.readyState == "complete"){
				script.onreadystatechange = null;
				callback();
			}
		};
	} else {  //Others
		script.onload = function(){
			callback();
		};
	}

	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
}

// Инициализация карты
function initMap(e:Event = null, center:number[], zoom:number){

	map = new ymaps.Map('ymap', {
		center: center,
		zoom: zoom,
		controls: ['smallMapDefaultSet']
	});

	map.behaviors.disable('scrollZoom');

	let anapa1 = new ymaps.Placemark(pointCoords[0], {}, {iconColor: 'red'});
	let anapa2 = new ymaps.Placemark(pointCoords[1], {}, {iconColor: 'red'});
	let anapa3 = new ymaps.Placemark(pointCoords[2], {}, {iconColor: 'red'});
	let krymsk = new ymaps.Placemark(pointCoords[3], {}, {iconColor: 'red'});
	let novoros = new ymaps.Placemark(pointCoords[4], {}, {iconColor: 'red'});
	let abinsk1 = new ymaps.Placemark(pointCoords[5], {}, {iconColor: 'red'});
	let abinsk2 = new ymaps.Placemark(pointCoords[6], {}, {iconColor: 'red'});
	let slavyansk = new ymaps.Placemark(pointCoords[7], {}, {iconColor: 'red'});

	map.geoObjects.add(anapa1);
	map.geoObjects.add(anapa2);
	map.geoObjects.add(anapa3);
	map.geoObjects.add(krymsk);
	map.geoObjects.add(novoros);
	map.geoObjects.add(abinsk1);
	map.geoObjects.add(abinsk2);
	map.geoObjects.add(slavyansk);

}

// Инициализация вкладок на странице продукции
function initProductTabs(){
	let $el = $('.product-tabs');
	let inx = $el.find('.product-tab').index($('.product-tab.active'));
	if(inx < 0) inx++;
	initProductTabIndicator($el, inx);
	
	let $tabContent = $el.next();
	let $contents = $tabContent.find('.tab-content');

	let activeContent = $contents.get(inx);
	$contents.slideUp('fast');
	$(activeContent).slideDown('fast');

	$el.find('.product-tab').on('click', (e:JQuery.ClickEvent) => {
		e.preventDefault();
		let $me = $(e.currentTarget);
		let $parent = $me.parents('.product-tabs');
		$parent.find('.product-tab').removeClass('active');
		$me.addClass('active');
		let inx = $parent.find('.product-tab').index($('.product-tab.active'));
		initProductTabIndicator($parent, inx);

		let $tabContent = $parent.next();
		let $contents = $tabContent.find('.tab-content');
		let activeContent = $contents.get(inx);

		$contents.slideUp('fast');
		$(activeContent).slideDown('fast');
		
	})
}

function initProductTabIndicator($tabsElement:JQuery<HTMLElement>, index:number){
	let width = $tabsElement[0].clientWidth;
	let tab = $('.product-tab').get(index);
	let itemWidth = tab.getBoundingClientRect().width;

	let tab_left = Math.round($(tab).position().left);
	let tab_right = Math.round(width - (itemWidth + tab_left));

	$tabsElement.find('.indicator').css({
		left: tab_left+'px',
		right: tab_right+'px',
		transition: 'left .2s, right .2s',
	});
}

function animate(){

	$('.product-tabs').each((index, el) => {
		let inx = $(el).find('.product-tab').index($('.product-tab.active'));
		if(inx < 0) inx++;
		initProductTabIndicator($(el), inx);
	});

	requestAnimationFrame(animate);
}

//#endregion

//#region Инициализация
$(() => {

	let firstEl = $('.map-navi:first-of-type').get(0);
	$(firstEl).addClass('active');
	$('.city:first-of-type .city-description').removeClass('hidden');
	
	if($('#ymap').length){
		loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU", () => {
			ymaps.ready(function(){
				let defaultCoords = [parseFloat(firstEl.dataset['lon']),parseFloat(firstEl.dataset['lat'])]
				let defaultZoom = parseInt(firstEl.dataset['zoom']);
				initMap(null, defaultCoords, defaultZoom);
			});
		})
	}

	if($('.product-tabs').length){
		initProductTabs();
	}

	animate();
});
//#endregion