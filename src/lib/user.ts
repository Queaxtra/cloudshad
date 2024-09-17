import db from "./db";

export const createUser = async (username: string, email: string, emailVisibility: boolean, password: string, passwordConfirm: string) => {
    const user = await db.collection("users").create({
        username,
        email,
        emailVisibility,
        password,
        passwordConfirm,
        accountType: "Free"
    });
    return user;
}

export const loginUser = async (email: string, password: string) => {
    const user = await db.collection("users").authWithPassword(email, password);
    return user;
}

export const changeUserPassword = async (userId: string, oldPassword: string, password: string, passwordConfirm: string) => {
    const user = await db.collection("users").update(userId, { oldPassword, password, passwordConfirm });
    return user;
}

export const isUserLoggedIn = async () => {
    const user = await db.authStore.isValid;
    return user;
}

export const logoutUser = async () => {
    await db.authStore.clear();
}