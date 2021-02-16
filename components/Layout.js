import Head from 'next/head';
import Navbar from './Navbar';
import styles from '../css/footer.module.css';
import { FaLinkedinIn } from 'react-icons/fa';
import { FiGithub } from 'react-icons/fi';
const Layout = ({ children }) => (
    <>
        <Head>
            <title>Names App</title>
        </Head>
        <Navbar />
        {children}

        <footer className={styles.footer}>
				<div className={styles.footerInfo}>
					<div className={styles.websiteRights}>
						Kiril Mankovskyi &copy; {new Date().getFullYear()} All rights reserved.
					</div>
					<div className={styles.socialIcons}>
						<a href='https://www.linkedin.com/in/kiril-mankovskyi/' target='_blank' aria-label='LinkedIn'>
							<FaLinkedinIn />
						</a>
						<a href='https://github.com/kirillman200' target='_blank' aria-label='GitHub'>
							<FiGithub />
						</a>
					</div>
				</div>
			</footer>
    </>
)

export default Layout;