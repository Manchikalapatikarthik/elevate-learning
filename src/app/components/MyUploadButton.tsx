"use client";

import {
  UploadDropzone,
} from "@uploadthing/react";

import type {
  OurFileRouter,
} from "@/app/api/uploadthing/core";

export default function MyUploadButton({
  setFileData,
}: {
  setFileData: (
    data: {
      fileUrl: string;
      fileKey: string;
    }
  ) => void;
}) {

  return (

    <UploadDropzone<
      OurFileRouter,
      "noteUploader"
    >

      endpoint="noteUploader"

      appearance={{

        container:
          "border border-zinc-700 bg-black rounded-2xl p-8",

        label:
          "text-white text-lg",

        allowedContent:
          "text-gray-400",

        button:
          "bg-white text-black font-bold px-6 py-3 rounded-xl",

      }}

      content={{

        label() {

          return "Click here to upload notes";

        },

        allowedContent() {

          return "PDF and Images";

        },

      }}

      onClientUploadComplete={(res) => {

        if (res && res[0]) {

          setFileData({

            fileUrl:
              res[0].ufsUrl,

            fileKey:
              res[0].key,

          });

          alert(
            "Upload Completed Successfully"
          );

        }

      }}

      onUploadError={(error: Error) => {

        alert(error.message);

      }}

    />

  );

}