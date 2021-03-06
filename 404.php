<?php
/**
 * The template for displaying 404 pages (not found)
 *
 *
 * @package Daydream
 */
get_header();
?>

<!-- PAGE -->
<section class="module p-tb-content">
	<div class="container">
		<div class="row">

			<!-- PRIMARY -->
			<div id="primary" class="page-404">

				<div class="col-sm-12">
					<div class="text-super-xl text-700 color-brand text-center"><?php esc_html_e( '404', 'daydream' ); ?></div>
				</div>

				<div class="col-sm-8 col-sm-offset-2 text-center">
					<h1 class="page-title"><?php esc_html_e( 'This Page Could Not Be Found!', 'daydream' ); ?></h1>

					<p class="lead"><?php esc_html_e( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', 'daydream' ); ?></p>

					<p><a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-lg btn-link btn-base"><?php esc_html_e( 'Back Home &raquo;', 'daydream' ); ?></a></p>
					<button id="modal-search" type="button" name="search" class="btn btn-base">Search</button>
					<?php get_search_form(); ?>
				</div>

			</div>
			<!-- END PRIMARY -->

		</div><!-- .row -->
	</div>
</section>
<!-- END PAGE -->

<?php
get_footer();

