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
    
  } catch (error) {
    
  }
}

const ImageUpload = () => {
  return (
    <div>FileUpload</div>
  )
}

export default ImageUpload