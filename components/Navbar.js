import Link from 'next/link';

const Navbar = () => (
	<nav className='navbar'>
		<Link href='/'>
			<a className='navbar-brand'>Names Databes</a>
		</Link>
	</nav>
);

export default Navbar;
