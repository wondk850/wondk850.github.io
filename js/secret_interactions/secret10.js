document.addEventListener('DOMContentLoaded', function () {
    const signalWordPracticeS10 = document.getElementById('signal-word-practice-s10');
    if (signalWordPracticeS10) {
        // 안내어 기능 매칭
        const matchingContainer = signalWordPracticeS10.querySelector('.signal-word-matching');
        if (matchingContainer) {
            const questions = matchingContainer.querySelectorAll('.match-question-s10');
            questions.forEach((q, index) => {
                const select = q.querySelector('select');
                const feedback = q.querySelector('.feedback-s10'); // Each question gets its own feedback
                const scoreDivId = `match-score-s10-${index + 1}`;
                
                if (select && feedback) {
                    select.addEventListener('change', () => {
                        if (select.disabled) return;
                        select.disabled = true; // Disable after one attempt
                        select.classList.add('cursor-not-allowed');


                        if (select.value === select.dataset.correctFunction) {
                            window.updateFeedbackAndScore(feedback.id, '정답입니다!', 'text-green-600', scoreDivId, 1, 1);
                            select.classList.add('border-green-500', 'ring-green-500');
                        } else if (select.value === "") {
                            window.updateFeedbackAndScore(feedback.id, '기능을 선택해주세요.', 'text-gray-600', scoreDivId, 0, 1);
                             select.disabled = false; // Allow retry if no option selected
                             select.classList.remove('cursor-not-allowed');
                        } else {
                             window.updateFeedbackAndScore(feedback.id, `오답입니다. 정답은 '${select.options[Array.from(select.options).findIndex(opt => opt.value === select.dataset.correctFunction)].text}'입니다.`, 'text-red-600', scoreDivId, 0, 1);
                            select.classList.add('border-red-500', 'ring-red-500');
                        }
                        feedback.classList.remove('hidden');
                        const scoreElement = document.getElementById(scoreDivId);
                        if(scoreElement) scoreElement.classList.remove('hidden');
                    });
                }
            });
        }

        // 안내어 빈칸 채우기
        const fillBlankContainer = signalWordPracticeS10.querySelector('.signal-word-fill-blank');
        if (fillBlankContainer) {
            const questions = fillBlankContainer.querySelectorAll('.blank-question-s10');
            questions.forEach((q, index) => {
                const select = q.querySelector('select.signal-blank-select-s10'); // More specific selector
                const feedback = q.querySelector('.feedback-s10');
                const scoreDivId = `fill-blank-score-s10-${index + 1}`;

                if (select && feedback) {
                    select.addEventListener('change', () => {
                        if(select.disabled) return;
                        select.disabled = true;
                        select.classList.add('cursor-not-allowed');

                        if (select.value === select.dataset.correctSignal) {
                            window.updateFeedbackAndScore(feedback.id, '정답입니다! 문맥에 잘 어울리는 안내어입니다.', 'text-green-600', scoreDivId, 1, 1);
                            select.classList.add('border-green-500', 'ring-green-500');
                        } else if (select.value === "") {
                            window.updateFeedbackAndScore(feedback.id, '안내어를 선택해주세요.', 'text-gray-600', scoreDivId, 0, 1);
                            select.disabled = false; // Allow retry if no option selected
                            select.classList.remove('cursor-not-allowed');
                        } else {
                             window.updateFeedbackAndScore(feedback.id, `오답입니다. 정답은 '${select.dataset.correctSignal}'입니다. 다시 생각해보세요.`, 'text-red-600', scoreDivId, 0, 1);
                            select.classList.add('border-red-500', 'ring-red-500');
                        }
                        feedback.classList.remove('hidden');
                        const scoreElement = document.getElementById(scoreDivId);
                        if(scoreElement) scoreElement.classList.remove('hidden');
                    });
                }
            });
        }
    }
});
