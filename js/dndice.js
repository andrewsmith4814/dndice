/* Constants for a few things used throughout */
const SELECTED_DICE_ELEMENT = document.getElementById('selected-dice');
const SELECTED_DICE_BREAKDOWN = document.getElementById('selected-dice-breakdown');
const roll_button = document.getElementById('roll-button');

/* Function to create a button based on type */
const createButton = function (type) {
    let button = document.createElement('button');
    button.classList.add('removable', 'die', 'button');
    button.type = 'button';
    button.setAttribute('data-type', type);
    let btn_text_node = document.createTextNode(type);
    button.appendChild(btn_text_node);
    return button;
};

/* Function to get each type of die, and the amount of each of said die */
const getSelectedDiceBreakdown = function () {
    let breakdown = {};
    let selected_dice = SELECTED_DICE_ELEMENT.querySelectorAll('button.die.button');
    if (selected_dice && selected_dice.length > 0) {
        selected_dice.forEach(function (die_btn) {
            let type = parseInt(die_btn.dataset.type);
            if (!(type in breakdown)) {
                breakdown[type] = 1;
            } else {
                breakdown[type]++;
            }
        });
    }
    return breakdown;
};

/* Clear out old selected dice breakdown, and if there are any currently selected, show said breakdown */
const manageSelectedBreakdownState = function () {
    // Gather which dice have been selected, and put them into a list to show the breakdown. Clear out the old list
    if (SELECTED_DICE_BREAKDOWN.querySelector('div')) {
        SELECTED_DICE_BREAKDOWN.querySelector('div').remove();
    }
    // Get all of the selected dice, if there are any
    let breakdown = getSelectedDiceBreakdown();
    // If there are any, show their breakdown
    if (Object.keys(breakdown).length > 0) {
        // Enable the button
        roll_button.disabled = false;

        // Fill out teh breakdown container
        let breakdown_list_container = document.createElement('div');
        let sorted_breakdown_keys = Object.keys(breakdown);
        sorted_breakdown_keys.forEach(function (die_key) {
            let breakdown_node = document.createElement('div');
            breakdown_node.innerHTML = breakdown[die_key].toLocaleString() + ("d" + die_key);
            breakdown_list_container.appendChild(breakdown_node);
        });
        SELECTED_DICE_BREAKDOWN.appendChild(breakdown_list_container);
    } else {
        roll_button.disabled = true;
    }
};

/* Function to get your number between 1 and max_num */
const getRandomInt = function (max_num) {
    return (Math.floor(Math.random() * max_num)) + 1;
}
/* Event on teh actual roll button */
roll_button.addEventListener('click', function () {
    let selected_dice = getSelectedDiceBreakdown();
    if (Object.keys(selected_dice).length < 1) {
        alert('You must selected at least one die to roll!');
        return false;
    }

    // Clear existing results
    document.getElementById('roll-results-header').classList.add('hidden');
    document.getElementById('results-container').classList.add('hidden');
    document.getElementById('results').innerText = '';
    if (document.querySelector('#results-breakdown > div')) {
        document.querySelector('#results-breakdown > div').remove();
    }

    // Commence to rolling
    let roll_results_breakdown = {};// Each key will be the type of die (d20, d4, etc) and the value will be an array with each index being a roll. the amount of indices will be based on how many of that die was selected to be
    let all_keys = Object.keys(selected_dice);
    all_keys.forEach(function (die_type) {
        let die_value = parseInt(die_type);
        let rolls = [];
        // For the number of dice selected for this type (type being d20, d4, etc), generate that many random numbers
        for (let num_rolls = 0; num_rolls < selected_dice[die_type]; num_rolls++) {
            rolls.push(getRandomInt(die_value));
        }
        roll_results_breakdown[die_type] = rolls;
    });
    console.log(roll_results_breakdown);

    // Calculate totals, and prepare the breakdown
    let roll_total = 0;
    for (let key in roll_results_breakdown) {
        roll_results_breakdown[key].forEach(function (value) {
            roll_total += value;
        });
    }
    console.log("Total: " + roll_total);

    // Show results below roll button
    document.getElementById('results').innerText = 'Total: ' + roll_total.toLocaleString()
    document.getElementById('roll-results-header').classList.remove('hidden');
    document.getElementById('results-container').classList.remove('hidden');
});

/* Event to remove button if one is clicked/tapped */
SELECTED_DICE_ELEMENT.addEventListener('click', function (event) {
    let target = event.target;
    if (target.tagName === 'BUTTON' && target.matches('.die.button')) {
        target.remove();
        manageSelectedBreakdownState();
    }
});

/* Button to clear out selection and results, and start a fresh roll */
document.getElementById('clear-all').addEventListener('click', function () {
    // TODO: Clear all
});

/* Add a button to the list if the user clicks one of the dice at the top */
document.querySelectorAll('#dice-container > button.die.button').forEach(function (die_button) {
    let btn_type = die_button.dataset.type;

    // Add an event to the die that will add an instance of it to teh selected dice list, then make sure it manages the breakdown state under selected dice
    die_button.addEventListener('click', function () {
        let button_instance = createButton(btn_type);
        // Take the button and append it to the end of selected_dice
        SELECTED_DICE_ELEMENT.appendChild(button_instance);

        // Check the roll button's state
        manageSelectedBreakdownState();
    });
});