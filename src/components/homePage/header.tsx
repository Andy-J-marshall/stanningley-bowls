import { Image } from 'react-bootstrap';
import logoImg from '../../images/logos/brand-banner-logo.png';

function Header() {
    return (
        <div id="header">
            <Image
                style={{ height: '200px', width: 'auto' }}
                src={logoImg}
                fluid
            />
        </div>
    );
}

export default Header;
