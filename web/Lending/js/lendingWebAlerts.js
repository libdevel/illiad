$(document).ready(function () {
    $.ajax({
        method: 'GET',
        url: 'illiadlending.dll/ajax?query=webAlerts',
        cache: false
    })
        .done(function (data) {
            if (data instanceof Object && data.alerts) {
                var webAlerts = $('#webAlerts');

                $.each(data.alerts, function (index, alert) {
                    if (webAlerts) {

                        buttonElement = $("<button></button>").addClass('btn btn-link btn-alert').attr('data-toggle', 'modal').attr('type', 'button').attr('data-target', '#webAlertContent' + alert.id).html('<span aria-hidden="true" class="fas fa-info-circle mr-1"></span>' + alert.alertTitle);
                        alertElement = $('<div></div>').addClass('modal fade').attr('id', 'webAlertContent' + alert.id).attr('tabindex', '-1').attr('role', 'dialog').attr('aria-labelledby', 'webAlertTitle' + alert.id)
                            .append($('<div></div>').addClass('modal-dialog modal-dialog-centered').attr('role', 'document')
                                .append($('<div></div>').addClass('modal-content')
                                    .append($('<div></div>').addClass('modal-header')
                                        .append($('<h5></h5>').addClass('modal-title').attr('id', 'webAlertTitle' + alert.id).html(alert.alertTitle))
                                        .append($('<button></button>').addClass('close').attr('data-dismiss', 'modal').attr('aria-label', 'Close').attr('type', 'button')
                                            .html($('<span aria-hidden="true">&times;</span>'))
                                        )
                                    )
                                    .append($('<div></div>').addClass('modal-body').html(alert.alertMessage))
                                    .append($('<div></div>').addClass('modal-footer').attr('id', 'alert-footer' + alert.id)
                                        .append($('<button></button>').addClass('btn btn-secondary').attr('data-dismiss', 'modal').attr('type', 'button').text('Close'))
                                    )
                                )
                            )

                        webAlerts.append(buttonElement);
                        webAlerts.append(alertElement);

                        if (alert.alertDeletable == 'true') {
                            $('#alert-footer' + alert.id).prepend($('<a></a>').addClass('btn btn-primary').attr('role','button').attr('href', alert.deleteUrl).text('Delete alert'));
                        }
                    }

                })
            }
        })
});


