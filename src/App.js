import Donors from './routes/GET_ALL/getDonors.component';
import AddDonor from './routes/POST/addDonor.component';
import UpdateDonor from './routes/UPDATE/update.component';
import DeletePopup from './routes/DELETE/delete.component';
import {  Routes , Route } from 'react-router-dom';
import './App.css';



function App() {


  return (
   <>
   <Routes>
     <Route path='/' element={<Donors />} />
     <Route path='Add' element={<AddDonor />} />
     <Route path='Update/:id' element={<UpdateDonor />} />
     <Route path='Delete/:deleteId' element={<Donors />} />
   

  {/*    nested routing/relative routing */}
     {/* <Route path='/' element={<Donors />}>
       <Route path='addDonor' element={<AddDonor />} />
       <Route path='updateDonor' element={<UpdateDonor />} />
     </Route> */}
   </Routes>
   </>
  );
}

export default App;
