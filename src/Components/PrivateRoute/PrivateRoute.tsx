import React, { FC } from 'react';
import { RouteProps, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContextProvider';
import { Box, CircularProgress } from '@mui/material';

type Props = {
  children?: React.ReactNode;
} & RouteProps;

export const PrivateRoute: FC<Props> = ({ children, ...rest }) => {
  const { isAuthenticate } = useAuth();
  const location = useLocation();

  if (isAuthenticate === null) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticate) {
    return <Navigate to="/login" state={location.pathname} />;
  }

  return <React.Fragment {...rest}>{children}</React.Fragment>;
};
