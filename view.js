const pollsContainer = document.getElementById('polls-list-container');
const emptyStateMsg = document.getElementById('empty-state-msg');

function renderPolls() {
    const savedPolls = JSON.parse(localStorage.getItem('myPolls')) || [];
    if(savedPolls.length==0){
        emptyStateMsg.style.display = 'block';
        return;
    }

    emptyStateMsg.style.display = 'none';
    pollsContainer.innerHTML = '';
    savedPolls.forEach(poll =>{
        const pollCard = document.createElement('div');
        pollCard.className = 'poll-card';

        const questionTitle = document.createElement('h3');
        questionTitle.textContent = poll.question;
        pollCard.appendChild(questionTitle);

        poll.options.forEach((option, optionIndex)=>{
            const percentage = poll.totalVotes > 0 ? Math.round((option.votes/poll.totalVotes)*100) : 0;

            const optionBtn = document.createElement('button');
            optionBtn.className = 'option-btn';
            optionBtn.textContent = `${option.text} — ${percentage}% (${option.votes} votes)`;

            optionBtn.addEventListener('click', function(){
                handleVote(poll.id, optionIndex);
            });
            pollCard.appendChild(optionBtn);
        });
        const totalVotesText = document.createElement('p');
        totalVotesText.className = 'total-votes';
        totalVotesText.textContent = `Total votes: ${poll.totalVotes}`;
        pollCard.appendChild(totalVotesText);
        pollsContainer.appendChild(pollCard);
    });
} 

function handleVote(pollId, optionIndex) {
    const savedPolls = JSON.parse(localStorage.getItem('myPolls')) || [];

    const targetPoll = savedPolls.find(poll => poll.id === pollId);

    if (targetPoll) {
        targetPoll.options[optionIndex].votes += 1;

        targetPoll.totalVotes += 1;

        localStorage.setItem('myPolls', JSON.stringify(savedPolls));

        renderPolls();
    }
}
renderPolls();
