import { useParams , useNavigate } from "react-router-dom";
import {useState} from 'react';
import FormTitle from "../../components/FormTitle/formTitle";
import Alert from "../../components/alert/alert.component";


const DeletePopup = ({onCancel , onDelete}) => {
  const { deleteId } = useParams();
  console.log('delete Id' , deleteId);


  const [success , setSuccess] = useState(false);
  const [isSent , setIsSent] = useState(false);


  const navigate = useNavigate();



  const handleCancel = () => {
      onCancel(false);
      navigate("/");
  }


  

  const handleDelete = (e) => {
    e.preventDefault();
    setIsSent(true);
 
    fetch(`http://localhost:4000/donor/delete/${deleteId}` , {
        method:'DELETE',
        // body:JSON.stringify({
        //     name:details.name,
        //     phone:details.phone,
        //     bloodGroup:details.bloodGroup,
        //     age:parseInt(details.age)
        // }),
        headers:{
            "Content-Type":"application/json"
        },
    }).
    then(res => res.json()).
    then( res => {
      if (res.success){
        console.log("SUCCESS");
        setSuccess(res.success);
        setTimeout(() => {
           navigate('/');
           onCancel(false);
        } , 2000);
      }
      else{
        console.log("FAILURE");
        setSuccess(res.success);

      }
    }).
    catch(err => console.log("ERR : Could not delete data ::: " , err.message));

}




  return (
    <>
      <div className="border border-secondary w-[fit-content] min-h-[252px] h-[fit-content] rounded-lg mx-auto bg-white pb-5">
        {/* div 1 : FORM TITLE*/}
        <FormTitle title="Delete Donor?" />

        {/* div 2 : CONTENT BODY */}
        <div className="flex flex-col gap-y-6 pt-3 px-5 pb-8 text-base">
          <p>
           Are you sure you want to delete this Blood Donar?
          </p>
          <p>This action is irreversible.</p>
          {/*  <div className="flex gap-x-2 items-center">
              <input
                type="checkbox"
                className="w-5 h-5 border-2 border-secondary"
              />
              <label>Don't Ask again</label>
            </div> */}
        </div>

        {/*  DIV 3 : BUTTONS DIV */}
        <div className="w-[520px] h-[84px] p-5 flex justify-end">
          <div className="flex gap-x-4">
            {/* Button comp : cancel button*/}
            <button 
              onClick={handleCancel}
              className='bg-default rounded-lg px-5 font-semibold w-full border-2'

            >
              Cancel
            </button>
         
            
            {/* Button comp : Add more questions div */}
            <button 
              onClick={handleDelete}
              className='bg-red-800 rounded-lg px-5 font-semibold text-white w-[fit-content] hover:bg-red-700 hover:border-sky-600 hover:transition hover:ease-in-out hover:duration-400'

            >
              Delete
            </button>
          </div>
        </div>


        {success ? 
        (<Alert title="SUCCESS" description="User deleted successfully."  alert_type="successLight" />)
        :
        isSent && (<Alert title="ERROR" description="Could not delete user." alert_type="errorLight" />)
        }
        
      </div>
    </>
  );
};

export default DeletePopup;
