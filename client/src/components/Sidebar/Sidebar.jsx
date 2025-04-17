import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DrawIcon from '@mui/icons-material/Draw';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Grid, Typography } from '@mui/material';

import { getUserBalance } from '../../redux/features/cart-slice';
import { Hover, StyledLink, StyledSidebar } from './Sidebar.style';

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.cart.balance);

  useEffect(() => {
    dispatch(getUserBalance());
  }, []);

  return (
    <StyledSidebar>
      <Grid
        container
        direction="column"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item display="flex" alignItems="center">
          <img src="https://i.ibb.co/0Kx2y4Q/logo-white.png" width={250} />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        direction="column"
        display="flex"
        justifyContent="center"
        alignItems="start"
      >
        <Hover onClick={() => navigate('/bookstore')}>
          <Grid item>
            <StyledLink href="#" underline="none">
              <LocalGroceryStoreIcon />
              <Typography sx={{ marginLeft: '10px', marginTop: '1px' }}>
                Mağaza
              </Typography>
            </StyledLink>
          </Grid>
        </Hover>
        <Hover>
          <Grid item>
            <StyledLink href="#" underline="none">
              <MenuBookIcon />
              <Typography sx={{ marginLeft: '10px', marginTop: '1px' }}>
                Okuma Listem
              </Typography>
            </StyledLink>
          </Grid>
        </Hover>
        <Hover>
          <Grid item>
            <StyledLink href="#" underline="none">
              <FavoriteIcon />
              <Typography sx={{ marginLeft: '10px', marginTop: '1px' }}>
                Favorilerim
              </Typography>
            </StyledLink>
          </Grid>
        </Hover>
        <Hover>
          <Grid item>
            <StyledLink href="#" underline="none">
              <DrawIcon />
              <Typography sx={{ marginLeft: '10px', marginTop: '1px' }}>
                Yazarlar
              </Typography>
            </StyledLink>
          </Grid>
        </Hover>
        <Hover>
          <Grid item>
            <StyledLink href="#" underline="none" style={{ color: '#fff' }}>
              <AccountBalanceWalletIcon />
              <Typography sx={{ marginLeft: '10px', marginTop: '1px' }}>
                Cüzdan: {balance.toString().slice(0, 5)} TL
              </Typography>
            </StyledLink>
          </Grid>
        </Hover>
      </Grid>

      <Grid
        container
        spacing={2}
        direction="column"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item />
      </Grid>
    </StyledSidebar>
  );
}

export default Sidebar;
