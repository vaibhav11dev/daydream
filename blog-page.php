<?php
/*
 *
 * Template Name: Blog
 *
 */

get_header();
?>

<!-- BLOG-CLASSIC -->
<section class="module p-tb-content">
	<div class="container">
		<div class="row">

			<!-- PRIMARY -->
			<div id="primary" class="<?php esc_attr(daydream_layout_class( $type = 1 ));
?> post-content">
				<?php
				get_template_part( 'template-parts/content', 'blog' );

				/* Restore original Post Data */
				wp_reset_postdata();
				?>
			</div>
			<!-- END PRIMARY -->

			<!-- SECONDARY-1 -->
			<?php
			if ( daydream_lets_get_sidebar() == true ) {
				get_sidebar();
			}
			?>
			<!-- END SECONDARY-1 -->

		</div><!-- .row -->
	</div>
</section>
<!-- END BLOG-CLASSIC -->

<?php
get_footer();
