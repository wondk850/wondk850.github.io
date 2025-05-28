document.addEventListener('DOMContentLoaded', function () {
    // Secret 1: 지시어 대상 찾기 (Practice Referent)
    const practiceReferentSection = document.getElementById('practice-referent');
    if (practiceReferentSection) {
        const questions = practiceReferentSection.querySelectorAll('.practice-sentence');
        questions.forEach((sentenceDiv, index) => {
            const indicator = sentenceDiv.querySelector('.js-referent-indicator');
            const feedbackDiv = sentenceDiv.querySelector(`#referent-feedback-${index + 1}`);
            const options = sentenceDiv.querySelectorAll('.referent-options .referent-option');
            const scoreDivId = `referent-score-${index + 1}`; // Assuming a score div per question

            options.forEach(option => {
                option.addEventListener('click', () => {
                    if (!indicator || !feedbackDiv) {
                        console.warn("Missing indicator or feedbackDiv for a referent question.");
                        return;
                    }
                    if (option.disabled) return; // Already answered

                    const correctReferentText = indicator.dataset.correctReferent;
                    const selectedText = option.textContent.trim();
                    
                    options.forEach(opt => {
                        opt.classList.remove('bg-green-200', 'border-green-400', 'bg-red-200', 'border-red-400', 'ring-2', 'ring-offset-1', 'bg-gray-200', 'hover:bg-gray-300');
                        opt.classList.add('bg-gray-100', 'text-gray-500', 'cursor-not-allowed'); // Visually disable
                        opt.disabled = true; 
                    });

                    if (selectedText === correctReferentText) {
                        window.updateFeedbackAndScore(
                            feedbackDiv.id, 
                            `정답입니다! "${indicator.textContent}"은(는) "${selectedText}"을(를) 가리킵니다.`, 
                            'text-green-600',
                            scoreDivId, 1, 1 // Example score: 1 out of 1 for this item
                        );
                        option.classList.add('bg-green-200', 'border-green-500', 'text-green-700', 'ring-2', 'ring-green-500');
                        option.classList.remove('bg-gray-100', 'text-gray-500');
                    } else {
                        window.updateFeedbackAndScore(
                            feedbackDiv.id,
                            `오답입니다. "${indicator.textContent}"은(는) "${selectedText}"을(를) 가리키지 않습니다. 정답은 "${correctReferentText}" 입니다.`,
                            'text-red-600',
                            scoreDivId, 0, 1 // Example score: 0 out of 1
                        );
                        option.classList.add('bg-red-200', 'border-red-500', 'text-red-700', 'ring-2', 'ring-red-500');
                        option.classList.remove('bg-gray-100', 'text-gray-500');
                        // Highlight the correct one
                        options.forEach(opt => {
                            if(opt.textContent.trim() === correctReferentText) {
                                opt.classList.add('bg-yellow-200', 'border-yellow-500', 'text-yellow-700', 'ring-2', 'ring-yellow-500');
                                opt.classList.remove('bg-gray-100', 'text-gray-500');
                            }
                        });
                    }
                    feedbackDiv.classList.remove('hidden');
                    const scoreElement = document.getElementById(scoreDivId);
                    if (scoreElement) scoreElement.classList.remove('hidden');
                });
            });
        });
    }

    // Secret 1: 지시어와 대상 연결 (하이라이팅 개선)
    const practiceHighlightSection = document.getElementById('practice-highlight');
    if (practiceHighlightSection) {
        let firstSelectionS1 = null;
        const feedbackDiv = practiceHighlightSection.querySelector('.highlight-feedback');
        const elementsToConnect = practiceHighlightSection.querySelectorAll('.highlight-connect');
        let pairsFound = 0;
        const totalPairs = practiceHighlightSection.dataset.totalPairs ? parseInt(practiceHighlightSection.dataset.totalPairs) : (elementsToConnect.length / 2);

        elementsToConnect.forEach(element => {
            element.addEventListener('click', () => {
                if (element.classList.contains('matched-correct')) return; // Already correctly matched

                if (!firstSelectionS1) { // First click
                    if (element.classList.contains('selected-for-connection')) { // Deselect if clicked again
                        element.classList.remove('selected-for-connection', 'ring-2', 'ring-blue-500', 'bg-blue-100');
                        firstSelectionS1 = null;
                        if (feedbackDiv) feedbackDiv.textContent = '선택이 취소되었습니다.';
                    } else {
                        element.classList.add('selected-for-connection', 'ring-2', 'ring-blue-500', 'bg-blue-100');
                        firstSelectionS1 = element;
                        if (feedbackDiv) feedbackDiv.textContent = `"${element.textContent.trim()}" 선택됨. 이제 이것이 가리키는 대상을 클릭하세요.`;
                    }
                } else { // Second click
                    if (element === firstSelectionS1) { // Clicked same element
                        element.classList.remove('selected-for-connection', 'ring-2', 'ring-blue-500', 'bg-blue-100');
                        firstSelectionS1 = null;
                        if (feedbackDiv) feedbackDiv.textContent = '선택이 취소되었습니다.';
                    } else { // Clicked a different element for pairing
                        const group1 = firstSelectionS1.dataset.connectGroup;
                        const type1 = firstSelectionS1.dataset.type;
                        const group2 = element.dataset.connectGroup;
                        const type2 = element.dataset.type;

                        // Clear previous selection style from firstSelectionS1
                        firstSelectionS1.classList.remove('selected-for-connection', 'ring-2', 'ring-blue-500', 'bg-blue-100');

                        if (group1 === group2 && type1 !== type2) { // Correct pair
                            firstSelectionS1.classList.add('matched-correct', 'bg-green-200', 'text-green-800', 'ring-2', 'ring-green-500');
                            element.classList.add('matched-correct', 'bg-green-200', 'text-green-800', 'ring-2', 'ring-green-500');
                            
                            pairsFound++;
                            if (feedbackDiv) feedbackDiv.textContent = `정답! "${firstSelectionS1.textContent.trim()}" ↔ "${element.textContent.trim()}" 연결 성공! (${pairsFound}/${totalPairs} 쌍 완료)`;
                            
                            if (pairsFound === totalPairs) {
                                if (feedbackDiv) feedbackDiv.textContent += ' 모든 쌍을 정확히 찾았습니다! 훌륭합니다!';
                                elementsToConnect.forEach(el => el.style.cursor = 'default'); // No more clicks
                            }
                        } else { // Incorrect pair
                            firstSelectionS1.classList.add('temp-incorrect', 'bg-red-100', 'ring-2', 'ring-red-400');
                            element.classList.add('temp-incorrect', 'bg-red-100', 'ring-2', 'ring-red-400');
                            if (feedbackDiv) feedbackDiv.textContent = '오답! 올바른 지시어와 대상을 연결해주세요. 잠시 후 다시 시도할 수 있습니다.';
                            setTimeout(() => {
                                firstSelectionS1?.classList.remove('temp-incorrect', 'bg-red-100', 'ring-2', 'ring-red-400');
                                element?.classList.remove('temp-incorrect', 'bg-red-100', 'ring-2', 'ring-red-400');
                                if (feedbackDiv && feedbackDiv.textContent.startsWith('오답!')) feedbackDiv.textContent = '다시 시도해보세요.';
                            }, 1500);
                        }
                        firstSelectionS1 = null; // Reset first selection
                    }
                }
                if (feedbackDiv) feedbackDiv.classList.remove('hidden');
            });
        });
    }

    // Secret 1: Fill in the blanks
    const fillBlanksPractice = document.getElementById('fill-blanks-practice-s1');
    if (fillBlanksPractice) {
        const questions = fillBlanksPractice.querySelectorAll('.fill-blank-question-s1');
        questions.forEach((questionDiv, index) => {
            const inputElement = questionDiv.querySelector('.blank-input-s1');
            const submitButton = questionDiv.querySelector('.submit-blank-s1');
            const feedbackDiv = questionDiv.querySelector(`#fill-blank-feedback-${index + 1}`);
            const scoreDivId = `fill-blank-score-${index+1}`;

            if (inputElement && submitButton && feedbackDiv) {
                submitButton.addEventListener('click', () => {
                    if (inputElement.disabled) return;

                    const userAnswer = inputElement.value.trim().toLowerCase();
                    const correctAnswer = inputElement.dataset.correctAnswer.toLowerCase();
                    const hint = inputElement.dataset.hint;

                    inputElement.disabled = true;
                    submitButton.disabled = true;
                    submitButton.classList.add('bg-gray-400', 'cursor-not-allowed');
                    submitButton.classList.remove('bg-blue-500', 'hover:bg-blue-600');

                    if (userAnswer === correctAnswer) {
                        inputElement.classList.add('border-green-500', 'ring-green-500');
                         window.updateFeedbackAndScore(feedbackDiv.id, '정답입니다! 훌륭합니다.', 'text-green-600', scoreDivId, 1, 1);
                    } else {
                        inputElement.classList.add('border-red-500', 'ring-red-500');
                        let feedbackMsg = `오답입니다. 정답은 "${inputElement.dataset.correctAnswer}"입니다.`;
                        if (hint) {
                            feedbackMsg += ` (힌트: ${hint})`;
                        }
                        window.updateFeedbackAndScore(feedbackDiv.id, feedbackMsg, 'text-red-600', scoreDivId, 0, 1);
                    }
                    feedbackDiv.classList.remove('hidden');
                     const scoreElement = document.getElementById(scoreDivId);
                    if (scoreElement) scoreElement.classList.remove('hidden');
                });
            }
        });
    }
});
