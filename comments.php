<?php
/**
 * The template for displaying comments
 *
 * This is the template that displays the area of the page that contains both the current comments
 * and the comment form.
 *
 *
 * @package daydream
 */
if ( post_password_required() ) {
	?>
	<p class="password-protected alert"><?php _e( 'This post is password protected. Enter the password to view comments.', 'daydream' ); ?></p>
	<?php
	return;
}
?>
<!-- COMMENTS -->
<div id="comments" class="comments-area">   
	<?php if ( have_comments() ) { ?>

		<?php
		if ( !empty( $comments_by_type[ 'comment' ] ) ) {
			daydream_discussion_title( 'comment' );
		} else {
			// If comments are open, but there are no comments.
			if ( comments_open() ) {
				echo '<h5 class="comment-title text-title text-uppercase bottom-line">';
				_e( 'No Comments Yet', 'daydream' );
				echo '</h5>';
			}
		}

		if ( !empty( $comments_by_type[ 'pings' ] ) ) {
			daydream_discussion_title( 'pings' );
		}

		if ( !empty( $comments_by_type[ 'comment' ] ) ) {
			?>
			<!--BEGIN .comment-list-->
			<div class="comment-list">
				<?php
				wp_list_comments( array(
					'style'			 => 'div',
					'callback'		 => 'daydream_comments_callback',
					'end-callback'	 => 'daydream_comments_endcallback'
				) );
				?>
				<!--END .comment-list-->
			</div>
		<?php } ?>   

		<?php if ( !empty( $comments_by_type[ 'pings' ] ) ) { ?>    
			<!--BEGIN .pings-list-->
			<div class="comment-list">
				<?php
				wp_list_comments( array(
					'style'			 => 'div',
					'type'			 => 'pings',
					'callback'		 => 'daydream_pings_callback',
					'end-callback'	 => 'daydream_pings_endcallback'
				) );
				?>
				<!--END .pings-list-->
			</div>
		<?php } ?>

		<div class="navigation-links page-navigation clearfix row">
			<div class="col-sm-6 col-md-6 nav-next"><?php previous_comments_link( '<div class="btn btn-left icon-arrow-left icon-big">'. _e( 'Older Comments', 'daydream' ) .'</div>' ); ?></div>
			<div class="col-sm-6 col-md-6 nav-previous"><?php next_comments_link( '<div class="btn btn-right icon-arrow-right icon-big">'. _e( 'Newer Comments', 'daydream' ) .'</div>' ); ?></div>
		</div>    

		<?php
	}
	?>
</div>
<!--END COMMENTS-->
<?php if ( comments_open() ) { ?>

	<!-- COMMENT FORM -->
	<?php daydream_custom_comment_form(); ?>
	<!--END <!-- COMMENT FORM -->

	<?php
} 