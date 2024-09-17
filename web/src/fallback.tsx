import "./styles/fallback.css"

function Fallback() {
  return (
    <div className="fallback">
      <img src="/images/404-scene.png" alt="This is not the web page you are looking for. (404 error)" />
      <img src="/images/404-background.png" alt="" />
    </div>
  );
}

export { Fallback };
