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



});