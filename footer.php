<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the .wrapper div and all content after.
 *
 *
 * @package daydream
 */
$dd_footer_widget_col	 = daydream_theme_mod( 'dd_footer_widget_col', 'disable' );
$daydream_footer_css	 = '';
if ( ($dd_footer_widget_col != "disable" ) ) {
	if ( $dd_footer_widget_col == "one" ) {
		$daydream_footer_css = 'col-sm-12';
	}
	if ( $dd_footer_widget_col == "two" ) {
		$daydream_footer_css = 'col-sm-6';
	}
	if ( $dd_footer_widget_col == "three" ) {
		$daydream_footer_css = 'col-sm-4';
	}
	if ( $dd_footer_widget_col == "four" ) {
		$daydream_footer_css = 'col-sm-3';
	}
}
?>
<!-- FOOTER -->
<footer id="footer" class="footer">
	<div class="container">

		<div class="row">
			<?php if ( $daydream_footer_css !== '' ): ?>
				<div class="<?php echo esc_attr($daydream_footer_css); ?>">
					<?php
					if ( !dynamic_sidebar( 'footer-1' ) ) :
					endif;
					?>
				</div>

				<div class="<?php echo esc_attr($daydream_footer_css); ?>">
					<?php
					if ( !dynamic_sidebar( 'footer-2' ) ) :
					endif;
					?>
				</div>

				<div class="<?php echo esc_attr($daydream_footer_css); ?>">
					<?php
					if ( !dynamic_sidebar( 'footer-3' ) ) :
					endif;
					?>
				</div>

				<div class="<?php echo esc_attr($daydream_footer_css); ?>">
					<?php
					if ( !dynamic_sidebar( 'footer-4' ) ) :
					endif;
					?>
				</div>
			<?php endif; ?>
		</div><!-- .row -->


		<div class="copyright">

			<div class="row">

				<div class="col-sm-8">
					<?php
					do_action( 'daydream_footer_area' );
					?>
				</div>

				<?php
				$dd_back_to_top = daydream_theme_mod( 'dd_back_to_top', 1 );
				if ( $dd_back_to_top == 1 ) {
					?>
					<div class="col-sm-4">
						<div class="text-right">
							<a href="#top" class="scroll-top"><i class="fa fa-level-up"></i></a>
						</div>
					</div>
					<?php
				}
				?>

			</div><!-- .row -->

		</div>

	</div>

</footer>
<!-- END FOOTER -->

</div>
<!-- END WRAPPER -->

<!-- SHOP CART -->
<?php
$dd_woocommerce_cart_link_main_nav = daydream_theme_mod( 'dd_woocommerce_cart_link_main_nav', '1' );
if ( class_exists( 'Woocommerce' ) && $dd_woocommerce_cart_link_main_nav ) {
	global $woocommerce;

	//Empty Cart
	if ( !$woocommerce->cart->cart_contents_count ) {
		?>
		<div class="off-canvas-cart ajax-cart-content">
			<div class="off-canvas-cart-wrapper">

				<div class="off-canvas-cart-header">
					<a id="cart-toggle" href="#">
						<i class="icon-arrow-right-circle icons"></i>
					</a>
				</div>

				<div class="off-canvas-cart-content">
					<div class="off-canvas-cart-content-wrap">

						<?php _e( 'Your cart is currently empty.', 'daydream' ); ?>

					</div>
				</div>

			</div>
		</div>
		<?php
	} else {
		?>
		<div class="off-canvas-cart ajax-cart-content">

			<div class="off-canvas-cart-wrapper">

				<div class="off-canvas-cart-header">
					<a id="cart-toggle" href="#">
						<i class="icon-arrow-right-circle icons"></i>
					</a>
				</div>

				<div class="off-canvas-cart-content">
					<div class="off-canvas-cart-content-wrap">

						<?php
						foreach ( $woocommerce->cart->cart_contents as $cart_item ):
							$cart_item_key	 = $cart_item[ 'key' ];
							$_product		 = apply_filters( 'woocommerce_cart_item_product', $cart_item[ 'data' ], $cart_item, $cart_item_key );
							?>
							<!-- ITEM -->
							<div class="off-canvas-cart-item">
								<div class="off-canvas-cart-item-trash">
									<?php
									echo apply_filters( 'woocommerce_cart_item_remove_link', sprintf( '<a href="%s" class="remove" title="%s"><i class="icon-trash icons"></i></a>', esc_url( wc_get_cart_remove_url( $cart_item_key ) ), __( 'Remove this item', 'daydream' ) ), $cart_item_key );
									?>
								</div>
								<div class="off-canvas-cart-item-thumbnail">
									<a href="<?php echo esc_url( get_permalink( $cart_item[ 'product_id' ] ) ); ?>"> <?php
										$thumbnail		 = apply_filters( 'woocommerce_cart_item_thumbnail', $_product->get_image(), $cart_item, $cart_item_key );
										echo $thumbnail;
										?></a>
								</div>
								<div class="off-canvas-cart-item-title">
									<h5 class="m-b-5"><a href="#"><?php echo esc_html($cart_item[ 'data' ]->get_name()); ?></a></h5>
									<?php echo $cart_item[ 'quantity' ]; ?> x <?php echo get_woocommerce_currency_symbol() . $cart_item[ 'data' ]->get_price(); ?>
								</div>
							</div>
							<!-- END ITEM -->
						<?php endforeach; ?>

					</div>
				</div>

				<div class="off-canvas-cart-footer">
					<div class="off-canvas-cart-info">
						<div class="row">
							<div class="col-xs-6">
								<h4 class="m-0"><?php _e( 'Total:', 'daydream' ); ?></h4>
							</div>
							<div class="col-xs-6">
								<h4 class="m-0 text-right"><?php echo wc_price( $woocommerce->cart->cart_contents_total ); ?></h4>
							</div>
						</div>
					</div>

					<div class="off-canvas-cart-control">
						<a href="<?php echo esc_url( get_permalink( get_option( 'woocommersc_uce_checkout_page_id' ) ) ); ?>" class="btn btn-lg btn-block btn-outline btn-fade btn-round btn-dark"><?php _e( 'Checkout', 'daydream' ); ?></a>
						<a href="<?php echo esc_url( get_permalink( get_option( 'woocommerce_cart_page_id' ) ) ); ?>" class="btn btn-lg btn-block btn-round btn-base"><?php _e( 'Edit Cart', 'daydream' ); ?></a>
					</div>
				</div>

			</div>
		</div>
		<?php
	}
}
?>
<!-- END SHOP CART -->

<?php
wp_footer();
?>

</body>
</html>
