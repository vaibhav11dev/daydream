<?php
/**
 * Custom template tags for this theme
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package Daydream
 */
if ( !function_exists( 'daydream_posted_on' ) ) :

	/**
	 * Prints HTML with meta information for the current post-date/time.
	 */
	function daydream_posted_on() {
		$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
		if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
			$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
		}

		$time_string = sprintf( $time_string, esc_attr( get_the_date( DATE_W3C ) ), esc_html( get_the_date() ), esc_attr( get_the_modified_date( DATE_W3C ) ), esc_html( get_the_modified_date() )
		);

		$posted_on = sprintf(
		/* translators: %s: post date. */
		esc_html_x( 'Posted on %s', 'post date', 'daydream' ), '<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . $time_string . '</a>'
		);

		echo '<span class="posted-on">' . $posted_on . '</span>'; // WPCS: XSS OK.
	}

endif;

if ( !function_exists( 'daydream_posted_by' ) ) :

	/**
	 * Prints HTML with meta information for the current author.
	 */
	function daydream_posted_by() {
		$byline = sprintf(
		/* translators: %s: post author. */
		esc_html_x( 'by %s', 'post author', 'daydream' ), '<span class="author vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>'
		);

		echo '<span class="byline"> ' . $byline . '</span>'; // WPCS: XSS OK.
	}

endif;

if ( !function_exists( 'daydream_entry_footer' ) ) :

	/**
	 * Prints HTML with meta information for the categories, tags and comments.
	 */
	function daydream_entry_footer() {
		// Hide category and tag text for pages.
		if ( 'post' === get_post_type() ) {
			/* translators: used between list items, there is a space after the comma */
			$categories_list = get_the_category_list( esc_html__( ', ', 'daydream' ) );
			if ( $categories_list ) {
				/* translators: 1: list of categories. */
				printf( '<span class="cat-links">' . esc_html__( 'Posted in %1$s', 'daydream' ) . '</span>', $categories_list ); // WPCS: XSS OK.
			}

			/* translators: used between list items, there is a space after the comma */
			$tags_list = get_the_tag_list( '', esc_html_x( ', ', 'list item separator', 'daydream' ) );
			if ( $tags_list ) {
				/* translators: 1: list of tags. */
				printf( '<span class="tags-links">' . esc_html__( 'Tagged %1$s', 'daydream' ) . '</span>', $tags_list ); // WPCS: XSS OK.
			}
		}

		if ( !is_single() && !post_password_required() && ( comments_open() || get_comments_number() ) ) {
			echo '<span class="comments-link">';
			comments_popup_link(
			sprintf(
			wp_kses(
			/* translators: %s: post title */
			__( 'Leave a Comment<span class="screen-reader-text"> on %s</span>', 'daydream' ), array(
				'span' => array(
					'class' => array(),
				),
			)
			), get_the_title()
			)
			);
			echo '</span>';
		}

		edit_post_link(
		sprintf(
		wp_kses(
		/* translators: %s: Name of current post. Only visible to screen readers */
		__( 'Edit <span class="screen-reader-text">%s</span>', 'daydream' ), array(
			'span' => array(
				'class' => array(),
			),
		)
		), get_the_title()
		), '<span class="edit-link">', '</span>'
		);
	}

endif;

if ( !function_exists( 'daydream_post_thumbnail' ) ) :

	/**
	 * Displays an optional post thumbnail.
	 *
	 * Wraps the post thumbnail in an anchor element on index views, or a div
	 * element when on single views.
	 */
	function daydream_post_thumbnail() {
		if ( post_password_required() || is_attachment() || !has_post_thumbnail() ) {
			return;
		}

		if ( is_singular() ) {
			?>
			<div class="post-preview">
				<div class="post-thumbnail">
					<?php
					the_post_thumbnail( 'full', array(
						'alt' => the_title_attribute( array(
							'echo' => false,
						) ),
					) );
					?>
				</div><!-- .post-thumbnail -->
			</div>
			<?php
		} else {
			?>
			<div class="post-preview">
				<a class="post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true">
					<?php
					the_post_thumbnail( 'full', array(
						'alt' => the_title_attribute( array(
							'echo' => false,
						) ),
					) );
					?>
				</a>
			</div>
			<?php
		} // End is_singular().
	}

endif;


/* daydream excerpt max length */

function daydream_excerpt_max_charlength( $limit ) {
	$excerpt = substr( get_the_content(), 0, $limit ) . " [...]";
	echo wp_kses_post( $excerpt );
}

/* daydream read more button */

function daydream_post_readmore() {
	?>
	<a href="<?php the_permalink() ?>" class="read-more btn btn-lg btn-link btn-base"><?php esc_html_e( 'Read more &raquo;', 'daydream' ) ?></a>
	<?php
}

/* daydream post heading */

function daydream_post_heading() {
	if ( is_singular() ) :
		the_title( '<h1 class="post-title">', '</h1>' );
	else :
		the_title( '<h2 class="post-title">' . daydream_post_format_icon() . '<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
	endif;
}

function daydream_post_format_icon() {
	if ( daydream_post_format() ) {
		return '<i class="format-icon icon-' . daydream_post_format() . '"></i>';
	}
}

/* daydream post metadata */

function daydream_post_metadata() {
	global $authordata;

	if ( daydream_theme_mod( 'dd_meta_date' ) == 1 ) {
		?>
		<li class="published updated">
			<a href="<?php the_permalink() ?>"><?php the_time( get_option( 'date_format' ) ); ?></a>
		</li>
		<?php
	}

	if ( daydream_theme_mod( 'dd_meta_author' ) == 1 ) {
		?>
		<li class="author vcard">
			<?php
			esc_html_e( 'By ', 'daydream' );

			$dd_author_avatar = daydream_theme_mod( 'dd_author_avatar', '0' );
			if ( $dd_author_avatar == "1" ) {
				echo get_avatar( get_the_author_meta( 'email' ), '30' );
			}

			printf( '<a class="url fn" href="' .esc_url( get_author_posts_url( $authordata->ID, $authordata->user_nicename ) ). '" title="' . sprintf( 'View all posts by %s', 'daydream', esc_attr( $authordata->display_name ) ) . '">' . get_the_author() . '</a>' )
			?>
		</li>
		<?php
	}

	if ( daydream_get_terms( 'tags' ) && daydream_theme_mod( 'dd_meta_tags' ) == 1 ) :
		?>
		<li class="meta-tags">
			<?php echo wp_kses_post( daydream_get_terms( 'tags' ) ); ?>
		</li>
		<?php
	endif;

	if ( comments_open() && daydream_theme_mod( 'dd_meta_comments' ) == 1 ) :
		?>
		<li class="comment-count">
			<?php comments_popup_link( __( 'Leave a Comment', 'daydream' ), __( '1 Comment', 'daydream' ), __( '% Comments', 'daydream' ) ); ?>
		</li>
		<?php
	endif;
}

/**
 * daydream_get_terms() Returns other terms except the current one (redundant)
 *
 * @since 0.2.3
 * @usedby daydream_entry_footer()
 */
function daydream_get_terms( $term = NULL, $glue = ', ' ) {
	if ( !$term ) {
		return;
	}

	$separator = "\n";

	switch ( $term ):
		case 'cats':
			$current = single_cat_title( '', false );
			$terms	 = get_the_category_list( $separator );
			break;
		case 'tags':
			$current = single_tag_title( '', '', false );
			$terms	 = get_the_tag_list( '', "$separator", '' );
			break;
	endswitch;

	if ( empty( $terms ) ) {
		return;
	}

	$thing = explode( $separator, $terms );

	if ( empty( $thing ) ) {
		return false;
	}

	return trim( join( $glue, $thing ) );
}

// Share This Buttons
function daydream_sharethis() {
	global $post;
	$image_url = wp_get_attachment_url( get_post_thumbnail_id( $post->ID ) );
	if ( empty( $image_url ) ) {
		$image_url = get_template_directory_uri() . '/assets/images/no-thumbnail.jpg';
	}
	$dd_nofollow_social_links	 = daydream_theme_mod( 'dd_nofollow_social_links', '0' );
	$nofollow					 = '';
	if ( $dd_nofollow_social_links ) {
		$nofollow = 'rel="nofollow"';
	}
	?>
	<div class="share-this">
            <a <?php echo esc_html( $nofollow ); ?> data-toggle="tooltip" data-placement="top" title="" data-original-title="<?php esc_attr_e( 'Share on Twitter', 'daydream' ); ?>" target="_blank" href="http://twitter.com/intent/tweet?status=<?php echo esc_attr($post->post_title); ?>+&raquo;+<?php echo esc_url( get_permalink() ); ?>"><i class="fa fa-twitter"></i></a>
			<a <?php echo esc_html( $nofollow ); ?> data-toggle="tooltip" data-placement="top" title="" data-original-title="<?php esc_attr_e( 'Share on Facebook', 'daydream' ); ?>" target="_blank" href="http://www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>&amp;t=<?php echo esc_attr($post->post_title); ?>"><i class="fa fa-facebook"></i></a>
			<a <?php echo esc_html( $nofollow ); ?> data-toggle="tooltip" data-placement="top" title="" data-original-title="<?php esc_attr_e( 'Share on Google Plus', 'daydream' ); ?>" target="_blank" href="https://plus.google.com/share?url=<?php the_permalink(); ?>"><i class="fa fa-google-plus"></i></a>
			<a <?php echo esc_html($nofollow ); ?> data-toggle="tooltip" data-placement="top" title="" data-original-title="<?php esc_attr_e( 'Share on Pinterest', 'daydream' ); ?>" target="_blank" href="http://pinterest.com/pin/create/button/?url=<?php the_permalink(); ?>&media=<?php echo esc_url( $image_url ); ?>&description=<?php echo esc_attr($post->post_title); ?>"><i class="fa fa-pinterest"></i></a>
			<a <?php echo esc_html( $nofollow ); ?> data-toggle="tooltip" data-placement="top" title="" data-original-title="<?php esc_attr_e( 'Share on Linkedin', 'daydream' ); ?>" target="_blank" href="http://linkedin.com/shareArticle?mini=true&amp;url=<?php the_permalink(); ?>&amp;title=<?php echo esc_attr($post->post_title); ?>"><i class="fa fa-linkedin-square"></i></a>			
			<a <?php echo esc_html( $nofollow ); ?> data-toggle="tooltip" data-placement="top" title="" data-original-title="<?php esc_attr_e( 'Share on Email', 'daydream' ); ?>" target="_blank" href="http://www.addtoany.com/email?linkurl=<?php the_permalink(); ?>&linkname=<?php echo esc_attr($post->post_title); ?>"><i class="fa fa-envelope-o"></i></a>
	</div>
	<?php
}

/**
 * 
 * Print out css class according to post format
 * used in content.php, index.php.
 * 
 */
function daydream_post_format() {
	$post_format = '';

	if ( is_sticky() ) {
		$post_format .= 'sticky';
	}

	if ( has_post_format( array(
		'aside',
		'audio',
		'chat',
		'gallery',
		'image',
		'link',
		'quote',
		'status',
		'video'
	), '' ) ) {
		$post_format .= get_post_format();
	}

	return $post_format;
}
