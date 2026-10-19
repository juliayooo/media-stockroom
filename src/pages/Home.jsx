import { Link } from 'react-router-dom'
import { contact, hours } from '../handbook'
import stockroomImg from '../assets/stockroom-img.avif'

export default function Home() {
  return (
    <div className="home">
      <img
        className="home-photo"
        src={stockroomImg}
        alt="Stockroom key board with labeled room keys and the daily inventory clipboard"
      />
      <section className="home-mission">
        <h2>Mission Statement</h2>
        <p>
          The Media Stockroom provides short-term equipment loans to all members of the Tufts
          community for the purposes of teaching and learning. All equipment housed in the Media
          Stockroom is available to all students, faculty, and staff (“users”), but some equipment
          requires that users are trained and authorized prior to use.
        </p>
        <p>
          For information on current stockroom policy, visit the{' '}
          <Link to="/handbook">Media Stockroom Handbook</Link>.
        </p>
        <p>
          For a complete list of available stockroom equipment, visit the{' '}
          <Link to="/equipment">Equipment List</Link>.
        </p>
        <p>For links to our authorization and reservation forms, see the Forms menu.</p>
        <p>
          For any questions, contact <a href={`mailto:${contact.email}`}>{contact.email}</a>.
        </p>
      </section>

      <aside className="home-info">
        <h2>Hours</h2>
        <table className="home-hours">
          <tbody>
            {hours.map(([day, time]) => (
              <tr key={day}>
                <th scope="row">{day}</th>
                <td>{time}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Contact Us</h2>
        <p>
          Media Stockroom Manager: {contact.manager}
          <br />
          Phone: <a href={`tel:${contact.phone}`}>{contact.phone}</a>
          <br />
          Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </p>
        <p>
          Location: {contact.address}
          <br />
          {contact.window}
        </p>
      </aside>
    </div>
  )
}
