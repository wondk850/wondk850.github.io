document.addEventListener('DOMContentLoaded', function () {
    // --- Mobile Menu Toggle for index.html ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // --- Mobile Menu Toggle for chapterX.html pages ---
    const mobileMenuBtnChapter = document.getElementById('mobile-menu-btn-chapter');
    const mobileMenuDropdownChapter = document.getElementById('mobile-menu-dropdown-chapter');
    if (mobileMenuBtnChapter && mobileMenuDropdownChapter) {
        mobileMenuBtnChapter.addEventListener('click', () => {
            mobileMenuDropdownChapter.classList.toggle('hidden');
        });
    }

    // --- Mobile Menu Toggle for secretX.html pages ---
    const mobileMenuBtnSecret = document.getElementById('mobile-menu-btn-secret');
    const mobileMenuDropdownSecret = document.getElementById('mobile-menu-dropdown-secret');
    if (mobileMenuBtnSecret && mobileMenuDropdownSecret) {
        mobileMenuBtnSecret.addEventListener('click', () => {
            mobileMenuDropdownSecret.classList.toggle('hidden');
        });
    }


    // --- Script for about.html ---
    const contextDemoSection = document.getElementById('context-demo');
    if (contextDemoSection) {
        const wordOnlyBtn = document.getElementById('word-only-btn');
        const contextBtn = document.getElementById('context-btn');
        const demoResultDiv = document.getElementById('demo-result');
        const ameliorateSpan = contextDemoSection.querySelector('[data-word="ameliorate"]');

        if (wordOnlyBtn && contextBtn && demoResultDiv && ameliorateSpan) {
            wordOnlyBtn.addEventListener('click', () => {
                demoResultDiv.innerHTML = `
                    <h4 class="font-semibold text-red-700">Ameliorate (단어 의미만):</h4>
                    <p class="text-gray-700">개선하다, 향상시키다.</p>
                    <p class="text-sm text-gray-500 mt-2">이것만으로는 문맥 속 정확한 느낌을 알기 어렵습니다. 어떤 상황을, 어떻게 개선한다는 것일까요?</p>
                `;
                demoResultDiv.className = 'mt-4 p-4 rounded-lg border bg-red-50 border-red-200'; // Ensure visible
            });

            contextBtn.addEventListener('click', () => {
                demoResultDiv.innerHTML = `
                    <h4 class="font-semibold text-green-700">Ameliorate (문맥 속 의미):</h4>
                    <p class="text-gray-700">"The new policy will <strong class="text-green-600">ameliorate</strong> the current situation by providing better resources and support."</p>
                    <p class="text-gray-700 mt-2">여기서 'ameliorate'는 '더 나은 자원과 지원을 제공함으로써 현재의 어려운 상황을 <strong class="text-green-600">완화하고 더 좋게 만들 것이다</strong>'라는 긍정적이고 구체적인 개선의 뉘앙스를 가집니다.</p>
                    <p class="text-sm text-gray-500 mt-2">문맥은 단어에 생명력을 불어넣어 정확한 의미를 전달합니다.</p>
                `;
                demoResultDiv.className = 'mt-4 p-4 rounded-lg border bg-green-50 border-green-200'; // Ensure visible
            });
        }
    }

    const interactiveFlowchart = document.querySelector('.interactive-flowchart');
    if (interactiveFlowchart) {
        const steps = interactiveFlowchart.querySelectorAll('.flowchart-step');
        const detailsDiv = document.getElementById('chapter-details');

        const chapterDetailsContent = {
            '1': {
                title: '1장: 모르는 부분을 만나면 이렇게 의미를 찾아라',
                color: 'red',
                secrets: [
                    { name: '비결 1: 지시어에 주목하라', link: 'secret1.html' },
                    { name: '비결 2: 관련어를 생각하라', link: 'secret2.html' },
                    { name: '비결 3: 자리를 살펴라(1): 대상=설명', link: 'secret3.html' },
                    { name: '비결 4: 자리를 살펴라(2): 비교의 대상', link: 'secret4.html' },
                    { name: '비결 5: 논리적인 접근방식', link: 'secret5.html' }
                ]
            },
            '2': {
                title: '2장: 가장 어려운 부분을 가장 쉽게 읽는 법',
                color: 'green',
                secrets: [
                    { name: '비결 6: 영어는 변화를 좋아한다', link: 'secret6.html' },
                    { name: '비결 7: 바꿔쓰기에 관한 모든 것', link: 'secret7.html' },
                    { name: '비결 8: 영어 표현의 다양성', link: 'secret8.html' }
                ]
            },
            '3': {
                title: '3장: 이렇게 읽으면 빠르게 읽을 수 있다',
                color: 'blue',
                secrets: [
                    { name: '비결 9: 화제를 찾아라', link: 'secret9.html' },
                    { name: '비결 10: 안내어에 주목하라', link: 'secret10.html' },
                    { name: '비결 11: 문맥의미를 읽어라', link: 'secret11.html' },
                    { name: '비결 12: 유형을 읽어라', link: 'secret12.html' },
                    { name: '비결 13: 예상을 읽어라', link: 'secret13.html' },
                    { name: '비결 14: 추려서 읽어라', link: 'secret14.html' }
                ]
            }
        };

        if (steps.length > 0 && detailsDiv) {
            steps.forEach(step => {
                step.addEventListener('click', () => {
                    const chapterNum = step.dataset.chapter;
                    const content = chapterDetailsContent[chapterNum];
                    if (content) {
                        detailsDiv.innerHTML = `
                            <h3 class="text-xl font-semibold text-${content.color}-700 mb-4">${content.title}</h3>
                            <ul class="space-y-2">
                                ${content.secrets.map(secret => `<li><a href="${secret.link}" class="text-${content.color}-600 hover:text-${content.color}-800 hover:underline">${secret.name}</a></li>`).join('')}
                            </ul>
                            <div class="mt-6 text-center">
                                <a href="chapter${chapterNum}.html" class="inline-block bg-${content.color}-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-${content.color}-600 transition">
                                    ${chapterNum}장 자세히 보기
                                </a>
                            </div>
                        `;
                        detailsDiv.className = `mt-8 p-6 bg-${content.color}-50 rounded-lg border border-${content.color}-200`; // Ensure visible
                    }
                });
            });
        }
    }

    // --- Scripts for secretX.html pages (common and specific) ---
    
    // Common script for analysis button toggle
    document.querySelectorAll('.analyze-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const analysisDiv = document.getElementById(targetId);
            if (analysisDiv) {
                analysisDiv.classList.toggle('hidden');
                button.textContent = analysisDiv.classList.contains('hidden') ? '분석 보기' : '분석 숨기기';
            }
        });
    });

    // Secret 1: 지시어 대상 찾기
    const practiceReferentSection = document.getElementById('practice-referent');
    if (practiceReferentSection) {
        practiceReferentSection.querySelectorAll('.practice-sentence').forEach(sentenceDiv => {
            const indicator = sentenceDiv.querySelector('.js-referent-indicator');
            const feedbackDiv = sentenceDiv.querySelector('.feedback');
            const options = sentenceDiv.querySelectorAll('.referent-options .referent-option');
            
            options.forEach(option => {
                option.addEventListener('click', () => {
                    if (!indicator || !feedbackDiv) return;

                    const correctReferentText = indicator.dataset.correctReferent;
                    const selectedText = option.textContent.trim();
                    
                    options.forEach(opt => {
                        opt.classList.remove('bg-green-200', 'border-green-400', 'bg-red-200', 'border-red-400', 'ring-2', 'ring-offset-1');
                        opt.classList.add('bg-gray-200');
                        opt.disabled = true; // Disable after selection
                    });

                    if (selectedText === correctReferentText) {
                        feedbackDiv.textContent = '정답입니다! "' + indicator.textContent + '"은(는) "' + selectedText + '"을(를) 가리킵니다.';
                        feedbackDiv.className = 'feedback mt-3 text-sm text-green-600 font-semibold';
                        option.classList.add('bg-green-200', 'border-green-400', 'ring-2', 'ring-green-500', 'ring-offset-1');
                        option.classList.remove('bg-gray-200');
                    } else {
                        feedbackDiv.textContent = '다시 시도해보세요. "'+indicator.textContent + '"이 가리키는 대상이 "'+selectedText+'"은(는) 아닌 것 같아요.';
                        feedbackDiv.className = 'feedback mt-3 text-sm text-red-600 font-semibold';
                        option.classList.add('bg-red-200', 'border-red-400', 'ring-2', 'ring-red-500', 'ring-offset-1');
                        option.classList.remove('bg-gray-200');
                    }
                });
            });
        });
    }

    // Secret 1: 지시어와 대상 연결 (하이라이팅)
    const practiceHighlightSection = document.getElementById('practice-highlight');
    if (practiceHighlightSection) {
        let firstSelectionS1 = null;
        practiceHighlightSection.querySelectorAll('.highlight-connect').forEach(element => {
            element.addEventListener('click', () => {
                const feedbackDiv = practiceHighlightSection.querySelector('.highlight-feedback');
                
                if (!firstSelectionS1) { // First click
                    if (element.classList.contains('ring-2')) { // Already selected, deselect
                        element.classList.remove('ring-2', 'ring-blue-500', 'bg-blue-100');
                        firstSelectionS1 = null;
                    } else { // New selection
                        element.classList.add('ring-2', 'ring-blue-500', 'bg-blue-100');
                        firstSelectionS1 = element;
                        if(feedbackDiv) feedbackDiv.textContent = `"${element.textContent.trim()}" 선택됨. 이제 이것이 가리키는 대상을 클릭하세요.`;
                        if(feedbackDiv) feedbackDiv.className = 'highlight-feedback mt-4 text-sm text-blue-700';
                    }
                } else { // Second click
                    if (element === firstSelectionS1) { // Clicked same element, deselect
                        element.classList.remove('ring-2', 'ring-blue-500', 'bg-blue-100');
                        firstSelectionS1 = null;
                        if(feedbackDiv) feedbackDiv.textContent = '선택이 취소되었습니다.';
                        if(feedbackDiv) feedbackDiv.className = 'highlight-feedback mt-4 text-sm text-gray-600';
                    } else { // Clicked a different element for pairing
                        const group1 = firstSelectionS1.dataset.connectGroup;
                        const type1 = firstSelectionS1.dataset.type;
                        const group2 = element.dataset.connectGroup;
                        const type2 = element.dataset.type;

                        if (group1 === group2 && type1 !== type2) { // Correct pair
                            firstSelectionS1.classList.remove('ring-blue-500', 'bg-blue-100');
                            firstSelectionS1.classList.add('bg-green-200', 'text-green-800', 'ring-green-500');
                            element.classList.remove('ring-blue-500', 'bg-blue-100'); 
                            element.classList.add('bg-green-200', 'text-green-800', 'ring-green-500', 'ring-2');
                            if(feedbackDiv) feedbackDiv.textContent = `정답! "${firstSelectionS1.textContent.trim()}" ↔ "${element.textContent.trim()}" (그룹 ${group1}) 연결 성공!`;
                            if(feedbackDiv) feedbackDiv.className = 'highlight-feedback mt-4 text-sm text-green-600 font-semibold';
                            firstSelectionS1.style.pointerEvents = 'none'; 
                            element.style.pointerEvents = 'none'; 
                        } else { // Incorrect pair
                            firstSelectionS1.classList.add('bg-red-200', 'text-red-800', 'ring-red-500');
                            element.classList.add('ring-2', 'ring-red-500', 'bg-red-200', 'text-red-800');
                            if(feedbackDiv) feedbackDiv.textContent = '오답! 올바른 지시어와 대상을 연결해주세요.';
                            if(feedbackDiv) feedbackDiv.className = 'highlight-feedback mt-4 text-sm text-red-600 font-semibold';
                            setTimeout(() => {
                                firstSelectionS1.classList.remove('ring-2', 'ring-red-500', 'bg-red-200', 'text-red-800', 'ring-blue-500', 'bg-blue-100'); // also remove selection highlight
                                element.classList.remove('ring-2', 'ring-red-500', 'bg-red-200', 'text-red-800');
                                if(feedbackDiv) feedbackDiv.textContent = '다시 시도해보세요.';
                                if(feedbackDiv) feedbackDiv.className = 'highlight-feedback mt-4 text-sm text-gray-600';
                            }, 1500);
                        }
                        firstSelectionS1 = null; 
                    }
                }
            });
        });
    }

    // Secret 2: 문맥 추론 연습 (단어 의미 선택)
    const contextClueQuiz = document.getElementById('context-clue-quiz');
    if (contextClueQuiz) {
        contextClueQuiz.querySelectorAll('.practice-item').forEach(item => {
            const options = item.querySelectorAll('.clue-option');
            const feedbackDiv = item.querySelector('.feedback');
            options.forEach(button => {
                button.addEventListener('click', () => {
                    options.forEach(opt => { 
                        opt.classList.remove('bg-green-200', 'border-green-400', 'bg-red-200', 'border-red-400', 'ring-2');
                        opt.disabled = true; 
                    });

                    const isCorrect = button.dataset.correct === 'true';
                    if (isCorrect) {
                        feedbackDiv.innerHTML = '<p class="text-green-600 font-semibold">정답입니다! 정확한 문맥적 의미를 파악하셨습니다.</p>';
                        button.classList.add('bg-green-200', 'border-green-400', 'ring-2', 'ring-green-500');
                    } else {
                        feedbackDiv.innerHTML = '<p class="text-red-600 font-semibold">아쉽지만 정답이 아닙니다. 다시 한번 문맥을 살펴보세요.</p>';
                        button.classList.add('bg-red-200', 'border-red-400', 'ring-2', 'ring-red-500');
                    }
                });
            });
        });
    }

    // Secret 3: 대상-설명 연결 (구조 분석 보기/숨기기)
    const structureAnalysisBtn = document.getElementById('reveal-structure-btn');
    if (structureAnalysisBtn) {
        structureAnalysisBtn.addEventListener('click', () => {
            const answerDiv = document.getElementById('structure-answer');
            if (answerDiv) {
                answerDiv.classList.toggle('hidden');
                structureAnalysisBtn.textContent = answerDiv.classList.contains('hidden') ? '구조 분석 보기' : '구조 분석 숨기기';
            }
        });
    }

    // Secret 4: 비교 대상 찾기
    const comparisonQuiz = document.getElementById('comparison-quiz');
    if (comparisonQuiz) {
        comparisonQuiz.querySelectorAll('.comparison-question').forEach(questionDiv => {
            const options = questionDiv.querySelectorAll('.comparison-option');
            const feedbackDiv = questionDiv.querySelector('.feedback');
            options.forEach(option => {
                option.addEventListener('click', () => {
                    options.forEach(opt => {
                        opt.classList.remove('bg-green-200', 'border-green-400', 'text-green-700', 'bg-red-200', 'border-red-400', 'text-red-700', 'ring-2');
                        opt.disabled = true; 
                    });

                    const isCorrect = option.dataset.correct === 'true';
                    if(isCorrect) {
                        option.classList.add('bg-green-200', 'border-green-400', 'text-green-700', 'ring-2', 'ring-green-500');
                        feedbackDiv.textContent = "정답입니다!";
                        feedbackDiv.className = "feedback mt-3 text-sm text-green-600 font-semibold";
                    } else {
                        option.classList.add('bg-red-200', 'border-red-400', 'text-red-700', 'ring-2', 'ring-red-500');
                        feedbackDiv.textContent = "다시 생각해보세요.";
                        feedbackDiv.className = "feedback mt-3 text-sm text-red-600 font-semibold";
                    }
                });
            });
        });
    }

    // Secret 5: 논리 연결사 식별 및 기능 퀴즈
    const logicConnectorQuiz = document.getElementById('logic-connector-quiz');
    if (logicConnectorQuiz) {
        logicConnectorQuiz.querySelectorAll('.logic-question').forEach(questionDiv => {
            const options = questionDiv.querySelectorAll('.connector-option');
            const feedbackDiv = questionDiv.querySelector('.feedback');
            options.forEach(button => {
                button.addEventListener('click', () => {
                    options.forEach(opt => {
                        opt.classList.remove('bg-green-200', 'bg-red-200', 'ring-2');
                        opt.disabled = true; 
                    });

                    const isCorrect = button.dataset.correct === 'true';
                    if (isCorrect) {
                        feedbackDiv.textContent = '정답입니다! 연결사의 기능을 정확히 이해하셨습니다.';
                        feedbackDiv.className = 'feedback mt-3 text-sm text-green-600 font-semibold';
                        button.classList.add('bg-green-200', 'ring-2', 'ring-green-500');
                    } else {
                        feedbackDiv.textContent = '오답입니다. 이 연결사는 다른 기능을 합니다.';
                        feedbackDiv.className = 'feedback mt-3 text-sm text-red-600 font-semibold';
                        button.classList.add('bg-red-200', 'ring-2', 'ring-red-500');
                    }
                });
            });
        });
    }

    // --- Scripts for Chapter 2 Secrets ---
    const structureMatchingPracticeS6 = document.getElementById('structure-matching-practice');
    if (structureMatchingPracticeS6) {
        // ... (existing S6 script) ...
    }
    const paraphrasePracticeS7 = document.getElementById('paraphrase-connection-practice');
    if (paraphrasePracticeS7) {
        // ... (existing S7 script) ...
    }
    const expressionChoiceS8 = document.getElementById('understanding-expression-choice-s8');
    if (expressionChoiceS8) {
        // ... (existing S8 script) ...
    }

    // --- Scripts for Chapter 3 Secrets ---

    // Secret 9: 화제어 찾기 / 주제 문장 선택
    const topicPracticeS9 = document.getElementById('topic-practice-s9');
    if (topicPracticeS9) {
        // 화제어 찾기
        const topicWordContainer = topicPracticeS9.querySelector('.topic-word-identification');
        if (topicWordContainer) {
            const words = topicWordContainer.querySelectorAll('.clickable-word-s9');
            const feedbackDiv = topicWordContainer.querySelector('.feedback-s9');
            const correctTopicWords = (topicWordContainer.dataset.correctWords || "").split(',');

            words.forEach(word => {
                word.addEventListener('click', () => {
                    if (word.classList.contains('selected-correct-s9') || word.classList.contains('selected-incorrect-s9')) return;

                    if (correctTopicWords.includes(word.textContent.trim().toLowerCase().replace(/[.,]/g, ''))) {
                        word.classList.add('selected-correct-s9', 'bg-blue-200', 'ring-2', 'ring-blue-500');
                        if(feedbackDiv) feedbackDiv.textContent = `"${word.textContent.trim()}"은(는) 중요한 화제어입니다!`;
                        if(feedbackDiv) feedbackDiv.className = 'feedback-s9 mt-2 text-sm text-green-600';
                    } else {
                        word.classList.add('selected-incorrect-s9', 'bg-red-200');
                         if(feedbackDiv) feedbackDiv.textContent = `"${word.textContent.trim()}"은(는) 핵심 화제어는 아닌 것 같네요.`;
                         if(feedbackDiv) feedbackDiv.className = 'feedback-s9 mt-2 text-sm text-red-600';
                    }
                });
            });
        }
        // 주제 문장 선택
        const topicSentenceContainer = topicPracticeS9.querySelector('.topic-sentence-selection');
        if (topicSentenceContainer) {
            const sentences = topicSentenceContainer.querySelectorAll('.clickable-sentence-s9');
            const feedbackDiv = topicSentenceContainer.querySelector('.feedback-s9');
            const correctSentenceId = topicSentenceContainer.dataset.correctSentenceId;

            sentences.forEach(sentence => {
                sentence.addEventListener('click', () => {
                    sentences.forEach(s => s.classList.remove('ring-2', 'ring-blue-500', 'bg-blue-100', 'ring-red-500', 'bg-red-100'));
                    
                    if (sentence.dataset.sentenceId === correctSentenceId) {
                        sentence.classList.add('ring-2', 'ring-green-500', 'bg-green-100');
                        if(feedbackDiv) feedbackDiv.textContent = '정답입니다! 이 문장이 문단의 주제를 잘 나타냅니다.';
                        if(feedbackDiv) feedbackDiv.className = 'feedback-s9 mt-2 text-sm text-green-600 font-semibold';
                    } else {
                        sentence.classList.add('ring-2', 'ring-red-500', 'bg-red-100');
                        if(feedbackDiv) feedbackDiv.textContent = '오답입니다. 다른 문장을 다시 살펴보세요.';
                        if(feedbackDiv) feedbackDiv.className = 'feedback-s9 mt-2 text-sm text-red-600 font-semibold';
                    }
                    sentences.forEach(s => s.style.pointerEvents = 'none'); // Disable after one attempt
                });
            });
        }
    }

    // Secret 10: 안내어 기능 매칭 / 빈칸 채우기
    const signalWordPracticeS10 = document.getElementById('signal-word-practice-s10');
    if (signalWordPracticeS10) {
        // 안내어 기능 매칭 (Drag and Drop - conceptual for now, simplified to selection)
        const matchingContainer = signalWordPracticeS10.querySelector('.signal-word-matching');
        if (matchingContainer) {
            // This would ideally be drag and drop. For simplicity, could be dropdowns or series of questions.
            // Example: A signal word is shown, user selects its function from a dropdown.
            matchingContainer.querySelectorAll('.match-question-s10').forEach(q => {
                const select = q.querySelector('select');
                const feedback = q.querySelector('.feedback-s10');
                if (select && feedback) {
                    select.addEventListener('change', () => {
                        if (select.value === select.dataset.correctFunction) {
                            feedback.textContent = '정답입니다!';
                            feedback.className = 'feedback-s10 mt-1 text-xs text-green-600';
                        } else if (select.value === "") {
                            feedback.textContent = '';
                        }
                        else {
                            feedback.textContent = '다시 생각해보세요.';
                            feedback.className = 'feedback-s10 mt-1 text-xs text-red-600';
                        }
                    });
                }
            });
        }

        // 안내어 빈칸 채우기
        const fillBlankContainer = signalWordPracticeS10.querySelector('.signal-word-fill-blank');
        if (fillBlankContainer) {
            fillBlankContainer.querySelectorAll('.blank-question-s10').forEach(q => {
                const select = q.querySelector('select');
                const feedback = q.querySelector('.feedback-s10');
                 if (select && feedback) {
                    select.addEventListener('change', () => {
                        if (select.value === select.dataset.correctSignal) {
                            feedback.textContent = '정답입니다! 문맥에 잘 어울리는 안내어입니다.';
                            feedback.className = 'feedback-s10 mt-1 text-xs text-green-600';
                        } else if (select.value === "") {
                            feedback.textContent = '';
                        } else {
                            feedback.textContent = '오답입니다. 다른 안내어를 고려해보세요.';
                            feedback.className = 'feedback-s10 mt-1 text-xs text-red-600';
                        }
                    });
                }
            });
        }
    }
    
    // Secret 11: 다의어 의미 / 문맥 의미 추론
    const contextualMeaningPracticeS11 = document.getElementById('contextual-meaning-practice-s11');
    if (contextualMeaningPracticeS11) {
        contextualMeaningPracticeS11.querySelectorAll('.meaning-question-s11').forEach(item => {
            const options = item.querySelectorAll('.option-btn-s11');
            const feedbackDiv = item.querySelector('.feedback-s11');
            options.forEach(button => {
                button.addEventListener('click', () => {
                    options.forEach(opt => {
                        opt.classList.remove('bg-green-200', 'border-green-400', 'bg-red-200', 'border-red-400', 'ring-2');
                        opt.disabled = true;
                    });
                    const isCorrect = button.dataset.correct === 'true';
                    if (isCorrect) {
                        feedbackDiv.textContent = '정답입니다! 문맥적 의미를 정확히 파악했습니다.';
                        feedbackDiv.className = 'feedback-s11 mt-2 text-sm text-green-600 font-semibold';
                        button.classList.add('bg-green-200', 'border-green-400', 'ring-2', 'ring-green-500');
                    } else {
                        feedbackDiv.textContent = '오답입니다. 문맥을 다시 한번 살펴보세요.';
                        feedbackDiv.className = 'feedback-s11 mt-2 text-sm text-red-600 font-semibold';
                        button.classList.add('bg-red-200', 'border-red-400', 'ring-2', 'ring-red-500');
                    }
                });
            });
        });
    }

    // Secret 12: 글 유형 분류 / 구조 식별
    const textPatternPracticeS12 = document.getElementById('text-pattern-practice-s12');
    if (textPatternPracticeS12) {
        // 글 유형 분류
        textPatternPracticeS12.querySelectorAll('.pattern-classification-item-s12').forEach(item => {
            const select = item.querySelector('select');
            const feedback = item.querySelector('.feedback-s12');
            if (select && feedback) {
                select.addEventListener('change', () => {
                    if (select.value === item.dataset.correctPattern) {
                        feedback.textContent = '정답입니다!';
                        feedback.className = 'feedback-s12 mt-1 text-sm text-green-600';
                    } else if (select.value === "") {
                        feedback.textContent = '';
                    } else {
                        feedback.textContent = '이 글의 유형은 다른 것 같아요. 다시 한번 특징을 살펴보세요.';
                        feedback.className = 'feedback-s12 mt-1 text-sm text-red-600';
                    }
                });
            }
        });
        // 구조 식별 (Show/Hide button)
        textPatternPracticeS12.querySelectorAll('.show-structure-btn-s12').forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.dataset.target;
                const structureDiv = document.getElementById(targetId);
                if (structureDiv) {
                    structureDiv.classList.toggle('hidden');
                    button.textContent = structureDiv.classList.contains('hidden') ? '구조 해설 보기' : '구조 해설 숨기기';
                }
            });
        });
    }
    
    // Secret 13: 다음 문장 예측 / 문단 완성
    const anticipationPracticeS13 = document.getElementById('anticipation-practice-s13');
    if (anticipationPracticeS13) {
        // 다음 문장 예측
        anticipationPracticeS13.querySelectorAll('.prediction-question-s13').forEach(item => {
            const options = item.querySelectorAll('.option-btn-s13');
            const feedbackDiv = item.querySelector('.feedback-s13');
            options.forEach(button => {
                button.addEventListener('click', () => {
                    options.forEach(opt => {
                        opt.classList.remove('bg-green-200', 'border-green-400', 'bg-red-200', 'border-red-400', 'ring-2');
                        opt.disabled = true;
                    });
                    const isCorrect = button.dataset.correct === 'true';
                    if (isCorrect) {
                        feedbackDiv.textContent = '정답입니다! 문맥의 흐름을 잘 예측하셨습니다.';
                        feedbackDiv.className = 'feedback-s13 mt-2 text-sm text-green-600 font-semibold';
                        button.classList.add('bg-green-200', 'border-green-400', 'ring-2', 'ring-green-500');
                    } else {
                        feedbackDiv.textContent = `오답입니다. ${button.dataset.feedback || '다른 선택지를 고려해보세요.'}`;
                        feedbackDiv.className = 'feedback-s13 mt-2 text-sm text-red-600 font-semibold';
                        button.classList.add('bg-red-200', 'border-red-400', 'ring-2', 'ring-red-500');
                    }
                });
            });
        });
    }

    // Secret 14: 핵심 문장 선택 / 요약 연습
    const selectiveReadingPracticeS14 = document.getElementById('selective-reading-practice-s14');
    if (selectiveReadingPracticeS14) {
        // 핵심 문장 선택
        const mainIdeaSelection = selectiveReadingPracticeS14.querySelector('.main-idea-selection-s14');
        if (mainIdeaSelection) {
            const sentences = mainIdeaSelection.querySelectorAll('.clickable-sentence-s14');
            const feedbackDiv = mainIdeaSelection.querySelector('.feedback-s14');
            const correctIds = (mainIdeaSelection.dataset.correctSentenceIds || "").split(',');
            let selectedCount = 0;

            sentences.forEach(sentence => {
                sentence.addEventListener('click', () => {
                    if (sentence.classList.contains('selected-main-s14') || sentence.classList.contains('selected-not-main-s14')) return;

                    if (correctIds.includes(sentence.dataset.sentenceId)) {
                        sentence.classList.add('selected-main-s14', 'bg-blue-100', 'ring-1', 'ring-blue-400');
                        selectedCount++;
                    } else {
                        sentence.classList.add('selected-not-main-s14', 'bg-gray-100', 'line-through');
                    }

                    if (selectedCount === correctIds.length && correctIds.length > 0) {
                         if(feedbackDiv) feedbackDiv.textContent = '정답입니다! 핵심 문장들을 잘 선택했습니다.';
                         if(feedbackDiv) feedbackDiv.className = 'feedback-s14 mt-2 text-sm text-green-600 font-semibold';
                    } else if (sentences.length === mainIdeaSelection.querySelectorAll('.selected-main-s14, .selected-not-main-s14').length && correctIds.length > 0) {
                        // All clicked, but not all correct main ideas found
                         if(feedbackDiv && selectedCount < correctIds.length) {
                            feedbackDiv.textContent = '몇몇 핵심 문장을 놓쳤거나, 불필요한 문장을 선택했습니다. 다시 확인해보세요.';
                            feedbackDiv.className = 'feedback-s14 mt-2 text-sm text-red-600 font-semibold';
                         }
                    }
                });
            });
        }
        // 요약 연습: Show answer button for model summary
        const summaryAnswerBtn = selectiveReadingPracticeS14.querySelector('#show-summary-answer-s14');
        if (summaryAnswerBtn) {
            summaryAnswerBtn.addEventListener('click', () => {
                const answerDiv = document.getElementById('summary-answer-s14');
                if(answerDiv) {
                    answerDiv.classList.toggle('hidden');
                    summaryAnswerBtn.textContent = answerDiv.classList.contains('hidden') ? '모범 답안 보기' : '모범 답안 숨기기';
                }
            });
        }
    }

}); // End DOMContentLoaded
