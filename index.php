<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 *
 * @package Daydream
 */
get_header();
?>

<!-- BLOG-CLASSIC -->
<section class="module p-tb-content">
	<div class="container">
		<div class="row">

			<?php
			$thumbnail = '';
			if ( daydream_theme_mod( 'dd_blog_style' ) == 'thumbnail_on_side' ) {
				$thumbnail = ' post-thumbnail';
			}
			?>
			<!-- PRIMARY -->
			<div id="primary" class="<?php
			daydream_layout_class( $type = 1 );
			echo esc_html($thumbnail);
			?> post-content">
				<?php get_template_part( 'template-parts/content', 'index' ); ?>
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
