import UserButton from "@/components/user-button";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between">
      <span className="text-lg font-bold">TMA</span>
      <UserButton />
    </nav>
  );
};

export default Navbar;
