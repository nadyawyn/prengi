window.addEventListener('DOMContentLoaded', function () {

	let buttonOne = document.querySelector('.button_contact1'),
		buttonTwo = document.querySelector('.button_contact2'),
		popup = document.querySelector('.contact-popup'),
		popupClose = document.querySelector('.contact-popup__close'),
		overlay = document.querySelector('.overlay');

	buttonOne.addEventListener('click', function () {
		popup.classList.remove('hidden');
		overlay.classList.remove('hidden');
	});
	buttonTwo.addEventListener('click', function () {
		popup.classList.remove('hidden');
		overlay.classList.remove('hidden');
	});

	popupClose.addEventListener('click', function () {
		popup.classList.add('hidden');
		overlay.classList.add('hidden');
	});

	//Minify Contacts List 

	let contactsClose = document.querySelector('.contacts__switch'),
		contactsList = document.querySelector('.contacts__list');

	contactsClose.addEventListener('click', function () {
		if (contactsList.classList.contains('min')) {
			contactsList.classList.remove('min');
			contactsClose.classList.add('close');
		} else {
			contactsList.classList.add('min');
			contactsClose.classList.remove('close');
		}

	});

	//Nav Menu

	let navClose = document.querySelector('.header__nav-close'),
		navMenu = document.querySelector('.header__nav-menu');

	if (window.matchMedia('(max-width: 768px)').matches) {
		navMenu.classList.add('hidden');
	}

	window.addEventListener(`resize`, event => {
		if (window.matchMedia('(max-width: 768px)').matches) {
			navMenu.classList.add('hidden');
		} else {
			navMenu.classList.remove('hidden');
		}
	}, false);

	navClose.addEventListener('click', function () {
		if (navMenu.classList.contains('hidden')) {
			navMenu.classList.remove('hidden');
			navClose.classList.add('close');
		} else {
			navMenu.classList.add('hidden');
			navClose.classList.remove('close');
		}
	});
	/* navClose.addEventListener('click', function () {
		if (navMenu.style.display == 'none') {
			alert('None');
		} else {
			let chc = navMenu.style.display;
			alert(chc);
		}
	}); */



});