<script>
    const faqItems = [
        { question: "What is CloudShad?", answer: "CloudShad is a secure cloud storage solution designed to protect your data with cutting-edge technology while providing easy access and sharing capabilities." },
        { question: "How secure is my data with CloudShad?", answer: "Your data is protected with state-of-the-art security techniques. We use advanced security measures to ensure that only you can access your files. Our robust security features include secure authentication and flexible access control systems." },
        { question: "Can I access my files from multiple devices?", answer: "Yes, CloudShad allows you to access your files from any device. Our cross-platform sync feature ensures that your files are always up-to-date across all your devices." },
        { question: "What happens if I exceed my storage limit?", answer: "If you approach your storage limit, we'll notify you. You can then choose to upgrade to a higher plan or manage your existing files to free up space." },
        { question: "Is there a file size limit for uploads?", answer: "While we support large file uploads, there is a limit of 2GB per file for our free plans. If you need to upload larger files, please contact our support team for assistance." },
        { question: "How can I share files with others?", answer: "CloudShad makes file sharing easy. Even without a CloudShad account, you can see photos shared by users. To share a file, you can click the share icon next to the uploaded file and get the link." }
    ];
</script>

<section class="py-24" id="faq">
    <div class="container mx-auto px-4">
        <h2 class="text-center font-extrabold text-4xl mb-4">
            <span class="relative">
                Frequently Asked <span class="text-primary">Questions</span>
            </span>
        </h2>
        <p class="text-center opacity-70 max-w-2xl mx-auto mb-12">Find answers to common questions about CloudShad's services, security, and features.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {#each faqItems as item}
                <div class="border border-gray px-6 py-4 rounded-lg">
                    <h3 class="text-xl font-semibold mb-2 flex items-center">
                        <i class="ri-question-line text-primary mr-2"></i>
                        {item.question}
                    </h3>
                    <p class="opacity-70">{item.answer}</p>
                </div>
            {/each}
        </div>
        
        <div class="mt-12 text-center">
            <p class="font-bold text-xl mb-4">Still have questions?</p>
            <p class="opacity-70 max-w-2xl mx-auto mb-6">Our support team is here to help. Feel free to reach out if you need any additional information.</p>
            <a href="/contact" class="inline-block bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-dark transition duration-300">Contact Support</a>
        </div>
    </div>
</section>
