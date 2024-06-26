import { Fragment } from "react";
import WavesSVG from "@/components/waves-svg";
import UserButton from "@/components/user-button";

const Header = () => {
  return (
    <Fragment>
      <div className="border-b p-4">
        <nav className="flex items-center justify-between">
          <span className="text-lg font-bold">TMA</span>
          <UserButton />
        </nav>
      </div>
      <header className="space-y-4 p-4">
        <h1 className="text-center text-4xl font-bold text-primary">
          Manage Your Tasks
        </h1>
        <p className="text-balance text-center text-sm font-semibold text-muted-foreground">
          Let your ideas flow smoothly
        </p>
        <WavesSVG />
      </header>
    </Fragment>
  );
};

export default Header;
