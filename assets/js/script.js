const addRow = (tblCanciones, tipoCancion, nameCancion, numeroCancion, id) => {
    let tableRef = document.getElementById(tblCanciones);
    let newRow = tableRef.insertRow(-1);

    newRow.innerHTML = `<tr>
		<td class="text-center">${id}</td>
		<td>${tipoCancion.charAt(0).toUpperCase() + tipoCancion.slice(1)}</td>
		<td>${nameCancion}</td>
		<td>${numeroCancion}</td>
	</tr>`;

    sortTable(tblCanciones);
};



const sortTable = (tblCanciones) => {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById(tblCanciones);
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[3];
            y = rows[i + 1].getElementsByTagName("TD")[3];

            if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
};




let i = 1;
let btnAddCancion = document.getElementById("btnAddCancion");
btnAddCancion.addEventListener('click', () => {
    let tipoCancion = document.getElementById('slcTipoCancion').value.trim();
    let nameCancion = document.getElementById('inpCancion').value.trim();
    let numeroCancion = document.getElementById('inpNumeroCancion').value.trim();


    if (tipoCancion == "Tipo de Canto..." || nameCancion == "" || numeroCancion == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Debe completar todos los campos.',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false,
            allowEscapeKey: false,
        })
        return;
    }

    // Validar con expresion regular que el campo nombre solo acepte texto, espacio, tilde y ñ.
    // Ademas que permita mayuscula u minuscula.
    let regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
    if (!regex.test(nameCancion)) {
        Swal.fire({
            icon: 'error',
            title: 'El nombre de la canción es invalido!',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false,
            allowEscapeKey: false,
        })
        return;
    }

    addRow('tblListaCanciones', tipoCancion, nameCancion, numeroCancion, i);
    i++;
});


const IrEucaristiaDiaria = () => {
    const fchLecturasEucaristicas = document.getElementById('url-fecha').value.trim();

    if (fchLecturasEucaristicas == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Debe seleccionar una fecha.',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false,
            allowEscapeKey: false,
        })
        return;
    }

    window.open(`https://www.eucaristiadiaria.cl/dia_cal.php?fecha=${fchLecturasEucaristicas}`, "_blank");
}
