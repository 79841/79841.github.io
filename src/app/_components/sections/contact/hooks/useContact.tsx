import { postContact } from "@/services/contact";
import { useFormState } from "react-dom";
import { z } from "zod";

export const useContact = () => {
  const handleAction = async (prevState: any, formData: FormData) => {
    const schema = z.object({
      name: z.string().min(1),
      email: z.string().email(),
      message: z.string().min(1),
    });

    const validatedData = schema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    });

    if (!validatedData.success) return { message: "Failed..." };

    const res = await postContact(validatedData.data);

    if (res === "OK") {
      return { message: "Sent!" };
    } else {
      return { message: "Failed..." };
    }
  };

  const [state, formAction] = useFormState(handleAction, null);

  return [state, formAction] as const;
};
