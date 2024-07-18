import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, description } = await request.json();
  await connectMongoDB();
  await Topic.create({ name, description });
  return NextResponse.json(
    { message: "Product created successfully" },
    { status: 201 }
  );
}
