import { useState } from "react";
import { ModalLayout } from "../../entry/ModalProvider";

function PdfInput() {
   const [file, setFile] = useState<File | null>(null);
   const fileSrc = file && URL.createObjectURL(file);

   return (
      <label>
         {fileSrc && (
            <>
               <embed
               className="p-0 m-0"
                  src={`${fileSrc}#toolbar=0&navpanes=0&scrollbar=0`}
                  width="100%"
                  height="300px"
                  type="application/pdf"
                  
               ></embed>
               <p></p>
            </>
         )}
         <input
            type="file"
            accept="application/pdf"
            onChange={({ target }) => {
               if (target.files) {
                  const file = target.files[0];
                  console.log(target.files[0]);
                  setFile(file);
               }
            }}
         />
      </label>
   );
}

function UploadPdfModal() {
   return (
      <ModalLayout title="Upload a Pdf Book">
         <PdfInput />
      </ModalLayout>
   );
}

export { UploadPdfModal };
