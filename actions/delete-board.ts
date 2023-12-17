"use server"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteBoard(id:string){
 await db.board.delete({
  where:{
   id
  }
 })

 revalidatePath("/organization/org_2Z4W7cN6AODnjZ5hFYNN5ZH5tQe");

}