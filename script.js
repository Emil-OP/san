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
                const tableBody = document.getElementById("dataTableClientes");
                tableBody.innerHTML = data.data.map(cliente => `
                <tr class="dataTableRow" idPart="${cliente.idParticipante}">
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
                document.getElementById("dataTableClientes").innerHTML = `
                    <td class="error" colspan="3">${err.message}</td>
                `;
            });
        }

document.addEventListener("DOMContentLoaded", loadClients);

// Add button functionality

const floatingAdd = document.getElementById("floatingAdd");
const formClientNew = document.getElementById("formClientNew");

function openForm(formClient){
    formClient.classList.add('open');
    focusOverlay.classList.add('active');
}

    function closeForm(formClient){
    formClient.classList.remove('open');
    focusOverlay.classList.remove('active');
}

floatingAdd.addEventListener('click', () => openForm(formClientNew));
focusOverlay.addEventListener('click', () => closeForm(formClientNew));
    

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
    const table = document.getElementById("dataTableClientes");
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

document.getElementById("formClientNew").addEventListener('submit',function(e){e.preventDefault();registerClient()});

function registerClient(){
    const submitBtn = document.getElementById("formBtnClient");
    submitBtn.disabled =true;

    const formData = new FormData();
    formData.append('nombre', document.getElementById('nombre').value);
    formData.append('apellido', document.getElementById('apellido').value);
    formData.append('numeroTelefono', document.getElementById('numeroTelefono').value);
    formData.append('direccion', document.getElementById('direccion').value);
    const toastMessage = document.getElementById('toastMessageClient');


    fetch('insertClient.php', {method: 'POST', body: formData})
        .then(response=>response.text())
        .then(data=>{
            if(data.includes('true')){
                toastMessage.textContent="Cliente fue agregado!";
                document.getElementById("formClientNew").reset();
                loadClients();
            } else {
                toastMessage.textContent="Cliente no fue agregado.";
            }
            toastMessage.classList.add('show');
            setTimeout(() => {
                toastMessage.classList.remove('show');
                submitBtn.disabled = false;
            }, 5000);
        })
}


//View Client

const formClientView = document.getElementById("formClientView");

document.getElementById("dataTableClientes").addEventListener('click', function(event) {
    const row = event.target.closest('.dataTableRow');
    if (row) {
        populateViewForm(row);
        openForm(formClientView);
    }
});

focusOverlay.addEventListener('click',()=>closeForm(formClientView));

function populateViewForm(row){
    const nombreInput = formClientView.querySelector('#nombre');
    const apellidoInput = formClientView.querySelector('#apellido');
    const numeroTelefonoInput = formClientView.querySelector('#numeroTelefono');
    const direccionInput = formClientView.querySelector('#direccion');    

    nombreInput.value = row.querySelector('#colNombre').textContent;
    apellidoInput.value = row.querySelector('#colApellido').textContent;
    numeroTelefonoInput.value = row.querySelector('#colTelefono').textContent;
    direccionInput.value = row.querySelector('#colUbicacion').textContent;
}

//Edit Client

const formClientEdit = document.getElementById("formClientEdit");


document.getElementById("formBtnClientView").addEventListener('click', ()=>populateEditForm(formClientView));
focusOverlay.addEventListener('click',()=>closeForm(formClientEdit));


function populateEditForm(formView){

    formClientEdit.querySelector('#nombre').value = formView.querySelector('#nombre').value;
    formClientEdit.querySelector('#apellido').value = formView.querySelector('#apellido').value;
    formClientEdit.querySelector('#numeroTelefono').value = formView.querySelector('#numeroTelefono').value;
    formClientEdit.querySelector('#direccion').value = formView.querySelector('#direccion').value;
    closeForm(formClientView);
    openForm(formClientEdit);
}


 