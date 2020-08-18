$(document).ready(function() {

    // variables
    // adjustable

    
    // system
    var player = 1; // initial player
    var direction = [-1, 1, -10, 10, -9, 9, -11, 11]; // directions
    
    var button_true = document.getElementsByClassName('ele');
    var button_false = document.getElementsByClassName('ele_false');
    var button_id_true = new Array();
    var button_id_false = new Array();
    for (i = 0; i < button_true.length; i++) {
        button_id_true[i] = Number(button_true[i].getAttribute('id').slice(10)); // 10 - ele_button
    };
    for (i = 0; i < button_false.length; i++) {
        button_id_false[i] = Number(button_false[i].getAttribute('id').slice(10));
    };

    // initial display
    document.getElementById('welcome').style.display = 'block';
    document.getElementById('game').style.display = 'none';

    // process control buttons
    $('#to_game').click(function() {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('game').style.display = 'block';
    });

    // disable all buttons
    $('.ele').attr('disabled', true);
    $('.ele_false').attr('disabled', true);

    // enable possible buttons

    // control
    control();
    function control() {
        $('#player').html('Player ' + player + ' playing ... ');
    };

    // check if able to click
    function direction_index(button_id) {
        var direction_index = new Array();

        if ($('#ele_button' + button_id).html().indexOf('circle') > 0) { // already taken
            direction_index = -1;
        } else {
            for (let i = 0; i < direction.length; i++){
                for (let j = 1; j < 10; j ++) {

                    // if over the border
                    if (button_id_false.indexOf(button_id + j * direction[i]) > 0) {
                        // console.log('over the border!');
                        break;
                    };

                    // if no other-color piece
                    if ($('#ele_button' + (button_id + j * direction[i])).html().indexOf('circle' + (3 - player)) == -1) {

                        // if no this-color piece
                        if ($('#ele_button' + (button_id + j * direction[i])).html().indexOf('circle' + player) == -1) {
                            // console.log('no this-column piece');
                            break;
                        } else { // if this-color piece

                            if (j > 1) { // if not next to the original piece
                                direction_index[direction_index.length] = i;
                            } else { // if two next piece have the same color
                                // console.log('two next color');
                                break;
                            };

                        };
                    } else { // if other-color piece
                        continue;
                    };

                };
            };

            if (direction_index.length == 0) { // if unable to click
                direction_index = -1;
            };

        };

        return direction_index;
    };
    

});







