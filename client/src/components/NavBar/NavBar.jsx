import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { alpha, makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchBar from '../SearchBar/searchBar';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import './NavBar.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);


  const handleMenu = () => { 
    setMenuOpen(true);
  }

  const handleClose = () => { 
    setMenuOpen(false);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon onClick={handleMenu} 
            />
            {/* this will need to change depending on the login status */}
            <Menu 
              id= "menu-navbar" 
              open={menuOpen} 
              anchorOrigin={{
                verical: 'top',
                horizontal: 'left',
              }}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}><Link className="links" to="/register">Register</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link className="links" to="/login">Login</Link></MenuItem>
            </Menu>
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Beard Care
          </Typography>
          <div>
            <div>
              <IconButton className='cart-icon' aria-label='shopping-cart'><Link className="links shopping-cart" to="/cart"><ShoppingCartIcon/></Link></IconButton>
            </div>
          </div>
          <div className={classes.search}>
            <div >
              <SearchBar searchProducts={props.searchProducts}/>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

