            //Table functionality
            const menuBtn = document.getElementById("menuBtn");
            const sideBar = document.getElementById("sideBar");
            const focusOverlay = document.getElementById("focus");
            const sideBarItems = document.querySelectorAll(".sideBarItem");

            function openSidebar() {
                sideBar.classList.add('open');
                focusOverlay.classList.add('active');
            }

            function closeSidebar() {
                sideBar.classList.remove('open');
                focusOverlay.classList.remove('active');
            }

             menuBtn.addEventListener('click', openSidebar);
             focusOverlay.addEventListener('click', closeSidebar);
             sideBarItems.forEach(item => {
                item.addEventListener('click', closeSidebar);
             });

            // Add button functionality

             const floatingAdd = document.getElementById("floatingAdd");

            // Search button functionality
            
            const floatingSearch = document.getElementById("floatingSearch");
            const floatingSearchInput = document.getElementById("floatingSearchInput");

            function openSearch(){
                floatingSearch.classList.add('open');
                floatingSearchInput.classList.add('active')
                floatingSearchInput.focus();
            }

            function closeSearch(){
                floatingSearch.classList.remove('open');
                floatingSearchInput.classList.remove('active');
            }

            floatingSearch.addEventListener('click', openSearch);
            floatingSearchInput.addEventListener('blur', closeSearch);

