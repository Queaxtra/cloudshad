import db from "./db";
import { encode } from 'html-entities';

function sanitizeInput(input: string): string {
    return encode(input);
}

export async function getFiles(username: string) {
    try {
        const sanitizedUsername = sanitizeInput(username);
        const response = await db.collection('files').getFullList({
            filter: `author = "${sanitizedUsername}"`,
            sort: '-created',
        });
        return response;
    } catch (error) {
        return [];
    }
}

export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function convertToBytes(sizeStr: string): number {
    const units: { [key: string]: number } = {
        'B': 1,
        'KB': 1024,
        'MB': 1024 * 1024,
        'GB': 1024 * 1024 * 1024,
        'TB': 1024 * 1024 * 1024 * 1024
    };
    const [size, unit] = sizeStr.split(' ');
    return parseFloat(size) * (units[unit] || 0);
}

export function calculateTotalFileSize(files: any[]): string {
    const totalBytes = files.reduce((acc, file) => acc + convertToBytes(file.fileSize), 0);
    return formatFileSize(totalBytes);
}

function isValidFileType(file: File): boolean {
    const validTypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif'];
    return validTypes.includes(file.type);
}

export async function uploadFiles(files: File[], username: string, onProgress: (progress: number) => void): Promise<void> {
    const validFiles = files.filter(isValidFileType);
    if (validFiles.length !== files.length) {
        throw new Error('Some files are not of the allowed types (SVG, PNG, JPG, GIF)');
    }
    const uploadPromises = validFiles.map(file => uploadSingleFile(file, username, onProgress));
    await Promise.all(uploadPromises);
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

async function uploadSingleFile(file: File, username: string, onProgress: (progress: number) => void): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!isValidFileType(file)) {
            reject(new Error('Invalid file type. Only SVG, PNG, JPG, and GIF are allowed.'));
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            reject(new Error(`File size exceeds the limit of ${formatFileSize(MAX_FILE_SIZE)}`));
            return;
        }

        const formData = new FormData();
        formData.append("image", file);
        formData.append("author", sanitizeInput(username));
        formData.append("fileSize", formatFileSize(file.size));

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/upload", true);
        
        const csrfToken = getCsrfToken();
        xhr.setRequestHeader("X-CSRF-Token", csrfToken);

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const progress = Math.round((event.loaded / event.total) * 100);
                onProgress(progress);
            }
        };

        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve();
            } else {
                reject(new Error('Upload failed'));
            }
        };

        xhr.onerror = () => {
            reject(new Error('Upload failed'));
        };

        xhr.send(formData);
    });
}

export function proxyImage(fileId: string, fileName: string): string {
    return `/api/image/${encodeURIComponent(fileId)}/${encodeURIComponent(fileName)}`;
}

export async function deleteImage(fileId: string): Promise<boolean> {
    try {
        await db.collection('files').delete(sanitizeInput(fileId));
        return true;
    } catch (error) {
        return false;
    }
}

export async function searchFiles(username: string, searchTerm: string) {
    try {
        const sanitizedUsername = sanitizeInput(username);
        const sanitizedSearchTerm = sanitizeInput(searchTerm);
        const response = await db.collection('files').getFullList({
            filter: `author = "${sanitizedUsername}" && (image ~ "${sanitizedSearchTerm}" || fileSize ~ "${sanitizedSearchTerm}")`,
            sort: '-created',
        });
        return response;
    } catch (error) {
        return [];
    }
}

export function getFileUploadCount(files: any[]): string {
    return `${files.length}`;
}

function getCsrfToken(): string {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
}