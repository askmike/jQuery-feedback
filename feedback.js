/*
		jQuery feedback plugin

		author: Mike van Rossum
*/
;(function( $ ){
	
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

	$.feedback = function( parameter, spin, time ) {  
		var options;
		
		if( typeof parameter === 'object' ) {
			options = parameter;
		}
		
		var p,
			body = $( 'body' ),
			elem = $( '#jFeedback' ),
		
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
						.hide(),
				// the content div
					content = $( '<div/>', {
						'class': 'content'
					})
						.css( style ? settings.content : {} )
						.appendTo( div ),
				// the p that holds the text
					p = $( '<p/>' )
						.css({ 
							margin: 0,
							float: 'left'
						})
						.appendTo( content ),
				// the div that holds the spinner
					spin = $( '<div/>', {
						'id': 'jFeedbackSpin'
					})	
						.css({ 
							position: 'relative',
							top: '-16px'
						 })
						.appendTo( content );
				
				return div;
			},
		// this function takes the dom element off dom or creates a new one
			getElem = function() {
				if( elem[0] ) {
					return elem.detach();
				} else {
					return createElem();
				}
			},
		// this function updates the text, fadesIn and appends to the dom
			update = function( feedback ) {
				
				var el = getElem();
			
				el
				.find( '.content' )
					.find( 'p' )
						.text( feedback )
					.end()
				.end()
				.appendTo( body )
				.fadeIn( settings.fadeSpeed )
				.find( '#jFeedbackSpin' )
					.spin( spin ? settings.spin : false );
					
				if(!spin) {
					
				// we can't use $().delay because we want to be able to force hide
					function fadeOutFeedback() {
						el.fadeOut( settings.fadeSpeed );
					}
					
					el.click( fadeOutFeedback );
					setTimeout( fadeOutFeedback, time ? time : 5000  );
				}
			},
			remove = function() {
				elem.fadeOut( settings.fadeSpeed );
			}

			
		if( typeof parameter == 'string' ) {
			update( parameter );
		} else if( !parameter && elem[0] ) {
			remove();
		}
		
		//add init and ability to change settings
		
	};
})( jQuery );
