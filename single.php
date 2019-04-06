<?php
/**
 * The template for displaying all single posts
 *
 *
 * @package Daydream
 */
get_header();

$dd_similar_posts	 = daydream_theme_mod( 'dd_similar_posts', 'disable' );
?>

<!-- SINGLE BLOG -->
<section class="module p-tb-content">
	<div class="container">
		<div class="row">

			<!-- PRIMARY -->
			<div id="primary" class="<?php esc_attr(daydream_layout_class( $type = 1 )); ?> single-post">
				<?php
				while ( have_posts() ) :
					the_post();

					get_template_part( 'template-parts/content' );

					get_template_part( 'navigation', 'index' );

					if ( comments_open() || get_comments_number() ) :
						comments_template( '', true );
					endif;

				endwhile; // End of the loop.
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
<!-- END SINGLE BLOG -->

<?php
get_footer();

