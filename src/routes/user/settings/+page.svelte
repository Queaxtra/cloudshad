<script lang="ts">
    import Navbar from "../../../components/dashboard/Navbar.svelte";
    import Footer from "../../../components/Footer.svelte";
    import db from "$lib/db";
    import { Toaster, toast } from 'svelte-sonner';
    import { changeUserPassword, logoutUser } from "$lib/user";
    import { goto } from "$app/navigation";
    import { isUserLoggedIn } from "$lib/user";
    import { onMount } from "svelte";

    let userId = db.authStore.model?.id;
    let username = db.authStore.model?.username;
    let email = db.authStore.model?.email;
    let accountType = db.authStore.model?.accountType;
    let newPassword = '';
    let confirmPassword = '';
    let oldPassword = '';
    let loading = false;
    let isLoggedIn = false;

    onMount(async () => {
        isLoggedIn = await isUserLoggedIn();

        if (!isLoggedIn) {
            await goto("/auth/login");
        }
    });

    async function updatePassword() {
        loading = true;
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (oldPassword === newPassword) {
            toast.error("New password cannot be the same as the old password");
            return;
        }

        try {
            await changeUserPassword(userId, oldPassword, newPassword, confirmPassword);
            loading = false;
            await logoutUser();
            await goto("/auth/login");
        } catch (error) {
            toast.error("Failed to update password");
            loading = false;
        }
    }
</script>

<Navbar />
<Toaster richColors />
<div class="px-4 md:px-48 py-12 mb-24">
    <h2 class="text-2xl font-bold mb-6">Settings</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="border border-gray p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">Profile Information</h3>
            <div class="space-y-4">
                <div>
                    <label for="username" class="block mb-2">Username</label>
                    <input type="text" id="username" bind:value={username} class="w-full border border-gray p-2 rounded-lg" disabled />
                </div>
                <div>
                    <label for="email" class="block mb-2">Email</label>
                    <input type="email" id="email" bind:value={email} class="w-full border border-gray p-2 rounded-lg" disabled />
                </div>
                <div>
                    <label for="accountType" class="block mb-2">Account Type</label>
                    <input type="text" id="accountType" bind:value={accountType} class="w-full border border-gray p-2 rounded-lg" disabled />
                </div>
                <button on:click={() => goto('/dashboard')} class="w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg">Go Back</button>
            </div>
        </div>

        <div class="border border-gray p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">Change Password</h3>
            <form class="space-y-4" on:submit|preventDefault={updatePassword}>
                <div>
                    <label for="oldPassword" class="block mb-2">Old Password</label>
                    <input type="password" id="oldPassword" bind:value={oldPassword} class="w-full border border-gray p-2 rounded-lg" />
                </div>
                <div>
                    <label for="newPassword" class="block mb-2">New Password</label>
                    <input type="password" id="newPassword" bind:value={newPassword} class="w-full border border-gray p-2 rounded-lg" />
                </div>
                <div>
                    <label for="confirmPassword" class="block mb-2">Confirm New Password</label>
                    <input type="password" id="confirmPassword" bind:value={confirmPassword} class="w-full border border-gray p-2 rounded-lg" />
                </div>
                <button type="submit" class="w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition duration-300" class:opacity-50={!(oldPassword && newPassword && confirmPassword)} disabled={!(oldPassword && newPassword && confirmPassword)}>{loading ? 'Updating...' : 'Update Password'}</button>
            </form>
        </div>
    </div>
</div>
<Footer />
