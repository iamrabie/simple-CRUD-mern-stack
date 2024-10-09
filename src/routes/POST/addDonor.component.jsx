import { useState } from "react";
import FormTitle from "../../components/FormTitle/formTitle";
import Label from "../../components/label/label.component";
import Alert from "../../components/alert/alert.component";
import {Link , useNavigate} from "react-router-dom"

const AddDonor = () => {


    const [details , setDetails] = useState({
        name:'',
        phone:'',
        bloodGroup:'',
        age:'',
    });

    // console.log('DETAILS :::' , details);

    const [success , setSuccess] = useState(false);
    const [isSent , setIsSent] = useState(false);


    const navigate = useNavigate();

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

        e.preventDefault();

        // console.log('DETAILS :::' , details);
        setIsSent(true);

        fetch('http://localhost:4000/donors/submit' , {
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:details.name,
                phone:details.phone,
                bloodGroup:details.bloodGroup,
                age:parseInt(details.age)
            }),
        })
        .then(res => res.json())
        .then(res => {
                console.log("data submitted successfully ::::::" , res.success);
                setSuccess(res.success);
               
                if (res.success){
                    setDetails({
                        name:'',
                        phone:'',
                        bloodGroup:'',
                        age:'',
                    });

                 setTimeout(() => {
                    navigate("/");
                 } , 2000);
             
                }
        })
        .catch(err => console.log("ERR : could not post data ::: " , err.message));

    }




    return(
        <>
        <div className="mx-auto w-[fit-content] mt-[70px]">
        <FormTitle title="Add Donor" />
        <form onSubmit={handleSubmit}  className="form-styles border">
            <div className="input-div-styles">
              <Label label="Name" />
              <input type="text" placeholder="Name" value={details.name} onChange={handleName} className="input-styles" /><br/>
            </div>
            <div className="input-div-styles">
              <Label label="Phone" />
              <input type="text" placeholder="Phone" value={details.phone} onChange={handlePhoneNo} className="input-styles"/><br />
            </div>
            <div className="input-div-styles">
              <Label label="Blood Group" />
              <input type="text" placeholder="blood group" value={details.bloodGroup} onChange={handleBloodGroup} className="input-styles"/><br />
            </div>
            <div className="input-div-styles">
             <Label label="Age" />
             <input type="text" placeholder="Age" value={details.age} onChange={handleAge} className="input-styles" /><br/>
            </div>


            {/* BUTTONS CONTAINER */}
            <div className="w-full h-[fit-content] mt-1 flex justify-end">
              <div className="flex gap-x-4">
                <Link to="/">
                <button
                  className='bg-default rounded-lg py-3 px-5 font-semibold w-full border-2'
                  type="submit">
                    Cancel
                </button>
                </Link>

                <button 
                   className='border border-sky-800 bg-sky-800 rounded-lg py-3 px-5 font-semibold text-white hover:bg-sky-700 hover:border-sky-600 hover:transition hover:ease-in-out hover:duration-400'
                   type="submit"
                >
                    Add
                </button>
              </div>
            </div>

            {(isSent && success) &&
             <Alert title="SUCCESS" description="Data submitted successfully." alert_type="successLight"/>
            }
            {(isSent && (details.name && details.phone && details.age && details.bloodGroup) && !success) && 
              <Alert title="ERROR" description="Could not send data." alert_type="errorLight" />
            }
            {(isSent && !success && (!details.name || !details.phone || !details.bloodGroup || !details.age)) &&  
            <Alert title="ERROR" description="Please fill the required fields." alert_type="errorLight" />
            }


        </form>
        </div>
        </>
    );
} 


export default AddDonor;