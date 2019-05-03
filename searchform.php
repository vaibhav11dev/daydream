<?php
/**
 * Template for displaying search forms in Twenty Seventeen
 *
 * @package Daydream
 */
global $is_sidebar;
if ( isset( $is_sidebar) &&  $is_sidebar ) {
    $search_form = 'sidebar-search-form';
} else {
    $search_form = 'header-search-form';
}
?>

<!-- SEARCHFORM -->
<form action="<?php echo esc_url( home_url( '/' ) ); ?>" method="get" class="<?php echo esc_attr($search_form); ?>">
    <?php
    if ( isset( $is_sidebar) &&  $is_sidebar ) {
       
        ?>
    <div class="row">

	<div class="col-md-8 form-group widget-search">
	    <input id="search-text" type="text" name="s" class="form-control input-lg input-search" placeholder="<?php _e( 'Type Your Search', 'daydream' ); ?>" value="">
	</div>

	<div class="col-md-4 form-group widget-search">
	    <button id="search-button" type="submit" class="btn btn-round btn-block btn-base btn-search"><?php _e( 'Submit', 'daydream' ); ?></button>
	</div>

    </div>
       
    <?php
    } else {
    ?>
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
     
    <?php
    }
    ?>
</form>
<!-- END SEARCHFORM -->