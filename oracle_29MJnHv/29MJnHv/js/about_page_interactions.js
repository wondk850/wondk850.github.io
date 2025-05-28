document.addEventListener('DOMContentLoaded', function () {
    // --- Interactive SVG Flowchart Navigation ---
    const flowchartSVG = document.getElementById('learningFlowchartSVG');
    if (flowchartSVG) {
        const steps = flowchartSVG.querySelectorAll('.flowchart-step-svg');
        steps.forEach(step => {
            step.addEventListener('click', function () {
                const chapterLink = this.dataset.chapterLink;
                if (chapterLink) {
                    window.location.href = chapterLink;
                }
            });
        });
    }

    // --- Context Demo (ameliorate example) ---
    const contextDemoSection = document.getElementById('context-demo');
    if (contextDemoSection) {
        const wordOnlyBtn = document.getElementById('word-only-btn');
        const contextBtn = document.getElementById('context-btn');
        const demoResultDiv = document.getElementById('demo-result');
        // const ameliorateSpan = contextDemoSection.querySelector('[data-word="ameliorate"]'); // Not used directly in listeners

        if (wordOnlyBtn && contextBtn && demoResultDiv) {
            wordOnlyBtn.addEventListener('click', () => {
                demoResultDiv.innerHTML = `
                    <h4 class="font-semibold text-red-700">Ameliorate (단어 의미만):</h4>
                    <p class="text-gray-700">개선하다, 향상시키다.</p>
                    <p class="text-sm text-gray-500 mt-2">이것만으로는 문맥 속 정확한 느낌을 알기 어렵습니다. 어떤 상황을, 어떻게 개선한다는 것일까요?</p>
                `;
                demoResultDiv.className = 'mt-4 p-4 rounded-lg border bg-red-50 border-red-200'; // Ensure visible
                demoResultDiv.classList.remove('hidden');
            });

            contextBtn.addEventListener('click', () => {
                demoResultDiv.innerHTML = `
                    <h4 class="font-semibold text-green-700">Ameliorate (문맥 속 의미):</h4>
                    <p class="text-gray-700">"The new policy will <strong class="text-green-600">ameliorate</strong> the current situation by providing better resources and support."</p>
                    <p class="text-gray-700 mt-2">여기서 'ameliorate'는 '더 나은 자원과 지원을 제공함으로써 현재의 어려운 상황을 <strong class="text-green-600">완화하고 더 좋게 만들 것이다</strong>'라는 긍정적이고 구체적인 개선의 뉘앙스를 가집니다.</p>
                    <p class="text-sm text-gray-500 mt-2">문맥은 단어에 생명력을 불어넣어 정확한 의미를 전달합니다.</p>
                `;
                demoResultDiv.className = 'mt-4 p-4 rounded-lg border bg-green-50 border-green-200'; // Ensure visible
                demoResultDiv.classList.remove('hidden');
            });
        } else {
            if (!wordOnlyBtn) console.warn("Element with ID 'word-only-btn' not found.");
            if (!contextBtn) console.warn("Element with ID 'context-btn' not found.");
            if (!demoResultDiv) console.warn("Element with ID 'demo-result' not found.");
        }
    }
});
