![Banner](https://www.upload.ee/image/17120069/idk.png)

# CloudShad - Secure Cloud Storage

CloudShad is a secure cloud storage designed to protect your data with cutting-edge technology while providing easy access and sharing capabilities. This project uses SvelteKit for the frontend and PocketBase for the backend.

## Features

- Cloud Storage: Upload and download files from any device.
- File Sharing: Share files with anyone using a link.
- File Security: Protect your files with advanced security measures.
- Cross-Platform Sync: Sync your files across multiple devices (coming soon).

## Technologies Used

- Frontend: SvelteKit
- Backend: PocketBase
- Database: PocketBase (built-in database)

## Installation and Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up PocketBase:
   - Download and install PocketBase from the official website
   - Create two collections in PocketBase:
     a. "users" collection:
        - Fields: id, username, email, accountType, created, updated
     b. "files" collection:
        - Fields: id, image, author, fileSize, created, updated
   - Ensure proper permissions are set for each collection
4. Configure environment variables:
   - Create a `.env` file in the root directory of the project
   - Add the following line to the `.env` file:
     ```
     VITE_APP_DBURL=POCKETBASE_URL
     ```
   - Replace `POCKETBASE_URL` with the actual URL of your PocketBase instance
5. Run the development server: `npm run dev`

## PocketBase Configuration

To use CloudShad, you need to set up the following collections in PocketBase:

1. Users Collection:
   - Name: "users"
   - Fields:
     - id (auto-generated)
     - username (text)
     - email (email)
     - accountType (text)
     - created (date)
     - updated (date)

2. Files Collection:
   - Name: "files"
   - Fields:
     - id (auto-generated)
     - image (file)
     - author (text)
     - fileSize (number)
     - created (date)
     - updated (date)

Make sure to set appropriate validation rules and permissions for each field in the PocketBase Admin UI.

## API Endpoints

- `/api/upload`: Upload files
- `/api/image/:fileId/:fileName`: Proxy image requests

## User Authentication

- User registration and login functionality
- Password change feature
- Session management

## File Management

- Upload files (SVG, PNG, JPG, GIF)
- List user's files
- Delete files
- Search files

## Security Measures

- Input sanitization
- CSRF protection
- File type validation
- File size limit (5MB per file)

## License

This project is licensed under the MIT License.

## Contact

- Personal Telegram: https://t.me/queaxtra
- UnoxDevs Telegram: https://t.me/unoxdevs