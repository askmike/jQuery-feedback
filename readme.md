# jQuery Feedback plugin

jQuery feedback provides an easy way to communicate feedback directly to the user.

The goal of this project is to provide an as easy to use tool as `alert()` wich is much more user friendly for your users.

jQuery feedback creates a div with your input and an optional spinner (provided by [spin.js](http://fgnass.github.com/spin.js/)) to indicate loading. You can use this spinner to let the user know you are not done yet (waiting for extra data from a database or for an email being sent or some other slow process).

You should only use feedback to indicate a short message (sentence or so).

**This is a work in progress.**

## Why use jQuery Feedback

Not only is it easier for you to sent feedback, but it will also get more familiar for the user.

## Usage

`$.feedback('Your message has been sent!');`

### Parameters

$.feedback( message, [spinner, time] )

*message:* (string) the feedback in text you want to provide to your users.  
*spinner:* (boolean, default: true) if a spinner should be shown to indicate that you are doing something.  
*time:* (int, default: 5000) the time in milliseconds the message should be displayed (in case of a long or important text), this is only possible when spinner is false (because else it stays there until updated).

### Demo

[online demo](http://mikevanrossum.nl/stuff/jQuery-feedback/example.html)

### Example

Imagine you need to ajax stuff from an API:

    $.feedback( 'Gathering all the records, sec...', true );
    $.getJSON( url, function(data) {
		// some heavy function to update the dom
		$.feedback( 'All done!' ); 
		// or remove it like so
		// $.feedback(); 
    });