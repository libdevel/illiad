window.addEventListener("load", function() {
  var cc = initCookieConsent();

  cc.run({
    current_lang: 'en',
    gui_options: {
      consent_modal: {
          layout: 'bar',
          position: 'bottom center',
          transition: 'slide',
          swap_buttons: false
      }
    },
    languages: {
        'en': {
            consent_modal: {
                title: 'This website uses cookies to ensure you get the best experience on our website.',
                description: '',
                primary_btn: {
                    text: 'Got It',
                    role: 'accept_all'
                }
            },
            settings_modal: {
                title: 'Cookie preferences',
                save_settings_btn: 'Save settings',
                accept_all_btn: 'Accept all',
                reject_all_btn: 'Reject all',
                close_btn_label: 'Close',
                cookie_table_headers: [
                    {col1: 'Name'},
                    {col2: 'Domain'},
                    {col3: 'Expiration'},
                    {col4: 'Description'}
                ],
                blocks: []
            }
        }
    }
  });
  document.getElementById("cc--main").classList.add("theme_atlas");
});
