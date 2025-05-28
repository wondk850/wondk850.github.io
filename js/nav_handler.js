document.addEventListener('DOMContentLoaded', function () {
    const currentPath = window.location.pathname.split('/').pop() || "index.html";

    // Helper to activate a link and its dropdown parent if applicable
    function activateLink(linkElement) {
        if (!linkElement) return;
        linkElement.classList.add('active');

        // Check if this link is inside a dropdown
        const dropdownContent = linkElement.closest('.dropdown-content');
        if (dropdownContent) {
            const dropdownButton = dropdownContent.previousElementSibling; // Assuming button is sibling before content
            if (dropdownButton && dropdownButton.classList.contains('dropdown-btn')) {
                dropdownButton.classList.add('active');
            }
        }
    }
    
    // Deactivate all links first (optional, good for re-runs or complex scenarios)
    // document.querySelectorAll('nav .nav-link, nav .dropdown-content a, nav .nav-link-mobile').forEach(link => {
    //     link.classList.remove('active');
    //     if(link.classList.contains('dropdown-btn')) link.classList.remove('active');
    // });


    // Desktop Navigation
    const desktopNavLinks = document.querySelectorAll('nav .hidden.md\\:block .nav-link:not(.dropdown-btn)');
    desktopNavLinks.forEach(link => {
        if (link.getAttribute('href').endsWith(currentPath)) {
            activateLink(link);
        }
    });

    const desktopDropdownLinks = document.querySelectorAll('nav .hidden.md\\:block .dropdown-content a');
    desktopDropdownLinks.forEach(link => {
        if (link.getAttribute('href').endsWith(currentPath)) {
            activateLink(link);
        }
    });
    
    // Activate chapter dropdown button if a secret page within that chapter is active
    const chapterDropdownButtons = document.querySelectorAll('nav .hidden.md\\:block .dropdown-btn');
    chapterDropdownButtons.forEach(button => {
        const chapterText = button.textContent.trim(); // e.g., "1장 ▼"
        let chapterNumber = "0";
        if (chapterText.startsWith("1장")) chapterNumber = "1";
        else if (chapterText.startsWith("2장")) chapterNumber = "2";
        else if (chapterText.startsWith("3장")) chapterNumber = "3";

        if ( (currentPath.startsWith(`chapter${chapterNumber}`) || currentPath.startsWith(`secret${chapterNumber}`)) || 
             (chapterNumber === "1" && (currentPath.startsWith("secret1") || currentPath.startsWith("secret2")|| currentPath.startsWith("secret3")|| currentPath.startsWith("secret4")|| currentPath.startsWith("secret5"))) ||
             (chapterNumber === "2" && (currentPath.startsWith("secret6") || currentPath.startsWith("secret7")|| currentPath.startsWith("secret8"))) ||
             (chapterNumber === "3" && (currentPath.startsWith("secret9") || currentPath.startsWith("secret10")|| currentPath.startsWith("secret11")|| currentPath.startsWith("secret12")|| currentPath.startsWith("secret13")|| currentPath.startsWith("secret14")))
           ) {
            if (!button.classList.contains('active')) { // Only add if not already active by a direct link match
                 // Check if any link within its dropdown is active. If so, it's already handled.
                let childActive = false;
                const correspondingDropdown = button.nextElementSibling;
                if (correspondingDropdown && correspondingDropdown.classList.contains('dropdown-content')) {
                    if (correspondingDropdown.querySelector('a.active')) {
                        childActive = true;
                    }
                }
                if (!childActive) {
                    button.classList.add('active');
                }
            }
        }
    });


    // Mobile Navigation
    const mobileNavLinks = document.querySelectorAll('#unified-mobile-menu-dropdown .nav-link-mobile');
    mobileNavLinks.forEach(link => {
        if (link.getAttribute('href').endsWith(currentPath)) {
            // For mobile, we typically only want one 'active' state, usually the direct page match.
            // If it's a chapter link and current page is a secret within it, this simple check might not be enough.
            // However, the mobile menu structure is flatter, so direct match is often sufficient.
            link.classList.add('active');

            // If the active link is a secret, also mark its parent chapter link as active in mobile (if structure allows)
            // This part depends heavily on mobile menu's HTML structure. Assuming chapter links are also present.
            if(currentPath.includes("secret")) {
                const chapterNum = currentPath.match(/secret(\d+)/)?.[1]?.charAt(0) || currentPath.match(/secret(\d)/)?.[1]?.charAt(0);
                if(chapterNum) {
                    const parentChapterLink = document.querySelector(`#unified-mobile-menu-dropdown .nav-link-mobile[href="chapter${chapterNum}.html"]`);
                    if(parentChapterLink) parentChapterLink.classList.add('active');

                    // Also, if in a secret page, the "3장" (or similar) main link in mobile should be active
                    const mainChapterGroupLink = document.querySelector(`#unified-mobile-menu-dropdown .nav-link-mobile[href="chapter${chapterNum}.html"]`);
                    if(mainChapterGroupLink) mainChapterGroupLink.classList.add('active');

                }
            }
        }
    });
});
