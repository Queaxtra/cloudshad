<script>
    import { isUserLoggedIn, logoutUser } from "$lib/user";
    import { fly } from "svelte/transition";
    import { onMount } from "svelte";
    
    let openMenu = false;
    let isLoggedIn = false;

    onMount(async () => {
        isLoggedIn = await isUserLoggedIn();
    });

    function logout() {
        logoutUser().then(() => {
            window.location.reload();
        })
        isLoggedIn = false;
    }
</script>

<nav class="w-auto py-4">
    <div class="px-4 md:px-48">
        <div class="flex justify-between items-center">
            <div class="flex-1 md:flex-none">
                <h1 class="font-extrabold text-xl text-center md:text-left">CloudShad <span class="text-xs font-normal">BETA</span></h1>
            </div>

            <div class="hidden md:block">
                <ul class="flex space-x-4 font-semibold">
                    <li><a href="/">Home</a></li>
                    <li><a href="#pricing">Pricing</a></li>
                    <li><a href="#faq">FAQ</a></li>
                </ul>
            </div>

            <div class="hidden md:block">
                <div class="flex items-center space-x-2 font-semibold">
                    {#if !isLoggedIn}
                    <a href="/auth/register">Register</a>
                    <span class="text-gray">/</span>
                    <a href="/auth/login">Login</a>
                    {:else}
                    <a href="/dashboard">Dashboard</a>
                    <span class="text-gray">/</span>
                    <button on:click={logout}>Log Out</button>
                    {/if}
                </div>
            </div>

            <button class="md:hidden" on:click={() => openMenu = true}>
                <i class="ri-menu-line text-xl"></i>
            </button>
        </div>
    </div>

    {#if openMenu}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50" on:click={() => openMenu = false}>
        <div class="fixed bottom-0 left-0 right-0 bg-white p-6 rounded-t-2xl" in:fly={{ y: 300, duration: 300 }} out:fly={{ y: 300, duration: 300 }} on:click|stopPropagation>
            <ul class="flex flex-col space-y-2 text-sm mb-4">
                <li><a href="/" class="block py-2">Home</a></li>
                <li><a href="#pricing" class="block py-2">Pricing</a></li>
                <li><a href="#faq" class="block py-2">FAQ</a></li>
                {#if !isLoggedIn}
                <li><a href="/auth/register" class="block py-2">Register</a></li>
                <li><a href="/auth/login" class="block py-2">Login</a></li>
                {:else}
                <li><a href="/dashboard" class="block py-2">Dashboard</a></li>
                <li><button on:click={logout} class="block py-2">Log Out</button></li>
                {/if}
            </ul>
            <button class="absolute top-4 right-4 opacity-70" on:click={() => openMenu = false}>
                <i class="ri-close-line text-xl"></i>
            </button>
        </div>
    </div>
    {/if}
</nav>
