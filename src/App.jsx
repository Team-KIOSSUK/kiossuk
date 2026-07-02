import { Route, Routes } from 'react-router-dom';
import Start1 from './pages/Home/Start1';
import Start11 from './pages/Home/Start1_1';
import Home1 from './pages/Home/home1';
import Kiosk from './pages/Kiosk/kiosk_home';
import BrainTraining from './pages/Games/BrainTraining';
import Records from './pages/Profile/Records';
import Support from './pages/Support/Support';

import BankMain from "./pages/Kiosk/Bank/BankMain";
import Practice from "./pages/Kiosk/Bank/Practice";
import TransactionSelect from './pages/Kiosk/Bank/TransactionSelect';


import MarketGame from './pages/Games/Market/MarketGame';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Start1 />} />
      <Route path="/start1_1" element={<Start11 />} />
      <Route path="/home1" element={<Home1 />} />
      <Route path="/kiosk" element={<Kiosk />} />
      <Route path="/brain-training" element={<BrainTraining />} />
      <Route path="/records" element={<Records />} />
      <Route path="/support" element={<Support />} />



      <Route path="/game/market" element={<MarketGame />} />
  

      <Route path="/kiosk/bank" element={<BankMain />} />
      
      <Route path="/kiosk/bank/practice" element={<Practice />} />
      <Route path="/kiosk/bank/practice" element={<Practice />} />
      <Route path="/kiosk/bank/select" element={<TransactionSelect />} />
    </Routes>
  );
}


export default App;