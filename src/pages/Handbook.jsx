import { contact, hours, sections } from '../handbook'

const slug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

// The app uses HashRouter, so a plain #anchor would be read as a route. Scroll instead.
function TocLink({ id, children }) {
  const scroll = (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
  return <a href={`#${id}`} onClick={scroll}>{children}</a>
}

// Turn email addresses in handbook text into mailto links
function Text({ children }) {
  return children.split(/(\S+@\S+\.edu)/g).map((part, i) =>
    /@/.test(part) ? <a key={i} href={`mailto:${part}`}>{part}</a> : part
  )
}

function Items({ items }) {
  return (
    <ul>
      {items.map((item, i) =>
        typeof item === 'string' ? (
          <li key={i}><Text>{item}</Text></li>
        ) : (
          <li key={i}>
            <Text>{item.text}</Text>
            <Items items={item.children} />
          </li>
        )
      )}
    </ul>
  )
}

export default function Handbook() {
  return (
    <article className="handbook">
      <h1>Media Stockroom Handbook</h1>

      <nav className="handbook-toc">
        <h2>Contents</h2>
        <ol>
          <li><TocLink id="contact-information">Contact Information</TocLink></li>
          {sections.map((s) => (
            <li key={s.title}><TocLink id={slug(s.title)}>{s.title}</TocLink></li>
          ))}
        </ol>
      </nav>

      <section id="contact-information">
        <h2>Contact Information</h2>
        <p>
          <strong>Email:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <br />
          <strong>Website:</strong> <a href={contact.website}>{contact.website}</a>
        </p>
        <table className="hours">
          <caption>Operating Hours</caption>
          <tbody>
            {hours.map(([day, time]) => (
              <tr key={day}>
                <th scope="row">{day}</th>
                <td>{time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {sections.map((s) => (
        <section key={s.title} id={slug(s.title)}>
          <h2>{s.title}</h2>
          <Items items={s.items} />
          {s.paragraphs?.map((p, i) => <p key={i}><Text>{p}</Text></p>)}
        </section>
      ))}
    </article>
  )
}
