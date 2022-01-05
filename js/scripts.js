// Important: This was originally designed for pike.mybrandstorefront.com
// It is being modified specifically for intuitivehealth.mybrandstorefront.com
// Labels are being added to aid in searching:
// 		"use": Section is needed for MVP
// 		"maybe use": Not sure if section is necessary for MVP
//		"Do Not Use": Section is not needed for this storefront 
// *** I have not completed the labeling. ***


$(function() {
// maybe use
	/** ----------------------------------------------------------------------
	 ** General Scripts
	 ** ----------------------------------------------------------------------
	 **
	 ** The scripts below are used on multiple pages.
	 **
	 **/

	// Initiate the ability to add tooltips on elements.
  	$('[data-toggle="tooltip"]').tooltip();

  	if (window.location.href.indexOf("ActivateAccount.asp") > -1) {
		localStorage.setItem('Login', 'Yes');
	}

  	var role = localStorage.getItem('Role');
  	var login = localStorage.getItem('Login');
  	var loggedin = $('#loginregister').length;
  	var redirected = localStorage.getItem('Redirected');

  	$('#logout').on('click', function() {
  		localStorage.setItem('Login', 'No');
  		localStorage.removeItem('Role');
  	});

	if (loggedin < 1) {
		localStorage.setItem('Login', 'Yes');
		$('.role-selection').hide();
		$('body').removeAttr('style');
	}
	
  	if(role === 'Player' && loggedin >= 1 && redirected !== 'Yes' || role === 'Coach' && loggedin >= 1 && redirected !== 'Yes' || role === 'Fan' && loggedin >= 1 && redirected !== 'Yes') {
  		localStorage.setItem('Login', 'No');
  		localStorage.setItem('Redirected', 'Yes');
  		window.location.replace("https://intuitivehealth.mybrandstorefront.com/registration.asp");
  	} else if (role === null && login === null && redirected !== 'Yes') {
  		localStorage.setItem('Login', 'No');
  		localStorage.setItem('Redirected', 'Yes');
  		window.location.replace("https://intuitivehealth.mybrandstorefront.com/");
  	}

  	if(role === 'Player') {
		$('.player-nav').removeClass('hide');
	}

	if(role === 'Coach') {
		$('.coach-nav').removeClass('hide');
	}

	if(role === 'Fan') {
		$('.fan-nav').removeClass('hide');
	}

  	if (window.location.href.indexOf("retailsite.asp") > -1 || window.location.href.indexOf("RetailSite.asp") > -1) {
  		
  		if(role === '' || role === null || role === 'Coach' && login === 'No' || role === 'Player' && login === 'No' || role === 'Fan' && login === 'No') {
  			$('.role-selection').removeClass('hide');
  		} else {
  			$('.role-selection').addClass('hide');
  			$('body').removeAttr('style');
  		}

  		$('#Coach').on('click', function() {
  			localStorage.setItem('Role', 'Coach');
  			localStorage.setItem('Login', 'No');
  		});

  		$('#Player').on('click', function() {
  			localStorage.setItem('Role', 'Player');
  			localStorage.setItem('Login', 'No');
  		});
  		
  		$('#Fan').on('click', function() {
  			localStorage.setItem('Role', 'Fan');
  			localStorage.setItem('Login', 'No');
  		});
  	}


// use
	/** ----------------------------------------------------------------------
	 ** Registration Scripts
	 ** ----------------------------------------------------------------------
	 **
	 ** The scripts below will make sure the appropriate cost center is
	 ** selected when the user registers for an account.
	 **
	 **/

	if (window.location.href.indexOf("registration.asp") > -1 || window.location.href.indexOf("Registration.asp") > -1) {

		// Allow the user to tab directly to the "Login" button from the "Password" field.
		$('#Password').on('blur', function() {
			$(this).closest('table').find('input.btn').focus();
		});

		$('select[name="CostCentre"] > option').each(function() {
			var option = $(this).text();

			if(role === option) {
				$(this).prop('selected', true);
			}
		});

		// Select the appropriate screen definition.
		$('select[name="screendef"] option[value="46"]').prop('selected', true);
	}


// maybe use **NEEDS SUBSTANTIAL MODIFICATION**
	/** ----------------------------------------------------------------------
	 ** ProductCats Scripts
	 ** ----------------------------------------------------------------------
	 **
	 ** The scripts below will control the user experience on the product
	 ** selection page.
	 **
	 **/

	if (window.location.href.indexOf("ProductCats.asp") > -1) {
		// Add "product-body" class to the body element.
		$('body').addClass('product-body');

		// If no products are found, hide the table.
		$('.no-records-found').closest('.bootstrap-table').hide();

		// Display the available colors below the product.
		$('.product-container .row > .product-colors').each(function() {
			product = $(this).prev().find('.product-description');
			$(this).detach().appendTo(product);
		});

		$('.shuffle-item').each(function() {
		    var $this = $(this).find('.item-name h3');
		    $this.html($this.html().replace(/(\S+)\s*$/, '<span class="product-id hide">$1</span>'));
		});

		// Make sure the proper products are being displayed for the public group.
		if(role === 'Player') {
			$('.product-filter').find('li[data-group="fan"]').hide();
			$('.product-filter').find('li[data-group="coaches"]').hide();
			$('.product-filter').find('li[data-group="player"]').addClass('active');

			if (window.location.href.indexOf("Football") > -1) {
				$('.product-filter').find('.cross-country').hide();
				$('.product-filter').find('.track').hide();
				$('.product-filter').find('.baseball').hide();
				$('.product-filter').find('.football').removeClass('hide').show();
			} else if (window.location.href.indexOf("Cross%20Country") > -1) {
				$('.product-filter').find('.football').hide();
				$('.product-filter').find('.track').hide();
				$('.product-filter').find('.baseball').hide();
				$('.product-filter').find('.cross-country').removeClass('hide').show();
			} else if (window.location.href.indexOf("Track%20&%20Field") > -1) {
				$('.product-filter').find('.football').hide();
				$('.product-filter').find('.cross-country').hide();
				$('.product-filter').find('.baseball').hide();
				$('.product-filter').find('.track').removeClass('hide').show();
			} else if (window.location.href.indexOf("Baseball") > -1) {
				$('.product-filter').find('.football').hide();
				$('.product-filter').find('.cross-country').hide();
				$('.product-filter').find('.track').hide();
				$('.product-filter').find('.baseball').removeClass('hide').show();
			}

			$('.sub-menu li').each(function() {
				$(this).on('click', function() {
					var selected_category = $(this).attr('data-group');
					localStorage.setItem('Category', selected_category);
				});
			});

		} else if(role === 'Coach') {
			$('.product-filter').find('li[data-group="fan"]').hide();
			$('.product-filter').find('li[data-group="player"]').hide();
			$('.product-filter').find('li[data-group="coaches"]').addClass('active');

			if (window.location.href.indexOf("Football") > -1) {
				$('.product-filter').find('.cross-country').hide();
				$('.product-filter').find('.track').hide();
				$('.product-filter').find('.baseball').hide();
				$('.product-filter').find('.football').removeClass('hide').show();
			} else if (window.location.href.indexOf("Cross%20Country") > -1) {
				$('.product-filter').find('.football').hide();
				$('.product-filter').find('.track').hide();
				$('.product-filter').find('.baseball').hide();
				$('.product-filter').find('.cross-country').removeClass('hide').show();
			} else if (window.location.href.indexOf("Track%20&%20Field") > -1) {
				$('.product-filter').find('.football').hide();
				$('.product-filter').find('.cross-country').hide();
				$('.product-filter').find('.baseball').hide();
				$('.product-filter').find('.track').removeClass('hide').show();
			} else if (window.location.href.indexOf("Baseball") > -1) {
				$('.product-filter').find('.football').hide();
				$('.product-filter').find('.cross-country').hide();
				$('.product-filter').find('.track').hide();
				$('.product-filter').find('.baseball').removeClass('hide').show();
			}

		} else {
			$('.product-filter').find('li[data-group="player"]').hide();
			$('.product-filter').find('li[data-group="coaches"]').hide();
			$('.product-filter').find('li[data-group="fan"]').addClass('active');
		}
	}

// DO NOT USE *** Intuitive HealtthStorefront does not have Guests
	/** ----------------------------------------------------------------------
	 ** Step1New Scripts
	 ** ----------------------------------------------------------------------
	 **
	 ** The scripts below will check to see if the user is a "Guest".
	 ** The "Guest" session item is used in the shopping cart.
	 **
	 **/

	if (window.location.href.indexOf("Step1New.asp") > -1) {
		var role = localStorage.getItem('Role');
		var login = localStorage.getItem('Login');
		sessionStorage.clear();
		
		localStorage.setItem('Role', role);
		localStorage.setItem('Login', login);
	}


// maybe use
	/** ----------------------------------------------------------------------
	 ** Step1New & Step5Edit Scripts
	 ** ----------------------------------------------------------------------
	 **
	 ** The scripts below will control the user experience when they select a
	 ** product.
	 **
	 **/

	if (window.location.href.indexOf("Step1New.asp") > -1 || window.location.href.indexOf("Step5Edit.asp") > -1) {

// maybe use
		/** ----------------------------------------------------------------------
		 ** Select Style
		 ** ----------------------------------------------------------------------
		 **
		 ** Scripts that prevent the user from having to do anything on this page.
		 **
		 **/

		$('.Product').find('#btnSubmit').click();


// maybe use *** REQUIRES SUBSTANTIAL MODIFICATION
		/** ----------------------------------------------------------------------
		 ** Enter Details
		 ** ----------------------------------------------------------------------
		 **
		 ** Begin scripts that display/create the proper information for each 
		 ** apparel/promotional product.
		 **
		 **/

		// Determine which product the user has selected and create the "product id".
		$('#contenttable').find('h1').first().each(function() {
		    var $this = $(this);
		    $this.html($this.html().replace(/(\S+)\s*$/, '<span class="product-id hide">$1</span>'));
		});

		$('.front-back-title').each(function() {
		    var $this = $(this);
		    $this.html($this.html().replace(/(\S+)\s*$/, '<span class="product-id hide">$1</span>'));
		});

		// All global variables used for the Enter Details page.
		var logo;
		var product_id = $('.product-id').first().text();

		// Get all colors available from the select element and display them as icons.
		$('#Color > option').each(function() {
			var color = $(this).text(),
				color = color.split('-').pop(),
				colorATTR = color.replace(/-/g, ''),
				colorTITLE = colorATTR.split(/(?=[A-Z])/).join(' '),
				colorCLASS = colorTITLE.toLowerCase().replace('/', '');

			if(color === '') {

			} else {
				$('.colors').find('.product-colors').append('<span class="color ' + colorCLASS + '" title="' + colorTITLE + '" color="' + colorATTR + '" onclick="colorSelect(this);"></span>');
			}
		});

		$('#Logo > option').each(function() {
			var logo = $(this).text(),
				logo_path = '/files/pdfsthumbnail/' + logo + '_thumbnail.jpg';

			if (logo === 'Pike-P-White-Red' || logo === 'Pike-CC-Wordmark-Red') {
				$(this).closest('.product-input').find('.logo-icons').append('<div class="col-sm-3"><img class="logo-icon" src="' + logo_path + '" alt="' + logo + '" onclick="logoSelect(this);" /></div>');
			} else if(logo === '' || logo.indexOf("Black") >= 0 || logo.indexOf("Red") >= 0 || logo.indexOf("Borderless-White") >= 0) {
				
			} else if(logo === 'Pike Elementary' || logo === 'Pike Elementary - White') {
				logoAlt = logo.replace(/\s/g, '').replace('-', ''),
				logo_path = '/files/pdfsthumbnail/' + logoAlt + '.png';

				$(this).closest('.product-input').find('.logo-icons').append('<div class="col-sm-3"><img class="logo-icon" src="' + logo_path + '" alt="' + logo + '" onclick="logoSelect(this);" /></div>');
			} else {
				$(this).closest('.product-input').find('.logo-icons').append('<div class="col-sm-3"><img class="logo-icon" src="' + logo_path + '" alt="' + logo + '" onclick="logoSelect(this);" /></div>');
			}
		});

		if (window.location.href.indexOf("cc=993") > -1 && window.location.href.indexOf("Cross+Country") > -1) {
			$('.logo-icon[alt="Pike-Wordmark"]').parent().hide();
			$('.logo-icon[alt="Pike-Devil"]').parent().hide();
			$('.logo-icon[alt="Pike Elementary"]').parent().hide();
			$('.logo-icon[alt="Pike Elementary - White"]').parent().hide();
		}

		if (window.location.href.indexOf("cc=993") > -1 && window.location.href.indexOf("Football") > -1) {
			$('.logo-icon[alt="Pike-CC-Wordmark-V-White"]').parent().hide();
			$('.logo-icon[alt="Pike-CC-Wordmark-White"]').parent().hide();
			$('.logo-icon[alt="Pike-CC-Wordmark-Red"]').parent().hide();
			$('.logo-icon[alt="Pike-P-Borderless"]').parent().hide();
			$('.logo-icon[alt="Pike-P-White"]').parent().hide();
			$('.logo-icon[alt="Pike-P-White-Red"]').parent().hide();
			$('.logo-icon[alt="Pike Elementary"]').parent().hide();
			$('.logo-icon[alt="Pike Elementary - White"]').parent().hide();
		}

		if (window.location.href.indexOf("cc=993") > -1 && window.location.href.indexOf("Fan") > -1) {
			$('.logo-icon[alt="Pike-CC-Wordmark-V-White"]').parent().hide();
		}

		$('.logo-icon').each(function() {
			var logo = $(this);

			$(this).parent().on('click', function() {
				logoSelect(logo);
			});
		});

		$('.logo-icons').find('.logo-icon').first().addClass('selected');

		$('#Logo').hide();
		$('#LogoCenter').closest('.row').hide();
		$('#Logo').closest('.row').find('.logo-icons').removeClass('hide');

		// Get the description list from the "Description" field.
		$('#Description > option').each(function() {
			var li = $(this).text();

			if(li === '') {
				$('.description-list').closest('.tab-pane').removeClass('active in').hide();
				$('#description-tab').removeClass('active').hide();
				$('#charges-tab').parent().addClass('active');
				$('#delivery').addClass('active in');
			} else {
				$('.description-list').find('ul').append('<li>' + li + '</li>');
				$('.description-list').closest('.tab-pane').addClass('active in').show();
				$('#description-tab').addClass('active').show();
				$('#charges-tab').parent().removeClass('active');
				$('#delivery').removeClass('active in');
			}
		});

		var selected_category = localStorage.getItem('Category');

		setTimeout(function() {
			if(selected_category === 'women' || selected_category === 'mandatory-women') {
				if(product_id === '6523') {
					$('.description-list ul').find('li').first().before('<li>This product normally runs large, please see the product sizing chart by clicking on "View Product Specsheet", and order accordingly. If your size smaller than the smallest size on the specsheet, you may consider ordering the <a href="https://intuitivehealth.mybrandstorefront.com/Step1New.asp?Type=Track+%26+Field&front=7402&cc=993&itemname=Adidas+Team+Issue+Jacket+113UFLP">Adidas Team Issue Jacket</a> instead.</li>');
				}

				if(product_id === '350B') {
					$('.description-list ul').find('li').first().before('<li>This product normally runs large, please see the product sizing chart by clicking on "View Product Specsheet", and order accordingly. If your size smaller than the smallest size on the specsheet, you may consider ordering the <a href="https://intuitivehealth.mybrandstorefront.com/Step1New.asp?Type=Track+%26+Field&front=7403&cc=993&itemname=Adidas+Women%27s+Team+Issue+Pants+1272">Adidas Womens Team Issue Pants</a> instead.</li>');
				}
			}
		}, 500);

		if($('.description-list').find('ul li').length <= 0) {
			$('.description').find('.details').hide();
			$('.description').find('.product-specsheet').hide();
		}

		$('#LogoPlacement').on('change', function() {
			var logo = $('.logo-icon.selected');
			logoSelect(logo);

			if($(this).val() === 'Center Chest') {
				$(this).parent().append('<span class="screenprint-disclaimer" style="color: #ff0000;"><b>Screenprinting requires 10 of the same product to be ordered. If 10 items do not get ordered, your piece will be embroidered instead.</b></span>');
			} else if($(this).val() === 'Left Chest') {
				$('.screenprint-disclaimer').remove();
			}
		});

		$('#Method').on('change', function() {
			var method = $(this).val(),
				logo = $('.logo-icon.selected');

			sessionStorage.setItem('Method', method);

			if(method === 'Embroidery') {
				$('#LogoPlacement option[value="Left Chest"]').prop('selected', true);
				$('#LogoPlacement').attr('disabled', true);

				$('.logo-icon.selected').removeClass('selected');
				$('.logo-icon[alt="Pike-P"]').addClass('selected');

				logo = $('.logo-icon.selected');

				$('.logo-icon[alt="Pike-CC-Wordmark-Red"]').parent().hide();
				$('.logo-icon[alt="Pike-CC-Wordmark-White"]').parent().hide();
				$('.logo-icon[alt="Pike-P-Borderless"]').parent().hide();
				$('.logo-icon[alt="Pike-P-White"]').parent().hide();
				$('.logo-icon[alt="Pike-P-White-Red"]').parent().hide();
				logoSelect(logo);
			} else if(method === 'Screenprint') {
				$('#LogoPlacement').removeAttr('disabled');

				if (window.location.href.indexOf("cc=993") > -1 && window.location.href.indexOf("Football") > -1) {

				} else {
					$('.logo-icon[alt="Pike-CC-Wordmark-Red"]').parent().show();
					$('.logo-icon[alt="Pike-CC-Wordmark-White"]').parent().show();
					$('.logo-icon[alt="Pike-P-Borderless"]').parent().show();
					$('.logo-icon[alt="Pike-P-White"]').parent().show();
					$('.logo-icon[alt="Pike-P-White-Red"]').parent().show();
				}
				logoSelect(logo);
			} else {
				logoSelect(logo);
			}
		});

		// Get the pricing table from the "PriceTable" field.
		var current = 0,
			type = $('.front-back-title').text();

		if(type.indexOf("Shoes") >= 0) {
			var size = $('#PriceTable').html(),
				price = $('#PriceTable').closest('.row').find('h5 b').text().replace(':', '').replace('$', ''),
				price = parseFloat(price);

			$('#Logo').closest('.row').hide();
			$('.product-pricing').find('.table tbody').append('<tr><td><select id="ShoeSize">' + size + '</select></td><td class="item-price">$' + parseFloat(price).toFixed(2) + '</td><td><input type="text" class="quantity spinner shoe-size" id="ShoeQuantity" value="0"></td></tr>');
			
			$('#ShoeSize').on('change', function() {
				size = $(this).val();
				sessionStorage.setItem('ShoeSize', size);
			});
		} else {
			$('#PriceTable > option').each(function() {
				if(product_id === 'PP' || product_id === '1271-126Y') {
					var product = $(this).text(),
						price = $(this).closest('.row').find('h5 b').text().replace(':', '').replace('$', ''),
						price = parseFloat(price);

					if(product !== '') {
						$('.product-pricing').find('.table tbody').append('<tr><td>' + product + '</td><td><select class="pack size" pack="item' + current + '"><option value="Small">Small</option><option value="Medium">Medium</option><option value="Large">Large</option><option value="Extra Large">Extra Large</option><option value="2X Large">2X Large</option><option value="3X Large">3X Large</option></select></td></tr>');
					}
					current++;
				} else {
					var size = $(this).text(),
						price = $(this).closest('.row').find('h5 b').text().replace(':', '').replace('$', ''),
						price = parseFloat(price),
						id = size.replace(' ', ''),
						classes = id.toLowerCase();

					if(size === '') {

					} else {
						sessionStorage.setItem('Price', '$' + parseFloat(price).toFixed(2));
						$('.product-pricing').find('.table tbody').append('<tr><td>' + size + '</td><td class="item-price">$' + parseFloat(price).toFixed(2) + '</td><td><input type="text" class="quantity spinner ' + classes + '" id="' + id + '" value="0"></td></tr>');
					}
				}
			});
		}

		if($('.quantity').length >= 1) {
			$('.product-pricing').find('.table tbody').append('<tr class="hide"><td><span class="total-cost"></span></td></tr>');
		}

		if(product_id === 'PP' || product_id === '1271-126Y') {
			var price = $('#PriceTable').closest('.row').find('h5 b').text().replace(':', '').replace('$', ''),
				price = parseFloat(price).toFixed(2);

			$('input[name="btnSubmit"]').removeAttr('disabled');
			
			$('.product-pricing').find('.table thead tr th').last().remove();
			$('.product-pricing').find('.table thead tr th').first().text('Product');
			$('.product-pricing').find('.table thead tr th').last().text('Size');
			$('.product-pricing').find('.table tbody').append('<tr><td align="right"><b>Cost:</b></td><td align="right"><b>$' + price + '</b></td></tr>');
			$('.product-specsheet').remove();

			$('#delivery').find('ul').html("<li><b>Don't worry! If you missed the June deadline to order your Pride back by, please continue and place your order now.</b></li><li><b>Please note, your order will not be distributed among the other player packs that were submitted, prior to the cutoff date provided to the team, but will be mailed to your provided address when complete.</b></li><li>Player Packs will be delivered to Coach Graves on July 9th for distrubution to the team.</li>");

			$('.pack.size').each(function() {
				var item = $(this).attr('pack'),
					size = $(this).val();

				sessionStorage.setItem(item, size);

				$(this).on('change', function() {
					var item = $(this).attr('pack'),
						size = $(this).val();

					sessionStorage.setItem(item, size);
				});
			});
		}

		// Grab the first color available (needs to be done after the color icons have been created).
		var first_color = $('.product-colors').find('.color').first().attr('color');

		// Make sure the first color available is saved in case the user does not manually select one.
		if(sessionStorage.getItem('Color') === null) {
			setTimeout(function() {
				$('#Color > option').each(function() {
					var option = $(this).text(),
						color = option.split('-').pop();

					if(first_color === color) {
						$(this).prop('selected', true);
						sessionStorage.setItem('Color', first_color);
					}
				});
			}, 1000);
		}

		if(sessionStorage.getItem('Logo') === null) {

			var selected = $('#Logo option[selected]').text();

			setTimeout(function() {
				$('#Logo > option').each(function() {
					var option = $(this).text();

					if(selected === option) {
						$(this).prop('selected', true);

						if(selected === 'Pike-P') {
							selected_logo = 'Pike P - Grey Border';
						} 

						if(selected === 'Pike-P-Black') {
							selected_logo = 'Pike P - Red Border';
						}

						if(selected === 'Pike-P-White') {
							selected_logo = 'Pike P - White Border';
						}

						if(selected === 'Pike-Devil') {
							selected_logo = 'Pike Devil - Red';
						}

						if(selected === 'Pike-Devil-Red') {
							selected_logo = 'Pike Devil - Black';
						}

						if(selected === 'Pike-Football') {
							selected_logo = 'Pike Football - Red/Black';
						}

						if(selected === 'Pike-Football-Red') {
							selected_logo = 'Pike Football - White/Black';
						}

						if(selected === 'Pike-Football-Black') {
							selected_logo = 'Pike Football - Red/White';
						}

						if(selected === 'Pike-P-Borderless') {
							selected_logo = 'Pike P - Red/Borderless';
						}

						if(selected === 'Pike-P-Borderless-White') {
							selected_logo = 'Pike P - White/Borderless';
						}

						if(selected === 'Pike-P-White-Red') {
							selected_logo = 'Pike P - White/Red';
						}

						if(selected === 'Pike-CC-Wordmark-Red') {
							selected_logo = 'Pike CC Wordmark - Red';
						}

						if(selected === 'Pike-CC-Wordmark-White') {
							selected_logo = 'Pike CC Wordmark - White';
						}

						if(selected === 'Pike-CC-Wordmark-V-White') {
							selected_logo = 'Pike CC Wordmark V - White';
						}

						if (window.location.href.indexOf("7179") > -1) {
							if(selected === 'Pike-P') {
								selected_logo = 'Pike P - Grey Border';
							}
						}


						sessionStorage.setItem('Logo', selected_logo);
					}
				});
			}, 1000);
		}

		if(sessionStorage.getItem('Method') === null) {
			setTimeout(function() {
				var method = $('#Method').find('option[selected]').text();
				sessionStorage.setItem('Method', method)
			}, 1000);
		}

		// Hide the original templates "Color" field created by the template.
		$('#Color').closest('.row').hide();

		// Hide the original templates "Description" field created by the template.
		$('#Description').closest('.row').hide();

		// Hide the original templates "PriceTable" field created by the template.
		$('#PriceTable').closest('.row').hide();

		// Initiate the spinners on the quantity text fields.
		$( ".spinner" ).spinner({
			icons: { 
				down: "ui-icon-caret-1-s", 
				up: "ui-icon-caret-1-n" 
			},
			min: 0
		});

		// Get the count and price of the selected quantity selected by the user (on blur).
		$('.spinner').each(function() {
			$(this).on('blur', function() {
				var input = $(this);
				var value = $(this).val();
				var id = $(this).attr('id');
				var price_id = $(this).attr('id') + 'Price';
				var item_price = parseFloat($(this).closest('tr').find('.item-price').text().replace('$', '')).toFixed(2);
				var order_price = parseFloat(item_price * value).toFixed(2);
				var total_pieces = parseFloat($(this).closest('table').find('.total-pieces').text());

				if(value > 0) {
					$(this).closest('tr').addClass('bold');
					sessionStorage.setItem(id, value);
					sessionStorage.setItem(price_id, order_price);
					calcCost(input, value);
				} else if(value <= 0) {
					$(this).closest('tr').removeClass('bold');
					sessionStorage.removeItem(id);
					sessionStorage.removeItem(price_id, order_price);
					calcCost(input, value);
				}

				if(id === '2XLarge' && value > 25 || id === '3XLarge' && value > 25 || id === '4XLarge' && value > 25) {
					alert('You have exceeded our in-stock quantity for this size: ' + id + '\n\nThe quantity as been set at the maximum quantity we have in stock for this size\n\nIf you require more, please give us a call at 888.955.PROMO and we will be happy to assist you.');
					$(this).closest('table').find('#' + id).val('25');
					$(this).closest('table').find('#' + id).focus();

					setTimeout(function() {
						calcCost(input, value);
					}, 500);
					
					return false;
				}

				if($(this).closest('table').find('.total-cost').text() !== '$0.00') {
					$('input[name="btnSubmit"]').removeAttr('disabled');
				} else {
					$('input[name="btnSubmit"]').attr('disabled', 'disabled');
				}
			});
		});

		// Get the comments entered by the user.
		$('.comment').on('keyup', function() {
			sessionStorage.setItem('Comment', $(this).val());
		});

		// Initiate the thumbnail "zoom" capabilities. 
		setTimeout(function() {
			$("#thumbLP").elevateZoom({
				tint:true, 
				tintColour:'#000000', 
				tintOpacity:0.5, 
				zoomWindowPosition: 1, 
				scrollZoom : true
			});
			$('#spnFrontProof a.highslide').removeAttr('onclick');
			$('#spnFrontProof a.highslide').removeAttr('href');
		}, 1000);
	}


	/** ----------------------------------------------------------------------
	 ** Step5Edit Scripts
	 ** ----------------------------------------------------------------------
	 **
	 ** The scripts below will control the user experience when the user edits
	 ** a product they have already added to the cart.
	 **
	 **/

	if (window.location.href.indexOf("Step5Edit.asp") > -1) {

		// Create all of the session items for the sizes the user previously selected.
		var ExtraSmall = sessionStorage.getItem('ExtraSmall');
		var Small = sessionStorage.getItem('Small');
		var Medium = sessionStorage.getItem('Medium');
		var Large = sessionStorage.getItem('Large');
		var ExtraLarge = sessionStorage.getItem('ExtraLarge');
		var TwoXLarge = sessionStorage.getItem('2XLarge');
		var ThreeXLarge = sessionStorage.getItem('3XLarge');
		var FourXLarge = sessionStorage.getItem('4XLarge');

		// Set the comments previously entered to a session item.
		if(sessionStorage.getItem('Comment') !== '') {
			var Comment = sessionStorage.getItem('Comment');
		} else {
			var Comment = '';
		}

		// Create the "sizebox" variable.
		var sizebox;

		// Set the color previously selected to a session item.
		var Color = sessionStorage.getItem('Color');

		// Create the "product" variable so the correct product information can be displayed.
		var product = $('.product-id').first().text();

		// Check each of the rows in the "Product Pricing" table and apply the quantities appropriately.
		$('.' + product + ' table tr').each(function() {
			var input = $(this).find('input');
			var value = $(this).find('input').val();

			if(input.attr('id') === 'ExtraSmall') {
				input.val(ExtraSmall);
				value = input.val();
				var price_id = input.attr('id') + 'Price';
				var item_price = parseFloat(input.closest('tr').find('.item-price').text().replace('$', '')).toFixed(2);
				var order_price = parseFloat(item_price * value).toFixed(2);
				sessionStorage.setItem(price_id, order_price);
				if(parseFloat(value) > 0) {
					$(this).closest('tr').addClass('bold');
				}
			}
			if(input.attr('id') === 'Small') {
				input.val(Small);
				value = input.val();
				var price_id = input.attr('id') + 'Price';
				var item_price = parseFloat(input.closest('tr').find('.item-price').text().replace('$', '')).toFixed(2);
				var order_price = parseFloat(item_price * value).toFixed(2);
				sessionStorage.setItem(price_id, order_price);
				if(parseFloat(value) > 0) {
					$(this).closest('tr').addClass('bold');
				}
			}
			if(input.attr('id') === 'Medium') {
				input.val(Medium);
				value = input.val();
				var price_id = input.attr('id') + 'Price';
				var item_price = parseFloat(input.closest('tr').find('.item-price').text().replace('$', '')).toFixed(2);
				var order_price = parseFloat(item_price * value).toFixed(2);
				sessionStorage.setItem(price_id, order_price);
				if(parseFloat(value) > 0) {
					$(this).closest('tr').addClass('bold');
				}
			}
			if(input.attr('id') === 'Large') {
				input.val(Large);
				value = input.val();
				var price_id = input.attr('id') + 'Price';
				var item_price = parseFloat(input.closest('tr').find('.item-price').text().replace('$', '')).toFixed(2);
				var order_price = parseFloat(item_price * value).toFixed(2);
				sessionStorage.setItem(price_id, order_price);
				if(parseFloat(value) > 0) {
					$(this).closest('tr').addClass('bold');
				}
			}
			if(input.attr('id') === 'ExtraLarge') {
				input.val(ExtraLarge);
				value = input.val();
				var price_id = input.attr('id') + 'Price';
				var item_price = parseFloat(input.closest('tr').find('.item-price').text().replace('$', '')).toFixed(2);
				var order_price = parseFloat(item_price * value).toFixed(2);
				sessionStorage.setItem(price_id, order_price);
				if(parseFloat(value) > 0) {
					$(this).closest('tr').addClass('bold');
				}
			}
			if(input.attr('id') === '2XLarge') {
				input.val(TwoXLarge);
				value = input.val();
				var price_id = input.attr('id') + 'Price';
				var item_price = parseFloat(input.closest('tr').find('.item-price').text().replace('$', '')).toFixed(2);
				var order_price = parseFloat(item_price * value).toFixed(2);
				sessionStorage.setItem(price_id, order_price);
				if(parseFloat(value) > 0) {
					$(this).closest('tr').addClass('bold');
				}
			}
			if(input.attr('id') === '3XLarge') {
				input.val(ThreeXLarge);
				value = input.val();
				var price_id = input.attr('id') + 'Price';
				var item_price = parseFloat(input.closest('tr').find('.item-price').text().replace('$', '')).toFixed(2);
				var order_price = parseFloat(item_price * value).toFixed(2);
				sessionStorage.setItem(price_id, order_price);
				if(parseFloat(value) > 0) {
					$(this).closest('tr').addClass('bold');
				}
			}
			if(input.attr('id') === '4XLarge') {
				input.val(FourXLarge);
				value = input.val();
				var price_id = input.attr('id') + 'Price';
				var item_price = parseFloat(input.closest('tr').find('.item-price').text().replace('$', '')).toFixed(2);
				var order_price = parseFloat(item_price * value).toFixed(2);
				sessionStorage.setItem(price_id, order_price);
				if(parseFloat(value) > 0) {
					$(this).closest('tr').addClass('bold');
				}
			}
			calcCost(input, value);
		});

		// Set the comments that was previously entered.
		$('.' + product + ' #comment.comment').val(Comment);

		// Make sure the user can submit the product to the cart by removing the "disabled" attribute.
		$('input[name="btnSubmit"]').removeAttr('disabled');
	}


	/** ----------------------------------------------------------------------
	 ** ProofStationery Scripts - EDIT PRODUCT
	 ** ----------------------------------------------------------------------
	 **
	 ** The scripts below will control the user experience when the user edits
	 ** a product they have already added to the cart. This section will grab
	 ** all of the products details that were previously entered and create
	 ** session items to use on the Step5Edit page.
	 **
	 **/

	if (window.location.href.indexOf("ProofStationery.asp?bc") > -1) {

		// Set the loading screen to make sure the user does not see the ugly ProofStationery page.
		$('.loading').find('.loading-text h3').first().text('Gathering your product information.');

		// Set the classes on each of the "Extra Product Fields".
		$('.size').each(function() {
			sizebox = $(this).attr('class').split(' ')[1];
	        $(this).closest('tr').find('.DescriptionText').last().find('input').first().attr('class', 'sizequantity ' + sizebox);
	    });

	    // Grab all of the options saved into the "Extra Product Fields" and calculate the total quantity and cost.
	    $('.sizequantity').each(function() {
			if($(this).val().length <= 0) {
				$(this).val('0');
			}
			$(this).on('change', function() {
				calculateQuantity(sizebox);
			});

			calculateQuantity(sizebox);
		});

	    // This entire section grabs the options that have values and sets them to the appropriate session item.
	    setTimeout(function() {
	    	var Color = sessionStorage.setItem('Color', $('#NJB').val());

	    	if($('.sizequantity.extrasmall').length) {
				var ExtraSmall = sessionStorage.setItem('ExtraSmall', $('.sizequantity.extrasmall').val());
			}

			if($('.sizequantity.small').length) {
				var Small = sessionStorage.setItem('Small', $('.sizequantity.small').val());
			}

			if($('.sizequantity.medium').length) {
				var Medium = sessionStorage.setItem('Medium', $('.sizequantity.medium').val());
			}

			if($('.sizequantity.large').length) {
				var Large = sessionStorage.setItem('Large', $('.sizequantity.large').val());
			}
			
			if($('.sizequantity.extralarge').length) {
				var ExtraLarge = sessionStorage.setItem('ExtraLarge', $('.sizequantity.extralarge').val());
			}

			if($('.sizequantity.2xlarge').length) {
				var TwoXLarge = sessionStorage.setItem('2XLarge', $('.sizequantity.2xlarge').val());
			}
			
			if($('.sizequantity.3xlarge').length) {
				var ThreeXLarge = sessionStorage.setItem('3XLarge', $('.sizequantity.3xlarge').val());
			}
			if($('.sizequantity.4xlarge').length) {
				var FourXLarge = sessionStorage.setItem('4XLarge', $('.sizequantity.4xlarge').val());
			}
			if($('#Comments').val() !== '') {
				var Comment = sessionStorage.setItem('Comment', $('#Comments').val());
			} else {
				var Comment = sessionStorage.setItem('Comment', '');
			}
	    }, 500);

	    // Wrap all of the NexJob Options in necessary elements.
		$('#BaseCaption, #BaseValues').wrapAll('<div class="selected-color"></div>');
		$('#QuantityCaption, #QuantityValues').wrapAll('<div class="selected-quantity"></div>');

		// Direct the user to the Step5Edit page once all of the information has been set.
		setTimeout(function() {
			$('input[value="Edit Artwork Details"]').click();
		}, 2500);
	}


	/** ----------------------------------------------------------------------
	 ** ProofStationery Scripts
	 ** ----------------------------------------------------------------------
	 **
	 ** The scripts below will control the user experience when the user
	 ** submits a product to the cart.
	 **
	 **/

	if (window.location.href.indexOf("ProofStationery.asp?BC") > -1) {

		// Set the classes on each of the "Extra Product Fields".
		$('.DescriptionText').each(function() {
			var label = $(this).closest('tr').find('.DescriptionText').first().text(),
				size = label.replace(/\s+/g, '').toLowerCase();
			$(this).closest('tr').find('.DescriptionText').last().find('input').first().attr('class', 'sizequantity ' + size);
		});

		$('.size').each(function() {
			sizebox = $(this).attr('class').split(' ')[1];
	        $(this).closest('tr').find('.DescriptionText').last().find('input').first().attr('class', 'sizequantity ' + sizebox);
	    });

	    $('.pack').each(function() {
			sizebox = $(this).attr('class').split(' ')[1];
	        $(this).closest('tr').find('.DescriptionText').last().find('input').first().attr('class', 'pack ' + sizebox);
	    });

	    var item1 = sessionStorage.getItem('item1');
	    var item2 = sessionStorage.getItem('item2');
	    var item3 = sessionStorage.getItem('item3');
	    var item4 = sessionStorage.getItem('item4');
	    var item5 = sessionStorage.getItem('item5');
	    var ShoeSize = sessionStorage.getItem('ShoeSize');
	    var ShoeQuantity = sessionStorage.getItem('ShoeQuantity');
	    var CoachesWhistle = sessionStorage.getItem('CoachesWhistle');
	    var OSFA = sessionStorage.getItem('OSFA');
	    var Logo = sessionStorage.getItem('Logo');
	    var Method = sessionStorage.getItem('Method');
	    var Placement = sessionStorage.getItem('Placement');

	    // This entire section grabs the options from the appropriate session items.
		var ExtraSmall = sessionStorage.getItem('ExtraSmall');
		var Small = sessionStorage.getItem('Small');
		var Medium = sessionStorage.getItem('Medium');
		var Large = sessionStorage.getItem('Large');
		var ExtraLarge = sessionStorage.getItem('ExtraLarge');
		var TwoXLarge = sessionStorage.getItem('2XLarge');
		var ThreeXLarge = sessionStorage.getItem('3XLarge');
		var FourXLarge = sessionStorage.getItem('4XLarge');
		if(sessionStorage.getItem('Comment') !== null) {
			var Comment = sessionStorage.getItem('Comment');
		} else {
			var Comment = '';
		}
		var sizebox;
		var Color = sessionStorage.getItem('Color');

		// Enters the session items into their respective "Extra Product Fields"
		setTimeout(function() {
			$('.extrasmall').val(ExtraSmall);
			$('.small').val(Small);
			$('.medium').val(Medium);
			$('.large').val(Large);
			$('.extralarge').val(ExtraLarge);
			$('.2xlarge').val(TwoXLarge);
			$('.3xlarge').val(ThreeXLarge);
			$('.4xlarge').val(FourXLarge);
			$('#Comments').val(Comment);

			$('.pack.item1').val(item1);
			$('.pack.item2').val(item2);
			$('.pack.item3').val(item3);
			$('.pack.item4').val(item4);

			if(ShoeQuantity !== null) {
				$('#NJQ option').each(function() {
				   	var quantity = $(this).text();

					if(ShoeQuantity === quantity) {
						$(this).prop('selected', true);
				    }
				});

				ExtrasChanged($('#NJQ').name);
			}

			$('.a-quantity').val(CoachesWhistle);
			$('.osfa').val(OSFA);

			calculateQuantity(sizebox);
		}, 500);

		setTimeout(function() {
			$('.shoesize').val(ShoeSize);
		}, 750);
		
		// Set the NexJob option Color field.
		$('#NJB > option[value="' + Color + '"]').prop('selected', true);
		$('.selected-color').text(Color);

		$('#NJE1 > option[value="Logo|' + Logo + '"]').prop('selected', true);
		$('#NJE2 > option[value="Placement|' + Placement + '"]').prop('selected', true);
		$('#NJE3 > option[value="Method|' + Method + '"]').prop('selected', true);

		// Calculate the total quantity.
		$('.sizequantity').each(function() {
			$(this).val('0');
			$(this).on('change', function() {
				calculateQuantity(sizebox);
			});
		});

		// Wrap the NexJob Option fields in appropriate elements.
		$('#BaseCaption, #BaseValues').wrapAll('<div class="selected-color"></div>');
		$('#QuantityCaption, #QuantityValues').wrapAll('<div class="selected-quantity"></div>');

		// Submit the product to the cart.
		setTimeout(function() {
			$('#btnCart').click();
		}, 2500);
	}


	/** ----------------------------------------------------------------------
	 ** Cart Scripts
	 ** ----------------------------------------------------------------------
	 **
	 ** The scripts below will control the way the content is displayed in the
	 ** cart.
	 **
	 **/

	if (window.location.href.indexOf("cart.asp") > -1 || window.location.href.indexOf("Cart.asp") > -1) {

		// Get the "Guest" variable.
		var login = localStorage.getItem('Login');
		var guest = sessionStorage.getItem('Guest');

		// Check the "Guest" variable, if it exists, do not show the login/register modal on the cart.
		if(login !== 'Yes' && guest !== 'Yes') {
			$('#tabLoginDetails').modal('show');
		}

		// Remove the "colspan" attribute from the table.
		if($('#tabDelDetails').length > 0) {
			$('.bordertableheader[colspan="2"]').attr('colspan', '');	
		}

		// Change the text to display "Delivery Details".
		$('#tabDelDetails').first('tr').find('.bordertableheader b').text('Delivery Details');

		// Below we are adding an asterick on each of the required fields (OPS does not do this by default).
		$('#tabDelDetails').find('tr:nth-of-type(3)').find('td').first().append('<span class="required">*</span>');
		$('#tabDelDetails').find('tr:nth-of-type(4)').find('td').first().append('<span class="required">*</span>');

		setTimeout(function() {
			$('#tabDelDetails').find('tr:nth-of-type(6)').find('table tr:nth-of-type(1)').find('td').first().append('<span class="required">*</span>');
			$('#tabDelDetails').find('tr:nth-of-type(6)').find('table tr:nth-of-type(3)').find('td').first().append('<span class="required">*</span>');
			$('#tabDelDetails').find('tr:nth-of-type(6)').find('table tr:nth-of-type(4)').find('td').first().append('<span class="required">*</span>');
			$('#tabDelDetails').find('tr:nth-of-type(6)').find('table tr:nth-of-type(5)').find('td').first().append('<span class="required">*</span>');

			$('#billadr').find('table tr:nth-of-type(1)').find('td').first().append('<span class="required">*</span>');
			$('#billadr').find('table tr:nth-of-type(3)').find('td').first().append('<span class="required">*</span>');
			$('#billadr').find('table tr:nth-of-type(4)').find('td').first().append('<span class="required">*</span>');
			$('#billadr').find('table tr:nth-of-type(5)').find('td').first().append('<span class="required">*</span>');
		}, 1000);

		// Break up each of the "Extra Product Fields" into separate paragraph elements.
		$(".extraorderfields").each(function() {
			var lines = $(this).html().split("<br>");
			$(this).html('<p>' + lines.join("</p><p>") + '</p>');
		});

		// Check each paragraph element and remove the empty ones.
		$('.extraorderfields p').each(function() {
			var text = $(this).text(),
				label = $(this).find('b').text(),
				filter = $.trim(text.replace(label, ''));
			if(filter === '0') {
				$(this).remove();
			}

			var label = $(this).find('b').text().replace(':', '');
			$(this).addClass(label);
		});

		// Below we are checking for doubles and removing the first shown.
		if($('.2X.Large').length >= 2){
			$('.2X.Large').first().remove();
		}
		
		if($('.3X.Large').length >= 2){
			$('.3X.Large').first().remove();
		}

		if($('.4X.Large').length >= 2){
			$('.4X.Large').first().remove();
		}

		if($('.Quantity').length >= 2){
			$('.Quantity').last().remove();
		}

		// If the "Guest" variable is not set and the user clicks on "Continue as Guest", set the "Guest" variable.
		$('#Guest').on('click', function() {
			sessionStorage.setItem('Guest', 'Yes');
		});

		// Hide the product id in the cart.
		$('.table.table-hover tbody tr').each(function() {
		   	$(this).find('td:nth-of-type(5)').each(function() {
		        var $this = $(this);
		        $this.html($this.html().replace(/(\S+)\s*$/, '<span class="product-id hide">$1</span>'));
		    }); 
		});

		// Hide the file location from the user on the cart.
		$('.file').closest('p').hide();

		$('.table.table-hover').find('tr').find('td:nth-child(6)').contents().filter(function() {
			return this.nodeType == 3; //Node.TEXT_NODE
		}).remove();

		// Get the "Guest" variable, then reset the session item to make sure it is correctly set.
		var role = localStorage.getItem('Role');
		var login = localStorage.getItem('Login');
		var guest = sessionStorage.getItem('Guest');

		sessionStorage.clear();

		localStorage.setItem('Role', role);
		localStorage.setItem('Login', login);
		sessionStorage.setItem('Guest', guest);
	}


	/** ----------------------------------------------------------------------
	 ** Checkout Scripts
	 ** ----------------------------------------------------------------------
	 **
	 ** The scripts below will control the way the content is displayed on the
	 ** checkout page.
	 **
	 **/

	if(window.location.href.indexOf("Checkout.asp") > -1) {
		var row = $('table tr td input[value="5"]').parent().parent().clone();
		$('table tr td input[value="5"]').closest('table').append(row);
		$('table tr td input[value="5"]').first().closest('tr').remove();

		if($('.nav-top-links').find('.guest').length > 0) {

		} else {
			$('.additional-email').find('input').removeAttr('required');
			$('.additional-email').find('span').remove();
		}
	}


	/** ----------------------------------------------------------------------
	 ** Payment Scripts
	 ** ----------------------------------------------------------------------
	 **
	 ** The scripts below will control the way the content is displayed on the
	 ** payments page.
	 **
	 **/

	if(window.location.href.indexOf("Payment.asp") > -1) {
		$('.PaymentDetails').find('table tbody tr:nth-of-type(2)').find('.bordertable').addClass('payments-table table table-hover');
	}


	/** ----------------------------------------------------------------------
	 ** OrderThankYou Scripts
	 ** ----------------------------------------------------------------------
	 **
	 ** The scripts below will control the way the content is displayed on the
	 ** payments page.
	 **
	 **/

	if (window.location.href.indexOf("OrderThankYou.asp") > -1 || window.location.href.indexOf("orderthankyou.asp") > -1) {
		var lines = $(".extraorderfields").html().split("<br>");
		$(".extraorderfields").html('<p>' + lines.join("</p><p>") + '</p>');
	}
});


/** ----------------------------------------------------------------------
 ** Calulate Cost Function
 ** ----------------------------------------------------------------------
 **
 ** The scripts below, when called, will calculate the total cost of the
 ** quantities selected by the user.
 **
 **/

function calcCost(input, value) {

	// Get all of the sizes selected from the session items.
	var SXNumber = sessionStorage.getItem('ExtraSmall');
	var SNumber = sessionStorage.getItem('Small');
	var MNumber = sessionStorage.getItem('Medium');
	var LNumber = sessionStorage.getItem('Large');
	var ELNumber = sessionStorage.getItem('ExtraLarge');
	var EL2Number = sessionStorage.getItem('2XLarge');
	var EL3Number = sessionStorage.getItem('3XLarge');
	var EL4Number = sessionStorage.getItem('4XLarge');

	// Check to see if each session exists.
	if(SXNumber !== null) {
		SXNumber = parseFloat(SXNumber);
	} else {
		SXNumber = 0;
	}

	if(SNumber !== null) {
		SNumber = parseFloat(SNumber);
	} else {
		SNumber = 0;
	}

	if(MNumber !== null) {
		MNumber = parseFloat(MNumber);
	} else {
		MNumber = 0;
	}

	if(LNumber !== null) {
		LNumber = parseFloat(LNumber);
	} else {
		LNumber = 0;
	}

	if(ELNumber !== null) {
		ELNumber = parseFloat(ELNumber);
	} else {
		ELNumber = 0;
	}

	if(EL2Number !== null) {
		EL2Number = parseFloat(EL2Number);
	} else {
		EL2Number = 0;
	}

	if(EL3Number !== null) {
		EL3Number = parseFloat(EL3Number);
	} else {
		EL3Number = 0;
	}

	if(EL4Number !== null) {
		EL4Number = parseFloat(EL4Number);
	} else {
		EL4Number = 0;
	}

	// Add all quantities to gather the total.
	Total = parseFloat(SXNumber) + parseFloat(SNumber) + parseFloat(MNumber) + parseFloat(LNumber) + parseFloat(ELNumber) + parseFloat(EL2Number) + parseFloat(EL3Number) + parseFloat(EL4Number);
	input.closest('table').find('.total-pieces').text(parseFloat(Total));

	// Check to see if the total is more the 95 pieces.
	if(parseFloat(Total) >= 96) {
		var sum = 0;
		$('.spinner').each(function(){
		    sum += parseFloat(this.value);
		});
		var subtract = sum - 95;
		input.val(value - subtract);

		alert('If you require more than 95 pieces of this style, please call +855.955.PROMO and we would be happy to assist you.');

		var total = 0;
		$('.spinner').each(function(){
		    total += parseFloat(this.value);
		});
		input.closest('table').find('.total-pieces').text(total);

		return false;
	}

	// Get all of the prices for each size from the session items.
	var ExtraSmall = sessionStorage.getItem('ExtraSmallPrice');
	var Small = sessionStorage.getItem('SmallPrice');
	var Medium = sessionStorage.getItem('MediumPrice');
	var Large = sessionStorage.getItem('LargePrice');
	var ExtraLarge = sessionStorage.getItem('ExtraLargePrice');
	var TwoXLarge = sessionStorage.getItem('2XLargePrice');
	var ThreeXLarge = sessionStorage.getItem('3XLargePrice');
	var FourXLarge = sessionStorage.getItem('4XLargePrice');
	var ShoeQuantityPrice = sessionStorage.getItem('ShoeQuantityPrice');
	var CoachesWhistlePrice = sessionStorage.getItem('CoachesWhistlePrice');
	var OSFA = sessionStorage.getItem('OSFA');
	var Cost;

	// Check to see if each session item is not null.
	// 
	// 
	if(OSFA !== null) {
		OSFA = parseFloat(OSFA, 10).toFixed(2);
	} else {
		OSFA = 0;
	}

	if(ShoeQuantityPrice !== null) {
		ShoeQuantityPrice = parseFloat(ShoeQuantityPrice, 10).toFixed(2);
	} else {
		ShoeQuantityPrice = 0;
	}

	if(CoachesWhistlePrice !== null) {
		CoachesWhistlePrice = parseFloat(CoachesWhistlePrice, 10).toFixed(2);
	} else {
		CoachesWhistlePrice = 0;
	}

	if(ExtraSmall !== null) {
		ExtraSmall = parseFloat(ExtraSmall, 10).toFixed(2);
	} else {
		ExtraSmall = 0;
	}

	if(Small !== null) {
		Small = parseFloat(Small, 10).toFixed(2);
	} else {
		Small = 0;
	}

	if(Medium !== null) {
		Medium = parseFloat(Medium, 10).toFixed(2);
	} else {
		Medium = 0;
	}

	if(Large !== null) {
		Large = parseFloat(Large, 10).toFixed(2);
	} else {
		Large = 0;
	}

	if(ExtraLarge !== null) {
		ExtraLarge = parseFloat(ExtraLarge, 10).toFixed(2);
	} else {
		ExtraLarge = 0;
	}

	if(TwoXLarge !== null) {
		TwoXLarge = parseFloat(TwoXLarge, 10).toFixed(2);
	} else {
		TwoXLarge = 0;
	}

	if(ThreeXLarge !== null) {
		ThreeXLarge = parseFloat(ThreeXLarge, 10).toFixed(2);
	} else {
		ThreeXLarge = 0;
	}

	if(FourXLarge !== null) {
		FourXLarge = parseFloat(FourXLarge, 10).toFixed(2);
	} else {
		FourXLarge = 0;
	}

	// Add all pricing to get the total cost.
	Cost = parseFloat(ExtraSmall) + parseFloat(Small) + parseFloat(OSFA) + parseFloat(ShoeQuantityPrice) + parseFloat(CoachesWhistlePrice) + parseFloat(Medium) + parseFloat(Large) + parseFloat(ExtraLarge) + parseFloat(TwoXLarge) + parseFloat(ThreeXLarge) + parseFloat(FourXLarge);
	input.closest('table').find('.total-cost').text('$' + parseFloat(Cost).toFixed(2));
}


/** ----------------------------------------------------------------------
 ** Calulate Quantity Function
 ** ----------------------------------------------------------------------
 **
 ** The scripts below, when called, will calculate the quantity to make 
 ** sure the user does not exceed the availability of the product.
 **
 **/

function calculateQuantity(size) {
	var count = 0;
	var sizecount = 0;
	var xxl = $('.sizequantity.2xlarge');
	var xxxl = $('.sizequantity.3xlarge');
	var xxxxl = $('.sizequantity.4xlarge');

	$('.sizequantity').each(function() {
		if(!isNaN(this.value) && this.value.length != 0) {
			count += parseFloat(this.value);
		}
	});

	if(xxl.length) {
		if(xxl.val().length > 0) {
			sizecount = $('.sizequantity.2xlarge').val();

			if(sizecount > 25) {
				alert('2X Large has a maximum order quantity of 24 shirts.');
				sizecount = 25;
				$('.sizequantity.2xlarge').val('25');
				calculateQuantity('2xlarge');
				return;
			}

			$('#NJE2 option[value="2X Large|' + sizecount + '"]').prop('selected', true).trigger('change');
		}
	}

	if(xxxl.length) {
		if(xxxl.val().length > 0) {
			sizecount = $('.sizequantity.3xlarge').val();

			if(sizecount > 25) {
				alert('3X Large has a maximum order quantity of 24 shirts.');
				sizecount = 25;
				$('.sizequantity.3xlarge').val('25');
				calculateQuantity('3xlarge');
				return;
			}

			$('#NJE3 option[value="3X Large|' + sizecount + '"]').prop('selected', true).trigger('change');
		}
	}
	
	if(xxxxl.length) {
		if(xxxxl.val().length > 0) {
			sizecount = $('.sizequantity.4xlarge').val();

			if(sizecount > 25) {
				alert('4X Large has a maximum order quantity of 24 shirts.');
				sizecount = 25;
				$('.sizequantity.4xlarge').val('25');
				calculateQuantity('4xlarge');
				return;
			}

			$('#NJE4 option[value="4X Large|' + sizecount + '"]').prop('selected', true).trigger('change');
		}
	}

	$('.total-quantity').text(count);
	$('#NJQ option[value=' + count + ']').prop('selected', true).trigger('change');

	var price = $('#NJPriceTag').text();
	$('.total-price').text(price);
}


/** ----------------------------------------------------------------------
 ** Color Select Function
 ** ----------------------------------------------------------------------
 **
 ** The scripts below, when called, will get the color the user selects
 ** and change the proof and #Color field appropriately.
 **
 **/

function colorSelect(color) {
	var selected = $(color).attr('color');
	$('#Color > option').each(function() {
		var option = $(this).text(),
			color = option.split('-').pop();
			

		if(selected === color) {
			$(this).prop('selected', true);
		}
	});

	sessionStorage.setItem('Color', selected);
	var logo = $('.logo-icon.selected');
	RefreshProof();
	$('.zoomContainer').remove();
	$("#thumbLP").elevateZoom({
		tint:true, 
		tintColour:'#000000', 
		tintOpacity:0.5, 
		zoomWindowPosition: 1, 
		scrollZoom : true
	});
	$('#spnFrontProof a.highslide').removeAttr('onclick');
	$('#spnFrontProof a.highslide').removeAttr('href');
	logoSelect(logo);
}

function logoSelect(logo) {
	var selected = $(logo).attr('alt'),
		placement = $('#LogoPlacement').val(),
		color = sessionStorage.getItem('Color'),
		price = sessionStorage.getItem('Price'),
		selected_logo;

	$('.logo-icon').removeClass('selected');
	$(logo).addClass('selected');

	if(color.indexOf("Red") >= 0 && selected === 'Pike-Football') {
		selected = 'Pike-Football-Red';
	}

	if(color.indexOf("Black") >= 0 && selected === 'Pike-Football') {
		selected = 'Pike-Football-Black';
	}

	if(color.indexOf("Red") >= 0 && selected === 'Pike-Devil') {
		selected = 'Pike-Devil-Red';
	}

	if(color.indexOf("Red") >= 0 && selected === 'Pike-P-Borderless') {
		selected = 'Pike-P-Borderless-White';
	}

	if(color.indexOf("Black") >= 0 && selected === 'Pike-P-White-Red') {
		selected = 'Pike-P-White-Red';
	}

	if(color.indexOf("Grey") >= 0 && selected === 'Pike-CC-Wordmark-Red') {
		selected = 'Pike-CC-Wordmark-White';
	}

	if(color.indexOf("Red") >= 0 && selected === 'Pike-CC-Wordmark-Red') {
		selected = 'Pike-CC-Wordmark-White';
	}

	if(color.indexOf("White") >= 0 && selected === 'Pike-CC-Wordmark-White') {
		selected = 'Pike-CC-Wordmark-Red';
	}

	if(color.indexOf("Red") >= 0 && selected === 'Pike-P-White') {
		selected = 'Pike-P';
	}

	if(color.indexOf("White") >= 0 && selected === 'Pike-P-White') {
		selected = 'Pike-P';
	}

	if(placement === 'Left Chest' && selected === 'Pike-CC-Wordmark-Red') {
		selected = 'Pike-CC-Wordmark-V-White';
	}

	if(placement === 'Left Chest' && selected === 'Pike-CC-Wordmark-White') {
		selected = 'Pike-CC-Wordmark-V-White';
	}

	if(color.indexOf("White") >= 0 && selected === 'Pike-CC-Wordmark-V-White') {
		selected = 'Pike-P';
	}

	if(window.location.href.indexOf("7153") > -1) {
		if(color.indexOf('Black/White') >= 0 && selected === 'Pike-P') {
			selected = 'Pike-P-Black';
		}

		if(color.indexOf('White/Black') >= 0 && selected === 'Pike-P') {
			selected = 'Pike-P';
		}
	} else if(window.location.href.indexOf("7156") > -1) {
		if(color.indexOf('Black/Heathered Charcoal') >= 0 && selected === 'Pike-P') {
			selected = 'Pike-P-Black';
		}

		if(color.indexOf('White/Black') >= 0 && selected === 'Pike-P') {
			selected = 'Pike-P';
		}
	} else if(window.location.href.indexOf("7179") > -1) {
		if(color.indexOf('Black') >= 0 && selected === 'Pike-P-White') {
			selected = 'Pike-P-White';
		}

	} else if(window.location.href.indexOf("7158") > -1) {
		if(color.indexOf('Black') >= 0 && selected === 'Pike-P') {
			selected = 'Pike-P-Black';
		}

		if(color.indexOf('Black Heather') >= 0 && selected === 'Pike-P') {
			selected = 'Pike-P-Black';
		}

		if(color.indexOf('Dark Grey Heather') >= 0 && selected === 'Pike-P') {
			selected = 'Pike-P-Black';
		}
	} else {
		if(color.indexOf("Black") >= 0 && selected === 'Pike-P' && color.indexOf("Red") < 1 && color.indexOf("Heather") < 1 && color.indexOf("White") < 1) {
			selected = 'Pike-P-Black';
		}
	}

	if(color === 'Vintage Coal Black' && selected === 'Pike-P-Black') {
		selected = 'Pike-P';
	}

	if(selected === 'Pike Elementary') {
		selected_logo = 'Pike Elementary';
	}

	if(selected === 'Pike Elementary - White') {
		selected_logo = 'Pike Elementary - White';
	}

	if(selected === 'Pike Elementary' || selected === 'Pike Elementary - White') {
		$('.item-price').each(function() {
			var original = $(this).text().replace('$', ''),
				new_price = parseFloat(parseFloat(original) + 10).toFixed(2);

			if($(this).text() === price) {
				$(this).text('$' + new_price);
			}
		});
	} else {
		$('.item-price').each(function() {
			var original = $(this).text().replace('$', ''),
				new_price = parseFloat(parseFloat(original) - 10).toFixed(2);

			if($(this).text() !== price) {
				$(this).text('$' + new_price);
			}
		});
	}

	if(selected === 'Pike-P') {
		selected_logo = 'Pike P - Grey Border';
	} 

	if(selected === 'Pike-Track') {
		selected_logo = 'Pike - Track & Field';
	} 

	if(selected === 'Pike-Baseball') {
		selected_logo = 'Pike - Baseball';
	} 

	if(selected === 'Pike-P-Black') {
		selected_logo = 'Pike P - Red Border';
	}

	if(selected === 'Pike-P-White') {
		selected_logo = 'Pike P - White Border';
	}

	if(selected === 'Pike-Wordmark') {
		selected_logo = 'Pike Wordmark';
	} 

	if(selected === 'Pike-Devil') {
		selected_logo = 'Pike Devil - Red';
	}

	if(selected === 'Pike-Devil-Red') {
		selected_logo = 'Pike Devil - Black';
	}

	if(selected === 'Pike-Football') {
		selected_logo = 'Pike Football - Red/Black';
	}

	if(selected === 'Pike-Football-Red') {
		selected_logo = 'Pike Football - White/Black';
	}

	if(selected === 'Pike-Football-Black') {
		selected_logo = 'Pike Football - Red/White';
	}

	if(selected === 'Pike-P-Borderless') {
		selected_logo = 'Pike P - Red/Borderless';
	}

	if(selected === 'Pike-P-Borderless-White') {
		selected_logo = 'Pike P - White/Borderless';
	}

	if(selected === 'Pike-P-White-Red') {
		selected_logo = 'Pike P - White/Red';
	}

	if(selected === 'Pike-CC-Wordmark-Red') {
		selected_logo = 'Pike CC Wordmark - Red';
	}

	if(selected === 'Pike-CC-Wordmark-White') {
		selected_logo = 'Pike CC Wordmark - White';
	}

	if(selected === 'Pike-CC-Wordmark-V-White') {
		selected_logo = 'Pike CC Wordmark V - White';
	}

	$('#Logo > option').each(function() {
		var option = $(this).text();
			
		if(selected === option) {
			$(this).prop('selected', true);
		}
	});

	if(placement !== '' || placement !== null) {

		sessionStorage.setItem('Placement', placement);

		if(placement === 'Left Chest') {
			$('#LogoCenter > option').first().prop('selected', true);
			$('#Logo > option').each(function() {
				var option = $(this).text();

				if(selected === option) {
					$(this).prop('selected', true);
				}
			});
		} else if(placement === 'Center Chest') {
			$('#Logo > option').first().prop('selected', true);
			$('#LogoCenter > option').each(function() {
				var option = $(this).text();

				if(selected === option) {
					$(this).prop('selected', true);
				}
			});
		}
	}

	sessionStorage.setItem('Logo', selected_logo);
	RefreshProof();
	$('.zoomContainer').remove();
	$("#thumbLP").elevateZoom({
		tint:true, 
		tintColour:'#000000', 
		tintOpacity:0.5, 
		zoomWindowPosition: 1, 
		scrollZoom : true
	});
	$('#spnFrontProof a.highslide').removeAttr('onclick');
	$('#spnFrontProof a.highslide').removeAttr('href');
}

/** ----------------------------------------------------------------------
 ** Hero Slider Scripts
 ** ----------------------------------------------------------------------
 **
 ** The scripts below is what controls the hero slider on the home page.
 **
 **/

jQuery(function () {
    var $els = $('div[id^=hero]'),
        i = 0,
        len = $els.length;

    $els.slice(1).hide();
    setInterval(function () {
        $els.eq(i).fadeOut(function () {
            i = (i + 1) % len
            $els.eq(i).fadeIn('slow');
        })
    }, 10000)
});

(function($) {

	var TS_shuffle = [];

	function init() {
		var role = localStorage.getItem('Role');

		$('.shuffler').each(function(i) {
			var elm = $(this).data('shuffle-id', i);
			TS_shuffle[i] = new Shuffle( elm.find('.shuffle-container').get(0), {
				itemSelector: '.shuffle-item',
				sizer: '.shuffle-item',
				group: 'all',
				speed: 650,
				staggerAmount: 50,
				staggerAmountMax: 250
			});
		});
	}

	$(document).on('click', '.product-filter > ul > li > a', function(e) {
		e.preventDefault();
		var li = $(this).closest('li'),
			groups, parent, i;

		//if( !li.hasClass('active') ) {
			li.find('.active').each(function() {
				$(this).removeClass('active');
			});
			groups = li.data('group');

			i = li.closest('.shuffler').data('shuffle-id');

			if( typeof TS_shuffle[i] !== 'undefined' ) {
				TS_shuffle[i].filter(function(element) {
					if( groups === 'all' ) {
						return true;
					} else {
						return $(element).hasClass(groups);
					}
				});
			}
		//}

		return false;
	});

	$(document).on('click', '.product-filter > ul > li > .sub-menu > li a', function(e) {
		e.preventDefault();
		var li = $(this).closest('li'),
			groups,
			parent,
			i;

		//if(!li.hasClass('active')) {
			li.closest('.drop').find('.sub-menu').first().children().removeClass('active');
			li.parent().addClass('active');
			li.addClass('active').siblings().removeClass('active');

			groups = li.data('group');
			parent = li.parent().closest('li').data('group');

			i = li.closest('.shuffler').data('shuffle-id');
			li.find('.sub-menu > li').first().addClass('active');

			if(typeof TS_shuffle[i] !== 'undefined') {
				TS_shuffle[i].filter(function(element) {
					if(groups === 'all') {
						return true;
					} else {
						return $(element).is('.' + parent + '.' + groups);
					}
				});
			}
		//}

		return false;
	});

	$(document).ready(init);

	if (window.location.href.indexOf("ProductCats.asp") > -1) {
		var group = getURLParam('group'),
			type = getURLParam('type');
			category = getURLParam('category');

		setTimeout(function() {
			$('.product-filter > ul > li[data-group="' + group + '"] > a').click();
			$('.product-filter > ul > li[data-group="' + group + '"] > .sub-menu > li[data-group="' + type + '"] a').click();
			$('.product-filter > ul > li[data-group="' + group + '"] > .sub-menu > li[data-group="' + type + '"] > .sub-menu > li[data-group="' + category + '"] a').click();
		}, 500);
	}

})(jQuery);

function getURLParam(param) {
	var page_url = window.location.search.substring(1),
		url_variables = page_url.split('&');

	for (var i=0; i < url_variables.length; i++) {
		var param_name = url_variables[i].split('=');
		if(param_name[0] == param) {
			return param_name[1];
		}
	}
}