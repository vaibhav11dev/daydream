<?php
/*
  Display Sidebar 1
  ======================================= */

if ( !is_active_sidebar( 'sidebar-1' ) ) {
	return;
}

$daydream_sidebar_css = '';
if ( class_exists( 'Woocommerce' ) ) {
	if ( is_product() || is_cart() || is_checkout() || is_account_page() || (get_option( 'woocommerce_thanks_page_id' ) && is_page( get_option( 'woocommerce_thanks_page_id' ) )) ) {
		$daydream_sidebar_css = 'display:none';
	}
}
?>

<div id="secondary" class="aside sidebar <?php esc_attr( daydream_sidebar_class() ); ?>"
     <?php
     if ( class_exists( 'Woocommerce' ) ):
	     echo 'style="' . esc_html( $daydream_sidebar_css ) . '"';
     endif;
     ?>>

	<?php dynamic_sidebar( 'sidebar-1' ); ?>

</div>

