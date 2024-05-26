/* Function to create a button based on type */
const createButton = function (type) {
    let button = document.createElement('button');
    button.classList.add('removable', 'die', 'button');
    button.type = 'button';
    button.setAttribute('data-type', type);
    let btn_text_node = document.createTextNode(type);
    // Add close span
    let close_span = document.createElement('span');
    close_span.classList.add('close');
    button.appendChild(btn_text_node);
    button.appendChild(close_span);
    return button;
};

const selected_dice = document.getElementById('selected-dice');
const selected_dice_breakdown = document.getElementById('selected-dice-breakdown');
const addButtonToSelected = function (button_elem) {
    // Take the button and append it to the end of selected_dice
    selected_dice.appendChild(button_elem);

    // TODO: Gather which dice have been selected, and put them into a list to show the breakdown
};

/* Dice Selection Events */
document.querySelectorAll('#dice-container > button.die.button').forEach(function (die_button) {
    let btn_type = die_button.dataset.type;
    die_button.addEventListener('click', function () {
        console.log("I, button '" + btn_type + "' have been clicked");
        let button_instance = createButton(btn_type);
        console.log(button_instance);
        addButtonToSelected(button_instance);
    });
});