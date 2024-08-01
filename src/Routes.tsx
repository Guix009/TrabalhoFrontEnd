import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './Cliente';
import { Get } from './Pages/Produtos';
import { Post } from './Pages/CadastrarPro';

export function RouteApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/get' element={<Get />} />
        <Route path='/post' element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}
