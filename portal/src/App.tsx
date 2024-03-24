import { RouterProvider } from 'react-router-dom';
import { Routers } from './routers/Routers';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const routers = Routers;
  return (
    <div>
      <RouterProvider router={routers} />
      <Toaster/>
    </div>
  )
}

export default App