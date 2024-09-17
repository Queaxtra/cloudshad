<script>
    import Navbar from "../../components/Navbar.svelte";
    import Footer from "../../components/Footer.svelte";
</script>

<Navbar />

<section class="py-24">
    <div class="container mx-auto px-4">
        <h1 class="text-center font-extrabold text-4xl mb-8">
            <span class="relative">
                Privacy <span class="text-primary">Policy</span>
            </span>
        </h1>

        <div class="max-w-3xl mx-auto">
            <p class="mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <h2 class="text-2xl font-bold mb-4">1. Lorem Ipsum</h2>
            <p class="mb-4">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat:</p>
            <ul class="list-disc list-inside mb-6">
                <li>Lorem ipsum</li>
                <li>Dolor sit amet</li>
                <li>Consectetur adipiscing</li>
                <li>Elit sed do eiusmod</li>
            </ul>

            <h2 class="text-2xl font-bold mb-4">2. Tempor Incididunt</h2>
            <p class="mb-6">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur:
            </p>
            <ul class="list-disc list-inside mb-6">
                <li>Excepteur sint occaecat</li>
                <li>Cupidatat non proident</li>
                <li>Sunt in culpa qui</li>
                <li>Officia deserunt mollit</li>
            </ul>

            <h2 class="text-2xl font-bold mb-4">3. Anim Id Est</h2>
            <p class="mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <h2 class="text-2xl font-bold mb-4">4. Laborum Et</h2>
            <p class="mb-6">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <h2 class="text-2xl font-bold mb-4">5. Dolorum Fuga</h2>
            <p class="mb-6">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>

            <h2 class="text-2xl font-bold mb-4">6. Excepteur Sint</h2>
            <p class="mb-6">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <h2 class="text-2xl font-bold mb-4">7. Occaecat Cupidatat</h2>
            <p class="mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <h2 class="text-2xl font-bold mb-4">8. Non Proident</h2>
            <p class="mb-6">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <h2 class="text-2xl font-bold mb-4">9. Contact Us</h2>
            <p class="mb-6">
                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:lorem@ipsum.com" class="text-primary">lorem@ipsum.com</a>.
            </p>

            <p class="text-sm opacity-70 mt-8">
                Last updated: {new Date().toLocaleDateString()}
            </p>
        </div>
    </div>
</section>

<Footer />
