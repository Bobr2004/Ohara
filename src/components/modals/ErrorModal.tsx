import { useNavigate } from "react-router";
import { Button } from "../Buttons";
import { ModalLayout } from "./ModalProvider";

function ErrorModal({ text }: { text: string }) {
   const navigate = useNavigate();
   return (
      <ModalLayout title="Error">
         <p className="text-rose-500 text-center">{text}</p>
         <div className="flex justify-center gap-4 px-4">
            <Button onClick={()=>navigate(-1)} text="Got it!" className="px-5 justify-center border-rose-800 bg-rose-500 hover:bg-rose-600"/>
         </div>
      </ModalLayout>
   );
}

export { ErrorModal };
