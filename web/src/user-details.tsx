import { LinkIcon, LocationIcon, MailIcon, OrganizationIcon, PeopleIcon } from "@primer/octicons-react";
import "./styles/user-details.css"

function UserDetails() {
  return <aside className="user-details">
    <img src="https://avatars.githubusercontent.com/u/77517189?v=4" alt="avatar" />
    <header>
      <h1>André Schlichting</h1>
      <h2>andre-sch</h2>
    </header>
    <p>Computer Science student at UEM. Currently focused on web development.</p>
    <button disabled>Edit profile</button>
    <span><PeopleIcon/> <em>9</em> followers <em>· 9</em> following</span>
    <ul>
      <li><OrganizationIcon/> {"@Rocket"}</li>
      <li><LocationIcon/> {"Brasil"}</li>
      <li><MailIcon/> {"andresch.dev@gmail.com"}</li>
      <li><LinkIcon/> {"in/andre-sch"}</li>
    </ul>
  </aside>
}

export { UserDetails };