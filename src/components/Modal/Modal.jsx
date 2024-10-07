import Box from "@mui/material/Box";
import Logo from "../assets/ytlogo.png"
import Modal from "@mui/material/Modal";
import { auth, provider } from "../../Firebase";
import { signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '300',
  height:260,
  bgcolor: "black",
  color: "white",
  boxShadow: 24,
  p: 4,
  borderRadius:"20px"
};

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const [value , setValue] = useState([]);

    function handleClick(){
      signInWithPopup(auth,provider).then((data)=>{
     setValue(data.user.email)
     localStorage.setItem("email",data.user.email)
     toast.success("SignIn User Successfully")
      })
    }


  useEffect(() => {
    setValue(localStorage.getItem("email"));
  });

    useEffect(()=>{
       if(value){
          setOpen(false)
       }
       else{
          setOpen(true)
       }
    },[value])

  

  return (
    <div >
      <Modal
        open={open}
       
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="text-center flex text-2xl gap-10 mb-6 max-md:flex-col max-md:gap-2">
            <div className="flex justify-center items-center gap-2">
            <img className="max-md:w-[25px]" src={Logo} width={32} alt="Logo" />
                <h1 className="max-md:text-sm">YouTube</h1></div>
            
            <h1 className="max-md:text-sm">Welcome, User</h1>
          </div>
          <p className="text-center mb-2 max-md:text-sm">Please first SignIn with Google</p>
          
          <div className="flex justify-center items-center flex-col gap-5">
          <img className="max-md:w-[25px] max-md:hidden" src={Logo} width={32} alt="Logo" />

            <button
              onClick={handleClick}
              className=" bg-red-600 p-2 rounded-xl text-white hover:bg-white hover:border-0 hover:text-black max-md:text-sm"
            >
              Signup with Google
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
