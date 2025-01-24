const form = document.getElementById('invoice-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = {
        invoiceNo: document.getElementById('invoice-no').value,
        invoiceDate: document.getElementById('invoice-date').value,
        gstNo: document.getElementById('gst-no').value,
        partyName: document.getElementById('party-name').value,
        rate: parseFloat(document.getElementById('rate').value),
        taxableValue: parseFloat(document.getElementById('taxable-value').value),
        cgst: parseFloat(document.getElementById('cgst').value),
        sgst: parseFloat(document.getElementById('sgst').value),
        totalValue: parseFloat(document.getElementById('taxable-value').value) +
                    parseFloat(document.getElementById('cgst').value) +
                    parseFloat(document.getElementById('sgst').value),
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/api/generate-invoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error('Failed to fetch PDF:', response.statusText);
            alert('Failed to generate the invoice. Please check the console for more details.');
            return;
        }

        const result = await response.blob();

        const url = window.URL.createObjectURL(result);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Invoice.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error generating invoice:', error);
        alert('An unexpected error occurred. Please check the console for details.');
    }
});