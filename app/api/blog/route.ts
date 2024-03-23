import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function main(){
    try {
        await prisma.$connect()
    } catch (error) {
        return Error("Error connecting")
    }
}

export const GET = async(req:Request, res:NextResponse)=>{
    try {
        await main()
        const Posts = await prisma.post.findMany()
        return NextResponse.json({message:"Success", Posts}, {status: 200})
    } catch (error) {
        return NextResponse.json({message:error}, {status:500})
    }finally{
        await prisma.$disconnect()
    }
}

export const POST = async(req:Request, res:NextResponse)=>{
    try {
        const {title, description} = await req.json()
        await main()
        const post = await prisma.post.create({
            data:{
                title,
                description,
            }
        })

        return NextResponse.json({message:"Success", post}, {status: 200})
    } catch (error) {
        return NextResponse.json({message:error}, {status:500})
    }finally{
        await prisma.$disconnect()
    }
}