import { db } from "@/server/db";

export const POST = async (req: Request) => {
  const { data } = await req.json();

  const { email_addresses, id, first_name, last_name, image_url } = data;

  await db.user.create({
    data: {
      id: id,
      emailAddress: email_addresses[0]?.email_address || "test@example.com",
      firstName: first_name,
      lastName: last_name,
      imageUrl: image_url,
    },
  });
  console.log("user has been created: ");
  return new Response("webhook has been received", { status: 200 });
};
