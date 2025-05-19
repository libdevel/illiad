$(document).ready(function () {
    $.ajax({
        method: 'GET',
        url: 'illiad.dll/ajax?query=webAlerts',
        cache: false
    })
        .done(function (data) {
            if (data instanceof Object && data.alerts) {
                var webAlerts = $('#webAlerts');

                $.each(data.alerts, function (index, alert) {
                    if (webAlerts) {

                        buttonElement = $("<button></button>").addClass('btn btn-link btn-alert').attr('data-toggle', 'modal').attr('type', 'button').attr('data-target', '#webAlertContent' + alert.id).html('<span aria-hidden="true" class="fas fa-info-circle"></span> &nbsp;' + alert.alertTitle);
                        alertElement = $('<div></div>').addClass('modal fade').attr('id', 'webAlertContent' + alert.id).attr('tabindex', '-1').attr('role', 'dialog').attr('aria-labelledby', 'webAlertContent')
                            .append($('<div></div>').addClass('modal-dialog modal-dialog-centered').attr('role', 'document')
                                .append($('<div></div>').addClass('modal-content')
                                    .append($('<div></div>').addClass('modal-header')
                                        .append($('<h5></h5>').addClass('modal-title').attr('id', 'webAlertTitle' + alert.id).html(alert.alertTitle))
                                        .append($('<button></button>').addClass('close').attr('data-dismiss', 'modal').attr('aria-label', 'Close')
                                            .html($('<span aria-hidden="true">&times;</span>'))
                                        )
                                    )
                                    .append($('<div></div>').addClass('modal-body').html(alert.alertMessage))
                                    .append($('<div></div>').addClass('modal-footer').attr('id', 'alert-footer' + alert.id)
                                        .append($('<button></button>').addClass('btn btn-secondary').attr('data-dismiss', 'modal').text('Close'))
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


