document.addEventListener('DOMContentLoaded', function () {
    const paraphrasePracticeS7 = document.getElementById('paraphrase-connection-practice');
    if (paraphrasePracticeS7) {
        let selectedSourceS7 = null;
        let matchedPairsS7 = 0;
        const feedbackDivS7 = document.getElementById('feedback-s7-connect');
        const scoreDivS7 = document.getElementById('score-s7-connect');
        const passageS7 = paraphrasePracticeS7.querySelector('.practice-passage-s7');

        if (!passageS7) return;

        const sources = Array.from(passageS7.querySelectorAll('.paraphrase-source-s7'));
        const targets = Array.from(passageS7.querySelectorAll('.paraphrase-target-s7'));
        const totalPairsS7 = sources.length;

        const handleParaphraseClick = (element, type) => {
            if (element.classList.contains('matched')) return;

            if (type === 'source') {
                if (selectedSourceS7 === element) {
                    selectedSourceS7.classList.remove('ring-2', 'ring-blue-500', 'bg-blue-100');
                    selectedSourceS7 = null;
                    if (feedbackDivS7) feedbackDivS7.textContent = '선택이 취소되었습니다.';
                } else {
                    if (selectedSourceS7) {
                        selectedSourceS7.classList.remove('ring-2', 'ring-blue-500', 'bg-blue-100');
                    }
                    element.classList.add('ring-2', 'ring-blue-500', 'bg-blue-100');
                    selectedSourceS7 = element;
                    if (feedbackDivS7) feedbackDivS7.textContent = `"${element.textContent.trim()}" 선택됨. 이와 같은 의미의 다른 표현을 찾아 클릭하세요.`;
                }
            } else if (type === 'target') {
                if (!selectedSourceS7) {
                    if (feedbackDivS7) {
                        feedbackDivS7.textContent = '먼저 원본 어구를 선택하세요 (파란색 밑줄).';
                        feedbackDivS7.className = 'mt-4 text-sm text-red-600 font-semibold';
                    }
                    return;
                }

                selectedSourceS7.classList.remove('ring-2', 'ring-blue-500', 'bg-blue-100');

                if (selectedSourceS7.dataset.groupId === element.dataset.groupId) {
                    selectedSourceS7.classList.add('matched', 'bg-green-200', 'text-green-800', 'cursor-default', 'no-underline');
                    element.classList.add('matched', 'bg-green-200', 'text-green-800', 'cursor-default', 'no-underline');
                    selectedSourceS7.style.pointerEvents = 'none';
                    element.style.pointerEvents = 'none';

                    matchedPairsS7++;
                    if (feedbackDivS7) {
                        feedbackDivS7.textContent = `정답! "${selectedSourceS7.textContent.trim()}" ↔ "${element.textContent.trim()}" 연결 성공!`;
                        feedbackDivS7.className = 'mt-4 text-sm text-green-600 font-semibold';
                    }
                     if (scoreDivS7) {
                        scoreDivS7.textContent = `진행: ${matchedPairsS7}/${totalPairsS7}`;
                        scoreDivS7.classList.remove('hidden');
                    }
                    selectedSourceS7 = null;
                    
                    if (matchedPairsS7 === totalPairsS7) {
                        if (feedbackDivS7) feedbackDivS7.textContent += ' 모든 바꿔쓰기 표현을 정확히 연결했습니다! 잘하셨습니다!';
                        if (scoreDivS7) scoreDivS7.textContent = `완료! ${totalPairsS7}쌍 모두 찾았습니다.`;
                    }
                } else {
                    selectedSourceS7.classList.add('ring-2', 'ring-red-500', 'bg-red-100');
                    element.classList.add('ring-2', 'ring-red-500', 'bg-red-100');
                     if (feedbackDivS7) {
                        feedbackDivS7.textContent = '오답! 올바른 짝이 아닙니다. 다시 시도해보세요.';
                        feedbackDivS7.className = 'mt-4 text-sm text-red-600 font-semibold';
                    }
                    setTimeout(() => {
                        selectedSourceS7?.classList.remove('ring-2', 'ring-red-500', 'bg-red-100');
                        element?.classList.remove('ring-2', 'ring-red-500', 'bg-red-100');
                        if (feedbackDivS7 && feedbackDivS7.textContent.startsWith('오답')) feedbackDivS7.textContent = '다시 시도해보세요.';
                    }, 1500);
                    selectedSourceS7 = null;
                }
            }
             if (feedbackDivS7) feedbackDivS7.classList.remove('hidden');
        };

        sources.forEach(element => element.addEventListener('click', () => handleParaphraseClick(element, 'source')));
        targets.forEach(element => element.addEventListener('click', () => handleParaphraseClick(element, 'target')));
    }
});
