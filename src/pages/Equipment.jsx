import { useEffect, useState } from 'react'
import { categories, categoryColors, fetchEquipment } from '../equipment'

// Mount only matters for cameras, so that column is shown only while camera rows are listed.
const CAMERAS = 'Cameras + Camera Accessories'

export default function Equipment() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState([])
  const [equipment, setEquipment] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchEquipment()
      .then((rows) => {
        setEquipment(rows)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  const toggle = (category) =>
    setSelected((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )

  const q = query.toLowerCase()
  const rows = equipment.filter(
    (item) =>
      (selected.length === 0 || selected.includes(item.section)) &&
      (item.item.toLowerCase().includes(q) || item.type.toLowerCase().includes(q)),
  )

  const showMount = rows.some((item) => item.section === CAMERAS)

  return (
    <div className="equipment">
      <div className="filters">
        <input
          className="search"
          type="search"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <ul className="categories">
          {categories.map((category) => (
            <li key={category}>
              <button
                className={selected.includes(category) ? 'active' : ''}
                aria-pressed={selected.includes(category)}
                onClick={() => toggle(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="table-wrap">
        <div className={`equipment-table${showMount ? ' with-mount' : ''}`} role="table">
          <div className="equipment-head" role="row">
            <span role="columnheader">Category</span>
            <span role="columnheader">Name</span>
            <span role="columnheader">Auth</span>
            <span role="columnheader">Included</span>
            {showMount && <span role="columnheader">Mount</span>}
          </div>
          {rows.map((item) => (
            <div
              className="equipment-row"
              role="row"
              key={item.id}
              style={{ '--row-color': categoryColors[item.section] }}
            >
              <span role="cell">{item.type}</span>
              <span role="cell" className="item-name">{item.item}</span>
              <span role="cell">{item.auth}</span>
              <span role="cell">{item.included}</span>
              {showMount && <span role="cell">{item.mount}</span>}
            </div>
          ))}
          {(status !== 'ready' || rows.length === 0) && (
            <p className="table-status">
              {status === 'loading' && 'Loading equipment…'}
              {status === 'error' && 'Could not load equipment. Please try again later.'}
              {status === 'ready' && 'No equipment matches.'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
