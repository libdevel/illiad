$(document).ready(function () {
	//Attach click event handlers to each element that controls collapsing another element and add the appropriate collapse control class
	$(document).find("[data-toggle='collapse']").each(function() {
		var _this = $(this);

		//If any of this element's targets have the collapse class, then we should use the expand-control class. Otherwise, use the collapse-control class
		if ($(_this.data("target")).filter(".collapse").length > 0) {
			_this.addClass("collapse-control-expand");
		} else {
			_this.addClass("collapse-control-collapse");
		}
		
		_this.click(function() {
			$(_this.data("target")).toggle();
			_this.toggleClass("collapse-control-expand collapse-control-collapse");
		})
	});
	$('[data-toggle="popover"]').popover();
	$('.statusNormal').addClass('alert alert-secondary d-block').attr('role','alert');
	$('.statusError').addClass('alert alert-danger d-block').attr('role','alert');
	$('.statusInformation').addClass('alert alert-info d-block').attr('role','alert');

	$('.validationError').addClass('text-danger');
	
	
	//Convert sertver times to the user's local time
	$('.convert-local').each(function(index, element) {
		ConvertTime(element);
	});

	$('*[data-iso8601]').each(function(index, element) {
		ConvertTime(element);
	});
	
	//Hide field-values if there is no value inside (when the field does not also have a class of showEmptyValue)
	$('.field-value:empty').closest('.field:not(.showEmptyValue)').hide();

	$('button.checkAll').click(function (event) {
		event.preventDefault();
		//event.stopPropagation();
		$('#' + $(this).attr('data-form') + ' input:checkbox').prop('checked', true);
	});
	$('button.checkNone').click(function (event) {
		event.preventDefault();
		//event.stopPropagation();
		$('#' + $(this).attr('data-form') + ' input:checkbox').prop('checked', false);
	});
});



function ToggleCheckBoxes(formName, check) {
	form = document.forms[formName];
	
	if(!form)
		return;
	
	for (var i=0;i<form.elements.length;i++) {
		var e = form.elements[i];
		if ((e.type=='checkbox') && (!e.disabled)) {
			//e.checked = form.checkboxToggle.checked;
			e.checked = check;
		}
	}
}

function InitializeSiteDefault(siteDefault) {
    if (siteDefault) {
        $(document).ready(function () {
            $("select[name='Site']").find("option[value != '" + siteDefault + "']").remove().val(siteDefault);
        });
    }
}

function ConvertTime(element) {
	
	$time = $(element).attr('data-iso8601');
	if ($time != '') {
		var utcTime = moment.utc($time);
		var localTime = moment(utcTime).local();
		var formatString = 'LLL';
		if (localTime.hour() == 0 && localTime.minute() == 0 && localTime.second() == 0) {
			formatString = 'LL';
		}			
		$(element).html(localTime.format(formatString));
		
	}	
}
