<?php
add_action( 'widgets_init', 'social_links_load_widgets' );

function social_links_load_widgets() {
	register_widget( 'Daydream_Social_Links_Widget' );
}

class Daydream_Social_Links_Widget extends WP_Widget {

	public function __construct() {
		parent::__construct(
		'social_links-widget', __( 'daydream: Social Links', 'daydream' ), // Name
							 array( 'classname' => 'social_links', 'description' => '', ) // Args
		);
	}

	public function widget( $args, $instance ) {
		extract( $args );
		$title = apply_filters( 'widget_title', $instance[ 'title' ] );

		echo $before_widget;

		if ( $title ) {
			echo $before_title . $title . $after_title;
		}

		$style		 = '';
		$box_style	 = '';

		if ( !isset( $instance[ 'linktarget' ] ) ) {
			$instance[ 'linktarget' ] = '';
		}

		$dd_nofollow_social_links	 = daydream_theme_mod( 'dd_nofollow_social_links', '0' );
		$nofollow					 = '';
		if ( $dd_nofollow_social_links ) {
			$nofollow = 'rel="nofollow"';
		}

		if ( !isset( $instance[ 'tooltip_pos' ] ) ) {
			$instance[ 'tooltip_pos' ] = 'top';
		}

		if ( isset( $instance[ 'icon_color' ] ) && $instance[ 'icon_color' ] ) {
			$style .= sprintf( 'color:%s;', $instance[ 'icon_color' ] );
		}

		if ( isset( $instance[ 'boxed_icon' ] ) && $instance[ 'boxed_icon' ] == 'Yes' && isset( $instance[ 'boxed_color' ] ) && $instance[ 'boxed_color' ] ) {
			$box_style .= sprintf( 'background-color:%s;border-color:%s;', $instance[ 'boxed_color' ], $instance[ 'boxed_color' ] );
		}

		if ( isset( $instance[ 'boxed_icon' ] ) && isset( $instance[ 'boxed_icon_radius' ] ) && $instance[ 'boxed_icon' ] == 'Yes' &&
		( $instance[ 'boxed_icon_radius' ] || $instance[ 'boxed_icon_radius' ] === '0' )
		) {
			if ( $instance[ 'boxed_icon_radius' ] == 'round' ) {
				$instance[ 'boxed_icon_radius' ] = '50%';
			}

			$box_style .= sprintf( 'border-radius:%s;', $instance[ 'boxed_icon_radius' ] );
		}

		foreach ( $instance as $name => $value ) {
			if ( strpos( $name, '_link' ) ) {
				$social_networks[ $name ] = str_replace( '_link', '', $name );
			}
		}

		$boxed_icons = '';
		if ( isset( $instance[ 'boxed_icon' ] ) && $instance[ 'boxed_icon' ] == 'Yes' && isset( $instance[ 'boxed_color' ] ) && $instance[ 'boxed_color' ] ) {
			$boxed_icons = 'boxed-icons';
		}
		?>       
		<ul class="clearfix social-icons <?php echo $boxed_icons; ?>">
			<?php
			foreach ( $social_networks as $name => $value ):
				if ( $instance[ $name ] ):
					?>
					<li>
						<a class="dd-social-network-icon dd-<?php echo $value; ?>" href="<?php echo esc_url($instance[ $name ]); ?>" data-toggle="tooltip" data-placement="<?php echo strtolower( $instance[ 'tooltip_pos' ] ); ?>" data-original-title="<?php echo ucwords( $value ); ?>" title="" <?php echo $nofollow; ?> target="<?php echo $instance[ 'linktarget' ]; ?>" style="<?php echo $box_style; ?>"><i class="fa fa-<?php echo esc_attr($value); ?>" style="<?php echo $style; ?>"></i>
						</a>
					</li>
					<?php
				endif;
			endforeach;
			?>
		</ul>
		<?php
		echo $after_widget;
	}

	public function update( $new_instance, $old_instance ) {
		$instance = $old_instance;

		$instance[ 'title' ]			 = $new_instance[ 'title' ];
		$instance[ 'linktarget' ]		 = $new_instance[ 'linktarget' ];
		$instance[ 'icon_color' ]		 = $new_instance[ 'icon_color' ];
		$instance[ 'boxed_icon' ]		 = $new_instance[ 'boxed_icon' ];
		$instance[ 'boxed_color' ]		 = $new_instance[ 'boxed_color' ];
		$instance[ 'boxed_icon_radius' ] = $new_instance[ 'boxed_icon_radius' ];
		$instance[ 'tooltip_pos' ]		 = $new_instance[ 'tooltip_pos' ];
		$instance[ 'facebook_link' ]	 = $new_instance[ 'facebook_link' ];
		$instance[ 'twitter_link' ]		 = $new_instance[ 'twitter_link' ];
		$instance[ 'google-plus_link' ]	 = $new_instance[ 'google-plus_link' ];
		$instance[ 'dribbble_link' ]	 = $new_instance[ 'dribbble_link' ];
		$instance[ 'linkedin_link' ]	 = $new_instance[ 'linkedin_link' ];
		$instance[ 'tumblr_link' ]		 = $new_instance[ 'tumblr_link' ];
		$instance[ 'reddit_link' ]		 = $new_instance[ 'reddit_link' ];
		$instance[ 'yahoo_link' ]		 = $new_instance[ 'yahoo_link' ];
		$instance[ 'deviantart_link' ]	 = $new_instance[ 'deviantart_link' ];
		$instance[ 'vimeo_link' ]		 = $new_instance[ 'vimeo_link' ];
		$instance[ 'youtube_link' ]		 = $new_instance[ 'youtube_link' ];
		$instance[ 'pinterest_link' ]	 = $new_instance[ 'pinterest_link' ];
		$instance[ 'digg_link' ]		 = $new_instance[ 'digg_link' ];
		$instance[ 'flickr_link' ]		 = $new_instance[ 'flickr_link' ];
		$instance[ 'skype_link' ]		 = $new_instance[ 'skype_link' ];
		$instance[ 'instagram_link' ]	 = $new_instance[ 'instagram_link' ];
		$instance[ 'vk_link' ]			 = $new_instance[ 'vk_link' ];
		$instance[ 'paypal_link' ]		 = $new_instance[ 'paypal_link' ];
		$instance[ 'dropbox_link' ]		 = $new_instance[ 'dropbox_link' ];
		$instance[ 'soundcloud_link' ]	 = $new_instance[ 'soundcloud_link' ];
		$instance[ 'foursquare_link' ]	 = $new_instance[ 'foursquare_link' ];
		$instance[ 'vine_link' ]		 = $new_instance[ 'vine_link' ];
		$instance[ 'wordpress_link' ]	 = $new_instance[ 'wordpress_link' ];
		$instance[ 'behance_link' ]		 = $new_instance[ 'behance_link' ];
		$instance[ 'stumbleupon_link' ]	 = $new_instance[ 'stumbleupon_link' ];
		$instance[ 'github_link' ]		 = $new_instance[ 'github_link' ];
		$instance[ 'lastfm_link' ]		 = $new_instance[ 'lastfm_link' ];
		$instance[ 'rss_link' ]			 = $new_instance[ 'rss_link' ];

		return $instance;
	}

	public function form( $instance ) {
		$defaults	 = array( 'title' => 'We are social', 'linktarget' => '', 'icon_color' => '', 'boxed_icon' => 'No', 'boxed_color' => '', 'boxed_icon_radius' => '3px', 'tooltip_pos' => 'top', 'facebook_link' => '', 'twitter_link' => '', 'google-plus_link' => '', 'dribbble_link' => '', 'linkedin_link' => '', 'tumblr_link' => '', 'reddit_link' => '', 'yahoo_link' => '', 'deviantart_link' => '', 'vimeo_link' => '', 'youtube_link' => '', 'pinterest_link' => '', 'digg_link' => '', 'flickr_link' => '', 'skype_link' => '', 'instagram_link' => '', 'vk_link' => '', 'paypal_link' => '', 'dropbox_link' => '', 'soundcloud_link' => '', 'foursquare_link' => '', 'vine_link' => '', 'wordpress_link' => '', 'behance_link' => '', 'stumbleupon_link' => '', 'github_link' => '', 'lastfm_link' => '', 'rss_link' => '' );
		$instance	 = wp_parse_args( (array) $instance, $defaults );
		?>
		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>">Title:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'title' )); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo $instance[ 'title' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'linktarget' ); ?>">Link Target:</label>
			<select id="<?php echo esc_attr($this->get_field_id( 'linktarget' )); ?>" name="<?php echo $this->get_field_name( 'linktarget' ); ?>" class="widefat" style="width:100%;">
				<option <?php if ( '_blank' == $instance[ 'linktarget' ] ) echo 'selected="selected"'; ?>>_blank</option>
				<option <?php if ( '_self' == $instance[ 'linktarget' ] ) echo 'selected="selected"'; ?>>_self</option>
			</select>
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'icon_color' ); ?>">Icons Color Hex Code:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'icon_color' )); ?>" name="<?php echo $this->get_field_name( 'icon_color' ); ?>" value="<?php echo $instance[ 'icon_color' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'boxed_icon' ); ?>">Icons Boxed:</label>
			<select id="<?php echo esc_attr($this->get_field_id( 'boxed_icon' )); ?>" name="<?php echo $this->get_field_name( 'boxed_icon' ); ?>" class="widefat" style="width:100%;">
				<option <?php if ( 'No' == $instance[ 'boxed_icon' ] ) echo 'selected="selected"'; ?>>No</option>
				<option <?php if ( 'Yes' == $instance[ 'boxed_icon' ] ) echo 'selected="selected"'; ?>>Yes</option>
			</select>
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'boxed_color' ); ?>">Boxed Icons Background Color Hex Code:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'boxed_color' )); ?>" name="<?php echo $this->get_field_name( 'boxed_color' ); ?>" value="<?php echo $instance[ 'boxed_color' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'boxed_icon_radius' ); ?>">Boxed Icons Radius:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'boxed_icon_radius' )); ?>" name="<?php echo $this->get_field_name( 'boxed_icon_radius' ); ?>" value="<?php echo $instance[ 'boxed_icon_radius' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'tooltip_pos' ); ?>">Tooltip Position:</label>
			<select id="<?php echo esc_attr($this->get_field_id( 'tooltip_pos' )); ?>" name="<?php echo $this->get_field_name( 'tooltip_pos' ); ?>" class="widefat" style="width:100%;">
				<option <?php if ( 'Top' == $instance[ 'tooltip_pos' ] ) echo 'selected="selected"'; ?>>Top</option>
				<option <?php if ( 'Right' == $instance[ 'tooltip_pos' ] ) echo 'selected="selected"'; ?>>Right</option>
				<option <?php if ( 'Bottom' == $instance[ 'tooltip_pos' ] ) echo 'selected="selected"'; ?>>Bottom</option>
				<option <?php if ( 'Left' == $instance[ 'tooltip_pos' ] ) echo 'selected="selected"'; ?>>Left</option>
				<option <?php if ( 'None' == $instance[ 'tooltip_pos' ] ) echo 'selected="selected"'; ?>>None</option>
			</select>
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'facebook_link' ); ?>">Facebook Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'facebook_link' )); ?>" name="<?php echo $this->get_field_name( 'facebook_link' ); ?>" value="<?php echo $instance[ 'facebook_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'twitter_link' ); ?>">Twitter Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'twitter_link' )); ?>" name="<?php echo $this->get_field_name( 'twitter_link' ); ?>" value="<?php echo $instance[ 'twitter_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'google-plus_link' ); ?>">Google Plus Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'google-plus_link' )); ?>" name="<?php echo $this->get_field_name( 'google-plus_link' ); ?>" value="<?php echo $instance[ 'google-plus_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'dribbble_link' ); ?>">Dribbble Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'dribbble_link' )); ?>" name="<?php echo $this->get_field_name( 'dribbble_link' ); ?>" value="<?php echo $instance[ 'dribbble_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'linkedin_link' ); ?>">LinkedIn Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'linkedin_link' )); ?>" name="<?php echo $this->get_field_name( 'linkedin_link' ); ?>" value="<?php echo $instance[ 'linkedin_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'tumblr_link' ); ?>">Tumblr Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'tumblr_link' )); ?>" name="<?php echo $this->get_field_name( 'tumblr_link' ); ?>" value="<?php echo $instance[ 'tumblr_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'reddit_link' ); ?>">Reddit Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'reddit_link' )); ?>" name="<?php echo $this->get_field_name( 'reddit_link' ); ?>" value="<?php echo $instance[ 'reddit_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'yahoo_link' ); ?>">Yahoo Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'yahoo_link' )); ?>" name="<?php echo $this->get_field_name( 'yahoo_link' ); ?>" value="<?php echo $instance[ 'yahoo_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'deviantart_link' ); ?>">Deviantart Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'deviantart_link' )); ?>" name="<?php echo $this->get_field_name( 'deviantart_link' ); ?>" value="<?php echo $instance[ 'deviantart_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'vimeo_link' ); ?>">Vimeo Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'vimeo_link' )); ?>" name="<?php echo $this->get_field_name( 'vimeo_link' ); ?>" value="<?php echo $instance[ 'vimeo_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'youtube_link' ); ?>">Youtube Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'youtube_link' )); ?>" name="<?php echo $this->get_field_name( 'youtube_link' ); ?>" value="<?php echo $instance[ 'youtube_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'pinterest_link' ); ?>">Pinterest Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'pinterest_link' )); ?>" name="<?php echo $this->get_field_name( 'pinterest_link' ); ?>" value="<?php echo $instance[ 'pinterest_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'digg_link' ); ?>">Digg Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'digg_link' )); ?>" name="<?php echo $this->get_field_name( 'digg_link' ); ?>" value="<?php echo $instance[ 'digg_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'flickr_link' ); ?>">Flickr Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'flickr_link' )); ?>" name="<?php echo $this->get_field_name( 'flickr_link' ); ?>" value="<?php echo $instance[ 'flickr_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'skype_link' ); ?>">Skype Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'skype_link' )); ?>" name="<?php echo $this->get_field_name( 'skype_link' ); ?>" value="<?php echo $instance[ 'skype_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'instagram_link' ); ?>">Instagram Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'instagram_link' )); ?>" name="<?php echo $this->get_field_name( 'instagram_link' ); ?>" value="<?php echo $instance[ 'instagram_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'vk_link' ); ?>">VK Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'vk_link' )); ?>" name="<?php echo $this->get_field_name( 'vk_link' ); ?>" value="<?php echo $instance[ 'vk_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'paypal_link' ); ?>">PayPal Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'paypal_link' )); ?>" name="<?php echo $this->get_field_name( 'paypal_link' ); ?>" value="<?php echo $instance[ 'paypal_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'dropbox_link' ); ?>">Dropbox Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'dropbox_link' )); ?>" name="<?php echo $this->get_field_name( 'dropbox_link' ); ?>" value="<?php echo $instance[ 'dropbox_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'soundcloud_link' ); ?>">Soundcloud Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'soundcloud_link' )); ?>" name="<?php echo $this->get_field_name( 'soundcloud_link' ); ?>" value="<?php echo $instance[ 'soundcloud_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'foursquare_link' ); ?>">Foursquare Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'foursquare_link' )); ?>" name="<?php echo $this->get_field_name( 'foursquare_link' ); ?>" value="<?php echo $instance[ 'foursquare_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'vine_link' ); ?>">Vine Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'vine_link' )); ?>" name="<?php echo $this->get_field_name( 'vine_link' ); ?>" value="<?php echo $instance[ 'vine_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'wordpress_link' ); ?>">Wordpress Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'wordpress_link' )); ?>" name="<?php echo $this->get_field_name( 'wordpress_link' ); ?>" value="<?php echo $instance[ 'wordpress_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'behance_link' ); ?>">Behance Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'behance_link' )); ?>" name="<?php echo $this->get_field_name( 'behance_link' ); ?>" value="<?php echo $instance[ 'behance_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'stumbleupon_link' ); ?>">Stumbleupo Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'stumbleupon_link' )); ?>" name="<?php echo $this->get_field_name( 'stumbleupon_link' ); ?>" value="<?php echo $instance[ 'stumbleupon_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'github_link' ); ?>">Github Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'github_link' )); ?>" name="<?php echo $this->get_field_name( 'github_link' ); ?>" value="<?php echo $instance[ 'github_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'lastfm_link' ); ?>">Lastfm Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'lastfm_link' )); ?>" name="<?php echo $this->get_field_name( 'lastfm_link' ); ?>" value="<?php echo $instance[ 'lastfm_link' ]; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'rss_link' ); ?>">RSS Link:</label>
			<input class="widefat" type="text" id="<?php echo esc_attr($this->get_field_id( 'rss_link' )); ?>" name="<?php echo $this->get_field_name( 'rss_link' ); ?>" value="<?php echo $instance[ 'rss_link' ]; ?>" />
		</p>
		<?php
	}

}
