<script>
    const plans = [
        { name: "Free Plan", price: "$0", period: "forever", description: "Perfect for small personal projects or trying out our service.", features: ["2 GB Storage", "Basic File Security", "Community Support"], popular: false, href: "/" },
        { name: "Basic Plan", price: "$10", period: "month", description: "Ideal for individuals with moderate file hosting needs.", features: ["5 GB Storage", "Enhanced File Security", "Email Support"], popular: true, href: "/" },
        { name: "Pro Plan", price: "$20", period: "month", description: "Great for professionals and small businesses with larger storage needs.", features: ["10 GB Storage", "Advanced File Security", "Priority Support"], popular: false, href: "/" },
    ];
</script>

<section class="py-24 mb-24" id="pricing">
    <div class="container mx-auto px-4">
        <h2 class="text-center font-extrabold text-4xl mb-4">
            <span class="relative">
                Choose Your <span class="text-primary">Plan</span>
            </span>
        </h2>
        <p class="text-center opacity-70 max-w-2xl mx-auto mb-12">Select the plan that best fits your needs and start securing your files today.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each plans as plan}
            <div class="border {plan.popular ? 'border-primary' : 'border-gray'} px-6 py-8 rounded-lg relative flex flex-col">
                {#if plan.popular}
                <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">Popular</div>
                {/if}
                <h3 class="text-2xl font-bold mb-2 text-center">{plan.name}</h3>
                <div class="text-center mb-4">
                    <span class="text-4xl font-extrabold">{plan.price}</span>
                    <span class="opacity-70">/{plan.period}</span>
                </div>
                <p class="opacity-70 text-center mb-6">{plan.description}</p>
                <ul class="mb-8 flex-grow">
                    {#each plan.features as feature}
                    <li class="flex items-center mb-2">
                        <i class="ri-check-line text-primary mr-2"></i>
                        {feature}
                    </li>
                    {/each}
                </ul>
                <a href={plan.href} class="w-full py-3 px-6 text-center {plan.popular ? 'bg-primary text-white' : 'bg-gray/50'} rounded-lg font-semibold">{plan.name === "Free Plan" ? "Get Started" : "Buy Now"}</a>
            </div>
            {/each}
        </div>
    </div>
</section>
