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

    const user = await users.findOne({ username, password });

    if (!user) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  } finally {
    await client.close();
  }
}
