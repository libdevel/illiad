$(document).ready(function () {

	// Search for anchor link buttons that are disabled by css. For those links, remove the href and apply relevant role and aria attributes
	// This prevents keyboard access and also provides information to screen readers about the disabled state of the link
	var disabledLinks = document.querySelectorAll("a.btn.disabled");
	disabledLinks.forEach(link => {
		link.removeAttribute("href");
		link.setAttribute("role", "link");
		link.setAttribute("aria-disabled", "true");
	});

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
	$('.statusNormal').addClass('alert alert-secondary d-block').attr('role','alert');
	$('.statusError').addClass('alert alert-danger d-block').attr('role','alert');
	$('.statusInformation').addClass('alert alert-info d-block').attr('role','alert');
	
	
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

	//Set the selected options based on a persisted value attribute on the select element
	//e.g. <SELECT name="dropdown" data-persisted-value="<#PARAM name='ItemInfo1'>"
	//e.g. <input checked name="SearchType" type="radio" id="SearchTypeActive" value="Active" data-persisted-value="<#PARAM name='SearchType'>"></input>
	$("select[data-persisted-value]").each(function(idx, el) { SelectPersistedValue(el) });
	$("input[type=radio][data-persisted-value],input[type=checkbox][data-persisted-value]").each(function(idx, el) { SelectPersistedValue(el) });
	//Legacy support if using "data-persistedValue"
	$("select[data-persistedValue]").each(function(idx, el) { SelectPersistedValue(el, $(el).attr('data-persistedValue')) });

});



function SelectPersistedValue(el, persistedValue) {
	var formType = $(el).prop("type").toLowerCase();

	if (persistedValue === null || persistedValue === undefined || persistedValue === "") {
		persistedValue = $(el).attr("data-persisted-value");
	}
	
	//If a persisted value is set and is a SELECT element
	if ((persistedValue) &&
		((formType == "select-one") || (formType == "select-multiple"))) {
		$(el).get(0).querySelectorAll("option[value='" + persistedValue.replace("'","\\'") + "']").forEach(option => {
			option.selected = true;});
		$(el).find("option[value='" + persistedValue.replace("'","\\'") + "']").attr("selected", true);		
	}
	else if ((formType == "radio") || (formType == "checkbox")) {
		var isChecked = el.value == persistedValue;
			
		//Only set checked if true or if not a radio button since radio buttons will already have a default value
		if (isChecked || (formType == "checkbox")) {
			$(el).prop("checked", isChecked);
		}
	}
}

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