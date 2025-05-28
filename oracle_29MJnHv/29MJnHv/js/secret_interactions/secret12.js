document.addEventListener('DOMContentLoaded', function () {
    const textPatternPracticeS12 = document.getElementById('text-pattern-practice-s12');
    if (textPatternPracticeS12) {
        // 글 유형 분류
        const classificationItems = textPatternPracticeS12.querySelectorAll('.pattern-classification-item-s12');
        classificationItems.forEach((item, index) => {
            const select = item.querySelector('select');
            const feedback = item.querySelector('.feedback-s12');
            const scoreDivId = `pattern-score-s12-${index + 1}`;
            
            if (select && feedback) {
                select.addEventListener('change', () => {
                    if (select.disabled) return;
                    select.disabled = true; // Disable after one attempt
                    select.classList.add('cursor-not-allowed');

                    if (select.value === item.dataset.correctPattern) {
                        window.updateFeedbackAndScore(feedback.id, '정답입니다!', 'text-green-600', scoreDivId, 1, 1);
                        select.classList.add('border-green-500', 'ring-green-500');
                    } else if (select.value === "") {
                         window.updateFeedbackAndScore(feedback.id, '유형을 선택해주세요.', 'text-gray-600', scoreDivId, 0, 1);
                         select.disabled = false; // Allow retry
                         select.classList.remove('cursor-not-allowed');
                    } else {
                        const hint = item.dataset.hint || '이 글의 유형은 다른 것 같아요. 다시 한번 특징을 살펴보세요.';
                        const correctAnswerText = select.options[Array.from(select.options).findIndex(opt => opt.value === item.dataset.correctPattern)].text;
                        window.updateFeedbackAndScore(feedback.id, `오답입니다. 정답은 '${correctAnswerText}' 입니다. ${hint}`, 'text-red-600', scoreDivId, 0, 1);
                        select.classList.add('border-red-500', 'ring-red-500');
                    }
                    feedback.classList.remove('hidden');
                    const scoreElement = document.getElementById(scoreDivId);
                    if(scoreElement) scoreElement.classList.remove('hidden');
                });
            }
        });

        // 구조 식별 (Show/Hide button) - uses common analyze-btn logic if classes are set up
        // If `show-structure-btn-s12` is unique and doesn't use `data-target` like analyze-btn,
        // it needs specific handling. The old script.js used dataset.target for these.
        // So, if these buttons have class="analyze-btn" and data-target="ID_OF_ELEMENT_TO_TOGGLE",
        // common.js will handle them.
        // Let's ensure they do. If not, the specific logic from old script.js needs to be here.
        // The old code had:
        // textPatternPracticeS12.querySelectorAll('.show-structure-btn-s12')?.forEach(button => {
        // This implies it's specific. Let's keep it specific.
        textPatternPracticeS12.querySelectorAll('.show-structure-btn-s12').forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.dataset.target;
                const structureDiv = document.getElementById(targetId);
                if (structureDiv) {
                    structureDiv.classList.toggle('hidden');
                    button.textContent = structureDiv.classList.contains('hidden') ? '구조 해설 보기' : '구조 해설 숨기기';
                } else {
                    console.warn(`Target div with ID '${targetId}' not found for Secret 12 button.`);
                }
            });
        });
    }
});
