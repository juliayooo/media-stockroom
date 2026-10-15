import Papa from 'papaparse'

// The inventory Google Sheet (must be shared as "Anyone with the link can view").
// Columns: id, section, type, item, qty, auth, mount, description, included, checkout_accessories
const SHEET_ID = '1CY_kaIjr_Jj7FELEWhKOC9LtfbmHiyKZUa10sjPRf6k'
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`

// Sidebar order. Names must match the "section" column in the sheet.
export const categories = [
  'Cameras + Camera Accessories',
  'Lenses (Analog)',
  'Lenses (Digital)',
  'Cables + Adapters',
  'Computers + Software',
  'Tripods, Supports, Rigs',
  'Virtual Reality',
  'AV Presentation',
  'Other',
  'Audio',
  'Lighting, Studio',
]

export async function fetchEquipment() {
  const res = await fetch(SHEET_CSV_URL)
  if (!res.ok) throw new Error(`Failed to load inventory (${res.status})`)
  const { data } = Papa.parse(await res.text(), { header: true, skipEmptyLines: true })
  return data.filter((row) => row.item)
}
