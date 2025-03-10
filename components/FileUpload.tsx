"use client";


// started at 1:41
import { IKImage, IKVideo, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from "@/lib/config";
import { useRef, useState } from "react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils";


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

const FileUpload = ({  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value}: Props) => {
  const ikUploadRef = useRef(null);
  const [progress, setProgress] = useState(0);
  
  const styles = { 
    button: variant === 'dark'? 'bg-dark-300' :'bg-light-600 border-gray-100 border',
    placeholder:variant=== 'dark' ? 'text-light-100' : 'text-slate-500',
    text: variant === 'dark' ? 'text-light-100' : 'text-dark-500'
  }
 const [file, setFile] = useState<{ filePath : string } | null>(null);
 const { toast } = useToast()


  const onError = (error: any) => {
    console.log(error)
    toast({
      title: `${type} upload failed`,
      description: `${error.message}`,
      variant: "destructive"
    })
  };

  const onSuccess = ( res:any) => {
    setFile(res)
    onFileChange(res.filePath);
    toast({
      title: `${type} Uploaded Successfully`,
      description: `*${res.filePath} uploaded successfully`,
    })
  };

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "Please upload a file that is less than 5  MB in size",
          variant: "destructive",
        });

        return false;
      }
    } else if (type === "video") {
      if (file.size > 30 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "Please upload a file that is less than 30MB in size",
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
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
        // fileName="test-upload.png"
        validateFile={onValidate}
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
      <button className={cn("upload-btn", styles.button)}
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
        <p className={cn("text-base", styles.placeholder)}> {placeholder}</p>

        {/* {file && <p className="upload-filename">{file.filePath}</p>} */}

        {file && <p className={cn('upload-filename', styles.text)}>{file.filePath}</p>} 
      </button>

      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}


      {file && (
        (type === 'image' ? (
          <IKImage
          alt={file.filePath}
          path={file.filePath} 
          width={500} height={300}
        />
        ): type === "video" ? (
          <IKVideo 
          path={file.filePath}
          controls={true}
          className="h-96 w-full rounded-xl"
          />
        ) : null)
        
      )}

      
    </ImageKitProvider>
  );
};

export default FileUpload;
