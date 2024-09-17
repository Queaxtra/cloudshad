<script>
    import { isUserLoggedIn } from "$lib/user";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let isLoggedIn = false;

    onMount(async () => {
        isLoggedIn = await isUserLoggedIn();
    });
</script>

<header class="py-24 flex flex-col justify-center items-center relative">
    <div class="background-overlay"></div>
    <h1 class="max-w-2xl font-extrabold text-4xl md:text-5xl text-center leading-tight mb-6 relative z-10">
        <span class="relative inline-block">
            <span class="text-success"><i class="ri-upload-cloud-line"></i> Upload,</span>
        </span>
        Securely Store, 
        <span class="relative inline-block">
            <span class="text-primary">Share Easily. <i class="ri-share-line"></i></span>
        </span>
    </h1>
    <div class="flex space-x-4 relative z-10">
        {#if !isLoggedIn}
        <button on:click={() => goto("/auth/login")} class="bg-primary text-white font-bold py-2 px-6 rounded-lg border-2 border-primary">Login</button>
        <button on:click={() => goto("/auth/register")} class="bg-white font-bold py-2 px-6 rounded-lg border-2 border-gray">Register</button>
        {:else}
        <button on:click={() => goto("/dashboard")} class="bg-primary text-white font-bold py-2 px-6 rounded-lg border-2 border-primary">Dashboard</button>
        <button on:click={() => goto("/user/settings")} class="bg-white font-bold py-2 px-6 rounded-lg border-2 border-gray">Settings</button>
        {/if}
    </div>
</header>
