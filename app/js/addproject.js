var myModule = (function () {

	var init = function () {
		_setUpListners();
	};

	// Получаем название файла из пути
	var _getNameFromPath = function (path) {
		return path.replace(/\\/g, '/').replace(/.*\//, '');
	};

	var _setUpListners = function () {
		// прослушка событий
		$('.add-project-button').on('click', _showModal); // открыть модальное окно
		$('.modal-form').on('submit', _addProject); // добавление проекта
		$('#fileupload').on('change', _changefileUpload);
	};

	// Изменили файл аплоад (добавили файл в файлаплоад)
	var _changefileUpload = function (){
		var input = $(this), // инпут type="file"
			name = _getNameFromPath(input.val()); // имя загруженного файла

		$('#filename')
			.val(name) // 
			.trigger('hideTooltip')
			.removeClass('has-error'); 
	};

	var _showModal = function (ev) {
		ev.preventDefault();

		var divPopup = $('.pop-up'),
				form = divPopup.find('.modal-form');
		divPopup.bPopup({
	    	speed: 650,
      		transition: 'slideDown',
      		modalColor: '#727070',
      		onClose: function () {
      			form.find('.server-mes').text('').hide(),
      			form.trigger('reset');
      		}
    	});
	};

	var _addProject = function (ev) {
		console.log('Добавление проекта');
		ev.preventDefault();

		// объявляем переменные
		var form = $(this),
				url = 'add_project.php',
				defObj = _ajaxForm(form, url);

		if (defObj) {

			defObj.done(function(ans) {

			var successBox = form.find('.success-mes'),
					errorBox = form.find('.error-mes');

			if (ans.status === 'OK') {
				errorBox.hide();
				successBox.text(ans.text).show();
			} else {
				successBox.hide();
				errorBox.text(ans.text).show();
			};
			})

		};

		
	};

	var _ajaxForm = function (form, url) {

		if (!validation.validateForm(form)) return false;

		var data = form.serialize();

		var result = $.ajax({
				url: url,
				type: 'POST',
				dataType: 'json',
				data: data,
			}).fail( function(ans) {
				console.log('Проблемы в PHP');
				form.find('.error-mes').text('На сервере произошла ошибка').show();
			});

		return result;
	};

	return {
		init: init
	};

})();

myModule.init();