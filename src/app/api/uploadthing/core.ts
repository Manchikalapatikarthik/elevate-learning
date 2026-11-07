
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { adminAuth } from "../../../lib/firebaseAdmin";
import { ADMIN_UID } from "../../../lib/admin";

const f = createUploadthing();

async function verifyArticleAdmin(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const sessionCookie = cookie
      .split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith("__session="))
      ?.slice("__session=".length);

    if (!sessionCookie) {
      throw new Error("Missing session");
    }

    const decoded = await adminAuth.verifySessionCookie(
      decodeURIComponent(sessionCookie),
      true
    );

    if (decoded.uid !== ADMIN_UID) {
      throw new Error("Not an administrator");
    }

    return decoded;
  } catch {
    throw new UploadThingError("Only authorized administrators can upload article images.");
  }
}

export const ourFileRouter = {
  // Existing student uploader — preserved
  noteUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
    pdf: {
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("Uploaded File URL:", file.ufsUrl);

    return {
      uploadedFileUrl: file.ufsUrl,
    };
  }),

  // New administrator-only article image uploader
  articleImageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const admin = await verifyArticleAdmin(req);

      return {
        uploadedBy: admin.uid,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Article image uploaded by:", metadata.uploadedBy);
      console.log("Article image URL:", file.ufsUrl);

      return {
        uploadedFileUrl: file.ufsUrl,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
