document.addEventListener('DOMContentLoaded', function () {
    const contextClueQuiz = document.getElementById('context-clue-quiz');
    if (contextClueQuiz) {
        const practiceItems = contextClueQuiz.querySelectorAll('.practice-item');
        practiceItems.forEach((item, index) => {
            const options = item.querySelectorAll('.clue-option');
            const feedbackDiv = item.querySelector('.feedback'); // Each item should have its own feedback div
            const scoreDivId = `clue-score-${index + 1}`; // And a score div

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
                         window.updateFeedbackAndScore(
                            feedbackDiv.id,
                            '정답입니다! 정확한 문맥적 의미를 파악하셨습니다.',
                            'text-green-600',
                            scoreDivId, 1, 1
                        );
                        button.classList.add('bg-green-200', 'border-green-500', 'text-green-700', 'ring-2', 'ring-green-500');
                    } else {
                        let errorMsg = '아쉽지만 정답이 아닙니다.';
                        if (hint) errorMsg += ` ${hint}`;
                        else errorMsg += ' 다시 한번 문맥을 살펴보세요.';
                        
                        window.updateFeedbackAndScore(
                            feedbackDiv.id,
                            errorMsg,
                            'text-red-600',
                            scoreDivId, 0, 1
                        );
                        button.classList.add('bg-red-200', 'border-red-500', 'text-red-700', 'ring-2', 'ring-red-500');
                        
                        // Optionally highlight the correct answer
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
