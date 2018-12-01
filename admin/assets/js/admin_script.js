jQuery(document).ready(function () {
	/* Js - For Hero Header Type Page Metadata Options */
	var theme_prefix = 'daydream_';
	var type = jQuery('#' + theme_prefix + 'hero_header_type').val();
	var container = jQuery('#' + theme_prefix + 'hero_header_type').parents('#' + theme_prefix + 'daydream_page_options');

	jQuery(container).find('.parallax_settings, .herocontent_settings').hide();

	if (type == 'hero_parallax') {
		jQuery(container).find('.parallax_settings, .herocontent_settings').show();
	}

	jQuery('#' + theme_prefix + 'hero_header_type').change(function () {
		var type = jQuery(this).val();
		var container = jQuery(this).parents('#' + theme_prefix + 'daydream_page_options');
		jQuery(container).find('.parallax_settings, .herocontent_settings').hide();

		if (type == 'hero_parallax') {
			jQuery(container).find('.parallax_settings, .herocontent_settings').show();
		}

	});
});