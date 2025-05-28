document.addEventListener('DOMContentLoaded', function () {
    const anticipationPracticeS13 = document.getElementById('anticipation-practice-s13');
    if (anticipationPracticeS13) {
        // 다음 문장 예측
        const predictionQuestions = anticipationPracticeS13.querySelectorAll('.prediction-question-s13');
        predictionQuestions.forEach((item, index) => {
            const options = item.querySelectorAll('.option-btn-s13');
            const feedbackDiv = item.querySelector('.feedback-s13');
            const scoreDivId = `prediction-score-s13-${index + 1}`;

            options.forEach(button => {
                button.addEventListener('click', () => {
                    if (button.disabled) return;

                    options.forEach(opt => {
                        opt.classList.remove('bg-green-200', 'border-green-500', 'bg-red-200', 'border-red-500', 'ring-2', 'ring-offset-1', 'bg-gray-100', 'hover:bg-gray-200');
                        opt.classList.add('bg-gray-50', 'text-gray-400', 'cursor-not-allowed', 'border-gray-200');
                        opt.disabled = true;
                    });

                    const isCorrect = button.dataset.correct === 'true';
                    const feedbackText = button.dataset.feedback || (isCorrect ? '정답입니다! 문맥의 흐름을 잘 예측하셨습니다.' : '오답입니다. 다른 선택지를 고려해보세요.');
                    
                    if (isCorrect) {
                        window.updateFeedbackAndScore(feedbackDiv.id, feedbackText, 'text-green-600', scoreDivId, 1, 1);
                        button.classList.add('bg-green-200', 'border-green-500', 'text-green-700', 'ring-2', 'ring-green-500');
                    } else {
                         window.updateFeedbackAndScore(feedbackDiv.id, feedbackText, 'text-red-600', scoreDivId, 0, 1);
                        button.classList.add('bg-red-200', 'border-red-500', 'text-red-700', 'ring-2', 'ring-red-500');
                        options.forEach(opt => {
                            if(opt.dataset.correct === 'true') {
                                opt.classList.add('bg-yellow-200', 'border-yellow-500', 'text-yellow-700');
                                opt.classList.remove('bg-gray-50', 'text-gray-400', 'border-gray-200');
                            }
                        });
                    }
                    button.classList.remove('bg-gray-50', 'text-gray-400', 'border-gray-200');
                    feedbackDiv.classList.remove('hidden');
                    const scoreElement = document.getElementById(scoreDivId);
                    if(scoreElement) scoreElement.classList.remove('hidden');
                });
            });
        });

        // 문단 완성 (New Implementation)
        const paragraphCompletion = document.getElementById('paragraph-completion-s13');
        if (paragraphCompletion) {
            const questions = paragraphCompletion.querySelectorAll('.completion-question-s13');
            questions.forEach((questionDiv, qIndex) => {
                const blanks = questionDiv.querySelectorAll('.phrase-blank-s13');
                const phraseOptionsContainer = questionDiv.querySelector('.phrase-options-s13');
                const phrases = phraseOptionsContainer ? Array.from(phraseOptionsContainer.querySelectorAll('.phrase-option-s13')) : [];
                const feedbackDiv = questionDiv.querySelector(`#completion-feedback-${qIndex + 1}`);
                const scoreDiv = questionDiv.querySelector(`#completion-score-${qIndex+1}`);

                let filledBlanks = 0;
                let correctFills = 0;

                phrases.forEach(phraseBtn => {
                    phraseBtn.addEventListener('click', () => {
                        if (phraseBtn.disabled) return;

                        const targetBlankId = phraseBtn.dataset.targetBlank;
                        const targetBlank = questionDiv.querySelector(`#${targetBlankId}`);
                        
                        if (targetBlank && !targetBlank.dataset.filled) {
                            targetBlank.textContent = phraseBtn.textContent;
                            targetBlank.dataset.filled = "true";
                            phraseBtn.disabled = true;
                            phraseBtn.classList.add('bg-gray-300', 'text-gray-500', 'line-through', 'cursor-not-allowed');
                            phraseBtn.classList.remove('bg-indigo-100', 'hover:bg-indigo-200');
                            filledBlanks++;

                            if (targetBlank.dataset.correctPhrase === phraseBtn.dataset.phraseId) {
                                targetBlank.classList.add('text-green-600', 'font-semibold', 'border-green-300');
                                correctFills++;
                            } else {
                                targetBlank.classList.add('text-red-600', 'font-semibold', 'border-red-300');
                                // Show correct phrase next to it or something
                                const actualCorrectPhrase = phrases.find(p => p.dataset.phraseId === targetBlank.dataset.correctPhrase);
                                if(actualCorrectPhrase) {
                                    const hintSpan = document.createElement('span');
                                    hintSpan.className = 'text-xs text-yellow-600 ml-1';
                                    hintSpan.textContent = `(정답: ${actualCorrectPhrase.textContent})`;
                                    targetBlank.parentNode.insertBefore(hintSpan, targetBlank.nextSibling);
                                }
                            }

                            if (filledBlanks === blanks.length) {
                                // All blanks filled, show final feedback
                                if (feedbackDiv) {
                                    feedbackDiv.textContent = `문단 완성! ${correctFills}/${blanks.length}개 정확합니다.`;
                                    feedbackDiv.className = correctFills === blanks.length ? 'mt-3 text-sm text-green-600 font-semibold' : 'mt-3 text-sm text-red-600 font-semibold';
                                    feedbackDiv.classList.remove('hidden');
                                }
                                if(scoreDiv) {
                                    scoreDiv.textContent = `점수: ${correctFills}/${blanks.length}`;
                                    scoreDiv.classList.remove('hidden');
                                }
                                phrases.forEach(p => p.disabled = true); // Disable all options
                            }
                        }
                    });
                });
            });
        }
    }
});
