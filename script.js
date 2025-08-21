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
             const formContainer = document.getElementById("formContainer");

             function openForm(){
                formContainer.classList.add('open');
                focusOverlay.classList.add('active');
             }

             function closeForm(){
                formContainer.classList.remove('open');
                focusOverlay.classList.remove('active');
            }

                floatingAdd.addEventListener('click', openForm);
                focusOverlay.addEventListener('click', closeForm);
               

            // Search button functionality
            
            const floatingSearch = document.getElementById("floatingSearch");
            const floatingSearchInput = document.getElementById("floatingSearchInput");

            function openSearch(){
                floatingSearch.classList.add('open');
                floatingSearchInput.classList.add('active')
                focusOverlay.classList.add('active');
                floatingSearchInput.focus();
            }

            function closeSearch(){
                floatingSearch.classList.remove('open');
                floatingSearchInput.classList.remove('active');
                focusOverlay.classList.remove('active');
            }

            floatingSearch.addEventListener('click', openSearch);
            floatingSearchInput.addEventListener('blur', closeSearch);
            focusOverlay.addEventListener('click', closeSearch);
            floatingSearchInput.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === 'Escape') {
                    closeSearch();
                }
            });

