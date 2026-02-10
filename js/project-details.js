/* =============================================
   SECTION 2 — Tab Switching Logic
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {
    // Section 2 Tabs
    const tabs = document.querySelectorAll('.section-2-tab');
    const tabContents = document.querySelectorAll('.section-2-tab-content');

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var target = this.getAttribute('data-tab');

            // Remove active from all tabs
            tabs.forEach(function (t) {
                t.classList.remove('active');
            });

            // Remove active from all contents
            tabContents.forEach(function (c) {
                c.classList.remove('active');
            });

            // Activate clicked tab
            this.classList.add('active');

            // Activate corresponding content
            var content = document.getElementById(target);
            if (content) {
                content.classList.add('active');
            }
        });
    });
});
