import { Route, Routes } from 'react-router-dom';
import Start1 from './pages/Home/Start1';
import Start11 from './pages/Home/Start1_1';
import Home1 from './pages/Home/home1';
import Kiosk from './pages/Kiosk/kiosk_home';
import BrainTraining from './pages/Games/BrainTraining';
import ConditionalRps from './pages/Games/RPS/ConditionalRps';
import TrainPractice from './pages/Kiosk/Train/TrainPractice.jsx';
import TrainSelect from './pages/Kiosk/Train/TrainSelect.jsx';
import TrainSeatSelection from './pages/Kiosk/Train/TrainSeatSelection.jsx';
import TrainPayment from './pages/Kiosk/Train/TrainPayment.jsx';
import Records from './pages/Profile/Records';
import Support from './pages/Support/Support';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Start1 />} />
      <Route path="/start1_1" element={<Start11 />} />
      <Route path="/home1" element={<Home1 />} />
      <Route path="/kiosk" element={<Kiosk />} />
      <Route path="/brain-training" element={<BrainTraining />} />
      <Route path="/train-practice" element={<TrainPractice />} />
      <Route path="/train-select" element={<TrainSelect />} />
      <Route path="/train-seat" element={<TrainSeatSelection />} />
      <Route path="/train-payment" element={<TrainPayment />} />
      <Route path="/conditional-rps" element={<ConditionalRps />} />
      <Route path="/records" element={<Records />} />
      <Route path="/support" element={<Support />} />
    </Routes>
  );
}

export default App;