/** ----------------------------------------------------------------------
 ** ProductCats Scripts
 ** ----------------------------------------------------------------------
 **
 ** The scripts below will control the user experience on the product
 ** selection page.
 **
 **/

 if (window.location.href.indexOf("ProductCats.asp") > -1) {

	sessionStorage.clear();

    // Add "product-body" class to the body element.
    $('body').addClass('product-body');

    // If no products are found, hide the table.
    $('.no-records-found').closest('.bootstrap-table').hide();

    // Display the available colors below the product.
    $('.product-info, .product-container .row > .product-colors').each(function() {
        product = $(this).prev().find('.product-description');
        $(this).detach().appendTo(product);
	});

	// Display the available price below the product.
	$('.product-info, .product-container .row > .product-price').each(function() {
		product = $(this).prev().find('.product-description');
		$(this).detach().appendTo(product);
	});
	
	
	if(getURLParam('type') === 'digitalassets') {
		$('.shuffler').hide();
	} else if (getURLParam('type') === 'envelope') {
		setTimeout(function() {
			$('.search-input').val('Envelope').blur();
		}, 100);
	} else {
		setTimeout(function() {
			$('.bootstrap-table').hide();
			$('.static-products').hide();
			$('.addtocart').hide();
		}, 100);
	}

	// if(getURLParam('group') === 'apparel') {
	// 	$('.product-filter').find('li[data-group="stationery"]').hide();
	// 	$('.product-filter').find('li[data-group="promotional"]').hide();
	// 	$('.product-filter').find('li[data-group="marketing"]').hide();
	// 	$('.product-filter').find('li[data-group="businesscard"]').hide();

	// } else {
	// 	$('.product-filter').find('li[data-group="apparel"]').hide();
	// }

	// if(getURLParam('group') === 'stationery') {
	// 	$('.product-filter').find('li[data-group="apparel"]').hide();
	// 	$('.product-filter').find('li[data-group="promotional"]').hide();
	// 	$('.product-filter').find('li[data-group="marketing"]').hide();
	// 	$('.product-filter').find('li[data-group="businesscard"]').hide();

	// } else {
	// 	$('.product-filter').find('li[data-group="stationery"]').hide();
	// }

	// if(getURLParam('group') === 'promotional') {
	// 	$('.product-filter').find('li[data-group="stationery"]').hide();
	// 	$('.product-filter').find('li[data-group="apparel"]').hide();
	// 	$('.product-filter').find('li[data-group="marketing"]').hide();
	// 	$('.product-filter').find('li[data-group="businesscard"]').hide();

	// } else {
	// 	$('.product-filter').find('li[data-group="promotional"]').hide();
	// }

	// if(getURLParam('group') === 'marketing') {
	// 	$('.product-filter').find('li[data-group="stationery"]').hide();
	// 	$('.product-filter').find('li[data-group="promotional"]').hide();
	// 	$('.product-filter').find('li[data-group="apparel"]').hide();
	// 	$('.product-filter').find('li[data-group="businesscard"]').hide();

	// } else {
	// 	$('.product-filter').find('li[data-group="marketing"]').hide();
	// }

	// if(getURLParam('group') === 'businesscard') {
	// 	$('.product-filter').find('li[data-group="stationery"]').hide();
	// 	$('.product-filter').find('li[data-group="promotional"]').hide();
	// 	$('.product-filter').find('li[data-group="marketing"]').hide();
	// 	$('.product-filter').find('li[data-group="apparel"]').hide();

	// } else {
	// 	$('.product-filter').find('li[data-group="businesscard"]').hide();
	// }

// experiment - BHunt
	if(getURLParam('group') !== 'stationery') {
		$('.product-filter').find('li[data-group="stationery"]').hide();
	}

	if(getURLParam('group') !== 'promotional') {
		$('.product-filter').find('li[data-group="promotional"]').hide();
	}

	if(getURLParam('group') !== 'marketing') {
		$('.product-filter').find('li[data-group="marketing"]').hide();
	}

	if(getURLParam('group') !== 'businesscard') {
		$('.product-filter').find('li[data-group="businesscard"]').hide();
	}

	if(getURLParam('group') !== 'apparel') {
		$('.product-filter').find('li[data-group="apparel"]').hide();
	}

// End Experiment - BHunt

}


setTimeout(function() {
	if(window.location.href.indexOf("NexJobPage.asp") > -1) {
		$('select').each(function() {
			$(this).find('option').first().remove();
		});

		$('#EPI38').val('100');
	}
}, 1000);

/** ----------------------------------------------------------------------
 ** Step1New & Step5Edit Scripts
 ** ----------------------------------------------------------------------
 **
 ** The scripts below will control the user experience when they select a
 ** product.
 **
 **/

if (window.location.href.indexOf("Step5Edit.asp") > -1) {
	setTimeout(function() {
		if($('.product-colors').html().replace(/\s/g,'') === '') {
			$('.colors').hide();
			$('.logo-icons').closest('.row').hide();
			$('.tabs').hide();
			$('.product-pricing').hide();
		}
	}, 250);
}

if (window.location.href.indexOf("Step1New.asp") > -1 || window.location.href.indexOf("Step5Edit.asp") > -1 || window.location.href.indexOf("Step3New.asp") > -1) {

	/** ----------------------------------------------------------------------
	 ** Select Style
		** ----------------------------------------------------------------------
		**
		** Scripts that prevent the user from having to do anything on this page.
		**
		**/

	$('.Product').find('#btnSubmit').click();

	
	/** ----------------------------------------------------------------------
	 ** Enter Details
		** ----------------------------------------------------------------------
		**
		** Begin scripts that display/create the proper information for each 
		** apparel/promotional product.
		**
		**/
	
	if(getURLParam('Type') === 'Apparel' || sessionStorage.getItem('Logo') !== null) {
		$('body').addClass('apparel-item');
	}

	// Determine which product the user has selected and create the "product id".
	$('#contenttable').find('h1').first().each(function() {
		var $this = $(this);
		$this.html($this.html().replace(/(\S+)\s*$/, '<span class="product-id hide">$1</span>'));
	});

	$('.front-back-title').each(function() {
		var $this = $(this);
		$this.html($this.html().replace(/(\S+)\s*$/, '<span class="product-id hide">$1</span>'));
	});

	$('.Select.a.Apparel.style').find('#btnSubmit').click();

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
			logo_file = logo.replace('/', '').replace(/\s/g,''),
			logo_path = '/files/pdfsthumbnail/' + logo_file + '.png';

		if(logo !== '') {
			$(this).closest('.product-input').find('.logo-icons').append('<div class="col-sm-3"><img class="logo-icon" src="' + logo_path + '" alt="' + logo + '" onclick="logoSelect(this);" /></div>');
		}
	});

	$('.logo-icon').each(function() {
		var logo = $(this);

		$(this).parent().on('click', function() {
			logoSelect(logo);
		});
	});

	if(sessionStorage.getItem('Logo') !== null) {
		$('body').addClass('apparel-item');
		$('.logo-icons').find('.logo-icon[alt="' + sessionStorage.getItem('Logo') + '"]').first().addClass('selected');
	} else {
		$('.logo-icons').find('.logo-icon').first().addClass('selected');
	}

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

	if($('.description-list').find('ul li').length <= 0) {
		$('.description').find('.details').hide();
		$('.description').find('.product-specsheet').hide();
	}

	$('.product-specsheet').find('a').attr('href', 'Files/BrokerBranding/intuitiveADMIN/Include/' + product_id + 'specsheet.pdf');

	$('#LogoPlacement').on('change', function() {
		var logo = $('.logo-icon.selected');
		logoSelect(logo);
	});

	$('#Method').on('change', function() {
		var method = $(this).val(),
			logo = $('.logo-icon.selected');

		sessionStorage.setItem('Method', method);

		if(method === 'Embroidery') {
			$('#LogoPlacement option[value="Left Chest"]').prop('selected', true);
			$('#LogoPlacement').attr('disabled', true);

			$('.logo-icon.selected').removeClass('selected');
			logo = $('.logo-icon.selected');
			logoSelect(logo);
		} else if(method === 'Screenprint') {
			$('#LogoPlacement').removeAttr('disabled');
			logoSelect(logo);
		} else {
			logoSelect(logo);
		}
	});

	// Get the pricing table from the "PriceTable" field.
	var current = 0,
		type = $('.front-back-title').text();

	if(getURLParam('Type') === 'Stationery' || sessionStorage.getItem('ProductType') === 'Stationery' || window.location.href.indexOf("Step3New.asp") > -1) {
		$('.product-pricing').hide();
		$('.colors').hide();
		$('.logo-icons').each(function() {
			$(this).parent().hide();
		});
		$('.product-options').find('.tabs').hide();

		$('.product-options input').each(function() {
			let value = $(this).val();

			$(this).on('focus', function() {
				value = $(this).val();
			});

			$(this).on('blur', function() {
				if($(this).val() !== value) {
					RefreshProof();
				}
			});
		});

		$('.product-options textarea').each(function() {
			let value = $(this).val();

			$(this).on('focus', function() {
				value = $(this).val();
			});

			$(this).on('blur', function() {
				if($(this).val() !== value) {
					RefreshProof();
				}
			});
		});

		$('.product-options select').each(function() {
			$(this).on('change', function() {
				RefreshProof();
			});
		});

		$('#Facebook').parent().append('<div class="custom-control custom-switch"><input type="checkbox" class="custom-control-input" id="Facebook_OnOff" data-name="Facebook" onchange="socialOnOff($(this))"><label class="custom-control-label" for="Facebook_OnOff">Facebook</label></div>');
		$('#Twitter').parent().append('<div class="custom-control custom-switch"><input type="checkbox" class="custom-control-input" id="Twitter_OnOff" data-name="Twitter" onchange="socialOnOff($(this))"><label class="custom-control-label" for="Twitter_OnOff">Twitter</label></div>');
		$('#Facebook').hide();
		$('#FacebookHandle, #TwitterHandle').closest('.row').hide();
		$('#Twitter').hide();

		$('.product-input').find('br').remove();

		sessionStorage.setItem('ProductType', 'Stationery');
	} else {
		$('#PriceTable > option').each(function() {
			var size = $(this).text(),
				price = $(this).closest('.row').find('h5 b').text().replace(':', '').replace('$', ''),
				price = parseFloat(price),
				id = size.replace(' ', ''),
				classes = id.toLowerCase();

			if(size === '') {
				
			} else {
				$('.product-pricing').find('.table tbody').append('<tr><td>' + size + '</td><td class="item-price">$' + parseFloat(price).toFixed(2) + '</td><td><input type="text" class="quantity spinner ' + classes + '" id="' + id + '" value="0"></td></tr>');
			}
		});

		$('.colors').show();
		$('.logo-icons').each(function() {
			$(this).parent().show();
		});
		$('.logo-icons').removeClass('d-none');

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

	if($('.quantity').length >= 1) {
		$('.product-pricing').find('.table tbody').append('<tr class="hide"><td><span class="total-cost"></span></td></tr>');
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
					sessionStorage.setItem('Logo', selected);
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
			} else if(value <= 0) {
				$(this).closest('tr').removeClass('bold');
				sessionStorage.removeItem(id);
				sessionStorage.removeItem(price_id, order_price);
			}

			// if(value > 95) {
			// 	alert('You have exceeded our in-stock quantity for this size: ' + id + '\n\nThe quantity as been set at the maximum quantity we have in stock for this size\n\nIf you require more, please give us a call at 888.955.PROMO and we will be happy to assist you.');
			// 	$(this).closest('table').find('#' + id).val('95');
			// 	$(this).closest('table').find('#' + id).focus();
				
			// 	return false;
			// }

			// Alerts the user if they order more than 95 of the same piece of apparel. Can be a mix of sizes & colors.
			// The quantity of the last item ordered is reduced so the total for that piece of apparel is 95.
			let count= 0;
			$('.spinner').each(function() {
				let qty = $(this).val();
				count = count + parseInt(qty);
				if (count > 95) {
					alert("Online orders have a quatity limit of 95 for each apparel item.\n\nIf you require more than 95, please give us a call at (317)957-0932.");
					let overage = count - 95;
					$(this).closest('table').find('#' + id).val(value - overage);
					$(this).closest('table').find('#' + id).focus();
					
					return false;
				}
			});

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
}

if (window.location.href.indexOf("Step3New.asp") > -1) {
	$('body').addClass('Employee Kit Template');
}

if (window.location.href.indexOf("ProjectOverView.asp") > -1) {
	$('.nav.nav-tabs').find('li').addClass('nav-item');
	$('.nav.nav-tabs').find('li.tabon a').addClass('active');
	$('.nav.nav-tabs').find('li a').addClass('nav-link');

	$('.nav.nav-tabs').find('li a').on('click', function() {
		$('.nav.nav-tabs').find('li').addClass('nav-item');
		$('.nav.nav-tabs').find('li.tabon a').addClass('active');
		$('.nav.nav-tabs').find('li a').addClass('nav-link');
	});

	$('.actionables').find('button').on('click', function() {
		setTimeout(function() {
			$('.nav.nav-tabs').find('li').addClass('nav-item');
			$('.nav.nav-tabs').find('li.tabon a').addClass('active');
			$('.nav.nav-tabs').find('li a').addClass('nav-link');
		}, 100);
	});
}

/** ----------------------------------------------------------------------
 ** ProductCats Scripts
 ** ----------------------------------------------------------------------
 **
 ** The scripts below will control the user experience on the product
 ** selection page.
 **
 **/

if (window.location.href.indexOf("ProofStationery.asp") > -1) {
    // Display the available colors below the product.
	$('.product-color, .total-price, .total-quantity, #divEditDelivery, #spnPurchasePrice, #spnListMappings').closest('tr').hide();
	$('#Table1').find('tbody tr').last().hide();
	$('#tabMultiDrop').find('tbody tr').last().hide();
	$('#tabproof').find('tbody tr').last().hide();
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
		if(sessionStorage.getItem('Logo') !== null) {
			var Logo = sessionStorage.getItem('Logo');

			$('body').addClass('apparel-item Select a Apparel style');

			if(sessionStorage.getItem('Comment') !== null) {
				var Comment = sessionStorage.getItem('Comment');
			} else {
				var Comment = '';
			}
			var sizebox;
			var Color = sessionStorage.getItem('Color');

			// Enters the session items into their respective "Extra Product Fields"
			setTimeout(function() {
				$('.DescriptionText').each(function() {
					var label = $(this).closest('tr').find('.DescriptionText').first().text(),
						size = sessionStorage.getItem(label.replace(/\s/g,''));
					$(this).closest('tr').find('.DescriptionText').last().find('input').first().attr('class', 'sizequantity');
					$(this).closest('tr').find('.DescriptionText').last().find('input').first().val(size);
				});

				calculateQuantity(sizebox);
			}, 500);
			
			// Set the NexJob option Color field.
			$('#NJB > option[value="' + Color + '"]').prop('selected', true);
			$('.selected-color').text(Color);

			$('#NJE1 > option[value="Logo|' + Logo + '"]').prop('selected', true);

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
	}

	if (window.location.href.indexOf("ProofStationery.asp?bc") > -1) {

		if($('.NJTypeCaption').text() === 'BrandMethodStyle') {

			$('body').addClass('apparel-item');
			// Set the loading screen to make sure the user does not see the ugly ProofStationery page.
			$('.loading').find('.loading-text h3').first().text('Gathering your product information.');

			// Set the classes on each of the "Extra Product Fields".
			$('.DescriptionText').each(function() {
				sizebox = $(this).parent().find('td').first().text().replace(' ', '').toLowerCase();
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
				var Logo = sessionStorage.setItem('Logo', $('#NJE1').val().replace('Logo|'));

				// if($('.sizequantity.extrasmall').length) {
				// 	var ExtraSmall = sessionStorage.setItem('ExtraSmall', $('.sizequantity.extrasmall').val());
				// }

				// if($('.sizequantity.small').length) {
				// 	var Small = sessionStorage.setItem('Small', $('.sizequantity.small').val());
				// }

				// if($('.sizequantity.medium').length) {
				// 	var Medium = sessionStorage.setItem('Medium', $('.sizequantity.medium').val());
				// }

				// if($('.sizequantity.large').length) {
				// 	var Large = sessionStorage.setItem('Large', $('.sizequantity.large').val());
				// }
				
				// if($('.sizequantity.extralarge').length) {
				// 	var ExtraLarge = sessionStorage.setItem('ExtraLarge', $('.sizequantity.extralarge').val());
				// }

				// if($('.sizequantity.2xlarge').length) {
				// 	var TwoXLarge = sessionStorage.setItem('2XLarge', $('.sizequantity.2xlarge').val());
				// }
				
				// if($('.sizequantity.3xlarge').length) {
				// 	var ThreeXLarge = sessionStorage.setItem('3XLarge', $('.sizequantity.3xlarge').val());
				// }
				// if($('.sizequantity.4xlarge').length) {
				// 	var FourXLarge = sessionStorage.setItem('4XLarge', $('.sizequantity.4xlarge').val());
				// }
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
		sessionStorage.clear();

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

		sessionStorage.clear();
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

/** ----------------------------------------------------------------------
 ** Product Catalog Shuffle Scripts
 ** ----------------------------------------------------------------------
 **
 ** The scripts below is what controls the product catalog shuffle.
 **
 **/

(function($) {

	var TS_shuffle = [];

	function init() {

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

	$(document).on('click', '.product-filter ul > li a', function(e) {
		e.preventDefault();
		var li = $(this).closest('li'),
			groups, i;

		if( !li.hasClass('active') ) {
			li.find('.sub-menu').children().removeClass('active');
			li.addClass('active').siblings().removeClass('active');
			groups = li.data('group');
			$('.search-input').val('').blur();

			if (groups === 'envelope') {
				setTimeout(function() {
					$('.bootstrap-table').show();
					$('.static-').show();
					$('.addtocart').show();
					$('.search-input').val('Envelope').blur();
				}, 100);
			} else if (groups === 'all') {
				setTimeout(function() {
					$('.bootstrap-table').show();
					$('.static-products').show();
					$('.addtocart').show();
				}, 100);
			} else if (getURLParam('type') === 'digitalassets') {
				setTimeout(function() {
					$('.bootstrap-table').show();
					$('.static-products').show();
					$('.addtocart').show();
					$('.search-input').val('Downloadable').blur();
				}, 100);
			} else {
				$('.bootstrap-table').hide();
				$('.static-products').hide();
				$('.addtocart').hide();
			}

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
		}

		return false;
	});

	$(document).on('click', '.product-filter ul > li.drop > a', function(e) {
		e.preventDefault();
		var li = $(this).closest('li'),
			groups, i;

		li.find('.sub-menu').find('li').first().addClass('active').siblings().removeClass('active');

		if( !li.hasClass('active') ) {
			li.addClass('active').siblings().removeClass('active');
			groups = li.data('group');

			$('.search-input').val('').blur();

			if (groups === 'envelope') {
				setTimeout(function() {
					$('.bootstrap-table').show();
					$('.static-products').show();
					$('.addtocart').show();
					$('.search-input').val('Envelope').blur();
				}, 100);
			} else if (groups === 'all') {
				setTimeout(function() {
					$('.bootstrap-table').show();
					$('.static-products').show();
					$('.addtocart').show();
				}, 100);
			} else if (getURLParam('type') === 'digitalassets') {
				setTimeout(function() {
					$('.bootstrap-table').show();
					$('.static-products').show();
					$('.addtocart').show();
					$('.search-input').val('Downloadable').blur();
				}, 100);
			} else {
				$('.bootstrap-table').hide();
				$('.static-products').hide();
				$('.addtocart').hide();
			}

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
		}

		return false;
	});

	$(document).ready(init);

	if (window.location.href.indexOf("ProductCats.asp") > -1) {
		var group = getURLParam('group'),
			type = getURLParam('type');

		setTimeout(function() {
			$('.product-filter > ul > li[data-group="' + group + '"] > a').click();
			$('.product-filter > ul > li[data-group="' + group + '"] > .sub-menu > li[data-group="' + type + '"] a').click();
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

function socialOnOff(e) {
	let value = e.prop('checked'),
		name = e.attr('data-name');

	if(value === true) {
		$('#' + name).find('option').each(function() {
			if($(this).text() === name) {
				$(this).prop('selected', true);
			}
		});

		$('#' + name + 'Handle').closest('.row').show();

		if (name === 'Facebook') {
			$('#' + name + 'Handle').val('https://www.facebook.com/IHeruc/');
		} else if (name === 'LinkedIn') {
			$('#' + name + 'Handle').val('https://www.linkedin.com/company/intuitivehealth/');
		}
	} else {
		$('#' + name + 'Handle').closest('.row').hide();
		$('#' + name + 'Handle').val('');
		$('#' + name).find('option').first().prop('selected', true);
	}

	RefreshProof();
}

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
	logoSelect(logo)
}

function logoSelect(logo) {
	var selected = $(logo).attr('alt'),
		placement = $('#LogoPlacement').val(),
		color = sessionStorage.getItem('Color');
		if (color === 'White' && selected === 'Legacy ER Shirt Logo White') {
			selected = 'Legacy ER Shirt Logo Color';
		}
	
		if (color !== 'White' && selected !== 'Legacy ER Shirt Logo White') {
			selected = 'Legacy ER Shirt Logo White';
		}
	$('.logo-icon').removeClass('selected');
	$(logo).addClass('selected');

	$('#Logo > option').each(function() {
		var option = $(this).text();
			
		if(selected === option) {
            $(this).prop('selected', true);
		}
	});

	sessionStorage.setItem('Logo', selected);
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