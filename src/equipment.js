import Papa from 'papaparse'

// The inventory Google Sheet (must be shared as "Anyone with the link can view").
// Columns: id, section, type, item, qty, authorization, mount, description, included, checkout_accessories
const SHEET_ID = '1CY_kaIjr_Jj7FELEWhKOC9LtfbmHiyKZUa10sjPRf6k'
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`

// Row end-cap color per category, sampled from the background gradient and assigned in
// sheet order (gold → orange → pink → magenta → purple → blue). Keys must match the
// sheet's "section" column.
export const categoryColors = {
  'Cameras + Camera Accessories': '#e3a770',
  'Lenses (Analog)': '#f16738',
  'Lenses (Digital)': '#ea5d47',
  'Tripods, Supports, Rigs': '#e44c58',
  'Lighting, Studio': '#d9316a',
  Audio: '#c91b7a',
  'AV Presentation': '#ae208a',
  'Virtual Reality': '#92288f',
  'Computers + Software': '#87459b',
  'Cables + Adapters': '#7f71b3',
  Other: '#789ccf',
}

export async function fetchEquipment() {
  const res = await fetch(SHEET_CSV_URL)
  if (!res.ok) throw new Error(`Failed to load inventory (${res.status})`)
  const { data } = Papa.parse(await res.text(), { header: true, skipEmptyLines: true })
  return data.filter((row) => row.item)
}
