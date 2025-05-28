document.addEventListener('DOMContentLoaded', function () {
    const selectiveReadingPracticeS14 = document.getElementById('selective-reading-practice-s14');
    if (selectiveReadingPracticeS14) {
        // 핵심 문장 선택
        const mainIdeaSelection = selectiveReadingPracticeS14.querySelector('.main-idea-selection-s14');
        if (mainIdeaSelection) {
            const sentences = Array.from(mainIdeaSelection.querySelectorAll('.clickable-sentence-s14'));
            const feedbackDiv = mainIdeaSelection.querySelector('.feedback-s14');
            const scoreDiv = mainIdeaSelection.querySelector('.score-s14'); // Added score div
            const correctIds = (mainIdeaSelection.dataset.correctSentenceIds || "").split(',').map(id => id.trim());
            const submitButton = mainIdeaSelection.querySelector('#submit-main-idea-s14');
            
            let selectedSentenceElements = [];

            sentences.forEach(sentence => {
                sentence.addEventListener('click', () => {
                    if (submitButton && submitButton.disabled) return; // Don't allow changes after submission

                    sentence.classList.toggle('selected-temp-s14');
                    sentence.classList.toggle('bg-blue-100');
                    sentence.classList.toggle('ring-2');
                    sentence.classList.toggle('ring-blue-400');

                    if (sentence.classList.contains('selected-temp-s14')) {
                        selectedSentenceElements.push(sentence);
                    } else {
                        selectedSentenceElements = selectedSentenceElements.filter(s => s !== sentence);
                    }
                });
            });

            if (submitButton) {
                submitButton.addEventListener('click', () => {
                    if (submitButton.disabled) return;
                    submitButton.disabled = true;
                    submitButton.classList.add('bg-gray-400', 'cursor-not-allowed');
                    submitButton.classList.remove('bg-blue-500', 'hover:bg-blue-600');

                    let userCorrectSelections = 0;
                    let userIncorrectSelections = 0;

                    sentences.forEach(s => {
                        s.style.pointerEvents = 'none'; // Disable further clicks on sentences
                        s.classList.remove('selected-temp-s14', 'bg-blue-100', 'ring-2', 'ring-blue-400'); // Clear temp selection

                        const sentenceId = s.dataset.sentenceId;
                        const isSelectedByUser = selectedSentenceElements.includes(s);
                        const isActuallyCorrect = correctIds.includes(sentenceId);

                        if (isSelectedByUser) {
                            if (isActuallyCorrect) {
                                s.classList.add('selected-main-s14', 'bg-green-100', 'text-green-700', 'ring-1', 'ring-green-400');
                                userCorrectSelections++;
                            } else {
                                s.classList.add('selected-wrong-s14', 'bg-red-100', 'text-red-700', 'ring-1', 'ring-red-400', 'line-through');
                                userIncorrectSelections++;
                            }
                        } else {
                            if (isActuallyCorrect) {
                                // User missed this correct sentence
                                s.classList.add('missed-correct-s14', 'bg-yellow-100', 'text-yellow-700', 'border', 'border-yellow-400');
                            }
                        }
                    });

                    let message = `결과: 핵심 문장 ${correctIds.length}개 중 ${userCorrectSelections}개 정답. 불필요한 문장 ${userIncorrectSelections}개 선택.`;
                    let feedbackClass = 'feedback-s14 mt-3 text-sm ';

                    if (userCorrectSelections === correctIds.length && userIncorrectSelections === 0) {
                        message = '정답입니다! 모든 핵심 문장들을 정확히 선택하고 불필요한 문장은 선택하지 않았습니다.';
                        feedbackClass += 'text-green-600 font-semibold';
                    } else {
                        message += ' 확인해보세요. 놓친 핵심 문장(노란색 배경)이나 잘못 선택한 문장(취소선)이 있을 수 있습니다.';
                        feedbackClass += 'text-red-600 font-semibold';
                    }
                    
                    if (feedbackDiv) {
                        feedbackDiv.textContent = message;
                        feedbackDiv.className = feedbackClass;
                        feedbackDiv.classList.remove('hidden');
                    }
                    if (scoreDiv) {
                        scoreDiv.textContent = `정답률: ${userCorrectSelections} / ${correctIds.length}`;
                        scoreDiv.classList.remove('hidden');
                    }
                });
            }
        }

        // 요약 연습: Show answer button for model summary
        // This is handled by common.js if the button has class="analyze-btn" data-target="summary-answer-s14"
        // The old script had:
        // const summaryAnswerBtn = selectiveReadingPracticeS14.querySelector('#show-summary-answer-s14');
        // if (summaryAnswerBtn) { ... }
        // So if it's a unique button:
        const summaryAnswerBtn = document.getElementById('show-summary-answer-s14');
        if (summaryAnswerBtn && !summaryAnswerBtn.classList.contains('analyze-btn')) { // Check if not already handled by common
            summaryAnswerBtn.addEventListener('click', () => {
                const answerDiv = document.getElementById('summary-answer-s14'); // Assuming this is the target
                if(answerDiv) {
                    answerDiv.classList.toggle('hidden');
                    summaryAnswerBtn.textContent = answerDiv.classList.contains('hidden') ? '모범 답안 보기' : '모범 답안 숨기기';
                } else {
                    console.warn("Element with ID 'summary-answer-s14' not found.");
                }
            });
        }
    }
});
