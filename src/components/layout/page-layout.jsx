import { Header } from '@/components/layout/header';
import { Nav } from '@/components/layout/nav';
import { Logo } from './logo';
import { Hamburger } from '../shared/icons';

export function PageLayout({ children, user }) {
  return (
    <div className="drawer">
      <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="drawer-toggle"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <Hamburger className="inline-block h-6 w-6" />
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">
            <Logo />
          </div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal p-0">
              <Nav user={user} />
            </ul>
          </div>
        </div>
        <main className="w-full max-w-[96ch] mx-auto min-h-screen p-4">
          {children}
        </main>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="drawer-toggle"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          <Nav user={user} vertical />
        </ul>
      </div>
    </div>
  );
}