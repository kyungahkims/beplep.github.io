let lockedToPage4 = false;
let unlockedPage4 = false;

function onScroll() {
	const scrollTop = $(window).scrollTop();
	const scTop = scrollTop + 30;
	const pages = [];

	const page4Top = $('.page4').offset().top;
	const page4Height = $('.page4').outerHeight();

	if (!lockedToPage4 && !unlockedPage4 && scrollTop >= page4Top && scrollTop < page4Top + page4Height) {
		lockedToPage4 = true;

		$('html, body').stop().animate({
			scrollTop: page4Top
		}, 10);
		return;
	}

	if (scrollTop > 200) {
		$('.bt_top').css('visibility', 'visible');
		$('header').addClass('active');
		$('header').find('img').attr('src', '../img/logo_b.png');

	} else {
		$('.bt_top').css('visibility', 'hidden');
		$('header').removeClass('active');
		$('header').find('img').attr('src', '../img/logo.png');
	}

	for (let i = 0; i < $('.link_page').length; i++) {
		pages[i] = $('.link_page').eq(i).offset().top;
	}

	let i;
	for (i = $('.link_page').length; i > 0; i--) {
		if (scTop >= pages[i]) {
			break;
		}
	}

	if ($('.link').eq(2).hasClass('active')) {
		if (!wheelAttached) {
			page4.addEventListener('wheel', handlePage4Wheel, {
				passive: false
			});
			wheelAttached = true;
		}
	}

	$('.link').removeClass('active');
	$('.link').eq(i).addClass('active');

	$('.link_page').removeClass('active');
	$('.link_page').eq(i).addClass('active');
	$('.fix-wrap .link').eq(i).addClass('active');
}

$(window).scroll(onScroll).trigger('scroll');

/* 모바일 윙*/
function fixShow(show) {
	if (show) {
		$('.fix-wrap').css('display', 'block');
		setTimeout(function () {
			$('.fix-wrap').addClass('active');
			$('.fix-wrap > div').addClass('active');
		}, 0);
	} else {
		$('.fix-wrap').removeClass('active');
		$('.fix-wrap > div').removeClass('active');
		setTimeout(function () {
			$('.fix-wrap').css('display', 'none');
		}, 100);
	}
}

function onBarClick() {
	if ($(this).hasClass('default')) {
		$(this).removeClass('default').addClass('active');
		fixShow(true);
	} else if ($(this).hasClass('active')) {
		$(this).removeClass('active').addClass('default');
		fixShow(false);
	} else {
		$(this).addClass('active');
		fixShow(true);
	}
}

$('.navi-bars').click(onBarClick);

/* 모바일 윙 숨기기 */
function onResize() {
	if ($(this).innerWidth() > 1200) {
		$('.navi-bars').removeClass('active');
		$('.fix-wrap > div').removeClass('active');
		$('.fix-wrap').removeClass('active');
		$('.fix-wrap').hide();
	}

	initAllSlides();
}

$(window).resize(onResize);
$(document).ready(() => {
	initAllSlides();
	$(window).trigger('resize');
});

/* 모바일 슬라이드 이미지 스크롤 센터 */
$('.page3 .slide_img2, .page3 .slide_img3, .page3 .slide_img4').each(function () {
	let $el = $(this);
	let scrollMiddle = ($el[0].scrollWidth - $el.innerWidth()) / 2;
	$el.scrollLeft(scrollMiddle);
});

/* 모바일 메뉴 클릭 숨기기*/
$('.fix-wrap .link').click(function () {
	setTimeout(() => {
		$('.navi-bars').removeClass('active').addClass('default');
		fixShow(false);
	}, 100);
});

/* fix-wrap */
$('.fix-wrap').click(function (e) {
	$('.navi-bars').removeClass('active').addClass('default');
	fixShow(false);
	wrapperSwipers.forEach(swiper => swiper.autoplay.start());
});

$('.pop, .fix-wrap > div').click(function (e) {
	e.stopPropagation();
});

/* 광고 집행 문의 */
$('.contact_link').click(function () {
	const tar = $('.link_page').eq(4).offset().top;
	lockedToPage4 = false;
	unlockedPage4 = true;
	$('html, body').stop().animate({
		scrollTop: tar
	}, 300, onScroll);
});

/* link 클릭 */
function onNavClick() {
	const tar = $('.link_page').eq($(this).index()).offset().top;
	lockedToPage4 = false;
	unlockedPage4 = true;
	$('html, body').stop().animate({
		'scrollTop': tar
	}, 300);
}

$('.link').click(onNavClick);

/* top 버튼 */
function onTopClick() {
	$('html, body').stop().animate({
		'scrollTop': 0
	}, 300, onScroll);
}
$('.bt_top, .logo').click(onTopClick);

/* wheel */
const page4 = document.querySelector('.page4');
let scrollTimeout;
let fromWheel = false;
let wheelAttached = false;

function handlePage4Wheel(e) {
	e.preventDefault();
	if (scrollTimeout || fromWheel) return;
	fromWheel = true;
	if (e.deltaY > 0) {
		if (swiper3.isEnd && swiper2.isEnd) {
			fromWheel = false;
			wheelAttached = false;
			page4.removeEventListener('wheel', handlePage4Wheel);
			lockedToPage4 = false;
			unlockedPage4 = true;
			return;
		}
		if (swiper3.isEnd) {
			swiper2.slideNext();
		} else {
			swiper3.slideNext();
		}
	} else {
		if (swiper3.isBeginning && swiper2.isBeginning) {
			fromWheel = false;
			wheelAttached = false;
			page4.removeEventListener('wheel', handlePage4Wheel);
			return;
		}
		if (!swiper2.isBeginning) {
			swiper2.destroy();
			initSlide2();
		} else {
			swiper3.slidePrev();
		}
	}

	scrollTimeout = setTimeout(() => {
		scrollTimeout = null;
		fromWheel = false;
	}, 10);
}

/* 0 */
let swiper0;

function initSlide0() {

	swiper0 = new Swiper('.swiper.type0', {
		effect: 'slide',
		direction: 'horizontal',
		slidesPerView: 'auto',
		spaceBetween: 20,
		observer: true,
		observeParents: true,
		loop: true,
		loopedSlides: 5,
		initialSlide: 0,
		centeredSlidesBounds: true,
		speed: 4000,
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
		},
		allowTouchMove: false,
		breakpoints: {
			1200: {
				spaceBetween: 50
			}
		}
	});
}

initSlide0();

/* 1 */
const customLabels = ["1", "2", "3", "4"];
const customLabels2 = ["배너", "스플래시 광고"];
const customLabelsActive = [
	'1 <span>Big Data</span>',
	'2 <span>Targeting</span>',
	'3 <span>Marketing</span>',
	'4 <span>Report</span>'
];

const swiper1 = new Swiper('.swiper.type1', {
	effect: 'fade',
	fadeEffect: {
		crossFade: true
	},
	loop: true,
	autoplay: {
		delay: 5000,
	},
	speed: 500,
	pagination: {
		el: '.swiper-pagination.type1',
		clickable: true,
		renderBullet: function (index, className) {
			return `<span class="${className}" data-index="${index}">${customLabels[index] || index + 1}</span>`;
		},
	},
	allowTouchMove: false,
	breakpoints: {
		890: {
			allowTouchMove: true,
		}
	},
	on: {
		init: function () {
			updatePagination(this);
		},
		slideChange: function () {
			updatePagination(this);
		}
	}
});

function updatePagination(swiperInstance) {
	const bullets = swiperInstance.pagination.bullets;
	bullets.forEach((bullet, index) => {
		if (bullet.classList.contains('swiper-pagination-bullet-active')) {
			bullet.innerHTML = customLabelsActive[index] || (index + 1);
		} else {
			bullet.innerHTML = customLabels[index] || (index + 1);
		}
	});
}

/* 2 */
let swiper2;

function initSlide2() {
	swiper2 = new Swiper('.swiper.type2', {
		loop: false,
		speed: 1000,
		spaceBetween: 30,
		pagination: {
			el: '.swiper-pagination.type2',
			clickable: true,
			renderBullet: function (index, className) {
				return `<span class="${className}" data-index="${index}">${customLabels2[index] || index + 1}</span>`;
			},
		}
	});
}

initSlide2();

/* 3 */
let swiper3;

function initSlide3() {
	swiper3 = new Swiper('.swiper.type3', {
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		pagination: {
			el: '.swiper-pagination.type3',
			clickable: true,
		}
	});
}

initSlide3();

/* 4 */
const swiper4 = new Swiper('.swiper.type4', {
	effect: 'fade',
	fadeEffect: {
		crossFade: true
	},
	slidesPerView: 1,
	loop: true,
	autoplay: {
		delay: 7000,
	},
	speed: 500,
	spaceBetween: 30,
	pagination: {
		el: '.swiper-pagination.type4',
		clickable: true,
	},
	allowTouchMove: false,
	breakpoints: {
		960: {
			allowTouchMove: true,
		}
	},
	on: {
		slideChangeTransitionEnd: function () {
			if (this.realIndex === 0) {
				swiper0.destroy();
				initSlide0();
			} else if (this.realIndex === 1) {
				setTimeout(function () {
					initCharts();
				}, 800);
			}
		}
	}
});

/* 5 ~ 11 */
let swipers = {};
const swiperConfigs = [{
		selector: '.swiper.type5',
		spaceBetween: 50
	},
	{
		selector: '.swiper.type6',
		spaceBetween: 50
	},
	{
		selector: '.swiper.type7',
		spaceBetween: 30
	},
	{
		selector: '.swiper.type8',
		spaceBetween: 30
	},
	{
		selector: '.swiper.type9',
		spaceBetween: 30
	},
	{
		selector: '.swiper.type10',
		spaceBetween: 30
	},
	{
		selector: '.swiper.type11',
		spaceBetween: 30
	},
];

function initAllSlides() {
	swiperConfigs.forEach((config, index) => {
		const key = `swiper${index + 5}`;

		if (swipers[key]) {
			swipers[key].destroy(true, true);
		}

		swipers[key] = new Swiper(config.selector, {
			effect: 'slide',
			direction: 'horizontal',
			slidesPerView: 'auto',
			spaceBetween: config.spaceBetween,
			observer: true,
			observeParents: true,
			loop: true,
			initialSlide: 0,
			centeredSlidesBounds: true,
			speed: 3000,
			autoplay: {
				delay: 0,
				disableOnInteraction: false,
			},
		});
	});
}

/* 12 */
const swiper12 = new Swiper('.swiper.type12', {
	effect: 'slide',
	slidesPerView: 'auto',
	spaceBetween: 20,
	loop: false,
	breakpoints: {
		1200: {
			spaceBetween: 40,
		}
	},
});

function updatePagination(swiperInstance) {
	const bullets = swiperInstance.pagination.bullets;
	bullets.forEach((bullet, index) => {
		if (bullet.classList.contains('swiper-pagination-bullet-active')) {
			bullet.innerHTML = customLabelsActive[index] || (index + 1);
		} else {
			bullet.innerHTML = customLabels[index] || (index + 1);
		}
	});
}

function initCharts() {
	const getScaleFactor = () => {
		const factor = window.innerWidth / 390;
		return Math.min(Math.max(factor, 0.8), 0.8);
	};

	const ctx1 = document.getElementById('myChart1').getContext('2d');
	myChart1 = new Chart(ctx1, {
		type: 'bar',
		data: {
			labels: ['20년', '21년', '22년', '23년', '24년', '25년(E)'],
			datasets: [{
				label: '',
				data: [120, 320, 410, 470, 550, 650],
				backgroundColor: ['#eaeaea', '#eaeaea', '#eaeaea', '#eaeaea', '#eaeaea', '#0d6eee'],
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			layout: {
				padding: {
					top: 30,
				}
			},
			legend: {
				display: false
			},
			scales: {
				xAxes: [{
					gridLines: {
						display: false
					},
					ticks: {
						fontColor: '#777',
						/* fontSize: 18, */
						fontFamily: 'Pretendard',
					},
					barPercentage: 0.8,
				}],
				yAxes: [{
					gridLines: {
						display: false,
						drawBorder: false
					},
					ticks: {
						display: false
					}
				}]
			},
			animation: {
				onComplete: function () {
					const chart = this.chart;
					const ctx = chart.ctx;
					const scaleFactor = getScaleFactor(ctx);
					ctx.textAlign = 'center';
					ctx.textBaseline = 'bottom';

					this.data.datasets.forEach((dataset, i) => {
						const meta = chart.getDatasetMeta(i);
						meta.data.forEach((bar, index) => {
							const value = dataset.data[index];
							const barWidth = bar._model.x - bar._model.base;
							const centerX = bar._model.base + barWidth;
							const centerY = bar._model.y - 10;
							const labelText = `${value}만`;

							if (index === 5) {
								ctx.fillStyle = '#0d6eee';
								ctx.font = `600 ${Math.round(23 * scaleFactor)}px Pretendard`;
							} else {
								ctx.fillStyle = '#bbb';
								ctx.font = `500 ${Math.round(16 * scaleFactor)}px Pretendard`;
							}

							ctx.fillText(labelText, centerX, centerY);
						});
					});
				}
			}
		}
	});

	const data = [10, 13, 77];
	const ctx2 = document.getElementById("myChart2").getContext("2d");
	myChart2 = new Chart(ctx2, {
		type: 'doughnut',
		data: {
			labels: ['10-20대', '30-50대', '60대 이상'],
			datasets: [{
				data,
				backgroundColor: ['#ececec', '#93afff', '#2962ff'],
				borderWidth: 0
			}]
		},
		options: {
			cutoutPercentage: 60,
			responsive: true,
			maintainAspectRatio: false,
			rotation: Math.PI,
			circumference: Math.PI,
			legend: {
				display: false
			},
			animation: {
				onComplete: function () {
					const chart = this.chart;
					const ctx = chart.ctx;
					const meta = chart.getDatasetMeta(0);
					const dataset = this.data.datasets[0].data;
					const total = dataset.reduce((a, b) => a + b, 0);
					const scaleFactor = getScaleFactor(ctx);

					const fontStyles = [{
							color: '#777',
							size: Math.round(16 * scaleFactor)
						},
						{
							color: '#fff',
							size: Math.round(16 * scaleFactor)
						},
						{
							color: '#fff',
							size: Math.round(20 * scaleFactor)
						}
					];

					meta.data.forEach((segment, i) => {
						const model = segment._model || segment;
						const midAngle = (model.startAngle + model.endAngle) / 2;
						const radius = (model.innerRadius + model.outerRadius) / 2;
						const x = model.x + Math.cos(midAngle) * radius;
						const y = model.y + Math.sin(midAngle) * radius;

						const percent = `${((dataset[i] / total) * 100).toFixed(0)}%`;
						const style = fontStyles[i];

						ctx.fillStyle = style.color;
						ctx.font = `500 ${style.size}px Pretendard`;
						ctx.textAlign = 'center';
						ctx.textBaseline = 'middle';
						ctx.fillText(percent, x, y);
					});
				}
			}
		}
	});

	const ctx3 = document.getElementById('myChart3').getContext('2d');
	myChart3 = new Chart(ctx3, {
		type: 'horizontalBar',
		data: {
			labels: [''],
			datasets: [{
					label: '남성',
					data: [40],
					backgroundColor: '#bfcffe'
				},
				{
					label: '여성',
					data: [60],
					backgroundColor: '#0d6eee'
				}
			]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			legend: {
				display: false
			},
			scales: {
				xAxes: [{
					stacked: true,
					gridLines: {
						display: false,
						drawBorder: false
					},
					ticks: {
						display: false
					}
				}],
				yAxes: [{
					stacked: true,
					barThickness: 45,
					gridLines: {
						display: false,
						drawBorder: false
					},
					ticks: {
						display: false
					}
				}]
			},
			animation: {
				onComplete: function () {
					const chart = this.chart;
					const ctx = chart.ctx;
					const scaleFactor = getScaleFactor(ctx);

					ctx.font = `500 ${Math.round(18 * scaleFactor)}px Pretendard`;
					ctx.textAlign = 'center';
					ctx.textBaseline = 'middle';

					this.data.datasets.forEach((dataset, i) => {
						const meta = chart.getDatasetMeta(i);
						const bar = meta.data[0];
						const dataValue = dataset.data[0];

						const barWidth = bar._model.x - bar._model.base;
						const centerX = bar._model.base + barWidth / 2;
						const centerY = bar._model.y;

						const labelText = `${dataset.label} ${dataValue}%`;
						ctx.fillStyle = '#ffffff';
						ctx.fillText(labelText, centerX, centerY);
					});
				}
			}
		}
	});
}

initCharts();

/* 문의하기 후 효과 */
$('form .btn_wrap button').click(function () {
	Swal.fire({
		title: "문의하기를 등록하시겠습니까?",
		icon: "info",
		showCancelButton: true,
		background: "#fff",
		color: "#222",
		confirmButtonText: "확인",
		cancelButtonText: "취소",
		customClass: {
			title: 'custom-swal-title',
			popup: 'custom-swal-popup',
			icon: 'custom-swal-icon',
			confirmButton: 'custom-swal-btn',
			cancelButton: 'custom-swal-btn'
		}
	}).then((result) => {
		if (result.isConfirmed) {
			Swal.fire({
				title: "문의하기가 완료되었습니다.",
				icon: "success",
				background: "#fff",
				color: "#222",
				confirmButtonText: "확인",
				customClass: {
					title: 'custom-swal-title',
					popup: 'custom-swal-popup',
					icon: 'custom-swal-icon',
					confirmButton: 'custom-swal-btn',
				}
			}).then(() => {
				$(this).addClass('active');
			});
		}
	});
});