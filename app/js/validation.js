var validation = (function () {

	// инициализация модуля
	var init = function () {
		_setUpListners();
	};

	var _setUpListners = function () {
		// прослушка событий
		$('form').on('keydown', '.has-error', _removeError);
		$('form').on('reset', _clearForm);

	};

	var _removeError = function () {
		$(this).removeClass('has-error');
	};

	var _clearForm = function (form) {
		var form = $(this);
		form.find('input, textarea').trigger('hideTooltip');
		form.find('.has-error').removeClass('has-error');
		$('.qtip').hide();
	};

	
	// создание тултипа
	var _createQtip = function (element, position) {
		
		// позиция тултипа
		if (position === 'right') {
			position = {
				my: 'left center',
				at: 'right center',
				container: $('.pop-up')
			}
		} else {
			position = {
				my: 'right center',
				at: 'left center',
				container: $('.pop-up'),
				adjust: {
					method: 'shift none'
				}
			}
		}
		// инициализация тултипа
		element.qtip({
			content: {
				text: function () {
					return $(this).attr('qtip-content');
				}
			},
			show: {
				event: 'show'
			},
			hide: {
				event: 'keydown hideTooltip'
			},
			position: position,
			style: {
				classes: 'qtip-mystyle',
				tip: {
					height: 6,
					width: 8
				}
			}
		}).trigger('show');

	};

	// Универсальная функция валидации
	var validateForm = function (form) {

		var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"], input[type="submit"]'),
				valid = true;

		$.each(elements, function(index, val){
			var element = $(val),
					val = element.val();
					pos = element.attr('qtip-position');

					console.log(val.length);

			if (val.length === 0) {
				element.addClass('has-error');
				_createQtip (element, pos);
				valid = false;

			}
			
		});

		return valid;

	};

	// возвращает объект
	return {
		init: init,
		validateForm: validateForm
	};

})();

validation.init();