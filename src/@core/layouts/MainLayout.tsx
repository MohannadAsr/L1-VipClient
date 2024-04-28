import { ReactNode } from 'react';
import DashNavBar from '../components/DashNavBar';
import store, { RootState } from '@src/store/store';
import { useSelector } from 'react-redux';

function MainLayout({ children }: { children: ReactNode }) {
  const mode = useSelector((state: RootState) => state.App.mode);
  return (
    <>
      <div className=" min-h-[100vh] flex flex-col overflow-hidden">
        <DashNavBar />
        <div
          className=" flex-1  grad "
          style={{
            background:
              'linear-gradient(45deg, rgb(88 0 93 / 52%), rgb(191 221 0 / 20%))',
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}

export default MainLayout;
