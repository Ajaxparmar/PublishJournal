// lib/s3client.ts
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

/**
 * Saves the uploaded file (PDF) to a local folder and returns the file key and public URL.
 * 
 * @param file - The File object from formData (usually from <input type="file">)
 * @param folder - Subfolder inside public/uploads (default: "papers")
 * @returns Promise<{ key: string; url: string }> - relative path and public URL
 */
export async function uploadFileToS3(
  file: File,
  folder: string = "papers"
): Promise<{ key: string; url: string }> {
  // Define base upload directory (inside public/ so it's statically served by Next.js)
  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);

  // Ensure the directory exists
  await fs.mkdir(uploadDir, { recursive: true });

  // Get original extension (fallback to .pdf)
  const fileExt = path.extname(file.name) || ".pdf";
  const fileName = `${uuidv4()}${fileExt}`;
  const fileKey = `${folder}/${fileName}`;           // relative path: papers/xxx-uuid.pdf
  const filePath = path.join(uploadDir, fileName);   // full filesystem path

  // Convert File → Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Write file to disk
  await fs.writeFile(filePath, buffer);

  // Public URL that Next.js serves statically
  // Example: http://localhost:3000/uploads/papers/xxx-uuid.pdf
  //         https://yourdomain.com/uploads/papers/xxx-uuid.pdf
  const publicUrl = `/uploads/${fileKey}`;

  return {
    key: fileKey,   // e.g. "papers/abc123-4567.pdf"
    url: publicUrl, // e.g. "/uploads/papers/abc123-4567.pdf"
  };
}

// Optional: Keep this if you still need dataURL upload for images later
export async function uploadDataUrlImage(
  dataUrl: string,
  folder: string = "images"
): Promise<{ key: string; url: string }> {
  // Extract base64 part
  const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid data URL");
  }

  const imageBuffer = Buffer.from(matches[2], "base64");
  const contentType = matches[1];
  const ext = contentType.split("/")[1] || "png";

  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
  await fs.mkdir(uploadDir, { recursive: true });

  const fileName = `${uuidv4()}.${ext}`;
  const fileKey = `${folder}/${fileName}`;
  const filePath = path.join(uploadDir, fileName);

  await fs.writeFile(filePath, imageBuffer);

  const publicUrl = `/uploads/${fileKey}`;

  return { key: fileKey, url: publicUrl };
}