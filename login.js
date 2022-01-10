
// Additional domains (if added) need to be manually added to the array below.
$('input[name="Email"]').on('blur', function() {
    let value = $(this).val().split("@").pop();
    let domains = [];
    let is_email = isEmail(value);
    let allowedDomains = [
      'riverview.org',
      'iheruc.com',
      'phs.org',
      'legacyer.com'
    ];
    console.log("Process has started!");
    console.log(allowedDomains.indexOf(value) > -1);
  
    if (allowedDomains.indexOf(value) > -1 || value === "") {


        if (value.indexOf('iheruc.com') > -1) {
            $('select[name="CostCentre"] > option[value="1121"]').prop('selected', true);
        }
          
        if (value.indexOf('riverview.org') > -1) {
            $('select[name="CostCentre"] > option[value="1124"]').prop('selected', true);
        }
      
        if (value.indexOf('phs.org') > -1) {
            $('select[name="CostCentre"] > option[value="1123"]').prop('selected', true);
        }

        if (value.indexOf('legacyer.com') > -1) {
            $('select[name="CostCentre"] > option[value="1125"]').prop('selected', true);
        }
      
      $('#btnSubmit').removeClass('hide');
    } else {
      alert('You are required to use a valid company email domain.');
    }
});

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}