import { MarkGithubIcon } from "@primer/octicons-react";

import "./styles/footer.css"

function Footer() {
  return (
    <footer className="page-footer">
      <MarkGithubIcon size={24}/>
      <p>© 2024 GitHub, Inc. | app clone made by andre-sch in 2024.</p>
    </footer>
  );
}

export { Footer };
