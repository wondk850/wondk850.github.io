document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropdown-btn');
        const content = dropdown.querySelector('.dropdown-content');

        if (button && content) {
            button.addEventListener('click', (event) => {
                event.stopPropagation(); 
                const isCurrentlyOpen = content.classList.contains('show');
                
                // Close all other open dropdowns first
                document.querySelectorAll('.dropdown-content.show').forEach(openDropdown => {
                    openDropdown.classList.remove('show');
                });
                
                // Toggle the current dropdown
                if (!isCurrentlyOpen) {
                    content.classList.add('show');
                } // If it was open, it's now closed by the loop above or will be by toggle
            });
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
        dropdowns.forEach(dropdown => {
            const content = dropdown.querySelector('.dropdown-content');
            if (content && content.classList.contains('show')) {
                if (!dropdown.contains(event.target)) {
                    content.classList.remove('show');
                }
            }
        });
    });

    // Active navigation link highlighting based on current URL
    const currentPath = window.location.pathname.split('/').pop();
    if (currentPath === "" || currentPath === "index.html") { // Handle root path for index.html
         const homeLink = document.querySelector('nav .nav-link[href="index.html"]');
         if(homeLink) homeLink.classList.add('active');
    }


    // Desktop nav links (excluding dropdown buttons)
    const navLinks = document.querySelectorAll('nav .hidden.md\\:block .nav-link:not(.dropdown-btn)');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Dropdown links and parent button highlighting
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const button = dropdown.querySelector('.dropdown-btn');
        const content = dropdown.querySelector('.dropdown-content');
        let isParentActive = false;

        if (button && content) {
            const dropdownLinks = content.querySelectorAll('a');
            dropdownLinks.forEach(link => {
                const linkPath = link.getAttribute('href').split('/').pop();
                if (linkPath === currentPath) {
                    link.classList.add('active'); // Highlight the link in dropdown
                    isParentActive = true;
                } else {
                    link.classList.remove('active');
                }
            });

            // If current page is a chapter page (e.g., chapter1.html) and it's linked directly by the button,
            // or if a link within the dropdown is active.
            const buttonDirectLink = button.getAttribute('href') ? button.getAttribute('href').split('/').pop() : null;
            
            if (isParentActive || (buttonDirectLink && buttonDirectLink === currentPath)) {
                button.classList.add('active');
            } else {
                 // Check if the button's text implies it's the parent of the current page's chapter
                 // e.g. if current page is secret1.html, chapter1 button should be active.
                 // This logic is somewhat covered by the HTML having the 'active' class pre-set on chapter/secret pages.
                 // The JS here reinforces or corrects it based on actual URL.
                 const pageUrl = window.location.pathname;
                 if (pageUrl.includes("chapter1") || pageUrl.includes("secret1") || pageUrl.includes("secret2") || pageUrl.includes("secret3") || pageUrl.includes("secret4") || pageUrl.includes("secret5")) {
                    if (button.textContent.includes("1장")) button.classList.add('active');
                 } else if (pageUrl.includes("chapter2") || pageUrl.includes("secret6") || pageUrl.includes("secret7") || pageUrl.includes("secret8")) {
                    if (button.textContent.includes("2장")) button.classList.add('active');
                 } else if (pageUrl.includes("chapter3") || pageUrl.includes("secret9") || pageUrl.includes("secret10") || pageUrl.includes("secret11") || pageUrl.includes("secret12") || pageUrl.includes("secret13") || pageUrl.includes("secret14")) {
                    if (button.textContent.includes("3장")) button.classList.add('active');
                 } else {
                    // Only remove active if not the specific case for current page.
                    // This avoids removing 'active' if it's manually set for the current chapter page button.
                    // However, the check for `isParentActive` above should handle most cases.
                    if (!isParentActive) button.classList.remove('active');
                 }
            }
        }
    });
    
    // Mobile navigation link highlighting
    const mobileNavLinks = document.querySelectorAll('#mobile-menu a.nav-link-mobile, #mobile-menu-dropdown-chapter a.nav-link-mobile, #mobile-menu-dropdown-secret a.nav-link-mobile');
    mobileNavLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
         // Handle index.html specifically for root path
        if ((linkPath === "index.html" && (currentPath === "" || currentPath === "index.html")) || linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Ensure chapter pages also activate their specific chapter dropdown button in desktop nav
    // This is mostly handled by the `isParentActive` logic or by specific HTML classes, but as a fallback:
    if (currentPath.startsWith("chapter1") || currentPath.startsWith("secret1") || currentPath.startsWith("secret2") || currentPath.startsWith("secret3") || currentPath.startsWith("secret4") || currentPath.startsWith("secret5")) {
        document.querySelector('.dropdown-btn:not(.active)[textContent*="1장"]')?.classList.add('active');
    } else if (currentPath.startsWith("chapter2") || currentPath.startsWith("secret6") || currentPath.startsWith("secret7") || currentPath.startsWith("secret8")) {
        document.querySelector('.dropdown-btn:not(.active)[textContent*="2장"]')?.classList.add('active');
    } else if (currentPath.startsWith("chapter3") || currentPath.startsWith("secret9") || currentPath.startsWith("secret10") || currentPath.startsWith("secret11") || currentPath.startsWith("secret12") || currentPath.startsWith("secret13") || currentPath.startsWith("secret14")) {
        document.querySelector('.dropdown-btn:not(.active)[textContent*="3장"]')?.classList.add('active');
    }

    // Special handling for `about.html`
    if (currentPath === "about.html") {
        const aboutLink = document.querySelector('nav .nav-link[href="about.html"]');
        if (aboutLink) aboutLink.classList.add('active');
        const mobileAboutLink = document.querySelector('#mobile-menu a.nav-link-mobile[href="about.html"]');
        if (mobileAboutLink) mobileAboutLink.classList.add('active');
    }


});
