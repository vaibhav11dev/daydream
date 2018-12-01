
var ColorPalettes = {
    baseName: 'dd_options',
    colorpalettesFieldName: 'dd_color_palettes',
    colorpalettesValue: {
	'color_palette_1': [
	    { fieldType: 'color', fieldName: 'dd_primary_color', fieldValue: '#27CBC0' },
	    { fieldType: 'color', fieldName: 'dd_secondry_color', fieldValue: '#1fa098' },
	],
	'color_palette_2': [
	    { fieldType: 'color', fieldName: 'dd_primary_color', fieldValue: '#3498db' },
	    { fieldType: 'color', fieldName: 'dd_secondry_color', fieldValue: '#217dbb' },
	],
    }
    ,
    bind: function () {
	var t = this;
	$( document ).on( 'click', '#input_dd_color_palettes input:checked + label', function ( event ) {
	    event.preventDefault();
	} );

	$( document ).on( 'click', '#input_dd_color_palettes input:not(:checked) + label', function ( event ) {
	    event.preventDefault();
	    var currentValue = jQuery( this ).attr( 'for' );
	    currentValue = currentValue.replace( 'dd_color_palettes', '' );
	    wp.customize.value( 'dd_color_palettes' )( currentValue );
	    if ( t.colorpalettesValue.hasOwnProperty( currentValue ) ) {
		console.log( 'do changes' );
		var cgs = t.colorpalettesValue[currentValue];
		jQuery.each( cgs, function ( i, v ) {
		    try {
			if ( wp.customize.control( v.fieldName ).params.type == 'kirki-typography' ) {
			    var old_value = wp.customize.value( v.fieldName ).get();
			    old_value.color = v.fieldValue;
			    wp.customize.value( v.fieldName )( JSON.stringify( old_value ) );
			    wp.customize.value( v.fieldName )( ( old_value ) );
			} else {
			    wp.customize.value( v.fieldName )( v.fieldValue );
			}
		    } catch ( err ) {
			console.log( err );
		    }
		} )
	    }

	} );
    }

};

jQuery( document ).ready( function ( $ ) {
    ColorPalettes.bind();
} );