"use strict";

const $ = selector => document.querySelector(selector);

window.onload = () => {
    $('#temp-entered').focus();
    $('#to-celsius').addEventListener('click', farenheitToCelsius);
    $('#to-farenheit').addEventListener('click', celsiusToFarenheit);
    $('#convert').addEventListener('click', convertTemperature);
    $('#clear-entries').addEventListener('click', resetForm);
}

const toggleLabelText = (topLabelText, bottomLabelText) => {
    // update text of labels based on which radio button i sselected
    //
    $('#temperature-top-label').textContent = topLabelText;
    $('#temperature-bottom-label').textContent = bottomLabelText;
}
const farenheitToCelsius = () => {
    toggleLabelText('Enter temperature in Farenheit:', 'Temperature converted to Celsius:');
    resetForm();
}
const celsiusToFarenheit = () => {
    toggleLabelText('Enter temperature in Celsius:', 'Temperature converted to Farenheit:');
    resetForm();
}
const convertToCelsius = tempEntered => ((tempEntered - 32) * 5 / 9);
const convertToFarenheit = tempEntered => (tempEntered * 9 / 5 + 32);
const convertTemperature = () => {
    // get temperature entered by user
    let tempEntered = parseFloat($('#temp-entered').value);

    if (isNaN(tempEntered)) {
        $('#validation-message').textContent = 'Please enter a number';
        $('#temp-entered').classList.add('is-invalid');
        $('#converted-temp').value = '';
    } else {
        $('#validation-message').textContent = '';
        $('#temp-entered').classList.remove('is-invalid');
        // determine which radio button is selected to call appropriate temperature conversion
        if ($('#to-celsius').checked) {
            $('#converted-temp').value = convertToCelsius(tempEntered).toFixed(1) + '\xB0 C';
        } else {
            $('#converted-temp').value = convertToFarenheit(tempEntered).toFixed(1) + '\xB0 F';
        }
    }
    $('#temp-entered').select();
}
const resetForm = () => {
    $('#validation-message').textContent = '';
    $('#temp-entered').classList.remove('is-invalid');
    // clear any existing output
    $('#converted-temp').value = '';

    // clear any existing text in the textbox to enter temperature
    $('#temp-entered').value = '';
    $('#temp-entered').focus();
}
