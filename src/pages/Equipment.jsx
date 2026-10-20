import { useEffect, useState } from 'react'
import { categories, categoryColors, fetchEquipment } from '../equipment'

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
        <div className="equipment-table" role="table">
          <div className="equipment-head" role="row">
            <span role="columnheader">Name</span>
            <span role="columnheader">Category</span>
            <span role="columnheader">Qty</span>
            <span role="columnheader">Require Auth</span>
            <span role="columnheader">Description</span>
            <span role="columnheader">Included</span>
            <span role="columnheader">Accessories Available</span>
          </div>
          {rows.map((item) => (
            <div
              className="equipment-row"
              role="row"
              key={item.id}
              style={{ '--row-color': categoryColors[item.section] }}
            >
              <span role="cell" className="item-name" data-label="Name">{item.item}</span>
              <span role="cell" data-label="Category">{item.type}</span>
              <span role="cell" data-label="Qty">{item.qty}</span>
              <span role="cell" data-label="Auth">{item.authorization}</span>
              <span role="cell" data-label="Description">
                {[item.description, item.mount].filter(Boolean).join(', ')}
              </span>
              <span role="cell" data-label="Included">{item.included}</span>
              <span role="cell" data-label="Accessories">{item.checkout_accessories}</span>
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
