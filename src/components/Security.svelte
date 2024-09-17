<script>
    const securityArray = [
        {
            title: "Robust Security Measures",
            icon: "ri-shield-check-line",
            items: [
                "Modern encryption techniques for all data",
                "Secure and fast authentication mechanisms",
                "Automatic backup and data protection",
                "Flexible access control and authorization systems"
            ]
        }
    ];

    const privacyArray = [
        {
            title: "Privacy-First Approach",
            icon: "ri-lock-line",
            items: [
                "Strict data protection policies",
                "Transparent data handling practices",
                "No data selling or sharing with third parties",
                "User control over data retention and deletion"
            ]
        }
    ];
</script>

<section class="py-24 bg-gray-50">
    <div class="container mx-auto px-4">
        <h2 class="text-center font-extrabold text-4xl mb-4">
            <span class="relative">
                <span class="relative">
                    Your <span class="text-primary">Security</span> and
                </span>
                <span class="relative">
                    <span class="text-success">Privacy</span> Matter
                </span>
            </span>
        </h2>
        <p class="text-center opacity-70 max-w-2xl mx-auto mb-12">At our core, we believe that your data deserves the highest level of protection. Our commitment to security and privacy is unwavering and forms the foundation of everything we do.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {#each securityArray as security}
                <div class="border border-gray p-6 rounded-lg">
                    <h3 class="text-2xl font-bold mb-4 text-primary"><i class="{security.icon} mr-2"></i>{security.title}</h3>
                    <ul class="space-y-2">
                        {#each security.items as item}
                            <li><i class="ri-checkbox-circle-line text-primary mr-2"></i>{item}</li>
                        {/each}
                    </ul>
                </div>
            {/each}

            {#each privacyArray as privacy}
                <div class="border border-gray p-6 rounded-lg">
                    <h3 class="text-2xl font-bold mb-4 text-success"><i class="{privacy.icon} mr-2"></i>{privacy.title}</h3>
                    <ul class="space-y-2">
                        {#each privacy.items as item}
                            <li><i class="ri-checkbox-circle-line text-success mr-2"></i>{item}</li>
                        {/each}
                    </ul>
                </div>
            {/each}
        </div>
        
        <div class="mt-12 text-center">
            <p class="font-bold text-xl mb-4">Your Trust is Our Priority</p>
            <p class="opacity-70 max-w-2xl mx-auto">We understand the importance of your data and the trust you place in us. That's why we've implemented industry-leading security protocols and adhere to strict privacy standards. Your information is stored securely and accessed only when necessary for providing our services.</p>
        </div>
    </div>
</section>
