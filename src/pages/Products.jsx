import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";
import { useState } from "react";
import usefetch from "../Hooks/usefetch";
import Select from "../components/Select";
export default function Produts() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState([]);
  const [fromdata ,setfromdata] =useState ({
    productname:"",
    price:"",
    currency:"",
    description :"" ,
  })
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const add = () => {
    const newtodo = {
      text: input,
    };
    setTodo([newtodo, ...todo]);
    setInput("");
  };
  const { data, loading, error } = usefetch("/api/currency");
  console.log(data);
  if (loading) return "loading";
  if (error) return error;
  const currencyOptions =
    data?.map((item) => ({
      value: item.code,
      label: `${item.code} `,
    })) || [];
  return (
    <>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-4xl font-semibold">Products</h1>
        <div className="flex gap-6">
          <div>
            <Button onClick={() => setIsOpen(true)} variant="product">
              create product
            </Button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center mt-1 mb-3">
                  <p className="text-[22px] font-normal">Create Product</p>

                  <Button
                    variant="modal"
                    onClick={() => setIsOpen(false)}
                    className="w-auto"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Button>
                </div>
                <div className="flex gap-6">
                  <Input width="xxlg" label="Name of the product or service" />

                  <Input
                    width="sm"
                    placeholder="Unit price"
                    label="Price"
                    onChange={handleChange}
                  />
                  <Select
                   
                    width="sm"
                    value={selectedCurrency}
                    onChange={setSelectedCurrency} 
                    options={currencyOptions} 
                  />
                </div>

                <div className="flex gap-5 ">
                  <Input
                    placeholder="None"
                    size="xxlg"
                    width="xxlg"
                    label="Description"
                  />
                  <Input
                    placeholder="None"
                    size="md"
                    width="md"
                    label="Your product number"
                  />
                </div>

                <div className="flex gap-5 ">
                  <Input
                    placeholder="None"
                    size="xxlg"
                    width="xxlg"
                    label="Revenue category"
                  />
                  <Input
                    placeholder="None"
                    size="md"
                    width="md"
                    label="Your product number"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-6 border-top">
                  <Button variant="product">Save</Button>
                </div>
              </div>
            </Modal>
          </div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
        </div>
      </div>
    </>
  );
}
