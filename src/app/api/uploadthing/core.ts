import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {

  noteUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },

    pdf: {
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
  })

  .onUploadComplete(async ({ file }) => {

    console.log("Uploaded File URL:", file.url);

    return {
      uploadedFileUrl: file.url,
    };

  }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;