import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = "mongodb://mongodb:27017";
const client = new MongoClient(uri);

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
  }

  try {
    await client.connect();
    const db = client.db("users_db");
    const users = db.collection("users");

    // ตรวจสอบว่าผู้ใช้มีอยู่แล้วหรือไม่
    const existingUser = await users.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ error: "Username already exists." }, { status: 409 });
    }

    // บันทึกผู้ใช้ใหม่
    await users.insertOne({ username, password });

    return NextResponse.json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  } finally {
    await client.close();
  }
}
