import {useState , useEffect} from 'react';
import Label from '../../components/label/label.component';
import FormTitle from '../../components/FormTitle/formTitle';
import Alert from '../../components/alert/alert.component';
import { useParams , Link , useNavigate } from 'react-router-dom';


const UpdateDonor = () => {
    const [details , setDetails] = useState({
        name:'',
        age:'',
        bloodGroup:'',
        phone:''
    });


    const [success , setSuccess] = useState(false);
    const [isSent , setIsSent] = useState(false);

    const {id} = useParams();
    const navigate = useNavigate();

    console.log('DETAILS :::' , details);
    
    // console.log("success ::::" , success);


    useEffect(() => {
         fetch(`http://localhost:4000/donor/${id}`).
         then(res => {
            return res.json();
         })
         .then(data => setDetails(data.message))
         .then(res => console.log(res)).catch(err => console.log(err.message));
         

    } , [])
    



    const handleName = (e) => {
        setDetails({
            ...details,
            name:e.target.value
        });
    }


    const handlePhoneNo = (e) => {
        setDetails({
          ...details,
          phone:e.target.value
        });
    }


    const handleBloodGroup = (e) => {
        setDetails({
            ...details,
            bloodGroup:e.target.value
        });
    }


    const handleAge = (e) => {
       setDetails({
        ...details,
        age:e.target.value
       });
    }



    const handleSubmit = (e) => {

        // console.log("UPDATE SUBMITTED <3" , id);
        e.preventDefault();
        setIsSent(true);

        fetch(`http://localhost:4000/donor/update/${id}` , {
            method:'PUT',
            body:JSON.stringify(details),
            headers:{
                "Content-Type":"application/json"
            },
        }).
        then(res => res.json()).
        then(res => {
            console.log("success from response :" , res.success , res.message);
            setSuccess(res.success);
            if (res.success){

                setTimeout(() => {
                    navigate('/');
                }, 2000);
              
                
            }

            // else{
            //     setSuccess(res.success);
            // }
        })
        // catch(err => console.log("ERR : could not update data ::: " , err));
    }


    return (
      <>
        <div className="mx-auto w-[fit-content] mt-[70px]">
          <FormTitle title="Update Donor" />
          <form onSubmit={handleSubmit} className="form-styles border">
            <div className="input-div-styles">
              <Label label="Name" />
              <input
                type="text"
                placeholder="Name"
                onChange={handleName}
                value={details.name}
                className="input-styles"
              />
              <br />
            </div>
            <div className="input-div-styles">
              <Label label="Phone" />
              <input
                type="text"
                placeholder="Phone"
                onChange={handlePhoneNo}
                value={details.phone}
                className="input-styles"
              />
              <br />
            </div>
            <div className="input-div-styles">
              <Label label="Blood Group" />
              <input
                type="text"
                placeholder="blood group"
                onChange={handleBloodGroup}
                value={details.bloodGroup}
                className="input-styles"
              />
              <br />
            </div>
            <div className="input-div-styles">
              <Label label="Age" />
              <input
                type="text"
                placeholder="Age"
                onChange={handleAge}
                value={details.age}
                className="input-styles"
              />
              <br />
            </div>

            {/* BUTTONS CONTAINER */}
            <div className="w-full h-[fit-content] mt-1 flex justify-end">
              <div className="flex gap-x-4">
                <Link to="/">
                  <button
                    className="bg-default rounded-lg py-3 px-5 font-semibold w-full border-2"
                    type="submit"
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  className="bg-sky-800 rounded-lg py-3 px-5 font-semibold text-white w-full hover:bg-sky-700 hover:border-sky-600 hover:transition hover:ease-in-out hover:duration-400"
                  type="submit"
                >
                  Edit
                </button>
              </div>
            </div>

            {isSent && success && (
              <Alert
                title="SUCCESS"
                description="User updated successfully."
                alert_type="successLight"
              />
            )}
            {isSent &&
              details.name &&
              details.phone &&
              details.age &&
              details.bloodGroup &&
              !success && (
                <Alert
                  title="ERROR"
                  description="Could not send data."
                  alert_type="errorLight"
                />
              )}
            {isSent &&
              !success &&
              (!details.name ||
                !details.phone ||
                !details.bloodGroup ||
                !details.age) && (
                <Alert
                  title="ERROR"
                  description="Please fill the required fields."
                  alert_type="errorLight"
                />
              )}
          </form>
        </div>
      </>
    );
}


export default UpdateDonor;