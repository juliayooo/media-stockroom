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

// Row end-cap color per category, sampled from the background gradient
// (yellow → orange → red → pink). Runs opposite to the background behind the
// table, which is red/pink at the top, so the first categories stand out most.
export const categoryColors = {
  'Cameras + Camera Accessories': '#fec644',
  'Lenses (Analog)': '#fcb537',
  'Lenses (Digital)': '#f9a32b',
  'Cables + Adapters': '#f6901e',
  'Computers + Software': '#f47620',
  'Tripods, Supports, Rigs': '#f36c21',
  'Virtual Reality': '#f15829',
  'AV Presentation': '#ef423e',
  Other: '#ee395f',
  Audio: '#ee417f',
  'Lighting, Studio': '#ee4895',
}

export async function fetchEquipment() {
  const res = await fetch(SHEET_CSV_URL)
  if (!res.ok) throw new Error(`Failed to load inventory (${res.status})`)
  const { data } = Papa.parse(await res.text(), { header: true, skipEmptyLines: true })
  return data.filter((row) => row.item)
}
