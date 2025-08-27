//Sidebar functionality
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

// Loading client data onto table

function loadClients(){
fetch('selectCliente.php')
            .then(res => res.json())
            .then(data => {
                if (!data.success) throw new Error(data.error);
                const tableBody = document.getElementById("tableClientes");
                tableBody.innerHTML = data.data.map(cliente => `
                <tr class="dataTableRow">
                    <td class="dataTableItem" id="colNombre">${cliente.nombre}</td>
                    <td class="dataTableItem" id="colApellido">${cliente.apellido}</td>
                    <td class="dataTableItem" id="colTelefono">${cliente.numeroTelefono}</td>
                    <td class="dataTableItem" id="colSanes">${cliente.sanesActivos}</td>
                    <td class="dataTableItem" id="colCredito">$${Number.isNaN(parseFloat(cliente.credito)) ? '0.00' : parseFloat(cliente.credito).toFixed(2)}</td>
                    <td class="dataTableItem" id="colUbicacion">${cliente.direccion}</td>
                </tr>
                `).join('');
            })
            .catch(err => {
                console.error(err);
                document.getElementById("tableClientes").innerHTML = `
                    <td class="error" colspan="3">${err.message}</td>
                `;
            });
        }

document.addEventListener("DOMContentLoaded", loadClients());

// Add button functionality

const floatingAdd = document.getElementById("floatingAdd");
const formContainer = document.getElementById("formNewClient");

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
const floatingSearchInput = document.getElementById("floatingSearchInput");

function openSearch(){
    floatingSearchInput.value='';
    floatingSearch.classList.add('open');
    floatingSearchForm.classList.add('active')
    focusOverlay.classList.add('active');
    floatingSearchInput.focus();
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

//Register Client

document.getElementById("formNewClient").addEventListener('submit',function(e){e.preventDefault();registerClient()});

function registerClient(){
    const submitBtn = document.getElementById("formBtnClient");
    submitBtn.disabled =true;

    const formData = new FormData();
    formData.append('nombre', document.getElementById('nombre').value);
    formData.append('apellido', document.getElementById('apellido').value);
    formData.append('numeroTelefono', document.getElementById('numeroTelefono').value);
    formData.append('direccion', document.getElementById('direccion').value);

    fetch('insertClient.php', {method: 'POST', body: formData})
            .then(response=>response.text())
            .then(data=>{
                if(data.includes('true')){
                    showResponse('Cliente agregado!','success');
                    document.getElementById("formNewClient").reset();
                    loadClients();
                } else {
                    showResponse('Cliente no fue agregado.', 'error');
                }
                }
            )
            .catch(error => {
               showResponse('Error de conexión: ' + error, 'error');
            })
            .finally(() => {
                submitBtn.disabled = false;
            });
}

function showResponse(message, type) {
            const responseElement = document.getElementById('responseMessage');
            responseElement.textContent = message;
            responseElement.className = 'responseMessage ' + type;
            responseElement.style.display = 'block';
            responseElement.style.opacity = '1';
            
            setTimeout(() => {
                responseElement.style.display = 'none'
                responseElement.style.opacity = '0';
            }, 5000);
        }

