document.addEventListener("DOMContentLoaded", ()=>{
    const btnPDF = document.querySelector('#descargarPDF')

    const ocultar = ()=>{
        document.querySelector('header').classList.add('d-none');
        document.querySelector('footer').classList.add('d-none');
        btnPDF.classList.add('d-none');
    }


    btnPDF.addEventListener('click', ()=>{
        ocultar();

        const $elementoParaConvertir = document.body; 

        html2pdf()
            .set({
                margin: 1,
                filename: 'DISEÑOS EXCLUSIVOS DE JUVENTUS SASTRERIA.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 3,
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a3",
                    orientation: 'portrait'
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
            
    });


});