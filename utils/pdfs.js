import jsPDF from "jspdf"
import "jspdf-autotable"

import DateUtility from "@utils/date"
import { calculateDiscount, pad } from "@utils/common"

export const generateReceipt = (data) => {
  const pdfHeaders = [
    {
      dataKey: "sr",
      header: "Sr",
    },
    {
      dataKey: "description",
      header: "Description",
    },
    {
      dataKey: "code",
      header: "Code",
    },
    {
      dataKey: "price",
      header: "Price",
    },
    {
      dataKey: "quantity",
      header: "Quantity",
    },
    {
      dataKey: "discount",
      header: "Disc %",
    },
    {
      dataKey: "discount_price",
      header: "Disc Price",
    },
    {
      dataKey: "total_price",
      header: "Total Price",
    },
  ]

  let pdfData = data.stocks.map((stock, index) => ({
    sr: String(index + 1),
    id: String(index + 1),
    code: `${stock.stock_id.sr} - ${stock.stock_id.code}`,
    price: String(stock.sale_price),
    quantity: String(stock.quantity),
    discount: String(stock.discount.value),
    description: stock.stock_id.description,
    discount_price: String(
      calculateDiscount(stock.sale_price, stock.quantity, stock.discount.value)
        .discount
    ),
    total_price: String(
      calculateDiscount(stock.sale_price, stock.quantity, stock.discount.value)
        .value
    ),
  }))

  let total_price = 0
  pdfData.map((d) => (total_price += Number(d.total_price)))

  pdfData[pdfData.length] = {
    total_price: total_price,
    discount_price: "Sub Total",
  }

  var doc = new jsPDF({ unit: "mm", format: "a4", orientation: "p" })
  doc.setFontSize(26, "bold")
  doc.text("Madina Traders & Electric Store", 105, 20, null, null, "center")
  doc.setFontSize(12)
  doc.text(
    "Address: Shop # 5 Model Town, K Block Near PSO Petrol Pump Marian Stop Lahore",
    105,
    28,
    null,
    null,
    "center"
  )
  doc.text("Mobile #: 0321-8464465, 03004001431", 105, 35, null, null, "center")
  doc.text(`Receipt #: ${pad(data.order_id)}`, 14, 44)
  doc.text(
    `Date: ${DateUtility.formatDate(data.createdAt)}`,
    196,
    44,
    null,
    null,
    "right"
  )
  doc.text("DHA Raya 148", 14, 52)

  doc.autoTable({
    startX: 0,
    startY: 56,
    body: pdfData,
    theme: "striped",
    columns: pdfHeaders,
    columnStyles: { text: { cellWidth: "auto" } },
    styles: { overflow: "ellipsize", cellWidth: "wrap" },
    headStyles: { fillColor: [88, 90, 150], textColor: 255, fontStyle: "bold" },
  })

  doc.text("Signature ___________________", 14, doc.lastAutoTable.finalY + 14)

  doc.autoPrint()
  window.open(doc.output("bloburl"))
  // doc.save(`${data.order_id}.pdf`)
  return
}
