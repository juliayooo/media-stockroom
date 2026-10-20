import Papa from 'papaparse'

// The inventory Google Sheet (must be shared as "Anyone with the link can view").
// Columns: id, section, type, item, qty, authorization, mount, description, included, checkout_accessories
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

// Row end-cap color per category, sampled from the background gradient
// (gold → orange → pink → magenta → purple → blue).
export const categoryColors = {
  'Cameras + Camera Accessories': '#e3a770',
  'Lenses (Analog)': '#f16738',
  'Lenses (Digital)': '#ea5d47',
  'Cables + Adapters': '#e44c58',
  'Computers + Software': '#d9316a',
  'Tripods, Supports, Rigs': '#c91b7a',
  'Virtual Reality': '#ae208a',
  'AV Presentation': '#92288f',
  Other: '#87459b',
  Audio: '#7f71b3',
  'Lighting, Studio': '#789ccf',
}

export async function fetchEquipment() {
  const res = await fetch(SHEET_CSV_URL)
  if (!res.ok) throw new Error(`Failed to load inventory (${res.status})`)
  const { data } = Papa.parse(await res.text(), { header: true, skipEmptyLines: true })
  return data.filter((row) => row.item)
}
