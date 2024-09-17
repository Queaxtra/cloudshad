<script lang="ts">
    import { goto } from "$app/navigation";
    import { Toaster, toast } from 'svelte-sonner'
    import { createUser, isUserLoggedIn } from "$lib/user";
    import { onMount } from "svelte";

    let loader = false;
    let user = {
        username: "",
        email: "",
        emailVisibility: false,
        password: "",
        confirmPassword: "",
        agreeToTerms: false
    };

    let emailError = "";

    const validEmailDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'icloud.com'];

    function validateEmail(email: string) {
        const domain = email.split('@')[1];
        return validEmailDomains.includes(domain);
    }

    function handleEmailChange() {
        if (user.email && !validateEmail(user.email)) {
            emailError = "Please use a common email service (e.g., Gmail, Outlook, iCloud).";
        } else {
            emailError = "";
        }
    }

    $: isValid = user.email && user.password && user.confirmPassword && user.agreeToTerms && !emailError;

    onMount(async () => {
        if (await isUserLoggedIn()) {
            goto("/dashboard");
        }
    });
    
    async function register() {
        loader = true;
        if (user.password !== user.confirmPassword) {
            toast.error("Passwords do not match");
            loader = false;
            return;
        }

        if (!validateEmail(user.email)) {
            toast.error("Please use a common email service");
            loader = false;
            return;
        }

        try {
            await createUser(user.username, user.email, user.emailVisibility, user.password, user.confirmPassword).then(() => {
                toast.success("Account created successfully, redirecting...");
                setTimeout(() => {
                    goto("/auth/login");
                }, 3000)
                loader = false;
            });
        } catch (error) {
            loader = false;
            toast.error("Registration failed, please check your credentials.");
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
                        Join <span class="text-primary">CloudShad</span>
                    </span>
                </h2>
                <p class="text-center opacity-70 mb-8">Create your account and start securing your data today.</p>

                <form on:submit|preventDefault={register} class="space-y-6">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input type="email" id="email" bind:value={user.email} on:input={handleEmailChange} required class="w-full px-3 py-2 border border-gray rounded-lg placeholder:opacity-50 focus:outline-none" placeholder="you@example.com" />
                        {#if emailError}
                            <p class="text-red-500 text-xs mt-1">{emailError}</p>
                        {/if}
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" id="password" bind:value={user.password} required class="w-full px-3 py-2 border border-gray rounded-lg placeholder:opacity-50 focus:outline-none" placeholder="••••••••" />
                    </div>
                    <div>
                        <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input type="password" id="confirmPassword" bind:value={user.confirmPassword} required class="w-full px-3 py-2 border border-gray rounded-lg placeholder:opacity-50 focus:outline-none" placeholder="••••••••" />
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" id="agreeTerms" bind:checked={user.agreeToTerms} required class="h-4 w-4 text-primary focus:ring-primary border border-gray rounded-lg" />
                        <label for="agreeTerms" class="ml-2 block text-sm text-gray-700">I agree to the <a href="/terms" class="text-primary">Terms of Service</a> and <a href="/privacy" class="text-primary">Privacy Policy</a></label>
                    </div>
                    <div>
                        <button type="submit" class="w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg" class:opacity-50={!isValid} disabled={!isValid}>{loader ? 'Creating...' : 'Create Account'}</button>
                    </div>
                </form>

                <p class="mt-4 text-center text-sm">Already have an account? <a href="/auth/login" class="text-primary hover:underline">Log in</a></p>
            </div>
        </div>
    </div>
</section>
