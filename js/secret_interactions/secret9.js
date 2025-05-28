document.addEventListener('DOMContentLoaded', function () {
    const topicPracticeS9 = document.getElementById('topic-practice-s9');
    if (topicPracticeS9) {
        // 화제어 찾기
        const topicWordContainer = topicPracticeS9.querySelector('.topic-word-identification');
        if (topicWordContainer) {
            const words = topicWordContainer.querySelectorAll('.clickable-word-s9');
            const feedbackDiv = topicWordContainer.querySelector('.feedback-s9');
            const correctTopicWords = (topicWordContainer.dataset.correctWords || "").split(',').map(word => word.trim().toLowerCase());
            let foundCorrectWords = 0;

            words.forEach(word => {
                word.addEventListener('click', () => {
                    if (word.classList.contains('selected-correct-s9') || word.classList.contains('selected-incorrect-s9')) return;

                    const cleanedWord = word.textContent.trim().toLowerCase().replace(/[.,!?;:]/g, '');
                    
                    if (correctTopicWords.includes(cleanedWord)) {
                        word.classList.add('selected-correct-s9', 'bg-blue-200', 'ring-2', 'ring-blue-500', 'text-blue-700', 'cursor-default');
                        foundCorrectWords++;
                        if (feedbackDiv) {
                           feedbackDiv.textContent = `"${word.textContent.trim()}"은(는) 중요한 화제어입니다! (${foundCorrectWords}/${correctTopicWords.length} 찾음)`;
                           feedbackDiv.className = 'feedback-s9 mt-2 text-sm text-green-600 font-semibold';
                        }
                        if (foundCorrectWords === correctTopicWords.length) {
                            if(feedbackDiv) feedbackDiv.textContent += " 모든 화제어를 찾았습니다!";
                        }
                    } else {
                        word.classList.add('selected-incorrect-s9', 'bg-red-100', 'text-red-700', 'line-through', 'cursor-default');
                        if (feedbackDiv) {
                           feedbackDiv.textContent = `"${word.textContent.trim()}"은(는) 핵심 화제어는 아닌 것 같네요.`;
                           feedbackDiv.className = 'feedback-s9 mt-2 text-sm text-red-600 font-semibold';
                        }
                    }
                    if (feedbackDiv) feedbackDiv.classList.remove('hidden');
                });
            });
        }

        // 주제 문장 선택
        const topicSentenceContainer = topicPracticeS9.querySelector('.topic-sentence-selection');
        if (topicSentenceContainer) {
            const sentences = topicSentenceContainer.querySelectorAll('.clickable-sentence-s9');
            const feedbackDiv = topicSentenceContainer.querySelector('.feedback-s9');
            const scoreDivId = 'topic-sentence-score'; // Assuming one score for this exercise
            const correctSentenceId = topicSentenceContainer.dataset.correctSentenceId;
            let answered = false;

            sentences.forEach(sentence => {
                sentence.addEventListener('click', () => {
                    if (answered) return;
                    
                    sentences.forEach(s => {
                        s.classList.remove('ring-2', 'ring-blue-500', 'bg-blue-100', 'ring-red-500', 'bg-red-100', 'ring-green-500', 'bg-green-100');
                        s.classList.add('bg-gray-100', 'cursor-not-allowed'); // Visually disable others
                        s.style.pointerEvents = 'none'; // Disable all after one choice
                    });
                    
                    answered = true; // Lock after one attempt for this type of question

                    if (sentence.dataset.sentenceId === correctSentenceId) {
                        sentence.classList.add('ring-2', 'ring-green-500', 'bg-green-100', 'text-green-700');
                        window.updateFeedbackAndScore(feedbackDiv.id, '정답입니다! 이 문장이 문단의 주제를 잘 나타냅니다.', 'text-green-600', scoreDivId, 1, 1);
                    } else {
                        sentence.classList.add('ring-2', 'ring-red-500', 'bg-red-100', 'text-red-700');
                        window.updateFeedbackAndScore(feedbackDiv.id, '오답입니다. 주제 문장은 다른 것입니다.', 'text-red-600', scoreDivId, 0, 1);
                        // Highlight the correct sentence
                        sentences.forEach(s => {
                            if (s.dataset.sentenceId === correctSentenceId) {
                                s.classList.add('ring-2', 'ring-yellow-500', 'bg-yellow-100', 'text-yellow-700');
                            }
                        });
                    }
                    sentence.classList.remove('bg-gray-100', 'cursor-not-allowed');
                    sentence.style.pointerEvents = 'auto'; // Re-enable the chosen one briefly if needed, or keep all disabled
                    
                    if (feedbackDiv) feedbackDiv.classList.remove('hidden');
                    const scoreElement = document.getElementById(scoreDivId);
                    if(scoreElement) scoreElement.classList.remove('hidden');
                });
            });
        }
    }
});
