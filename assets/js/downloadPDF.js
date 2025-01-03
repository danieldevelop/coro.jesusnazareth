const downloadPDF = () => {
    const table = document.getElementById('tblListaCanciones');
    const rows = table.getElementsByTagName('tr');

    // Verificamos si hay datos en la tabla
    if (rows.length <= 1) { // Tiene que ser mayor a 1 porque la primera fila es la cabecera
        Swal.fire({
            icon: 'info',
            title: 'No hay registros para descargar.',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false,
            allowEscapeKey: false,
        })
        return;
    }

    const doc = new jsPDF();
    let y = 15;

    doc.setFontSize(24);
    doc.setFont('arial', 'normal');
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.text('Lista de Cantos', pageWidth / 2, y, { align: 'center' });
    y += 10;

    doc.setFontSize(16);
    doc.setFont('arial', 'normal');
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let rowText = '';
        for (let j = 0; j < cells.length; j++) {
            if (j === 0) {
                rowText += `${cells[j].innerText}. `; // N°
            } else if (j === 1) {
                rowText += `${cells[j].innerText}:\t\t`; // Título
            } else if (j === 2) {
                rowText += `${cells[j].innerText}\t\t`; // Letra
            } else if (j === 3) {
                rowText += `N° ${cells[j].innerText} `; // Página
            }

        }
        doc.text(rowText, 10, y);
        y += 10;
    }

    doc.save('lista_de_cantos.pdf');
};