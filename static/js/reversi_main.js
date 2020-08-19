$(document).ready(function() {

    // variables
    // adjustable

    
    // system
    var player = 1; // initial player
    var direction = [-1, 1, -10, 10, -9, 9, -11, 11]; // directions
    var able_click = [0, 0]; // for calculating whether clickable button exists for both players
    var click_directions = new Array(); // store clickable direction index

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
    document.getElementById('end').style.display = 'none';

    // process control buttons
    $('#to_game').click(function() {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        document.getElementById('end').style.display = 'none';
        
        // start
        control();
    });

    $('#end_to_welcome').click(function() {
        document.getElementById('welcome').style.display = 'block';
        document.getElementById('game').style.display = 'none';
        document.getElementById('end').style.display = 'none';
    })

    // disable all buttons
    $('.ele').attr('disabled', true);
    $('.ele_false').attr('disabled', true);

    // button functions
    for (let k = 1; k <= 100; k++) {
        if (button_id_false.indexOf(k) == -1) { // buttons on the playground 
            
            $('#ele_button' + k).click(function() {
                click_results(k);
            });

        };
    };

    // control
    var control = function() {
        able_click[player - 1] = 0; // reset the current player clickable condition

        for (let k = 1; k <= 100; k++) {
            if (button_id_false.indexOf(k) == -1) { // buttons on the playground                

                if (direction_index(k)[0] >= 0) {
                    able_click[player - 1] = 1; // mark                    
                    $('#ele_button' + k).attr('disabled', false); // enable the button
                };

            };
        };

        if (able_click[player - 1] == 0) { // current player cannot click

            if (able_click[2 - player] == 0) { // the other player cannot click
                $('#player').html('No place can be selected. Game set.');
                setTimeout(function() {
                    end();
                }, 1000);
            } else { // the other player can click
                $('#player').html('No place can be selected. Change to player ' + (3 - player) + '.');
                player = 3 - player; // change player
                setTimeout(function() {
                    control();
                }, 1000); // continue to the other player
            };

        } else { // current player can click

            $('#player').html('Player ' + player + ' playing ... ');

        };
        
    };

    // check if able to click
    var direction_index = function(button_id) {
        var direction_index = new Array();

        if ($('#ele_button' + button_id).html().indexOf('circle') > 0) { // already taken
            direction_index[0] = -1;
        } else {
            for (let i = 0; i < direction.length; i++){
                for (let j = 1; j < 10; j ++) {

                    // if over the border
                    if (button_id_false.indexOf(button_id + j * direction[i]) > 0) {
                        break;
                    };

                    // if no other-color piece
                    if ($('#ele_button' + (button_id + j * direction[i])).html().indexOf('circle' + (3 - player)) == -1) {

                        // if no this-color piece
                        if ($('#ele_button' + (button_id + j * direction[i])).html().indexOf('circle' + player) == -1) {
                            break;
                        } else { // if this-color piece

                            if (j > 1) { // if not next to the original piece
                                direction_index[direction_index.length] = i;
                                break;
                            } else { // if two next piece have the same color
                                break;
                            };

                        };
                    } else { // if other-color piece
                        continue;
                    };

                };
            };

            if (direction_index.length == 0) { // if unable to click (no this-color piece at the end)
                direction_index[0] = -1;
            };

        };

        return direction_index;
    };

    // click an enabled button
    var click_results = function(click_id) {
        click_directions = direction_index(click_id); // store clickable directions

        $('#ele_button' + click_id).html('<div class="circle' + player + '"></div>');
        
        for (let i = 0; i < click_directions.length; i++){
            for (let j = 1; j < 10; j ++) {
                
                // if no other-color piece
                if ($('#ele_button' + (click_id + j * direction[click_directions[i]])).html().indexOf('circle' + 
                    (3 - player)) == -1) {
                    break;
                } else { // if other-color piece
                    $('#ele_button' + (click_id + j * direction[click_directions[i]])).html('<div class="circle' + 
                        player + '"></div>');
                };

            };
        };

        // disable all buttons
        $('.ele').attr('disabled', true);

        // change player
        player = 3 - player;

        // next round
        control();

    };

    // end the game
    var end = function() {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('game').style.display = 'none';
        document.getElementById('end').style.display = 'block';

        var p1 = 0; // player 1's pieces
        var p2 = 0; // player 2's pieces

        for (let k = 1; k <= 100; k++) {
            if (button_id_false.indexOf(k) == -1) {
            
                if ($('#ele_button' + k).html().indexOf('circle1') >= 0) {
                    p1++;
                } else if ($('#ele_button' + k).html().indexOf('circle2') >= 0) {
                    p2++;
                };

                if (k == 45 || k == 56) {
                    $('#ele_button' + k).html('<div class="circle1"></div>');
                } else if (k == 46 || k == 55) {
                    $('#ele_button' + k).html('<div class="circle2"></div>');
                } else {
                    $('#ele_button' + k).html('');
                };
                
            };
        };

        $('#p1').html(p1);
        $('#p2').html(p2);

        if (p1 > p2) {
            $('#who_wins').html('Player 1 wins!');
        } else if (p1 < p2) {
            $('#who_wins').html('Player 2 wins!');
        } else {
            $('#who_wins').html('Strike');
        };
        
        // initialise
        $('.ele').attr('disabled', true);
        $('.ele_false').attr('disabled', true);
        $('#player').html('Player 1 playing ...');
        player = 1; // initial player
        able_click = [0, 0]; // for calculating whether clickable button exists for both players
        click_directions = new Array(); // store clickable direction index

    };
    

});







