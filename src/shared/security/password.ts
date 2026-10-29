import { password } from "bun";

export const hashPassword = async (unhashed_password: string) => {
	return await password.hash(unhashed_password);
};

export const verifyPassword = async (
	unhashed_password: string,
	hash: string,
) => {
	return await password.verify(unhashed_password, hash);
};
