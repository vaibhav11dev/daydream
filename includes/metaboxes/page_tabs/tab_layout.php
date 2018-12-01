<div class='dd_metabox'>
	<?php
	$this->daydream_image_radio_button(
	'sidebar_position', __( 'Sidebar Position', 'daydream' ), array(
		'default'	 => DAYDREAM_IMAGEPATH . 'none.jpg',
		'1c'		 => DAYDREAM_IMAGEPATH . '1c.png',
		'2cl'		 => DAYDREAM_IMAGEPATH . '2cl.png',
		'2cr'		 => DAYDREAM_IMAGEPATH . '2cr.png',
	), '', 'default'
	);

	$this->daydream_text( 'content_top_bottom_padding', __( 'Content Top & Bottom Padding', 'daydream' ), __( 'Enter the page content top & bottom padding. In pixels ex: 20px. Leave empty for default value.', 'daydream' )
	);
	?>
</div>