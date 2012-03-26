# jQuery Feedback plugin

jQuery feedback provides an easy way to communicate feedback directly to the user.

The goal of this project is to provide a tool as easy to use as `alert()` but much more user friendly from a user perspective.

jQuery feedback creates a div with your input and an optional spinner (provided by [spin.js](http://fgnass.github.com/spin.js/)) to indicate loading. You can use this spinner to let the user know you are not done yet (waiting for extra data from a database or for an email being sent or some other slow process).

You should only use feedback to indicate a short message (sentence or so).

**This is a work in progress.**

## Why use jQuery Feedback

Not only is it easier for you to sent feedback, but it will also get more familiar for the user.

## Usage

`$.feedback('Your message has been sent!');`

### Parameters

$.feedback( message, [spinner, time] )

**message:** (string) the feedback in text you want to provide to your users.  
**spinner:** (boolean, default: false) if a spinner should be shown to indicate that you are doing something.  
**time:** (int, default: 5000) the time in milliseconds the message should be displayed (in case of a long or important text), this is only possible when spinner is false (because else it stays there until updated).

### Demo

Check out a live demo and more on the [project page](http://mikevanrossum.nl/projects/jquery-feedback-plugin/)

### Example

Imagine you need to ajax stuff from an API:

    $.feedback( 'Gathering all the records, sec...', true );
    $.getJSON( url, function(data) {
		// some heavy function to update the dom
		$.feedback( 'All done!' ); 
		// or remove it like so
		// $.feedback(); 
    });

### Browser support

Tested in:

* IE7, IE8 and IE9
* Chrome
* Safari (5)
* Firefox (8)