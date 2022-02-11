import { Link } from 'react-router-dom';

const Navbar = ({ title }) => {
    return (
        <nav className="navbar">
            <h2>{title}</h2>
            <div className="links">
                <Link to="/">홈</Link>
            </div>
        </nav>
    )
}

export default Navbar
