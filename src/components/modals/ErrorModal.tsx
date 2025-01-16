import { useNavigate } from "react-router";
import { Button } from "../Buttons";
import { ModalLayout } from "../../entry/ModalProvider";

function ErrorModal({ text }: { text: string }) {
   const navigate = useNavigate();
   return (
      <ModalLayout title="Error">
         <p className="text-center">{text}</p>
         <div className="flex justify-center">
            <Button onClick={() => navigate(-1)}>Okay</Button>
         </div>
      </ModalLayout>
   );
}

export { ErrorModal };
