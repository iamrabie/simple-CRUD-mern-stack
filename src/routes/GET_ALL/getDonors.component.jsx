import {useState , useEffect} from 'react';
import SearchField from '../../components/searchField/searchFIeld.component';
import Button from '../../components/button/button.component';
import { Outlet  , Link  , useNavigate} from 'react-router-dom';
import Modal from 'react-modal';
import DeletePopup from '../DELETE/delete.component';
import DeleteIcon from '../../assets/deleteIcon.svg';
import EditIcon from '../../assets/editIcon.svg';



const Donors = () => {

  const [donorData , setDonorData] = useState([]);
  // console.log("DATA :" , donorData);


  const [modalIsOpen , setModalIsOpen] = useState(false);
  const [search , setSearch] = useState('');
  console.log("search :" . search);

  let id;
  const navigate = useNavigate();

  useEffect(() => {
    
    fetch('http://localhost:4000/donors').
    then(res => res.json()).
    then(data => setDonorData(data.message)).
    catch(err => console.log('error :' , err.message));


  } , []);


  let tableHead = [
    "Name",
    // "Father's Name",
    "Phone",
    "Age",
    "Blood Group",
    "Actions"
    // "City",
    // "Status",
    // "Attachment",
    // "",
  ];


  
  const customStyles = {
    overlay: {
      background: "rgb(0, 0, 0, 0.4)",
    },
    content: {
      width: "fit-content",
      height:'fit-content',
      marginLeft: "auto",
      marginRight: "auto",
      background: "transparent",
      border: "none",
      padding: "0px",
    },
  };


    const handleDeleteModal = (e) => {
      // e.preventDefault();
      setModalIsOpen(true);
    }


    const handleCancel = () => {
      setModalIsOpen(false);
    }


    const handleUserSearch = (value) => {
      console.log("val :" , value);
      setSearch(value);
    }

    return(
        <>
        <div className="flex flex-col gap-y-4 py-10 px-3">
        <h2 className="text-3xl font-bold">Blood Donors</h2>

        {/*  section 1 : SEARCH FIELD , FILTER AND BUTTON */}
        <div className="flex justify-between">
          {/* search field comp */}
          <SearchField onSearch={handleUserSearch} />
          {/* filter and add assessment button */}
          <div className="flex gap-x-4">
          {/*   <img
              src={FilterIcon}  onClick={() => { setFilter(!filter) }}
            /> */}
           <Link to="Add">
              <Button
                button_type="primary"
                button_size="medium"
                text="Add Donor"
                icon="left"
                // src={PlusBig}
              />
            </Link> 
          </div>
        </div>
        <table
          className="border border-secondary w-full bg-white"
        >
          <thead className="border-b border-secondary">
            <tr className="text-left bg-snowWhite">
                  {tableHead.map((headings, i) => {
                    return (
                      <>
                        <td
                          className="py-3 px-2 text-base text-textPrimary font-semibold"
                          key={i}
                        >
                          <div className="flex gap-x-2">
                            <p> {headings}</p>
                            {/* {headings != "" ? ( <img src={ArrowDown} />) : ("")} */}
                          </div>
                        </td>
                      </>
                    );
                  })}
             </tr>
          </thead>
          <tbody className="text-slate-700">
            {donorData.map((item, i) => (
                <tr
                  key={item._id}
                  className="text-sm text-textPrimary font-normal"
                  style={{
                    backgroundColor: i % 2 == 0 ? "transparent" : "#F3F4F6",
                  }}
                >
                  <td className="p-1">
                    {/* <Link to={`/studentProfile/${item.id}`} className="student-link"> */}
                      <span className="link-text" /* onClick={handleStudentInfo} */>
                        {item.name}
                      </span>
                    {/* </Link> */}
                  </td>
                  <td className="py-2">{item.phone}</td>
                  <td className="py-2">{item.age}</td>
                  <td className="py-2">{item.bloodGroup}</td>
                  <td className="flex gap-x-3 py-2">
                    {/* <Link to={`Delete/${item._id}`} onClick={handleDeleteModal}> */}
                      <button onClick={() => {handleDeleteModal(item?._id); navigate(`Delete/${item._id}`)}}>
                        <img src={DeleteIcon} alt="delete" />
                      </button> 
                    {/* </Link> */}
                     <Link to={`Update/${item._id}`}>
                      <button>
                        <img src={EditIcon} alt="edit" />
                      </button>
                    </Link>
                   {/*  <Link to={`editStudent/${item.id}`}>
                      <img
                        src={EditIcon}
                        onClick={handleEditStudentForm}
                        alt="Edit Icon"
                        className="p-2"
                      />
                    </Link>
                    <Link to={`deleteStudent/${item.id}`}>
                      <img
                        src={TrashIcon}
                        onClick={() => setDisplayDeleteStudentPopup(true)}
                        alt="Trash Icon"
                        className="p-2"
                      />
                    </Link> */}
                  </td>
                </tr>
            )
            )}
          </tbody>
        </table>

        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          // onRequestClose={handleCloseModal}
        >
          <DeletePopup  onCancel={handleCancel}/>
        </Modal>
        <Outlet />
        
        </div>
        </>
    );
}


export default Donors;