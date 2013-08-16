/**
 * [placeholder.js]
 * Let working "placeholder" in Internet Explorer 9 lte
 *
 * @author prevdev@gmail.com
 *
 * source code in https://github.com/Prev/placeholderjs
 * built in 2013.8.16
 *
 * MIT LICENSE
 */

var PLACE_HOLDER_COLOR = "#aaa";

function initPlaceholder() {
	var inputs = document.getElementsByTagName('input');
	var placeholder;

	for (var i=0; i<inputs.length; i++) {
		if (inputs[i].placeholder) continue;

		if (inputs[i].getAttribute('placeholder'))
			placeholder = inputs[i].getAttribute('placeholder');
		else {
			var matches = inputs[i].outerHTML.match(/placeholder=("([^"]*)"|[^\s>]*)/);
			if (matches && matches[2])
				placeholder = matches[2];
			else if (matches && matches[1])
				placeholder = matches[1];

			if (placeholder)
				inputs[i].setAttribute('placeholder', placeholder);
		}

		if (!placeholder) continue;

		inputs[i].setAttribute('originalColor', inputs[i].style.color);

		if (!inputs[i].value) {
			inputs[i].value = placeholder;
			inputs[i].style.color = PLACE_HOLDER_COLOR;
			inputs[i].setAttribute('isPlaceholdered', true);
		}

		if (inputs[i].addEventListener) {
			inputs[i].addEventListener("focus", _placeholderFocusHandler);
			inputs[i].addEventListener("blur", _placeholderBlurHandler);
			inputs[i]

		}else if (inputs[i].attachEvent) {
			inputs[i].attachEvent("onfocus", _placeholderFocusHandler);
			inputs[i].attachEvent("onblur", _placeholderBlurHandler);

		}else {
			inputs[i].onfocus = _placeholderFocusHandler;
			inputs[i].onblur = _placeholderBlurHandler;
		}

		placeholder = null;
	};
}

function _placeholderFocusHandler(e) {
	var target = e.srcElement || this;
	if (target.getAttribute('isPlaceholdered')) {
		target.value = "";
		target.style.color = target.getAttribute('originalColor');
		target.setAttribute('isPlaceholdered', false);
	}
}

function _placeholderBlurHandler(e) {
	var target = e.srcElement || this;
	if (target.value == "") {
		target.value = target.getAttribute('placeholder');
		target.style.color = PLACE_HOLDER_COLOR;
		target.setAttribute('isPlaceholdered', true);
	}
}

if (window.addEventListener)
	window.addEventListener('load', initPlaceholder);
else if (window.attachEvent)
	window.attachEvent('onload', initPlaceholder);