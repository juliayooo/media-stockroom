import { contact, hours } from '../handbook'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <h2>Contact</h2>
          <p>
            Media Stockroom Manager: {contact.manager}
            <br />
            Phone: <a href={`tel:${contact.phone}`}>{contact.phone}</a>
            <br />
            Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
          <p>
            {contact.address}
            <br />
            {contact.window}
          </p>
        </div>
        <div>
          <h2>Hours</h2>
          <table>
            <tbody>
              {hours.map(([day, time]) => (
                <tr key={day}>
                  <th scope="row">{day}</th>
                  <td>{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </footer>
  )
}
