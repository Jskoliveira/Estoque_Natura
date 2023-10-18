import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import App from './pages/CadastroProduto';
import Estoque from './pages/CadastroEstoque';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path:"/",
    element: <Home/>
  },
  {
    path:"cadastro_produto",
    element: <App/>
  },
  {
    path:"cadastro_estoque",
    element: <Estoque/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>   
  </React.StrictMode>
);
