<?php
/**
 * Template part for displaying posts
 *
 *
 * @package Daydream
 */
if ( have_posts() ) :
	if ( daydream_theme_mod( 'dd_blog_style' ) == 'grid' ) {
		?>
		<div class="row multi-columns-row post-columns">
			<?php
		}
		while ( have_posts() ) : the_post();

			$dd_post_layout		 = daydream_theme_mod( 'dd_post_layout' );
			$post_layout_class	 = (12 / $dd_post_layout);

			if ( daydream_theme_mod( 'dd_blog_style' ) == 'grid' ) {
				?>
				<div class="col-sm-<?php echo esc_attr($post_layout_class); ?> col-md-<?php echo esc_attr($post_layout_class); ?> col-lg-<?php echo esc_attr($post_layout_class); ?>">
					<?php
				}
				?>
				<!--  BLOG CONTENT  -->
				<article id="post-<?php esc_attr(the_ID()); ?>" class="<?php esc_attr(semantic_entries()); ?> post format-<?php echo esc_attr(daydream_post_format()); ?>">

					<?php
					if ( daydream_theme_mod( 'dd_blog_style' ) == 'thumbnail_on_side' ) {
						?>
						<div class="row">
							<div class="col-sm-5">
								<?php
							}
							daydream_post_thumbnail();
							if ( daydream_theme_mod( 'dd_blog_style' ) == 'thumbnail_on_side' ) {
								?>
							</div>
							<div class="col-sm-7">
								<?php
							}
							?>

							<div class="post-content">

								<div class="entry-meta entry-header">
									<?php
									daydream_post_heading();

									if ( daydream_theme_mod( 'dd_header_meta' ) == 1 ) {
										?>
										<ul class="post-meta">
											<?php daydream_post_metadata(); ?> 
										</ul>
										<?php
									}
									?>
								</div>

								<div class="entry-content">
									<?php the_excerpt(); ?>
								</div>

								<div class="entry-meta entry-footer">
									<?php daydream_post_readmore(); ?>
								</div>

							</div>
							<?php
							if ( daydream_theme_mod( 'dd_blog_style' ) == 'thumbnail_on_side' ) {
								?>
							</div>
						</div>
						<?php
					}
					?>
				</article>
				<!-- END BLOG CONTENT -->
				<?php
				if ( daydream_theme_mod( 'dd_blog_style' ) == 'grid' ) {
					?>
				</div>			
				<?php
			}
		endwhile;
		if ( daydream_theme_mod( 'dd_blog_style' ) == 'grid' ) {
			?>
		</div>
		<?php
	}

	get_template_part( 'navigation', 'index' );

	/* Restore original Post Data */
	wp_reset_postdata();
else :

	get_template_part( 'template-parts/content', 'none' );

endif;
?>