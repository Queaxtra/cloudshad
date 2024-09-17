<script>
    import Navbar from "../components/Navbar.svelte";
    import Footer from "../components/Footer.svelte";
</script>

<Navbar />

<section class="flex flex-col justify-center items-center min-h-screen">
    <div class="container mx-auto px-4 text-center">
        <h1 class="text-6xl font-extrabold mb-4">
            <span class="text-primary">404</span>
        </h1>
        <h2 class="text-3xl font-bold mb-4">Page Not Found</h2>
        <p class="text-lg mb-6 max-w-2xl mx-auto">
            Sorry, the page you are looking for could not be found. Are you sure the address is correct?
        </p>
        <div class="flex justify-center space-x-4">
            <a href="/" class="inline-block bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-dark transition duration-300">Go Home</a>
            <a href="/contact" class="inline-block bg-white font-bold py-2 px-6 rounded-lg border-2 border-gray">Contact Support</a>
        </div>
    </div>
</section>

<Footer />
