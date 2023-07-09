import React, { useState } from 'react';
import { SectionIdEnum } from 'types';
import { Close, Menu } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Hidden,
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  Slide,
} from '@mui/material';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { TransitionProps } from '@mui/material/transitions';

export type NavigationProps = {
  isSmall: boolean;
};

const navigationItems = [
  {
    text: 'About',
    to: SectionIdEnum.about,
  },
  {
    text: 'Skills',
    to: SectionIdEnum.skills,
  },
  {
    text: 'Projects',
    to: SectionIdEnum.projects,
  },
  {
    text: 'Contact',
    to: SectionIdEnum.contact,
  },
];

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) => {
    return <Slide direction="left" ref={ref} {...props} />;
  },
);

export const Navigation: React.FC<NavigationProps> = ({ isSmall }) => {
  const [open, setOpen] = useState(false);

  const onOpenHandler = () => setOpen(true);
  const onCloseHandler = () => setOpen(false);

  const mappedItems = navigationItems.map(({ to, text }) => {
    return (
      <AnchorLink key={to} href={`#${to}`} offset={isSmall ? '56px' : '64px'} className='all_unset'>
        <Button color="inherit" size="large" fullWidth={isSmall} onClick={onCloseHandler}>
          {text}
        </Button>
      </AnchorLink>
    );
  });

  return (
    <>
      <Hidden smDown>
        <Box display='flex' gap={2}>
          {mappedItems}
        </Box>
      </Hidden>
      <Hidden smUp>
        <IconButton color="inherit" onClick={onOpenHandler}>
          <Menu />
        </IconButton>
        <Dialog
          open={open}
          fullScreen
          fullWidth
          TransitionComponent={Transition}
          hideBackdrop
          PaperProps={{
            sx: {
              boxShadow: 'none',
            },
          }}
        >
          <AppBar
            position="static"
            sx={{
              background: 'white',
              color: 'text.primary',
            }}
          >
            <Toolbar>
              <Typography variant="h5" sx={{ flexGrow: 1 }}>
                Menu
              </Typography>
              <IconButton color="inherit" onClick={onCloseHandler}>
                <Close />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box display="flex" flexDirection="column" py={3} px={2} width="100%">
            {mappedItems}
          </Box>
        </Dialog>
      </Hidden>
    </>
  );
};
