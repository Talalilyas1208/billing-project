import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
export default function EmptyInvoicePage(){


    const navigate = useNavigate
 const handleclick = () =>{
navigate("/")


}


    return(
      <>
      

      <Button onClick={handleclick}>create product  </Button>
      
      </>
    )
}