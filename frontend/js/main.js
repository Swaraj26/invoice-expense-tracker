const form = document.getElementById('transaction-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = {
        date: document.getElementById('date').value,
        description: document.getElementById('description').value,
        amount: document.getElementById('amount').value,
        gst: document.getElementById('gst').value,
    };

    const response = await fetch('http://127.0.0.1:5000/api/transaction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
});
