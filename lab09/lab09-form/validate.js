"use strict";
const datePattern = /^((0[13578]|1[02])\/31\/(18|19|20)[0-9]{2})|((01|0[3-9]|1[0-2])\/(29|30)\/(18|19|20)[0-9]{2})|((0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-8])\/(18|19|20)[0-9]{2})|((02)\/29\/(((18|19|20)(04|08|[2468][048]|[13579][26]))|2000))$/;
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const phonePattern = /^\d{3}-\d{3}-\d{4}$/;

$(document).ready( () => {
    // set values equal to elements on the form based on id values
    const txtArrivalDate = $('#arrival-date');
    const txtNights = $('#nights');
    const txtAdults = $('#adults');
    const txtChildren = $('#children');
    const txtName = $('#name');
    const txtEmail = $('#email');
    const txtPhoneNumber = $('#phone-number');

    // declare boolean variable to track if form entries are valid
    let isValid;
    const makeInvalid = (textbox, message) => {
        // add validation message to the next element after the textbox
        textbox.next().text(message);
        // add is-invalid class to textbox to outline it in red.
        textbox.addClass('is-invalid');
        // set boolean to false which will be used to prevent form submission
        isValid = false;
    }
    const makeValid = (textbox) => {
        // clear validation message from next element after the textbox
        textbox.next().text('');
        // remove is-invalid class from textbox
        textbox.removeClass('is-invalid');
    }

    // handle click event of the Complete Reservation button
    $('#make-reservation').on('click', (evt) => {
        // set isValid variable to true
        isValid = true;
        // set values equal to contents of the input elements
        const arrivalDate = txtArrivalDate.val().trim();
        const nights = txtNights.val().trim();
        const adults = txtAdults.val().trim();
        const children = txtChildren.val().trim();
        const name = txtName.val().trim();
        const emailAddress = txtEmail.val().trim();
        const phoneNumber = txtPhoneNumber.val().trim();

        // validate that the arrival date is not empty
        if (arrivalDate === '') {
            makeInvalid(txtArrivalDate, 'Arrival date is required.');
        } else if (datePattern.test(arrivalDate) === false) {
            makeInvalid(txtArrivalDate, 'Must be a valid mm/dd/yyyy date.')
        } else if (Date.parse($('#arrival-date').val().trim()) <= Date.now()) {
            makeInvalid(txtArrivalDate, 'Arrival date must be a future date.')
        } else {
            makeValid(txtArrivalDate);
        }

        // validate that the number of nights is not empty and is an integer such that (1 <= n <= 30)
        if (nights === '') {
            makeInvalid(txtNights, 'The number of nights is required.');
        } else if (/^-*\d+$/.test(nights) === false) {
            makeInvalid(txtNights, 'The number of nights must be numeric.');
        } else if ( (parseInt(nights) < 1) || (parseInt(nights) > 30) ) {
            makeInvalid(txtNights, 'The number of nights must be between 1 and 30.');
        } else {
            makeValid(txtNights);
        }

        // validate that the name is not empty
        name === '' ? makeInvalid(txtName, 'The name is required.') : makeValid(txtName);

        // validate that the email address is not empty and follows the format of an email address
        if (emailAddress === '') {
            makeInvalid(txtEmail, 'Email address is required.');
        } else if (emailPattern.test(emailAddress) === false) {
            makeInvalid(txtEmail, 'Email is not in the correct format.');
        } else {
            makeValid(txtEmail);
        }

        // validate that the phone number is not empty and follows the format of a phone number
        if (phoneNumber === '') {
            makeInvalid(txtPhoneNumber, 'Phone number is required.');
        } else if (phonePattern.test(phoneNumber) === false) {
            makeInvalid(txtPhoneNumber, 'Phone number is not in the correct format.');
        } else {
            makeValid(txtPhoneNumber);
        }

        // validate that a radio button is selected
        let checkedOption = $(':radio:checked');
        if (checkedOption.length === 0) {
            $(':radio').addClass('is-invalid');
            $('#contact-message').text('Please select preferred contact method.');
            isValid = false;
        }  else {
            $(':radio').removeClass('is-invalid');
            $('#contact-message').text('');
        }

        // prevent the default action of submitting the form if any entries are invalid
        if (isValid === false) {
            evt.preventDefault();
            txtArrivalDate.select().focus();
        }
    });
    // write code to reset form
    $('#reset-form').on('click', () => {
        // clear all textboxes
        $('input[type="text"]').val('');
        // uncheck radio button
        $('input[type="radio"]').prop('checked', false);
        // remove is-invalid class from all elements
        $('input').removeClass('is-invalid');
        // remove all validation messages
        $('small').text('');
        // send focus to top textbox
        txtArrivalDate.focus();
    });
});