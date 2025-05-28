document.addEventListener('DOMContentLoaded', function () {
    const contextualMeaningPracticeS11 = document.getElementById('contextual-meaning-practice-s11');
    if (contextualMeaningPracticeS11) {
        const questions = contextualMeaningPracticeS11.querySelectorAll('.meaning-question-s11');
        questions.forEach((item, index) => {
            const options = item.querySelectorAll('.option-btn-s11');
            const feedbackDiv = item.querySelector('.feedback-s11');
            const scoreDivId = `meaning-score-s11-${index + 1}`;
            
            options.forEach(button => {
                button.addEventListener('click', () => {
                    if (button.disabled) return;

                    options.forEach(opt => {
                        opt.classList.remove('bg-green-200', 'border-green-500', 'bg-red-200', 'border-red-500', 'ring-2', 'ring-offset-1', 'bg-gray-100', 'hover:bg-gray-200');
                        opt.classList.add('bg-gray-50', 'text-gray-400', 'cursor-not-allowed', 'border-gray-200');
                        opt.disabled = true;
                    });

                    const isCorrect = button.dataset.correct === 'true';
                    const hint = button.dataset.hint || "";
                    
                    if (isCorrect) {
                        window.updateFeedbackAndScore(feedbackDiv.id, '정답입니다! 문맥적 의미를 정확히 파악했습니다.', 'text-green-600', scoreDivId, 1, 1);
                        button.classList.add('bg-green-200', 'border-green-500', 'text-green-700', 'ring-2', 'ring-green-500');
                    } else {
                        let errorMsg = '오답입니다.';
                        if(hint) errorMsg += ` ${hint}`;
                        else errorMsg += ' 문맥을 다시 한번 살펴보세요.';
                        window.updateFeedbackAndScore(feedbackDiv.id, errorMsg, 'text-red-600', scoreDivId, 0, 1);
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
    }
});
