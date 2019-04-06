<div class="dd_metabox">
	<?php
	$this->daydream_select( 'header_type', __( 'Choose Header Type', 'daydream' ), array(
		'default'	 => __( 'Default', 'daydream' ),
		'h1'		 => __( 'Header1', 'daydream' ),
		'h2'		 => __( 'Header2', 'daydream' ),
	), ''
	);

	$this->daydream_select( 'hero_header_type', __( 'Choose Hero Header Type', 'daydream' ), array(
		'none'			 => __( 'None', 'daydream' ),
		'hero_parallax'	 => __( 'Parallax Hero Header', 'daydream' ),
	), ''
	);

	$this->daydream_select( 'hero_height', __( 'Hero Header Height', 'daydream' ), array(
		'medium' => __( 'Medium', 'daydream' ),
		'small'	 => __( 'Small', 'daydream' ),
		'large'	 => __( 'Large', 'daydream' ),
	), ''
	);
	?>

    <div class="parallax_settings" style="display: none;">
		<?php
		$this->daydream_upload( 'hero_image_parallax', __( 'Parallax Background', 'daydream' ), 'Uploade image for parallax header' );
		?>
    </div>
    <div class="herocontent_settings" style="display: none;">
		<?php
		$this->daydream_select( 'hero_content_alignment', 'Content Alignment', array( 'center' => 'Center', 'left' => 'Left', 'right' => 'Right' ), 'Select how the heading, caption will be aligned.'
		);

		$this->daydream_text( 'hero_heading', 'Heading', 'Enter the heading for your Hero Header. It not apply in slider type.'
		);

		$this->daydream_text( 'hero_caption', 'Caption', 'Enter the caption for your Hero Header. It not apply in slider type.'
		);
		?>
    </div>
</div>
