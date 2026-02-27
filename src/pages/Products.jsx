import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";
import { useState } from "react";
export default function  Produts(){

const [isOpen, setIsOpen] = useState(false);
    return(
        <>
      <div className="flex justify-between items-center p-4">

      <h1 className="text-4xl font-bold">
        Products
      </h1>
      <div className="flex gap-6">
        <div>
            <Button
              onClick={() => setIsOpen(true)}
             variant="product"
             >create product</Button>
               <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Reusable Modal</h2>
        <Button
        variant="modal"
          onClick={() => setIsOpen(false)}
         
        >
          Close
        </Button>

        <Input/>
      </Modal>
        </div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
      </div>

    </div>
        </>
    )
}