<?php
get_template_part( 'includes/widgets/social_links' );
get_template_part( 'includes/widgets/contact_info' );

if ( function_exists( 'register_sidebar' ) ) {
    register_sidebar( array(
        'name'          => esc_html__( 'Sidebar 1', 'daydream' ),
        'id'            => 'sidebar-1',
        'before_widget' => '<div id="%1$s" class="widget %2$s"><div class="widget-content">',
        'after_widget'  => '</div></div>',
        'before_title'  => '<h6 class="text-title text-uppercase bottom-line">',
        'after_title'   => '</h6>',
    ) );
}

if ( function_exists( 'register_sidebar' ) ) {
    register_sidebar( array(
        'name'          => esc_html__( 'Sidebar 2', 'daydream' ),
        'id'            => 'sidebar-2',
        'before_widget' => '<div id="%1$s" class="widget %2$s"><div class="widget-content">',
        'after_widget'  => '</div></div>',
        'before_title'  => '<h6 class="text-title text-uppercase bottom-line">',
        'after_title'   => '</h6>',
    ) );
}

if ( function_exists( 'register_sidebar' ) ) {
    register_sidebar( array(
        'name'          => esc_html__( 'Footer 1', 'daydream' ),
        'id'            => 'footer-1',
        'before_widget' => '<div id="%1$s" class="widget %2$s"><div class="widget-content">',
        'after_widget'  => '</div></div>',
        'before_title'  => '<h6 class="text-title text-uppercase bottom-line">',
        'after_title'   => '</h6>',
    ) );
}

if ( function_exists( 'register_sidebar' ) ) {
    register_sidebar( array(
        'name'          => esc_html__( 'Footer 2', 'daydream' ),
        'id'            => 'footer-2',
        'before_widget' => '<div id="%1$s" class="widget %2$s"><div class="widget-content">',
        'after_widget'  => '</div></div>',
        'before_title'  => '<h6 class="text-title text-uppercase bottom-line">',
        'after_title'   => '</h6>',
    ) );
}

if ( function_exists( 'register_sidebar' ) ) {
    register_sidebar( array(
        'name'          => esc_html__( 'Footer 3', 'daydream' ),
        'id'            => 'footer-3',
        'before_widget' => '<div id="%1$s" class="widget %2$s"><div class="widget-content">',
        'after_widget'  => '</div></div>',
        'before_title'  => '<h6 class="text-title text-uppercase bottom-line">',
        'after_title'   => '</h6>',
    ) );
}

if ( function_exists( 'register_sidebar' ) ) {
    register_sidebar( array(
        'name'          => esc_html__( 'Footer 4', 'daydream' ),
        'id'            => 'footer-4',
        'before_widget' => '<div id="%1$s" class="widget %2$s"><div class="widget-content">',
        'after_widget'  => '</div></div>',
        'before_title'  => '<h6 class="text-title text-uppercase bottom-line">',
        'after_title'   => '</h6>',
    ) );
}