<?php
/**
 * Template for displaying search forms in Twenty Seventeen
 *
 * @package Daydream
 */
?>

<!-- SEARCHFORM -->
<form action="<?php echo esc_url( home_url( '/' ) ); ?>" method="get" class="header-search-form">
    <div class="search-form-inner">
	<div class="container">
	    <div class="row">
		<div class="col-sm-12">
		    <div class="header-search-form-clouse">
			<a href="#" class="form-close-btn">&#10005;</a>
		    </div>
		</div>
		<div class="col-sm-12">
		    <input type="text" name="s" placeholder="<?php esc_attr_e( 'Type &amp; hit enter', 'daydream' ); ?>">
		</div>
	    </div>
	</div>
    </div>
</form>
<!-- END SEARCHFORM -->