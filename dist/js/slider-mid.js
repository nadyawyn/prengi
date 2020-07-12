window.addEventListener('DOMContentLoaded', function () {

	'use strict';
	var multiItemSliderMid = (function () {
		return function (selector, config) {
			var
				_mainElement = document.querySelector(selector), // основный элемент блока
				_sliderWrapper = _mainElement.querySelector('.slider-mid__wrapper'), // обертка для .slider-item
				_sliderItems = _mainElement.querySelectorAll('.slider-mid__item'), // элементы (.slider-item)
				_sliderControls = _mainElement.querySelectorAll('.slider-mid__control'), // элементы управления
				_sliderControlLeft = _mainElement.querySelector('.slider-mid__control_left'), // кнопка "LEFT"
				_sliderControlRight = _mainElement.querySelector('.slider-mid__control_right'), // кнопка "RIGHT"
				_sliderTabsList = document.querySelector('.solutions__tabs'),
				_sliderTabs = document.querySelectorAll('.solutions__tabs-item'),

				_wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
				_itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента
				_positionLeftItem = 0, // позиция левого активного элемента
				_transform = 0, // значение транфсофрмации .slider_wrapper
				_step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
				_items = [], // массив элементов
				_indexIndicator = 0,
				_maxIndexIndicator = _sliderItems.length - 1,
				_indicatorItems;

			// наполнение массива _items
			_sliderItems.forEach(function (item, index) {
				_items.push({
					item: item,
					position: index,
					transform: 0
				});
			});

			var position = {
				getItemMin: function () {
					var indexItem = 0;
					_items.forEach(function (item, index) {
						if (item.position < _items[indexItem].position) {
							indexItem = index;
						}
					});
					return indexItem;
				},
				getItemMax: function () {
					var indexItem = 0;
					_items.forEach(function (item, index) {
						if (item.position > _items[indexItem].position) {
							indexItem = index;
						}
					});
					return indexItem;
				},
				getMin: function () {
					return _items[position.getItemMin()].position;
				},
				getMax: function () {
					return _items[position.getItemMax()].position;
				}
			};

			var _transformItem = function (direction) {
				var nextItem, currentIndicator = _indexIndicator;
				if (direction === 'right') {
					_positionLeftItem++;
					if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
						nextItem = position.getItemMin();
						_items[nextItem].position = position.getMax() + 1;
						_items[nextItem].transform += _items.length * 100;
						_items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
					}
					_transform -= _step;
					_indexIndicator = _indexIndicator + 1;
					if (_indexIndicator > _maxIndexIndicator) {
						_indexIndicator = 0;
					}
				}
				if (direction === 'left') {
					_positionLeftItem--;
					if (_positionLeftItem < position.getMin()) {
						nextItem = position.getItemMax();
						_items[nextItem].position = position.getMin() - 1;
						_items[nextItem].transform -= _items.length * 100;
						_items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
					}
					_transform += _step;
					_indexIndicator = _indexIndicator - 1;
					if (_indexIndicator < 0) {
						_indexIndicator = _maxIndexIndicator;
					}
				}
				_sliderWrapper.style.transform = 'translateX(' + _transform + '%)';

				_sliderTabs[currentIndicator].classList.remove('active');
				_sliderTabs[_indexIndicator].classList.add('active');

			};

			var _slideTo = function (to) {
				var i = 0,
					direction = (to > _indexIndicator) ? 'right' : 'left';
				while (to !== _indexIndicator && i <= _maxIndexIndicator) {
					_transformItem(direction);
					i++;
				}
			};

			// обработчик события click для кнопок "назад" и "вперед"
			var _controlClick = function (e) {
				if (e.target.classList.contains('slider-mid__control')) {
					e.preventDefault();
					var direction = e.target.classList.contains('slider-mid__control_right') ? 'right' : 'left';
					_transformItem(direction);
				}

			};

			var _goToTab = function (e) {

				if (e.target.getAttribute('data-slide-to')) {
					e.preventDefault();
					_slideTo(parseInt(e.target.getAttribute('data-slide-to')));
				}
			};

			var _setUpListeners = function () {
				_mainElement.addEventListener('click', _controlClick);
				_sliderTabsList.addEventListener('click', _goToTab);
			};

			var _addIndicators = function () {
				for (var i = 0; i < _sliderItems.length; i++) {
					if (i === 0) {
						_sliderTabs[i].classList.add('active');
					}
					_sliderTabs[i].setAttribute("data-slide-to", i);

				}

			};

			// добавляем индикаторы
			_addIndicators();

			// инициализация
			_setUpListeners();


			return {
				right: function () { // метод right
					_transformItem('right');
				},
				left: function () { // метод left
					_transformItem('left');
				}
			};

		};
	}());

	var sliderMid = multiItemSliderMid('.slider-mid');

});