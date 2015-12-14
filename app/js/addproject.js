var myModule = (function () {

	var init = function () {
		_setUpListners();
	}

	var _setUpListners = function () {
		// прослушка событий
		$('.add-project-button').on('click', _showModal); // открыть модальное окно
		$('.modal-form').on('submit', _addProject); // добавление проекта
	};

	var _showModal = function (ev) {
		ev.preventDefault();
		$('.pop-up').bPopup({
	    speed: 650,
      transition: 'slideDown',
      modalColor: '#727070'
    });
	};

	var _addProject = function (ev) {
		console.log('Добавление проекта');
		ev.preventDefault();

		// объявляем переменные
		var form = $(this),
				url = 'add_project.php',
				data = form.serialize();

		console.log(data);

		// запрос на сервер
		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: data,
		})
		.done(function(ans) {
			console.log("success");
			if (ans.mes === 'OK') {
				form.find('.success-mes').text(ans.text);
			} else {
				form.find('.error-mes').text(ans.text);
			};
		})
		.fail(function() {
			console.log("error");
		});
		

	};

	return {
		init: init
	};

})();

myModule.init();