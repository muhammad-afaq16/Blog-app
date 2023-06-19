import Post from "@/models/Post";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  // fetch
  const url = new URL(request.url);

  const username = url.searchParams.get("username");
  try {
    await connect();

    const posts = await Post.find(username && { username });

    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return new NextResponse("DataBase Error", { status: 500 });
  }
};
export const POST = async (request) => {
  const body = await request.json();

  const newPost = new Post(body);
  try {
    await connect();

    await newPost.save();

    return new NextResponse("Post has been created", { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return new NextResponse("DataBase Error", { status: 500 });
  }
};
