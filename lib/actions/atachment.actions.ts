"use server";
import { revalidatePath } from "next/cache";
import prisma from "../prisma";
export async function getFileData(formData:FormData)
{
    // const name = Formdata.get("fileName");
    // const email = Formdata.get("email");
    console.log(formData)
    // console.log("data received",{ name, email });
}
export async function test(data:FormData){
    console.log('test')
    return 0
}

export async function createAccount (formData: FormData) {
console.log("iam in form")
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log({ name, email, password });
  };
  
