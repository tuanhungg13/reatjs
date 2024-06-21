import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'
import TaskList from './components/example/exam';
import MilkTeaShop from './components/milkTeaShop/milkTeaShop';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <TaskList /> */}
        <Route path='/' element={<MilkTeaShop />} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
