<script>
    import Navbar from "../../components/Navbar.svelte";
    import Footer from "../../components/Footer.svelte";
</script>

<Navbar />
<section class="flex flex-col justify-center items-center min-h-screen">
    <div class="container mx-auto px-4">
        <h2 class="text-center font-extrabold text-4xl mb-4">
            <span class="relative">
                About <span class="text-primary">Us</span>
            </span>
        </h2>
        <p class="text-center opacity-70 max-w-2xl mx-auto mb-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div class="border border-gray p-6 rounded-lg">
                <h3 class="text-2xl font-bold mb-4 text-primary"><i class="ri-eye-line mr-2"></i>Our Vision</h3>
                <p class="text-base opacity-70">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet.</p>
            </div>
            <div class="border border-gray p-6 rounded-lg">
                <h3 class="text-2xl font-bold mb-4 text-success"><i class="ri-focus-2-line mr-2"></i>Our Mission</h3>
                <p class="text-base opacity-70">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet.</p>
            </div>
        </div>
    </div>
</section>

<Footer />
