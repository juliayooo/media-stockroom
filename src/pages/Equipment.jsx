import { useEffect, useState } from 'react'
import { categories, fetchEquipment } from '../equipment'

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
      <aside className="sidebar">
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
                onClick={() => toggle(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="table-wrap">
        <table className="equipment-table">
          <colgroup>
            <col className="col-type" />
            <col className="col-item" />
            <col className="col-auth" />
            <col className="col-mount" />
            <col className="col-included" />
          </colgroup>
          <thead>
            <tr>
              <th>Category</th>
              <th>Name</th>
              <th>Auth</th>
              <th>Mount</th>
              <th>Included</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.id}>
                <td>{item.type}</td>
                <td>{item.item}</td>
                <td>{item.auth}</td>
                <td>{item.mount}</td>
                <td>{item.included}</td>
              </tr>
            ))}
          </tbody>
          {status !== 'ready' || rows.length === 0 ? (
            <caption className="table-status">
              {status === 'loading' && 'Loading equipment…'}
              {status === 'error' && 'Could not load equipment. Please try again later.'}
              {status === 'ready' && 'No equipment matches.'}
            </caption>
          ) : null}
        </table>
      </div>
    </div>
  )
}
