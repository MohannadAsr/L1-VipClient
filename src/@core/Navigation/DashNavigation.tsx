import Home from '@src/pages';
import Error404 from '@src/pages/404';
import Signin from '@src/pages/Signin';
import React, { ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppLoading } from '../components/AppLoading';
import { MUIIconName } from '../components/MuiIcon';
import DashLayout from '../layouts/DashLayout';

export class DashNaviagtionProps {
  name: string = '';
  path: string = '';
  component: ReactNode;
  children?: DashNaviagtionProps[] | null = null;
  icon: MUIIconName | null = null;
  rules?: string[] | null = null;
  layout?: 'blank' | 'standard' = 'standard';
}

export class DashTitleProps {
  title: string = '';
}

// export const NavigationRoutes: (DashNaviagtionProps | DashTitleProps)[] = [
//   {
//     name: 'event-Invite',
//     path: '/eventaccess/:id',
//     icon: null,
//     layout: 'blank',
//   },
// ];

function DashNavigation() {
  return (
    <div>
      <Routes>
        <Route
          path="/:id"
          element={
            <DashLayout>
              <Home />
            </DashLayout>
          }
        />
        {/* {NavigationRoutes.map((item, index) => {
          if ('path' in item)
            return (
              <Route
                key={item.path}
                element={
                  <DashLayout type={item.layout}>{item.component}</DashLayout>
                }
                path={item.path}
              />
            );
        })} */}
        <Route
          path="*"
          element={
            <DashLayout type="blank">
              <Error404 />
            </DashLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default DashNavigation;
