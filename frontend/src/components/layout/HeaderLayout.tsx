import { ReactNode } from "react";

function HeaderLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="bg-slate-500 flex align-middle justify-between p-3">
        <div>
          <h1>Solo Levelling</h1>
        </div>
        <div>
          <button>Logout</button>
        </div>
      </div>
      <div className="p-3 flex flex-col">{children}</div>
    </div>
  );
}

export default HeaderLayout;
