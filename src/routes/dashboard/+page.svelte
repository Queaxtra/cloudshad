<script lang="ts">
    import Navbar from "../../components/dashboard/Navbar.svelte";
    import Footer from "../../components/Footer.svelte";
    import db from "$lib/db";
    import { Toaster, toast } from 'svelte-sonner';
    import { onMount } from "svelte";
    import { getFiles, calculateTotalFileSize, uploadFiles, convertToBytes, proxyImage, deleteImage, searchFiles, getFileUploadCount, formatFileSize } from "$lib/files";
    import { isUserLoggedIn } from "$lib/user";
    import { goto } from "$app/navigation";
    import { encode } from 'html-entities';

    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    let uploadProgress = 0;
    let selectedFiles: FileList | null = null;
    let username = db.authStore.model?.username;
    let totalFileSize: string = '';
    let accountType = db.authStore.model?.accountType;
    let isStorageFull = false;
    let files: any[] = [];
    let searchQuery = '';
    let fileUploadCount: string = '';
    let showDeleteConfirmation = false;
    let fileToDelete: { id: string, image: string } | null = null;
    let deleteUploading = false;
    let isLoggedIn = false;
    let storageUsagePercentage = 0;
    let isStorageNearlyFull = false;

    onMount(async () => {
        isLoggedIn = await isUserLoggedIn();

        if (!isLoggedIn) {
            await goto("/auth/login");
        }

        if (username) {
            await refreshFileInfo();
        }
    });

    async function refreshFileInfo() {
        files = await getFiles(username || '');
        totalFileSize = calculateTotalFileSize(files);
        fileUploadCount = getFileUploadCount(files);
        checkStorageLimit();
        calculateStorageUsage();
    }

    function checkStorageLimit() {
        const totalBytes = convertToBytes(totalFileSize);
        const limitBytes = convertToBytes(`${getStorageLimit(accountType || '')} GB`);
        isStorageFull = totalBytes >= limitBytes;
    }

    function calculateStorageUsage() {
        const totalBytes = convertToBytes(totalFileSize);
        const limitBytes = convertToBytes(`${getStorageLimit(accountType || '')} GB`);
        storageUsagePercentage = Math.min(Math.round((totalBytes / limitBytes) * 100), 100);
        isStorageNearlyFull = storageUsagePercentage >= 90;

        if (isStorageNearlyFull) {
            toast.warning('Your storage is nearly full! Consider upgrading or deleting some files.');
        }
    }

    function handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            selectedFiles = input.files;
            validateFiles(selectedFiles);
        }
    }

    function validateFiles(files: FileList) {
        for (let i = 0; i < files.length; i++) {
            if (files[i].size > MAX_FILE_SIZE) {
                toast.error(`The file you upload can have a maximum size of ${formatFileSize(MAX_FILE_SIZE)}`);
                selectedFiles = null;
                return;
            }
        }
    }

    async function handleSubmit(event: Event) {
        event.preventDefault();

        if (!selectedFiles || !username) {
            toast.error('Please select files!');
            return;
        }

        if (isStorageFull) {
            toast.error('Storage limit reached. Cannot upload more files.');
            return;
        }

        try {
            await uploadFiles(Array.from(selectedFiles), username, (progress) => {
                uploadProgress = progress;
            });
            
            uploadProgress = 0;
            selectedFiles = null;
            
            await refreshFileInfo();
            toast.success('Files uploaded successfully!');
        } catch (error) {
            toast.error('Error uploading files. Please try again.');
        }
    }

    function getProxyImageUrl(file: { id: string, image: string }): string {
        return proxyImage(file.id, file.image);
    }

    function confirmDelete(file: { id: string, image: string }) {
        fileToDelete = file;
        showDeleteConfirmation = true;
    }

    async function handleDelete() {
        if (fileToDelete) {
            deleteUploading = true;
            const res = await deleteImage(fileToDelete.id);

            if (res) {
                await refreshFileInfo();
                toast.success('File deleted successfully!');
            } else {
                toast.error('Failed to delete file. Please try again.');
            }
            deleteUploading = false;
        }
        showDeleteConfirmation = false;
        fileToDelete = null;
    }

    function cancelDelete() {
        showDeleteConfirmation = false;
        fileToDelete = null;
    }

    async function handleSearch() {
        if (username) {
            files = await searchFiles(username, searchQuery);
        }
    }

    function getStorageLimit(accountType: string): number {
        switch (accountType) {
            case 'Free': return 2;
            case 'Basic': return 5;
            case 'Pro': return 10;
            default: return 2;
        }
    }

    function handleSearchInput() {
        handleSearch();
    }

    function sanitizeInput(input: string): string {
        return encode(input);
    }
</script>

<Navbar />
<Toaster richColors />
<div class="px-4 md:px-48 py-12 mb-24">
    <h2 class="text-2xl font-bold mb-6">Dashboard Overview</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="border border-gray p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-2">Files Uploaded</h3>
            <p class="text-lg font-bold">{fileUploadCount || '-'}</p>
        </div>
        <div class="border border-gray p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-2">Total File Size</h3>
            <p class="text-lg font-bold">{totalFileSize || '-'}</p>
        </div>
        <div class="border border-gray p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-2">Account Type</h3>
            <p class="text-lg font-bold">{sanitizeInput(accountType || '-')}</p>
        </div>
        <div class="border border-gray p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-2">Storage Limit</h3>
            <p class="text-lg font-bold">{getStorageLimit(accountType || '')} GB</p>
        </div>
    </div>

    <div class="border border-gray p-4 rounded-lg mb-8">
        <h3 class="text-lg font-semibold mb-2">Storage Usage</h3>
        <div class="w-full bg-gray/50 rounded-full h-2 mb-2">
            <div class="{isStorageNearlyFull ? 'bg-red' : 'bg-primary'} h-2 rounded-full" style="width: {storageUsagePercentage}%"></div>
        </div>
        <p class="text-sm font-semibold {isStorageNearlyFull ? 'text-red' : ''}">{storageUsagePercentage}% used ({totalFileSize || 0} / {getStorageLimit(accountType || '')} GB)</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="border border-gray p-6 rounded-lg">
            {#if isStorageFull}
            <div class="flex items-center justify-center w-full h-64 rounded-lg">
                <p class="text-2xl font-bold text-red">Storage Limit Reached</p>
            </div>
            {:else}
            <h3 class="text-xl font-semibold mb-4">File Upload</h3>
                <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                    <div class="flex items-center justify-center w-full">
                        <label for="file-upload" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray border-dashed rounded-lg cursor-pointer">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <i class="ri-upload-cloud-2-fill text-6xl mb-3 opacity-30"></i>
                                <p class="mb-2 text-sm opacity-70 font-semibold">Click to upload</p>
                                <p class="text-xs opacity-70">SVG, PNG, JPG or GIF (Max. {formatFileSize(MAX_FILE_SIZE)})</p>
                            </div>
                            <input id="file-upload" type="file" accept="image/*" on:change={handleFileChange} class="hidden" multiple />
                        </label>
                    </div>
                    {#if selectedFiles}
                    <p class="text-sm opacity-70">Selected files: {selectedFiles.length}</p>
                    {/if}
                    {#if uploadProgress > 0 && uploadProgress < 100}
                    <div class="w-full bg-gray rounded-full h-2.5">
                        <div class="bg-primary h-2.5 rounded-full" style="width: {uploadProgress}%"></div>
                    </div>
                    {/if}
                    <div>
                        <button type="submit" class="w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition duration-300" style="opacity: {selectedFiles ? 1 : 0.5}" disabled={!selectedFiles || uploadProgress > 0}>
                            {uploadProgress > 0 ? 'Uploading...' : 'Upload Files'}
                        </button>
                    </div>
                </form>
            {/if}
        </div>

        <div class="border border-gray p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">Your Files</h3>
            <div class="mb-4">
                <input bind:value={searchQuery} on:input={handleSearchInput} type="text" placeholder="Search files..." class="w-full border border-gray p-2 rounded-lg placeholder:opacity-50 focus:outline-none" />
            </div>
            {#if files.length === 0}
            <p class="opacity-70">No files found.</p>
            {:else}
            <div class="h-64 space-y-4 overflow-y-auto">
                {#each files as file}
                <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-100 rounded-lg">
                    <div class="flex items-center space-x-3">
                        <i class="ri-file-line text-2xl text-gray-600"></i>
                        <div>
                            <p class="font-semibold">{sanitizeInput(file.image.length > 30 ? file.image.slice(0, 27) + '...' : file.image)}</p>
                            <p class="text-sm opacity-70">{sanitizeInput(file.fileSize)}</p>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <a href={getProxyImageUrl(file)} target="_blank" rel="noopener noreferrer" class="text-primary ">
                            <i class="ri-eye-line text-base"></i>
                        </a>
                        <button type="button" on:click={() => confirmDelete(file)} class="text-red">
                            <i class="ri-delete-bin-line text-base"></i>
                        </button>
                    </div>
                </div>
                {/each}
            </div>
            {/if}
        </div>
    </div>
</div>

{#if showDeleteConfirmation}
<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg">
        <h3 class="text-lg font-semibold mb-4">Confirm Deletion</h3>
        <p>Are you sure you want to delete this file?</p>
        <span class="text-xs opacity-50">This action cannot be undone.</span>
        <div class="mt-4 flex space-x-2">
            <button on:click={cancelDelete} class="w-full px-4 py-2 bg-gray/50 rounded-lg">Cancel</button>
            <button on:click={handleDelete} class="w-full px-4 py-2 bg-red text-white rounded-lg">{deleteUploading ? 'Deleting...' : 'Delete'}</button>
        </div>
    </div>
</div>
{/if}

<Footer />