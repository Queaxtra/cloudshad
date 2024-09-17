<script lang="ts">
    import { logoutUser } from "$lib/user";
    import { fly } from "svelte/transition";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    
    let openMenu = false;

    function logout() {
        logoutUser().then(() => {
            goto("/auth/login");
        })
    }

    function getPageTitle(path: string) {
        if (path.startsWith("/user/settings")) {
            return "Settings";
        } else if (path.startsWith("/dashboard")) {
            return "Dashboard";
        }
        return "Dashboard";
    }

    $: pageTitle = getPageTitle($page.url.pathname);
    $: isSettingsPage = $page.url.pathname.startsWith("/user/settings");
</script>

<nav class="w-auto py-4">
    <div class="px-4 md:px-48">
        <div class="flex justify-between items-center">
            <div class="flex-1 md:flex-none">
                <h1 class="font-extrabold text-xl text-center md:text-left">CloudShad <span class="font-semibold text-sm">/ {pageTitle}</span></h1>
            </div>

            <div class="hidden md:block">
                <div class="flex items-center space-x-2 font-semibold">
                    {#if isSettingsPage}
                    <a href="/dashboard">Dashboard</a>
                    {:else}
                    <a href="/user/settings">Settings</a>
                    {/if}
                    <span class="text-gray">/</span>
                    <button on:click={logout}>Log Out</button>
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
                {#if isSettingsPage}
                <li><a href="/dashboard" class="block py-2">Dashboard</a></li>
                {:else}
                <li><a href="/user/settings" class="block py-2">Settings</a></li>
                {/if}
                <li><button on:click={logout} class="block py-2">Log Out</button></li>
            </ul>
            <button class="absolute top-4 right-4 opacity-70" on:click={() => openMenu = false}>
                <i class="ri-close-line text-xl"></i>
            </button>
        </div>
    </div>
    {/if}
</nav>
