'use server';
import supabase from '@/lib/utils/supabase';
import { S3Client, PutObjectCommand} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';

// random 32 byte string for filename
const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex")

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const acceptedTypes = ["image/jpeg", "image/png"]

const maxFileSize = 1024 * 1024 * 3 // 3MB

export async function getSignedURL(fileType: string, size: number, checksum: string) {
  if (!acceptedTypes.includes(fileType)) {
    return {failure: 'Inavalid file type. JPEG or PNG accepted.'}
  }

  if (size > maxFileSize) {
    return {failure: 'File too large - 3 MB maximum'}
  }
  
  const keyName = generateFileName()

  const putObjCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: keyName,
    ContentType: fileType,
    ContentLength: size,
    ChecksumSHA256: checksum
  }) 

  const signedURL = await getSignedUrl(s3Client, putObjCommand)
  return {success: {url: signedURL, fileName: keyName}}
}

export async function getVideoTitles(query: string) {
  const { data, error } = await supabase.from('videos').select('id, title').filter('title', 'ilike', `%${query}%`).limit(5)
  console.log(data);
  return data
}
