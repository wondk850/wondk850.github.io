document.addEventListener('DOMContentLoaded', function () {
    const expressionChoiceS8 = document.getElementById('understanding-expression-choice-s8');
    if (expressionChoiceS8) {
        const practiceItems = expressionChoiceS8.querySelectorAll('.practice-item-s8');
        practiceItems.forEach((item, index) => {
            const options = item.querySelectorAll('.option-btn-s8');
            const feedbackDiv = item.querySelector('.feedback-s8');
            const scoreDivId = `expression-score-${index + 1}`;

            options.forEach(button => {
                button.addEventListener('click', () => {
                    if (button.disabled) return;

                    options.forEach(opt => { 
                        opt.classList.remove('bg-green-200', 'border-green-500', 'bg-red-200', 'border-red-500', 'ring-2', 'ring-offset-1', 'bg-gray-200', 'hover:bg-gray-300');
                        opt.classList.add('bg-gray-100', 'text-gray-500', 'cursor-not-allowed');
                        opt.disabled = true; 
                    });

                    const isCorrect = button.dataset.correct === 'true';
                    const hint = button.dataset.hint || "";
                    
                    if (isCorrect) {
                        window.updateFeedbackAndScore(feedbackDiv.id, '정답입니다! 뉘앙스를 정확히 파악하셨습니다.', 'text-green-600', scoreDivId, 1, 1);
                        button.classList.add('bg-green-200', 'border-green-500', 'text-green-700', 'ring-2', 'ring-green-500');
                    } else {
                        let errorMsg = '아쉽지만 정답이 아닙니다.';
                        if(hint) errorMsg += ` ${hint}`;
                        else errorMsg += ' 다른 표현의 뉘앙스를 다시 생각해보세요.';
                        window.updateFeedbackAndScore(feedbackDiv.id, errorMsg, 'text-red-600', scoreDivId, 0, 1);
                        button.classList.add('bg-red-200', 'border-red-500', 'text-red-700', 'ring-2', 'ring-red-500');
                         options.forEach(opt => {
                            if(opt.dataset.correct === 'true') {
                                opt.classList.add('bg-yellow-200', 'border-yellow-500', 'text-yellow-700');
                            }
                        });
                    }
                     button.classList.remove('bg-gray-100', 'text-gray-500');
                    feedbackDiv.classList.remove('hidden');
                    const scoreElement = document.getElementById(scoreDivId);
                    if(scoreElement) scoreElement.classList.remove('hidden');
                });
            });
        });
    }
});
