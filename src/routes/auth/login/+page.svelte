<script>
    import { goto } from "$app/navigation";
    import { Toaster, toast } from 'svelte-sonner'
    import { loginUser, isUserLoggedIn } from "$lib/user";
    import { onMount } from "svelte";

    let loader = false;
    let user = {
        email: "",
        password: "",
    };

    $: isValid = user.email && user.password;

    onMount(async () => {
        if (await isUserLoggedIn()) {
            goto("/dashboard");
        }
    });

    async function login() {
        loader = true;
        try {
            await loginUser(user.email, user.password).then(() => {
                toast.success("Login successful, redirecting...");
                setTimeout(() => {
                    goto("/dashboard");
                }, 2000)
            });
        } catch (error) {
            loader = false;
            toast.error("Login failed, please check your credentials.");
        }
    }
</script>

<Toaster richColors />

<section class="py-24 flex items-center justify-center min-h-screen">
    <div class="container mx-auto px-4">
        <div class="max-w-md mx-auto border border-gray rounded-lg">
            <div class="py-8 px-6">
                <h2 class="text-center font-extrabold text-3xl mb-2">
                    <span class="relative">
                        Login to <span class="text-primary">CloudShad</span>
                    </span>
                </h2>
                <p class="text-center opacity-70 mb-8">Access your secure cloud storage.</p>

                <form on:submit|preventDefault={login} class="space-y-6">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input type="email" id="email" bind:value={user.email} required class="w-full px-3 py-2 border border-gray rounded-lg placeholder:opacity-50 focus:outline-none" placeholder="you@example.com" />
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" id="password" bind:value={user.password} required class="w-full px-3 py-2 border border-gray rounded-lg placeholder:opacity-50 focus:outline-none" placeholder="••••••••" />
                    </div>
                    <div>
                        <button type="submit" class="w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg" class:opacity-50={!isValid} disabled={!isValid}>
                            {loader ? 'Logging in...' : 'Log In'}
                        </button>
                    </div>
                </form>

                <p class="mt-4 text-center text-sm">Don't have an account? <a href="/auth/register" class="text-primary hover:underline">Sign up</a></p>
            </div>
        </div>
    </div>
</section>