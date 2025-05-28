document.addEventListener('DOMContentLoaded', function () {
    const comparisonQuiz = document.getElementById('comparison-quiz');
    if (comparisonQuiz) {
        const questions = comparisonQuiz.querySelectorAll('.comparison-question');
        questions.forEach((questionDiv, index) => {
            const options = questionDiv.querySelectorAll('.comparison-option');
            const feedbackDiv = questionDiv.querySelector('.feedback'); // Each question its own feedback
            const scoreDivId = `comparison-score-${index + 1}`;

            options.forEach(option => {
                option.addEventListener('click', () => {
                    if (option.disabled) return;

                    options.forEach(opt => {
                        opt.classList.remove('bg-green-200', 'border-green-500', 'text-green-700', 'bg-red-200', 'border-red-500', 'text-red-700', 'ring-2', 'ring-offset-1', 'bg-gray-200', 'hover:bg-gray-300');
                        opt.classList.add('bg-gray-100', 'text-gray-500', 'cursor-not-allowed');
                        opt.disabled = true; 
                    });

                    const isCorrect = option.dataset.correct === 'true';
                    const hint = option.dataset.hint || "";

                    if(isCorrect) {
                        window.updateFeedbackAndScore(feedbackDiv.id, "정답입니다! 정확하게 비교 대상을 파악했습니다.", 'text-green-600', scoreDivId, 1, 1);
                        option.classList.add('bg-green-200', 'border-green-500', 'text-green-700', 'ring-2', 'ring-green-500');
                    } else {
                        let errorMsg = "오답입니다.";
                        if(hint) errorMsg += ` ${hint}`;
                        else errorMsg += " 다시 한번 문장 구조와 비교 대상을 살펴보세요.";
                         window.updateFeedbackAndScore(feedbackDiv.id, errorMsg, 'text-red-600', scoreDivId, 0, 1);
                        option.classList.add('bg-red-200', 'border-red-500', 'text-red-700', 'ring-2', 'ring-red-500');
                        options.forEach(opt => {
                            if(opt.dataset.correct === 'true') {
                                opt.classList.add('bg-yellow-200', 'border-yellow-500', 'text-yellow-700');
                            }
                        });
                    }
                    option.classList.remove('bg-gray-100', 'text-gray-500');
                    feedbackDiv.classList.remove('hidden');
                    const scoreElement = document.getElementById(scoreDivId);
                    if(scoreElement) scoreElement.classList.remove('hidden');
                });
            });
        });
    }
});
