/*
		jQuery feedback plugin

		author: Mike van Rossum
*/
;(function( $ ){

	$.feedback = function( parameter, spin, time ) {  
		var options;
		
		if( typeof parameter === 'object' ) {
			options = parameter;
		}
		
		var p,
			body = $( 'body' ),
			elem = $( '#jFeedback' ),
			run = elem.data( 'feedback' ),
		
		// these are the default settings
			settings = $.extend({
				fadeSpeed: 200,
				style: true,
				content: {
					backgroundColor: 'black',
					borderRadius: '20px',
					width: '500px',
					padding: '20px 50px',
					color: 'white',
					margin: 'auto',
					opacity: 0.8,
					overflow: 'hidden'
				},
				jFeedback: {
					'text-align': 'center',
					position: 'fixed',
					top: '60px',
					left: 0,
					right: 0,
					'z-index': 10
				},
				spin: {
					opts: {
						lines: 10, // The number of lines to draw
						length: 2, // The length of each line
						width: 5, // The line thickness
						radius: 11, // The radius of the inner circle
						color: '#fff', // #rgb or #rrggbb
						speed: 1.2, // Rounds per second
						trail: 48, // Afterglow percentage
						shadow: false, // Whether to render a shadow
						hwaccel: false, // Whether to use hardware acceleration
						className: 'spinner', // The CSS class to assign to the spinner
						zIndex: 2e9, // The z-index (defaults to 2000000000)
						top: 7, // Top position relative to parent in px
						left: 505 // Left position relative to parent in px
					},
					css: {
						position: 'relative',
						top: '-16px'	
					}
				},
				p: {
					margin: 0,
					float: 'left'
				}
			}, options),
			
		// this function creates the dom element
			createElem = function() {
				var style = settings.style,
				
				// the container
					div = $( '<div/>', {
						'id': 'jFeedback'
					})
						.css( style ? settings.jFeedback : {} )
						.data('feedback', 0)
						.hide(),
				// the content div
					content = $( '<div/>', {
						'class': 'jFeedbackContent'
					})
						.css( style ? settings.content : {} )
						.appendTo( div ),
				// the p that holds the text
					p = $( '<p/>' )
						.css( style ? settings.p : {} )
						.appendTo( content ),
				// the div that holds the spinner
					spin = $( '<div/>', {
						'id': 'jFeedbackSpin'
					})	
						.css( style ? settings.spin.css : {} )
						.appendTo( content );
				
				return div;
			},
		// take the dom element off dom or creates a new one
			getElem = function() {
				return elem[0] ? elem.detach() : createElem();
			},
		// update the text, fadeIn and append to the dom
			update = function( feedback ) {
				var el = getElem();
			
				el
					.find( '.jFeedbackContent' )
						.find( 'p' )
							.text( feedback )
						.end()
					.end()
					.appendTo( body )
					.fadeIn( settings.fadeSpeed )
					.find( '#jFeedbackSpin' )
						.spin( spin ? settings.spin.opts : false );
					
				if(!spin) {
					
					el.click( remove(el) );
					// we can't use $().delay because we want to be able to force hide
					setTimeout( remove(el), time ? time : 5000  );
					
				}
			},
			// using a closure so that we can reference this function with a parameter
			remove = function( el ) {
				return function() {
					if( el.data('feedback') === run ) {
						el.fadeOut( settings.fadeSpeed );
					}	
				}
			}

			
		if( typeof parameter === 'string' ) {
			update( parameter );
			elem.data( 'feedback', ++run );
		} else if( !parameter && elem[0] ) {
			remove( elem );
		}
		
		//add init and ability to change settings
		
	};
	
	// pluginify spinner
	$.fn.spin = function(opts) {
	  this.each(function() {
	    var $this = $(this),
	        data = $this.data();

	    if (data.spinner) {
	      data.spinner.stop();
	      delete data.spinner;
	    }
	    if (opts !== false) {
	      data.spinner = new Spinner($.extend({color: $this.css('color')}, opts)).spin(this);
	    }
	  });
	  return this;
	};	
	
})( jQuery );