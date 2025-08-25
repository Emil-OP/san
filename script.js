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
               

            // Search button visuals
            
            const floatingSearch = document.getElementById("floatingSearch");
            const floatingSearchForm = document.getElementById("floatingSearchForm");

            function openSearch(){
                floatingSearch.classList.add('open');
                floatingSearchForm.classList.add('active')
                focusOverlay.classList.add('active');
                document.getElementById("floatingSearchInput").focus();
            }

            function closeSearch(){
                floatingSearch.classList.remove('open');
                floatingSearchForm.classList.remove('active');
                focusOverlay.classList.remove('active');
            }

            floatingSearch.addEventListener('click', openSearch);
            floatingSearchForm.addEventListener('blur', closeSearch);
            focusOverlay.addEventListener('click', closeSearch);
            floatingSearchForm.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === 'Escape') {
                    closeSearch();
                }
            });

            //Search bar functionality

            function searchCliente(){
                var nombre, apellido, telefono;
            const floatingSearchInput = document.getElementById("floatingSearchInput");
            const filter = floatingSearchInput.value.toUpperCase();
            const table = document.getElementById("tableClientes");
            const rows = table.getElementsByTagName("tr");
            for (let i = 0; i < rows.length; i++) {
                nombre =  rows[i].getElementsByTagName("td")[0].textContent;
                apellido =  rows[i].getElementsByTagName("td")[1].textContent;
                telefono =  rows[i].getElementsByTagName("td")[2].textContent;
                if (nombre.toUpperCase().indexOf(filter) > -1 || apellido.toUpperCase().indexOf(filter) > -1 || telefono.toUpperCase().indexOf(filter) > -1 ){
                    rows[i].style.display = "";
                } else {
                    rows[i].style.display = "none";
                }                
            }
        }


