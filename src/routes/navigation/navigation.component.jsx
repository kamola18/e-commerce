import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as CrownLogo} from '../../assets/crown.svg';
import './navigation.styles.scss'
import { UserContext } from '../../contexts/user.content';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);

   
   return <Fragment>
        <div className="navigation">
            <Link className='logo-container' to='/'>
                <CrownLogo className='Logo'/>
            </Link>
            <div className="nav-links-container">
            <Link className='nav-link' to='/shop'>Shop</Link>
             
               {currentUser ? (
                    <span className='nav-link' onClick={signOutUser}>SIGN OUT</span> )
                    :(
                    <Link className='nav-link' to='/auth'>Sign In</Link>
                )
                
              }
                <CartIcon/>
            </div> 
            {/* if both values true return last one */}
            {isCartOpen && <CartDropDown/> }          
        </div>
        <Outlet/>
    </Fragment>
}

export default Navigation;