$(document).ready(function () {
    $('#temp-entered').focus();

    $('#to-celsius').click(function () {
        $('#temperature-top-label').text('Enter temperature in Farenheit:');
        $('#temperature-bottom-label').text('Temperature converted to Celsius:');
        $('#clear-entries').click();
    });
    $('#to-farenheit').click(function () {
        $('#temperature-top-label').text('Enter temperature in Celsius:');
        $('#temperature-bottom-label').text('Temperature converted to Farenheit:');
        $('#clear-entries').click();
    });
    $('#convert').click(function () {
        if (isNaN($('#temp-entered').val())) {
            // display a validation message that the entry must be numeric
            $('#validation-message').text('Please enter a number');
            // add the is-invalid class to the textbox to outline it in red
            $('#temp-entered').addClass('is-invalid');
            // clear the value of the #converted-temp element in case output is present
            $('#converted-temp').val('');
        } else if ($('#temp-entered').val() === '') {
            // display a validation message that the entry is required
            $('#validation-message').text('This field is required');
            // add the is-invalid class to the textbox to outline it in red
            $('#temp-entered').addClass('is-invalid');
            // clear the value of the #converted-temp element in case output is present
            $('#converted-temp').val('');
        } else {
            // because a number has been entered, clear validation message
            $('#validation-message').text('');
            // remove is-invalid class if it is present
            $('#temp-entered').removeClass('is-invalid');
            // declare variables for input and output
            let c_degrees, f_degrees;
            // determine which radio button is selected
            const radioButton = $(':checked').val();
            if (radioButton === 'convert-to-celsius') {
                // set f_degrees variable equal to the value in the temperature entered box
                f_degrees = parseFloat($('#temp-entered').val());
                // calculate c_degrees based on formula
                c_degrees = ((f_degrees - 32) * 5 / 9);
                // display the c_degrees to one decimal place in the temperature converted textbox
                $('#converted-temp').val(c_degrees.toFixed(2) + '\xB0 C');
            } else if (radioButton === 'convert-to-farenheit') {
                // set c_degrees variable equal to the value in the temperature entered box
                c_degrees = parseFloat($('#temp-entered').val());
                // calculate f_degrees based on formula
                f_degrees = (c_degrees * 9 / 5 + 32);
                // display the c_degrees to one decimal place in the temperature converted textbox
                $('#converted-temp').val(f_degrees.toFixed(2) + '\xB0 F');
            }
        }
        // select text and send focus to textbox
        $('#temp-entered').select().focus();
    });
    $('#clear-entries').click(function () {
        // clear both textboxes
        $(':text').val('');
        // clear any existing validation message
        $('#validation-message').text('');
        // remove is-invalid class if present and send focus to the textbox for input
        $('#temp-entered').removeClass('is-invalid').focus();
    });
    // if the textbox is double clicked, trigger the click of the Clear button
    $('#temp-entered').dblclick(function () {
        $('#clear-entries').click();
    });
});