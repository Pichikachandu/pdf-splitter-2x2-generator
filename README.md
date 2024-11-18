# PDF Converter Web Application
![image](https://github.com/user-attachments/assets/4bf9c994-2d0a-4adb-928f-4b5f658a2abc)

This project is a **PDF Converter Web Application** that allows users to upload a PDF, split it into images, and generate a 2x2 grid PDF from four selected images. Built with **Node.js**, **Express.js**, **Multer**, and **PDFKit**, it provides an interactive frontend and robust backend for file processing.

## Features

- **Upload PDFs:** Users can upload PDF files via a web form.
- **Split PDF into Images:** Convert each page of the uploaded PDF into high-quality PNG images.
- **Generate 2x2 PDF:** Combine four PNG images into a single A4-sized 2x2 grid PDF.
- **Dynamic File Handling:** Automatically manages uploaded files and generates downloadable output PDFs.
- **Clean User Interface:** A simple and responsive frontend built with HTML and CSS.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** HTML, CSS
- **File Handling:** Multer
- **PDF Processing:** PDFKit, pdf-poppler

## Folder Structure

```
pdfconverter/
├── uploads/             # Directory to store uploaded PDFs, images, and output files
│   ├── images/          # Stores PNG images generated from PDF pages
│   └── output/          # Stores generated 2x2 grid PDFs
├── public/              # Static files like HTML, CSS
├── server.js            # Main backend server file
└── README.md            # Project documentation
```

## Installation and Setup

### Prerequisites
- Node.js and npm installed
- Poppler installed for `pdf-poppler` functionality:
  - **Windows:** [Download Poppler for Windows](http://blog.alivate.com.au/poppler-windows/)
  - **Linux:** Install via `sudo apt install poppler-utils`
  - **MacOS:** Install via `brew install poppler`

### Steps to Set Up the Project
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/pdf-converter.git
   cd pdf-converter
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up directories:**
   Ensure the following directories exist in the project root:
   - `uploads/images`
   - `uploads/output`

4. **Run the server:**
   ```bash
   node server.js
   ```

5. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Upload a PDF:**
   - Navigate to the application homepage.
   - Select a PDF file to upload and split into images.

2. **Generate a 2x2 PDF:**
   - Click the "Generate 2x2 PDF" button to combine four images into a grid PDF.
   - A download link will be provided for the generated PDF.

## API Endpoints

### 1. Upload PDF
- **URL:** `/upload-pdf`
- **Method:** `POST`
- **Description:** Upload a PDF file and split it into images.
- **Request Body:**
  - Form-data with `pdfFile` (type: file)
- **Response:** JSON with a success message or error details.

### 2. Generate 2x2 PDF
- **URL:** `/generate-pdf`
- **Method:** `POST`
- **Description:** Generate a 2x2 grid PDF from 4 uploaded images.
- **Response:** JSON with a download link or error details.

## Known Issues

- The application requires exactly four images to generate a 2x2 PDF.
- No user authentication or file validation checks are implemented for production environments.

## Future Enhancements

- Support for dynamic layouts beyond 2x2 grids.
- Add image preview and selection before PDF generation.
- Implement user authentication and session management.
- Enable multi-page PDF uploads and batch processing.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **[pdf-poppler](https://github.com/vbuch/node-pdf-poppler):** For converting PDFs to images.
- **[PDFKit](https://pdfkit.org/):** For generating custom PDF documents.
- **Node.js Community:** For an amazing ecosystem of tools and libraries.

---

**Author:** [Chandu Pichika](https://github.com/Pichikachandu)

**Happy Coding!**
