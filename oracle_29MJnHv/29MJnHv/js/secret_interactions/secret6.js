document.addEventListener('DOMContentLoaded', function () {
    const structureMatchingPracticeS6 = document.getElementById('structure-matching-practice');
    if (structureMatchingPracticeS6) {
        let selectedItemA = null;
        let matchedPairs = 0;
        const feedbackDiv = document.getElementById('feedback-s6-match');
        const scoreDiv = document.getElementById('score-s6-match');


        const itemsA = Array.from(structureMatchingPracticeS6.querySelectorAll('#list-a-s6 .match-item-s6'));
        const itemsB = Array.from(structureMatchingPracticeS6.querySelectorAll('#list-b-s6 .match-item-s6'));
        const totalPairs = itemsA.length;

        const handleItemClick = (item, listType) => {
            if (item.classList.contains('matched')) return; 

            if (listType === 'A') {
                if (selectedItemA === item) {
                    selectedItemA.classList.remove('ring-2', 'ring-blue-500', 'bg-blue-100');
                    selectedItemA = null;
                    if (feedbackDiv) feedbackDiv.textContent = '선택이 취소되었습니다.';
                } else {
                    if (selectedItemA) {
                        selectedItemA.classList.remove('ring-2', 'ring-blue-500', 'bg-blue-100');
                    }
                    item.classList.add('ring-2', 'ring-blue-500', 'bg-blue-100');
                    selectedItemA = item;
                    if (feedbackDiv) feedbackDiv.textContent = '짝이 되는 문장을 목록 B에서 선택하세요.';
                }
            } else if (listType === 'B') {
                if (!selectedItemA) {
                    if (feedbackDiv) {
                        feedbackDiv.textContent = '먼저 목록 A에서 문장을 선택하세요.';
                        feedbackDiv.className = 'mt-4 text-sm text-red-600 font-semibold';
                    }
                    return;
                }

                selectedItemA.classList.remove('ring-2', 'ring-blue-500', 'bg-blue-100'); // Remove selection highlight from A

                if (selectedItemA.dataset.matchId === item.dataset.matchId) {
                    selectedItemA.classList.add('matched', 'bg-green-200', 'text-green-800', 'cursor-default');
                    item.classList.add('matched', 'bg-green-200', 'text-green-800', 'cursor-default');
                    selectedItemA.style.pointerEvents = 'none';
                    item.style.pointerEvents = 'none';
                    
                    matchedPairs++;
                    if (feedbackDiv) {
                        feedbackDiv.textContent = `정답! 짝을 찾았습니다! (${matchedPairs}/${totalPairs} 완료)`;
                        feedbackDiv.className = 'mt-4 text-sm text-green-600 font-semibold';
                    }
                    if (scoreDiv) {
                        scoreDiv.textContent = `진행: ${matchedPairs}/${totalPairs}`;
                        scoreDiv.classList.remove('hidden');
                    }

                    selectedItemA = null; 
                    
                    if (matchedPairs === totalPairs) {
                        if (feedbackDiv) feedbackDiv.textContent = '모든 짝을 찾았습니다! 잘하셨습니다!';
                        if (scoreDiv) scoreDiv.textContent = `완료! 총 ${totalPairs}개의 짝을 모두 찾았습니다.`;
                    }
                } else {
                    selectedItemA.classList.add('ring-2', 'ring-red-500', 'bg-red-100');
                    item.classList.add('ring-2', 'ring-red-500', 'bg-red-100');
                    if (feedbackDiv) {
                        feedbackDiv.textContent = '오답입니다. 다시 시도해보세요.';
                        feedbackDiv.className = 'mt-4 text-sm text-red-600 font-semibold';
                    }
                    setTimeout(() => {
                        selectedItemA?.classList.remove('ring-2', 'ring-red-500', 'bg-red-100');
                        item?.classList.remove('ring-2', 'ring-red-500', 'bg-red-100');
                        if (feedbackDiv && feedbackDiv.textContent.startsWith('오답')) feedbackDiv.textContent = '다시 시도해보세요.';
                    }, 1500);
                    selectedItemA = null; 
                }
            }
             if (feedbackDiv) feedbackDiv.classList.remove('hidden');
        };

        itemsA.forEach(item => item.addEventListener('click', () => handleItemClick(item, 'A')));
        itemsB.forEach(item => item.addEventListener('click', () => handleItemClick(item, 'B')));
    }
});
