import * as XLSX from "xlsx";

export function exportToExcel(data: any[], filename: string) {
  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Convert data to worksheet
  const ws = XLSX.utils.json_to_sheet(data);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Generate Excel file and trigger download
  XLSX.writeFile(wb, `${filename}.xlsx`);
}

export function exportToCSV(data: any[], filename: string) {
  // Convert data to CSV
  const ws = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(ws);

  // Create blob and download
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function formatOrdersForExport(orders: any[]) {
  return orders.map((order) => ({
    "Broj narudžbe": order.orderNumber,
    Kupac: order.customer.fullName,
    Telefon: order.customer.phone,
    Email: order.customer.email || "",
    Adresa: order.customer.address || "",
    Grad: order.customer.city || "",
    Status: order.status,
    "Ukupan iznos (KM)": (order.totalAmount / 100).toFixed(2),
    "Dostava (KM)": (order.shippingFee / 100).toFixed(2),
    Izvor: order.source || "",
    "UTM Source": order.utmSource || "",
    "UTM Medium": order.utmMedium || "",
    "UTM Campaign": order.utmCampaign || "",
    Datum: new Date(order.createdAt).toLocaleString("sr-Latn-RS"),
  }));
}

export function formatLeadsForExport(leads: any[]) {
  return leads.map((lead) => ({
    Ime: lead.fullName,
    Telefon: lead.phone,
    Email: lead.email || "",
    Status: lead.status,
    Izvor: lead.source || "",
    "Landing Page": lead.landingPage || "",
    "UTM Source": lead.utmSource || "",
    "UTM Medium": lead.utmMedium || "",
    "UTM Campaign": lead.utmCampaign || "",
    Dodijeljeno: lead.assignedTo?.name || "",
    Bilješke: lead.notes || "",
    Datum: new Date(lead.createdAt).toLocaleString("sr-Latn-RS"),
  }));
}

export function formatCustomersForExport(customers: any[]) {
  return customers.map((customer) => ({
    Ime: customer.fullName,
    Telefon: customer.phone,
    Email: customer.email || "",
    Adresa: customer.address || "",
    Grad: customer.city || "",
    "Poštanski broj": customer.zipCode || "",
    "Broj narudžbi": customer.orderCount,
    "Ukupna potrošnja (KM)": (customer.totalSpent / 100).toFixed(2),
    "Posljednja narudžba": customer.lastOrderAt
      ? new Date(customer.lastOrderAt).toLocaleDateString("sr-Latn-RS")
      : "",
    Tagovi: customer.tags.join(", "),
    "Datum registracije": new Date(customer.createdAt).toLocaleString("sr-Latn-RS"),
  }));
}
