import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { forms } from '../forms'
import logo from '../assets/logo.svg'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar container">
      <Link to="/" className="logo">
        <img src={logo} alt="SMFA Tufts Media Stockroom" />
      </Link>
      <nav className="nav-links">
        <NavLink to="/handbook">Handbook</NavLink>
        <div
          className="dropdown"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <button onClick={() => setOpen(!open)}>Forms</button>
          {open && (
            <ul className="dropdown-menu">
              {forms.map((form) => (
                <li key={form.url}>
                  <a href={form.url} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
                    {form.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <NavLink to="/equipment">Equipment</NavLink>
      </nav>
    </header>
  )
}
