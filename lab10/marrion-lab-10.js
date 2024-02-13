"use strict";
const namPattern = /^[A-Za-z-\s]+$/;
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.edu$/;
const phonePattern = /^[(]\d{3}[)][ ]\d{3}[.]\d{4}$/;
const zipPattern = /^\d{5}-\d{4}$/;
const datePattern = /^((0[13578]|1[02])\/31\/(18|19|20)[0-9]{2})|((01|0[3-9]|1[0-2])\/(29|30)\/(18|19|20)[0-9]{2})|((0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-8])\/(18|19|20)[0-9]{2})|((02)\/29\/(((18|19|20)(04|08|[2468][048]|[13579][26]))|2000))$/;

$(document).ready(() => {
    // set values equal to elements on the form based on id attributes
    const txtName = $('#full-name');
    const txtEmail = $('#email');
    const txtPhone = $('#phone-number');
    const txtZip = $('#zip-code');
    const txtDateOfBirth = $('#date-of-birth');

    // declare boolean variable to track if firm entries are valid
    let isValid;
    const makeInvalid = (textbox, message) => {
        // add validation message to the next element after the textbox
        textbox.next().text(message);
        // add is-invalid class to textbox to outline it in red.
        textbox.addClass('is-invalid');
        // remove is-valid class from textbox
        textbox.removeClass('is-valid');
        // set boolean to false which will be used to prevent form submission
        isValid = false;
    }
    const makeValid = (textbox) => {
        // clear validation message from next element after the textbox
        textbox.next().text('');
        // add is-valid class to textbox
        textbox.addClass('is-valid');
        // remove is-invalid class from textbox
        textbox.removeClass('is-invalid');
    }
    // set focus to the top textbox
    txtName.focus();

    // handle click event of the validate button
    $('#validate-info').on('click', (evt) => {
        // set isValid boolean to true
        isValid = true;
        // set values to the contents of the input elements
        const name = txtName.val().trim();
        const emailAddress = txtEmail.val().trim();
        const phoneNumber = txtPhone.val().trim();
        const zipCode = txtZip.val().trim();
        const dateOfBirth = txtDateOfBirth.val().trim();

        // validate the name contains letters, spaces, and hyphens only
        !namPattern.test(name) ? makeInvalid(txtName, 'Please enter a name that contains letters, spaces, and hyphens only.') : makeValid(txtName);

        // validate the email matches the format of a .edu email address
        !emailPattern.test(emailAddress) ?
            makeInvalid(txtEmail, 'Please enter an email address that ends in .edu') : makeValid(txtEmail);

        // validate the phone number matches the (999) 999-9999 format
        !phonePattern.test(phoneNumber) ? makeInvalid(txtPhone, 'Please enter a phone number in the (999) 999.9999 format.') : makeValid(txtPhone);

        // validate the zip code matches the 9999-9999 format
        !zipPattern.test(zipCode) ? makeInvalid(txtZip, 'Please enter a zip code in the 99999-9999 format.') : makeValid(txtZip);

        // validate the date is valid and is in the past
        if (!datePattern.test(dateOfBirth)) {
            makeInvalid(txtDateOfBirth, 'Please enter a valid date in the MM/DD/YYYY format.');
        }else if (Date.parse(dateOfBirth) > Date.now()) {
            makeInvalid(txtDateOfBirth, 'Please enter a date in the past.')
        } else {
            makeValid(txtDateOfBirth)
        }

        // display a message if isValid is true, clear message if it is false
        $('#results').text(isValid ? 'All fields contain valid entries.' : '');

        txtName.select().focus();
    });
});
