const pollForm = document.getElementById('poll-form');
const questionInput = document.getElementById('poll-question');
const optionsContainer = document.getElementById('options-container');
const addOptionBtn = document.getElementById('add-option-btn');

addOptionBtn.addEventListener('click', function(){
    const currentOptions = optionsContainer.querySelectorAll('.option-input');
    const nextOptionNumber = currentOptions.length + 1;
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.className = 'option-input';
    newInput.placeholder = `Option ${nextOptionNumber}`;
    newInput.required = true;
    optionsContainer.appendChild(newInput);
});

pollForm.addEventListener('submit', function(event){
    event.preventDefault();
    const questionText = questionInput.value.trim();
    const optionInputs = optionsContainer.querySelectorAll('.option-input')
    const optionsArray = [];
    optionInputs.forEach(input => {
        const optionText = input.value.trim();
        if(optionText !==""){
            optionsArray.push({
                text: optionText,
                votes: 0
            });
        }
    });

    if(optionsArray.length < 2){
        alert("Please provide at least 2 valid options for your poll.");
        return;
    }

    const newPoll = {
        id: Date.now(),
        question: questionText,
        options: optionsArray,
        totalVotes: 0
    };

    const existingPolls = JSON.parse(localStorage.getItem('myPolls')) || [];

    existingPolls.push(newPoll);
    localStorage.setItem('myPolls', JSON.stringify(existingPolls))
    window.location.href = 'view.html';

});