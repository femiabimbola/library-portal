"use client";

import { IKImage, IKVideo, ImageKitProvider, IKUpload,} from "imagekitio-next";
import config from "@/lib/config";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`,);
    }
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`)
  }
}

const ImageUpload = () => {
  return (
    <div>FileUpload</div>
  )
}

export default ImageUpload