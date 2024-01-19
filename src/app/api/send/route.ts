import { Resend } from "resend";
export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(request: Request) {
  // console.log(request.formData());
  console.log("hello");
  const json = await request.json();
  console.log("body", json);

  // const name = formData.get("name");
  // const email = formData.get("email");
  // const content = formData.get("content");

  // try {
  //   const data = await resend.emails.send({
  //     from: `${name} <${email}>`,
  //     to: [siteMetadata.primaryEmail],
  //     subject: "Hello world",
  //     react: EmailForm({ content: `${content}` }),
  //   });

  //   return Response.json(data);
  // } catch (error) {
  //   return Response.json({ error });
  // }
  return Response.json({ message: "hello" });
}
