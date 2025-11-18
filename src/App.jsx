import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './views/form/form';
import Panel from './views/panel/panel';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/panel" element={<Panel />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
