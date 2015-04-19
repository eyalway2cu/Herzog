/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {

	if ($('div.image').length > 0) {
		clientGallery = new Caracal.Gallery.Slider();
		clientGallery
		.images.set_container('aside')
		.images.add('aside div.image')
		.controls.set_auto(8000)
		clientGallery.images.set_center(false)
		clientGallery.images.set_spacing(0)
		clientGallery.images.set_visible_count(1)
	};


	if (Site.is_mobile()) clientGallery.images.set_center(true);

	var formclick = $('div#mobile_contact a');
	formclick.click(function(){
	  		$('div#contact').css('visibility','visible');
	  		$('div#contact').css('opacity','1');
	  });

	var formclose = $('div#contact div a');
	formclose.click(function(){
	  		$('div#contact').css('visibility','hidden');
	  		$('div#contact').css('opacity','0');
	  });

	var formclose_thankyou = $('div#thank_you div a');
		formclose_thankyou.click(function(){
		  		$('div#thank_you').css('visibility','hidden');
		  		$('div#thank_you').css('opacity','0');
		  		$('div#contact').css('visibility','hidden');
		  		$('div#contact').css('opacity','0');
		  });

	$('form').on('dialog-show', function() {
			$('div.send').hide();
			$('div#thank_you').css('opacity','1');
			$('div#thank_you').css('visibility','visible');
			return false;
		});

	Caracal.animation_pages = new PageControl('div#contact')
	Caracal.animation_pages.showPage(0)
};


// connect document `load` event with handler function
$(Site.on_load);
