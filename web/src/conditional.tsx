import { ReactNode } from "react";

function Conditional(props: { on: any; children: ReactNode }) {
  return Boolean(props.on) && props.children;
}

export { Conditional };
