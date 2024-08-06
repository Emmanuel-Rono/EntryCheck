document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.querySelector('.circle');
    const percentageText = document.querySelector('.percentage');
    const message = document.getElementById('message');
    const restrictedMessage = document.getElementById('restrictedMessage');
    const addConditionButton = document.getElementById('addConditionButton');
    const newConditionInput = document.getElementById('newConditionInput');
    const checklist = document.getElementById('checklist');
    let totalConditions = 0;

    addConditionButton.addEventListener('click', addCondition);

    function addCondition() {
        const newConditionText = newConditionInput.value.trim();
        if (newConditionText !== '') {
            const newLabel = document.createElement('label');
            const newCheckbox = document.createElement('input');
            newCheckbox.type = 'checkbox';
            newCheckbox.classList.add('condition');
            newCheckbox.addEventListener('change', updateProgress);

            const newConditionSpan = document.createElement('span');
            newConditionSpan.textContent = newConditionText;
            newConditionSpan.contentEditable = true;
            newConditionSpan.addEventListener('blur', updateConditionText);

            newLabel.appendChild(newCheckbox);
            newLabel.appendChild(newConditionSpan);
            checklist.appendChild(newLabel);

            totalConditions++;
            newConditionInput.value = '';

            updateProgress();
        }
    }

    function updateConditionText(event) {
        const span = event.target;
        const newText = span.textContent.trim();
        if (newText === '') {
            const label = span.parentElement;
            const checkbox = label.querySelector('.condition');
            if (checkbox.checked) {
                checkbox.checked = false;
            }
            label.remove();
            totalConditions--;
            updateProgress();
        }
    }

    function updateProgress() {
        const checkedConditions = document.querySelectorAll('.condition:checked').length;
        const percentage = (totalConditions > 0) ? (checkedConditions / totalConditions) * 100 : 0;

        progressBar.style.strokeDasharray = `${percentage}, 100`;
        percentageText.textContent = `${Math.round(percentage)}%`;

        if (percentage === 100) {
            message.classList.remove('hidden');
            restrictedMessage.classList.add('hidden');
        } else {
            message.classList.add('hidden');
            restrictedMessage.classList.remove('hidden');
        }
    }
});
