import ImageKit from "imagekit";
import config from "@/lib/config";
import { NextResponse } from "next/server";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });

// const imagekit2 = new ImageKit({
//   publicKey: config.env.imagekit.publicKey
// })

export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}