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

const roll_button = document.getElementById('roll-button');
const manageButtonState = function () {
    // If there are any dice at all, enable the "Roll" button. If there are none, disable it
    if (SELECTED_DICE_ELEMENT.querySelectorAll('button.die.button').length > 0) {
        roll_button.disabled = false;
    } else {
        roll_button.disabled = true;
    }
};
const SELECTED_DICE_ELEMENT = document.getElementById('selected-dice');
const SELECTED_DICE_BREAKDOWN = document.getElementById('selected-dice-breakdown');
const addButtonToSelected = function (button_elem) {
    // Take the button and append it to the end of selected_dice
    SELECTED_DICE_ELEMENT.appendChild(button_elem);

    // Gather which dice have been selected, and put them into a list to show the breakdown
    if (SELECTED_DICE_BREAKDOWN.querySelector('div')) {
        SELECTED_DICE_BREAKDOWN.querySelector('div').remove();
    }
    let selected_dice = SELECTED_DICE_ELEMENT.querySelectorAll('button.die.button');
    if (selected_dice && selected_dice.length > 0) {
        let breakdown = {};
        selected_dice.forEach(function (die_btn) {
            let type = die_btn.dataset.type;
            if (!(type in breakdown)) {
                breakdown[type] = 1;
            } else {
                breakdown[type]++;
            }
        });
        let breakdown_list_container = document.createElement('div');
        for (let die in breakdown) {
            let breakdown_node = document.createElement('div');
        }
        SELECTED_DICE_BREAKDOWN.appendChild(breakdown_list_container);
    }

    // Check the roll button's state
    manageButtonState();
};

// Roll event
roll_button.addEventListener('click', function () {
    let selected_dice = SELECTED_DICE_ELEMENT.querySelectorAll('button.die.button');
    if (!selected_dice) {
        alert('You must selected at least one die to roll!');
        return false;
    }

    // TODO: Roll
});

/* Event to remove button if one is clicked/tapped */
SELECTED_DICE_ELEMENT.addEventListener('click', function (event) {
    let target = event.target;
    if (target.tagName === 'BUTTON' && target.matches('.die.button')) {
        target.remove();
        manageButtonState();
    }
});

/* Dice Selection Events */
document.querySelectorAll('#dice-container > button.die.button').forEach(function (die_button) {
    let btn_type = die_button.dataset.type;
    die_button.addEventListener('click', function () {
        let button_instance = createButton(btn_type);
        addButtonToSelected(button_instance);
    });
});