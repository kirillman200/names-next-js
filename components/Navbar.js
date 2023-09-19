import Link from "next/link";

const Navbar = () => (
  <nav className='navbar'>
    <Link href='/'>
      <span className='navbar-brand'>Names Databes</span>
    </Link>
  </nav>
);

export default Navbar;
