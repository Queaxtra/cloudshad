<script>
    import Navbar from "../../components/Navbar.svelte";
    import Footer from "../../components/Footer.svelte";

    const contactMethods = [
        { icon: "ri-discord-fill", title: "Discord", content: "Join our Discord server to get support and stay up-to-date with the latest updates and features. We're always looking for new and exciting ways to help you get started with CloudShad.", href: "https://discord.gg/b9gS3r7XuJ" },
        { icon: "ri-twitter-x-fill", title: "Twitter (X)", content: "Follow us on Twitter (X) to stay up-to-date with the latest news, announcements, and updates. We're here to help!", href: "https://twitter.com/unoxdevs" },
        { icon: "ri-mail-fill", title: "Email", content: "If you have any questions or feedback, feel free to reach out to us. We're here to help!", href: "mailto:unoxdevs@mail.com" }
    ];
</script>

<Navbar />
<section class="flex flex-col justify-center items-center min-h-screen">
    <div class="container mx-auto px-4">
        <h1 class="text-center font-extrabold text-4xl mb-4">
            <span class="relative">
                Get in <span class="text-primary">Touch</span>
            </span>
        </h1>
        <p class="text-center opacity-70 max-w-2xl mx-auto mb-12">We're here to help! Reach out to us through any of the following channels for support, updates, or just to say hello.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each contactMethods as method}
            <div class="border border-gray px-6 py-4 rounded-lg relative flex flex-col">
                <div class="absolute -top-5 bg-white">
                    <i class="{method.icon} text-primary text-4xl"></i>
                </div>

                <div class="mt-4 flex-grow">
                    <h3 class="text-xl font-semibold mb-2">{method.title}</h3>
                    <p class="opacity-70 mb-4">{method.content}</p>
                </div>
                <a href="{method.href}" target="_blank" rel="noopener noreferrer" class="text-primary mt-auto">Connect with us <i class="ri-arrow-right-line align-middle"></i></a>
            </div>
            {/each}
        </div>
    </div>
</section>
<Footer />