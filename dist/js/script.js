window.addEventListener('DOMContentLoaded', function () {

	//Set a variable to indicate the current slide:
	let slideIndex = 1;
	// Put all the necessary DOM elements into variables:
	let slides = document.querySelectorAll('.header__slider-item'),
		prev = document.querySelector('.prev'),
		next = document.querySelector('.next'),
		dotsWrap = document.querySelector('.header__slider-dots'),
		dots = document.querySelectorAll('.header__slider-dot');

	//Function to show the active slide and hide all others:
	function showSlides(n) {
		// Making sure the slides will switch from the last to the 1st one and vise versa
		if (n > slides.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slideIndex = slides.length;
		}

		slides.forEach((item) => {
			item.style.display = 'none'; // Add display:none to all the slider__items
		});

		dots.forEach((item) => { // Remove class active from all the slider__dots
			item.classList.remove('dot-active');
		});

		slides[slideIndex - 1].style.display = 'block'; // Show the current slider__item
		dots[slideIndex - 1].classList.add('dot-active'); // Make the current slider__dot active
	}

	showSlides(slideIndex);

	function slidePlus(n) { // Function to switch to the next / previous slide
		showSlides(slideIndex += n);
	}

	function slideCurrent(n) { // Function to swich to the slide corresponding the dot
		showSlides(slideIndex = n);
	}

	// Connect functions to click events on PREV & NEXT arrows

	prev.addEventListener('click', () => {
		slidePlus(-1); // Into the argument 'n' we put a negative 1 in order to reduce the slideIndex by 1
	});

	next.addEventListener('click', () => {
		slidePlus(1);
	});

	// Connect function to click event on the DOTS

	dotsWrap.addEventListener('click', (e) => {
		for (let i = 0; i < dots.length + 1; i++) {
			if (e.target.classList.contains('header__slider-dot') && e.target == dots[i - 1]) {
				slideCurrent(i);
			}
		}
	});


});