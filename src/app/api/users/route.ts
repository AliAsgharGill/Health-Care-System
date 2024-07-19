import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const { full_name, email, phone_number } = await request.json();
  await connectMongoDB();
  await Topic.create({ full_name, email, phone_number });
  return NextResponse.json(
    { message: "Product created successfully" },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();
  const products = await Topic.find();
  return NextResponse.json({ products });
}
