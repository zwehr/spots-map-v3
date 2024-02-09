'use server';
import supabase from '@/lib/utils/supabase';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const acceptedTypes = ['image/jpeg', 'image/png'];

const maxFileSize = 1024 * 1024 * 10; // Max 10 MB

export async function getSignedURL(
  type: string,
  size: number,
  checksum: string,
  randName: string
) {
  // NOTE: Complete after auth is set up
  // https://www.youtube.com/watch?v=t-lhgq7Nfpc&t=85s&ab_channel=SamMeech-Ward
  if (true) {
    if (!acceptedTypes.includes(type)) {
      return { failure: 'Invalid file type' };
    }

    if (size > maxFileSize) {
      return { failure: 'File too large' };
    }

    const PutObjCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: randName,
      ContentType: type,
      ContentLength: size,
      ChecksumSHA256: checksum,
    });

    const signedUrl = await getSignedUrl(s3, PutObjCommand, {
      expiresIn: 3600,
    });

    return { success: { url: signedUrl, name: randName } };
    // unreachable by design... for the moment
  } else return { failure: 'Not authenticated' };
}

export async function getVideoTitles(query: string) {
  const { data, error } = await supabase.from('videos').select('id, title').filter('title', 'ilike', `%${query}%`).limit(5)
  console.log(data);
  return data
}