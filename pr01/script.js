// function to calculate the cost
function calculateCost() {
    var checkIn = moment($('#checkIn').val());
    var checkOut = moment($('#checkOut').val());
    var adults = parseInt($('#numAdults').val());

    // It is necessary to add 1 to the difference between the dates
    // because the difference between two dates is the number of days between them
    var days = checkOut.diff(checkIn, 'days') + 1;
    var cost = days * 150 * adults;

    document.getElementById('cost').value = cost;
    document.getElementById('days').value = days;
}

// add event listeners
$('#numAdults, #checkIn, #checkOut').change(calculateCost);

// Add form validation
$('#submit').click(function(event) {
    if (validateForm()) {
        event.preventDefault();
        if (window.confirm('Do you wish to submit the form?')) {
            toastr.success('Form submitted successfully');
            resetForm();
        }
    }
});

// Reset the form
$('#reset').click(function(event) {
    if (window.confirm('Do you wish to reset the form?')) {
        toastr.info('Form reset');
        resetForm();
    }
});

// Function to reset the form
function resetForm() {
    document.getElementById('username').value = '';
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('fax').value = '';
    document.getElementById('email').value = '';
    document.getElementById('checkIn').value = '';
    document.getElementById('checkOut').value = '';
    document.getElementById('numAdults').value = '1';
    document.getElementById('cost').value = '';
    document.getElementById('days').value = '';
    $('#username').removeClass('has-error');
    $('#firstName').removeClass('has-error');
    $('#lastName').removeClass('has-error');
    $('#phone').removeClass('has-error');
    $('#fax').removeClass('has-error');
    $('#email').removeClass('has-error');
    $('#checkIn').removeClass('has-error');
    $('#checkOut').removeClass('has-error');
}

// Function to validate the form
function validateForm() {
    var isFormValid = true;
    if (!validateUsername()) {
        $('#username').addClass('has-error')
        isFormValid = false;
    }
    if (!validateFirstName()) {
        $('#firstName').addClass('has-error')
        isFormValid = false;
    }
    if (!validateLastName()) {
        $('#lastName').addClass('has-error')
        isFormValid = false;
    }
    if (!validatePhone()) {
        $('#phone').addClass('has-error')
        isFormValid = false;
    }
    if (!validateFax()) {
        $('#fax').addClass('has-error')
        isFormValid = false;
    }
    if (!validateEmail()) {
        $('#email').addClass('has-error')
        isFormValid = false;
    }
    if (!validateCost()) {
        $('#checkIn').addClass('has-error');
        $('#checkOut').addClass('has-error');
        isFormValid = false;
    }
    return isFormValid;
}

// Remove error class when the user starts entering data
$('#username').keyup(function() {
    $('#username').removeClass('has-error');
});
$('#firstName').keyup(function() {
    $('#firstName').removeClass('has-error');
});
$('#lastName').keyup(function() {
    $('#lastName').removeClass('has-error');
});
$('#phone').keyup(function() {
    $('#phone').removeClass('has-error');
});
$('#fax').keyup(function() {
    $('#fax').removeClass('has-error');
});
$('#email').keyup(function() {
    $('#email').removeClass('has-error');
});
$('#checkIn, #checkOut').change(function() {
    if ($('#checkIn').val() != '') {
        $('#checkIn').removeClass('has-error');
    }
    if ($('#checkOut').val() != '') {
        $('#checkOut').removeClass('has-error');
    }
});

// Validate username
function validateUsername() {
    var username = document.getElementById('username').value;
    if (username.length < 4) {
        toastr.error('Username must be at least 4 characters long');
        return false;
    }
    return true;
}

// Validate First Name
function validateFirstName() {
    var firstName = document.getElementById('firstName').value;
    if (firstName.length < 2) {
        toastr.error('First name must be at least 2 characters long');
        return false;
    }
    return true;
}

// Validate Last Name
function validateLastName() {
    var lastName = document.getElementById('lastName').value;
    if (lastName.length < 2) {
        toastr.error('Last name must be at least 2 characters long');
        return false;
    }
    return true;
}

// Validate Phone number
function validatePhone() {
    var phone = document.getElementById('phone').value;
    if (phone.length != 10) {
        toastr.error('Phone number must be 10 digits. (North American format)');
        return false;
    }
    return true;
}

// Validate fax number
function validateFax() {
    var fax = document.getElementById('fax').value;
    if (fax.length != 10) {
        toastr.error('Fax number must be 10 digits. (North American format)');
        return false;
    }
    return true;
}

// Validate email
function validateEmail() {
    var email = document.getElementById('email').value;
    if (email.length < 5) {
        toastr.error('Email must be at least 5 characters long');
        return false;
    }
    return true;
}

// Validate cost/days
function validateCost() {
    if (!validateDates()) {
        return false;
    }
    var cost = document.getElementById('cost').value;
    // If cost is NaN, then it is not a number
    if (isNaN(cost)) {
        toastr.error('Somehow you entered dates but the cost is not a number. (Please contact the developer)');
        return false;
    }
    if (cost <= 0) {
        toastr.error('Cost must be a positive number. (No going back in time!)');
        return false;
    }
    return true;
}

// Validate Check In and Check Out dates
function validateDates() {
    var checkIn = document.getElementById('checkIn').value;
    var checkOut = document.getElementById('checkOut').value;
    if (checkIn == '' || checkOut == '') {
        toastr.error('Check In and Check Out dates are required');
        return false;
    }
    return true;
}
