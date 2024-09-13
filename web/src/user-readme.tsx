import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import { getProfileReadme, profileReadmeHost } from "./api";

import "./styles/markdown.css"
import "./styles/user-readme.css"

function UserReadme(props: { username: string }) {
  const username = props.username;
  const [profileReadme, setProfileReadme] = useState<string | null>(null);

  useEffect(() => {
    getProfileReadme(username)
      .then(setProfileReadme);
  }, [username]);

  return profileReadme ? (
    <div className="markdown-body">
      <span><em>{username}</em> / <em>README</em> .md</span>
      <Markdown
        components={{ img: replaceRelativeImages, a: replaceRelativeAnchors }}
        rehypePlugins={[rehypeRaw]}
        children={profileReadme}
      />
    </div>
  ) : null;

  function replaceRelative(url: string) {
    return url.replace("./", profileReadmeHost(username));
  }

  function replaceRelativeImages(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    const { src = "", ...rest } = props;
    return <img src={replaceRelative(src)} {...rest} />;
  }

  function replaceRelativeAnchors(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    const { href = "", ...rest } = props;
    return <a href={replaceRelative(href)} {...rest} />;
  }
}

export { UserReadme };
