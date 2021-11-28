import jsPDF from "jspdf"
import "jspdf-autotable"

import DateUtility from "@utils/date"
import { calculateDiscount, pad, truncate } from "@utils/common"

export const generateReceipt = (data) => {
  const pdfHeaders = [
    {
      header: "Sr",
      dataKey: "sr",
    },
    {
      header: "Description",
      dataKey: "description",
    },
    {
      header: "Qty",
      dataKey: "quantity",
    },
    {
      header: "Rate",
      dataKey: "price",
    },
    {
      header: "Disc %",
      dataKey: "discount",
    },
    {
      header: "Disc",
      dataKey: "discount_price",
    },
    {
      header: "Amount",
      dataKey: "total_price",
    },
  ]

  let pdfData = data.stocks.map((stock, index) => ({
    id: String(index + 1),
    sr: String(index + 1),
    description: stock.stock_id.description,
    quantity: String(stock.quantity),
    price: String(truncate(stock.sale_price, 2)),
    discount: stock.discount.value
      ? String(truncate(stock.discount.value, 2))
      : "0",
    discount_price: stock.discount.value
      ? String(
          truncate(
            calculateDiscount(
              stock.sale_price,
              stock.quantity,
              stock.discount.value
            ).discount,
            2
          )
        )
      : "0",
    total_price: String(
      truncate(
        calculateDiscount(
          stock.sale_price,
          stock.quantity,
          stock.discount.value
        ).value,
        2
      )
    ),
  }))

  let total_qty = 0
  let total_price = 0
  let total_discount = 0
  pdfData.map((d) => {
    total_qty += Number(d.quantity)
    total_price += Number(d.total_price)
    total_discount += Number(d.discount_price)
  })

  pdfData[pdfData.length] = {
    quantity: truncate(total_qty, 2),
    total_price: truncate(total_price, 2),
    discount_price: truncate(total_discount, 2),
    description: "Total",
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
  doc.text(
    `${data.status === "quotation" ? "Quotation" : "Receipt"} #: ${pad(
      data.order_id
    )}`,
    14,
    44
  )
  doc.text(
    `Date: ${DateUtility.formatDate(data.createdAt)}`,
    196,
    44,
    null,
    null,
    "right"
  )
  doc.text("Customer: " + data.created_for.first_name, 14, 52)

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
