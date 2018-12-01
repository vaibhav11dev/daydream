/* global fontAwesomeJSON */
wp.customize.controlConstructor['kirki-fontawesome'] = wp.customize.kirkiDynamicControl.extend({

    initKirkiControl: function () {

        var control = this,
            element = this.container.find('select'),
            icons = jQuery.parseJSON(fontAwesomeJSON),
            selectValue,
            selectWooOptions = {
                data: [],
                escapeMarkup: function (markup) {
                    return markup;
                },
                templateResult: function (val) {
                    // daydream customization
                    return '<i class="' + val.styles + ' fa-' + val.id + '" aria-hidden="true"></i>' + ' ' + val.text;
                },
                templateSelection: function (val) {
                    return '<i class="' + val.styles + ' fa-' + val.id + '" aria-hidden="true"></i>' + ' ' + val.text;
                }
            },
            select;

        _.each(icons.icons, function (icon) {
            selectWooOptions.data.push({
                // daydream customization
                id: icon.styles + ' fa-'+icon.id,
                text: icon.name,
                styles: icon.styles
            });
        });

        select = jQuery(element).selectWoo(selectWooOptions);

        select.on('change', function () {
            selectValue = jQuery(this).val();
            control.setting.set(selectValue);
        });
        select.val(control.setting._value).trigger('change');
    }
});
