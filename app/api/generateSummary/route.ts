import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { todos } = await request.json();

  console.log(todos);

  //chatgpt integration

  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    n: 1,
    messages: [
      {
        role: "system",
        content:
          "When responding , welcome the user always as Mr.Haricharan and greet him , Limit the response to 100 characters ",
      },
      {
        role: "user",
        content: `Hi There , provide a summary of the following todos. Count how many todos are in each category such as To do , in progress and done , then tell the user to have a productive day! Here's the data : ${JSON.stringify(
          todos
        )}`,
      },
    ],
  });

  console.log("Data is: ", res);
  console.log(res.choices[0].message);

  return NextResponse.json(res.choices[0].message);
}
