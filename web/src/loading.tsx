import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

import "./styles/loading.css"

function LoadingUserProfile() {
  return (
    <SkeletonTheme baseColor="#1f2937" highlightColor="#33445b">
      <main className="loading">
        <aside className="user-details">
          <div>
            <Skeleton className="avatar" />
            <header>
              <Skeleton className="name" />
              <Skeleton className="username" />
            </header>
          </div>
          <Skeleton className="biography" count={2} />
          <Skeleton className="follow" />
          <Skeleton className="connections" />
          <Skeleton className="links" count={2} />
        </aside>
        <section>
          <Skeleton className="readme" />
          <div className="user-repositories">
            <Skeleton className="header" />
            <ol>
              <Skeleton className="card" inline />
              <Skeleton className="card" inline />
              <Skeleton className="card" inline />
            </ol>
          </div>
        </section>
      </main>
    </SkeletonTheme>
  );
}

export { LoadingUserProfile };
