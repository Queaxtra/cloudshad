<script>
    const array = [
        { title: "CloudShad", content: "Secure cloud storage solutions for everyone.", socialLinks: ["https://x.com/unoxdevs", "https://discord.gg/b9gS3r7XuJ"] },
        { title: "Quick Links", links: [{ name: "Home", href: "/" }, { name: "Pricing", href: "#pricing" }, { name: "Features", href: "#features" }, { name: "About Us", href: "/about" }] },
        { title: "Legal", links: [{ name: "Terms of Service", href: "/terms" }, { name: "Privacy Policy", href: "/privacy" }] },
        { title: "Follow Us", socialLinks: ["https://x.com/unoxdevs", "https://discord.gg/b9gS3r7XuJ"] }
    ]
</script>

<footer class="border-t border-gray py-8">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 md:gap-36">
            {#each array as item}
            <div>
                <h3 class="text-lg sm:text-xl font-bold mb-4 flex items-center">
                    {item.title}
                </h3>
                {#if item.content}
                <p class="text-sm">{item.content}</p>
                {/if}
                {#if item.socialLinks}
                <div class="mt-4">
                    {#each item.socialLinks as link}
                    <a href="{link}" target="_blank" rel="noopener noreferrer" class="inline-block mr-4">
                        {#if link.includes("x.com")}
                        <i class="ri-twitter-x-fill text-lg"></i>
                        {:else}
                        <i class="ri-discord-fill text-lg"></i>
                        {/if}
                    </a>
                    {/each}
                </div>
                {/if}
                {#if item.links}
                <ul class="mt-4">
                    {#each item.links as link}
                    <li class="mb-2">
                        <a href="{link.href}" class="text-sm">{link.name}</a>
                    </li>
                    {/each}
                </ul>
                {/if}
            </div>
            {/each}
        </div>
        <p class="text-center opacity-70 text-xs mt-6">Made with ❤️ by UnoxDevs</p>
    </div>
</footer>
