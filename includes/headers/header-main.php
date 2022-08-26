<?php
/**
 * Template part for displaying headerbar
 *
 *
 * @package Daydream
 */
global $post, $wp_query;

$post_id = '';
if ( $wp_query->is_posts_page ) {
    $post_id = get_option( 'page_for_posts' );
} elseif ( is_buddypress() ) {
    $post_id = daydream_bp_get_id();
} else {
    $post_id = isset( $post->ID ) ? $post->ID : '';
}

$dd_header_type       = daydream_theme_mod( 'dd_header_type', 'h1' );
$daydream_header_type = get_post_meta( $post_id, 'daydream_header_type', true );
if ( ! $daydream_header_type ) {
    $daydream_header_type = 'default';
}
if ( is_page() ) {
    if ( ($daydream_header_type == 'h2') || ($daydream_header_type == 'default' && $dd_header_type == 'h2') ) {
        $header_class = 'header-fixed header-transparent';
    } else {
        $header_class = 'js-stick';
    }
} else {
    if ( $dd_header_type == 'h2' ) {
        $header_class = 'header-fixed header-transparent';
    } else {
        $header_class = 'js-stick';
    }
}
?>
<!-- HEADER STICKY TOP -->
<header class="header header-bg <?php echo esc_attr( $header_class ); ?>">
    <div class="container">

        <!-- YOUR LOGO HERE -->
        <div class="inner-header site-identity">
            <?php
            $dd_header_logo = daydream_theme_mod( 'dd_header_logo', '0' );
            if ( function_exists( 'the_custom_logo' ) && $dd_header_logo == 1 ) {
                the_custom_logo();
            } else {
                $dd_blog_title   = daydream_theme_mod( 'dd_blog_title', '1' );
                $dd_blog_tagline = daydream_theme_mod( 'dd_blog_tagline', '1' );
                if ( $dd_blog_title == 1 ) {
                    ?>
                    <div id="blog-title"><a href="<?php echo esc_url( home_url() ); ?>"><?php bloginfo( 'name' ) ?></a></div> 
                    <?php
                }
                if ( $dd_blog_tagline == 1 ) {
                    ?>
                    <div id="tagline"><?php echo get_bloginfo( 'description' ) ?></div>
                    <?php
                }
            }
            ?>         
        </div>

        <?php if ( daydream_theme_mod( 'dd_mobile_menu', '1' ) == 1 ): ?>
            <!-- OPEN MOBILE MENU -->
            <div class="main-nav-toggle">
                <div class="nav-icon-toggle" data-toggle="collapse" data-target="#custom-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </div>
            </div>
        <?php endif ?>

        <?php if ( (daydream_theme_mod( 'dd_woo_cart' ) == 1) || (daydream_theme_mod( 'dd_searchbox' ) == 1) ): ?>
            <!-- WIDGETS MENU -->
            <div class="inner-header pull-right">
                <div class="menu-extras clearfix">


                    <!-- SHOP CART -->
                    <?php
                    $dd_woo_cart = daydream_theme_mod( 'dd_woo_cart', 1 );
                    if ( class_exists( 'Woocommerce' ) && $dd_woo_cart ) {
                        global $woocommerce;
                        ?>
                        <div class="menu-item header-ajax-cart">
                            <div class="extras-cart">
                                <a href="<?php echo esc_url( get_permalink( get_option( 'woocommerce_cart_page_id' ) ) ); ?>" id="open-cart">
                                    <i class="icon-basket icons"></i>
                                    <span class="cart-badge"><?php echo $woocommerce->cart->cart_contents_count; ?></span>
                                </a>
                            </div>
                        </div>
                        <?php
                    }
                    ?>
                    <!-- END SHOP CART -->

                    <!-- SEARCH -->
                    <?php
                    $dd_searchbox = daydream_theme_mod( 'dd_searchbox', '1' );
                    if ( $dd_searchbox == "1" ) {
                        ?>
                        <div class="menu-item hidden-xxs">
                            <div class="extras-search">
                                <a id="modal-search" href="#"><i class="icon-magnifier icons"></i></a>
				    <?php get_search_form(); ?>
                            </div>
                        </div>
                        <?php
                    }
                    ?>
                    <!-- END SEARCH -->

                </div>
            </div>
<?php endif ?>

        <!-- MAIN MENU -->
        <?php
        if ( daydream_theme_mod( 'dd_primary_menu', '1' ) == 1 && has_nav_menu( 'primary-menu' ) ):

            wp_nav_menu( array( 'theme_location' => 'primary-menu', 'menu_class' => 'inner-nav pull-right', 'container' => 'nav', 'container_class' => 'dd-main-simplemenu main-nav collapse clearfix', 'container_id' => 'custom-collapse', 'walker' => new Daydream_Walker_Nav_Menu() ) );
        endif;
        ?>

    </div>
</header>
<!-- HEADER STICKY TOP -->