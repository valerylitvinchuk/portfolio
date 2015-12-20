var myModule = (function () {

	var init = function () {
		_setUpListners();
	};

	var _setUpListners = function () {
		// прослушка событий
		$('#contact-me').on('submit', _submitForm);
	};

	var _submitForm = function (ev) {
		ev.preventDefault();

		var form = $(this),
			url = 'contactme.php',
			defObj = _ajaxForm(form, url);
	};

	var _ajaxForm = function (form, url) {
		if (!validation.validateForm(form)) return false;
	};

	return {
		init: init
	};

})();

myModule.init();