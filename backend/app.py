from flask import Flask, request, send_file, jsonify
from io import BytesIO
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from reportlab.lib import colors

app = Flask(__name__)

@app.route('/api/generate-invoice', methods=['POST'])
def generate_invoice():
    try:
        data = request.json

        invoice_data = [
            ["Invoice No", "Type", "Invoice Date", "GST No", "Name of the Party",
             "Rate", "Taxable Value", "CGST", "SGST", "Total Invoice Value"],
            [
                data['invoiceNo'], "", data['invoiceDate'], data['gstNo'], data['partyName'],
                f"{data['rate']:.2f}", f"{data['taxableValue']:.2f}",
                f"{data['cgst']:.2f}", f"{data['sgst']:.2f}", f"{data['totalValue']:.2f}"
            ]
        ]

        buffer = BytesIO()
        pdf = SimpleDocTemplate(buffer, pagesize=A4)
        table = Table(invoice_data)
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ]))

        pdf.build([table])

        buffer.seek(0)
        return send_file(buffer, as_attachment=True, download_name='Invoice.pdf', mimetype='application/pdf')

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)