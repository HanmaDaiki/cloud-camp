import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
 
import { UserProfile } from '../UserProfile';
import { Create } from '../Create';
import { Page404 } from '../Page404';

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path='/create' element={<Create />}/>
        <Route path='/' element={<UserProfile />} />
        <Route path='/*' element={<Page404 />} />
      </Routes>
      
    </>
  );
}

export { App };
