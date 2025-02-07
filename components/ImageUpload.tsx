"use client";


// started at 1:41
import { IKImage, IKVideo, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from "@/lib/config";
import { useRef, useState } from "react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast"


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
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }
    const data = await response.json();
    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string;
}

const ImageUpload = ({  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value}: Props) => {
  const ikUploadRef = useRef(null);
  const [progress, setProgress] = useState(0);
  // const [file, setFile] = useState<{ filePath: string | null }>({
  //   filePath: value ?? null,
  // });
 const [file, setFile] = useState<{ filePath : string } | null>(null);
 const { toast } = useToast()



  const onError = (error: any) => {
    console.log(error)
    // console.log(publicKey)
    toast({
      title: "Image failed to upload",
      description: `Image upload failed`,
      variant: "destructive"
    })
  };

  const onSuccess = ( res:any) => {
    setFile(res)
    onFileChange(res.filePath);
    toast({
      title: "Image Uploaded Successfull",
      description: `*${res.filePath} uploaded successfully`,
    })
  };


  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        fileName="test-upload.png"
        // validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
        className="hidden"
      />

        {/* To trigger the upload */}
      <button className="upload-btn" 
        onClick={(e) => {
          e.preventDefault(); //stop browser from reloading
          if(ikUploadRef.current) {
            // It click the above component
            // @ts-ignore
            ikUploadRef.current?.click()
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100"> Upload a File </p>

        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>


      {file && (
         <IKImage
            alt={file.filePath}
            path={file.filePath} 
            width={500} height={300}
          />
      )}

      
    </ImageKitProvider>
  );
};

export default ImageUpload;
