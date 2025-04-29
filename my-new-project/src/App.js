import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeExperience from './EmployeeExperience';
import AdminPanel from './AdminPanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeExperience />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;