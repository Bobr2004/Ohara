import { Button } from "../Buttons";
import { ModalLayout } from "./ModalProvider";

function ErrorModal({ text }: { text: string }) {
   return (
      <ModalLayout title="Error">
         <p>{text}</p>
         <div className="flex justify-center gap-4 px-4">
            <Button text="Got it!" />
         </div>
      </ModalLayout>
   );
}

export { ErrorModal };
