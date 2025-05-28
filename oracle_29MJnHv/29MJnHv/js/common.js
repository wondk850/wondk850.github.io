document.addEventListener('DOMContentLoaded', function () {
    // --- Unified Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('unified-mobile-menu-btn');
    const mobileMenuDropdown = document.getElementById('unified-mobile-menu-dropdown');

    if (mobileMenuButton && mobileMenuDropdown) {
        mobileMenuButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent click from immediately closing if it bubbles to document
            mobileMenuDropdown.classList.toggle('hidden');
        });
    }

    // Close mobile menu when clicking outside of it
    document.addEventListener('click', (event) => {
        if (mobileMenuDropdown && !mobileMenuDropdown.classList.contains('hidden')) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenuDropdown.contains(event.target)) {
                mobileMenuDropdown.classList.add('hidden');
            }
        }
    });
    
    // --- Desktop Dropdown Menu Logic ---
    const dropdowns = document.querySelectorAll('nav .dropdown');
    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropdown-btn');
        const content = dropdown.querySelector('.dropdown-content');

        if (button && content) {
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                const isCurrentlyOpen = content.classList.contains('show');
                
                // Close all other open dropdowns first
                document.querySelectorAll('nav .dropdown-content.show').forEach(openDropdown => {
                    if (openDropdown !== content) { // Do not close the current one if it's already open and we want to toggle it
                        openDropdown.classList.remove('show');
                    }
                });
                
                // Toggle the current dropdown
                content.classList.toggle('show');
            });
        }
    });

    // Close desktop dropdowns when clicking outside
    document.addEventListener('click', (event) => {
        dropdowns.forEach(dropdown => {
            const button = dropdown.querySelector('.dropdown-btn');
            const content = dropdown.querySelector('.dropdown-content');
            if (button && content && content.classList.contains('show')) {
                if (!dropdown.contains(event.target)) {
                    content.classList.remove('show');
                }
            }
        });
    });

    // --- Generic Analyze Button Toggle ---
    // Moved here to be accessible by all pages that include common.js
    document.querySelectorAll('.analyze-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const analysisDiv = document.getElementById(targetId);
            if (analysisDiv) {
                analysisDiv.classList.toggle('hidden');
                button.textContent = analysisDiv.classList.contains('hidden') ? '분석 보기' : '분석 숨기기';
            } else {
                console.warn(`Analysis target div with ID '${targetId}' not found for button.`, button);
            }
        });
    });

    // --- Utility to update score/feedback ---
    // Example: updateFeedback('quiz1-feedback', 'Correct!', 'text-green-600', 'quiz1-score', 1, 1);
    window.updateFeedbackAndScore = function(feedbackId, message, messageClass, scoreId, currentScore, totalQuestions) {
        const feedbackDiv = document.getElementById(feedbackId);
        if (feedbackDiv) {
            feedbackDiv.textContent = message;
            feedbackDiv.className = `feedback-area mt-2 text-sm font-semibold ${messageClass}`; // Ensure a base class for consistent styling
        }

        if (scoreId && typeof currentScore === 'number' && typeof totalQuestions === 'number') {
            const scoreDiv = document.getElementById(scoreId);
            if (scoreDiv) {
                scoreDiv.textContent = `점수: ${currentScore}/${totalQuestions}`;
                scoreDiv.classList.remove('hidden');
            }
        }
    };
});
