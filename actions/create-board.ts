"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type State = {
	errors?: {
		title?: string[];
	};
	message?: string | null;
};

const CreateBoard = z.object({
	title: z.string().min(3, {
		message: "Minimum Length of 3 Letters",
	}),
});

export async function create(prevState: State, formData: FormData) {
	const validatedFields = CreateBoard.safeParse({
		title: formData.get("title"),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "missing Fields.",
		};
	}
	const { title } = validatedFields.data;

	try {
		await db.board.create({
			data: {
				title,
			},
		});
	} catch (error) {
		return {
			message: "Database Error",
		};
	}

	revalidatePath("/organization/org_2Z4W7cN6AODnjZ5hFYNN5ZH5tQe");
	redirect("/organization/org_2Z4W7cN6AODnjZ5hFYNN5ZH5tQe");
}
