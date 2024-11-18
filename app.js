const express = require('express');
const multer = require('multer');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');
const poppler = require('pdf-poppler');  // For PDF to image conversion

const app = express();
const port = 3000;

// Define the absolute path for uploads, images, and output folders
const uploadDir = path.join('C:', 'Users', 'chand', 'OneDrive', 'Desktop', 'pdfconverter', 'uploads');
const imageDir = path.join(uploadDir, 'images');
const outputDir = path.join(uploadDir, 'output');

// Ensure necessary directories exist
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

app.use(express.static('public')); // Serve static files like index.html
app.use(express.json()); // For parsing JSON bodies

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imageDir); // Store images in the images folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});
const upload = multer({ storage: storage });

// Endpoint to upload a PDF, which will be converted to images
app.post('/upload-pdf', upload.single('pdfFile'), async (req, res) => {
    const file = req.file;
    if (!file || file.mimetype !== 'application/pdf') {
        return res.status(400).json({ error: 'Please upload a valid PDF file.' });
    }

    const pdfPath = file.path;

    // Convert the uploaded PDF into images using pdf-poppler
    const options = {
        format: 'png',
        out_dir: imageDir,
        out_prefix: 'page_',
        page: null // This will convert all pages
    };

    try {
        await poppler.convert(pdfPath, options);

        // Send success response after PDF is split into images
        res.json({ message: 'PDF uploaded and split into images.', status: 'success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to split PDF into images.' });
    }
});

// Endpoint to generate a 2x2 PDF from 4 images in the images folder
app.post('/generate-pdf', (req, res) => {
    const imageFiles = fs.readdirSync(imageDir).filter(file => file.endsWith('.png')); // Get all images

    // Ensure there are exactly 4 images
    if (imageFiles.length !== 4) {
        return res.status(400).json({ error: 'There must be exactly 4 images to generate a 2x2 PDF.' });
    }

    // Create a PDF document
    const doc = new PDFDocument({ size: 'A4' });
    const pdfPath = path.join(outputDir, `converted-${Date.now()}.pdf`);
    doc.pipe(fs.createWriteStream(pdfPath));

    // Define positions and sizes for the images in the 2x2 grid
    const imageWidth = 280;
    const imageHeight = 200;
    const xPos = [0, 290];  // X positions for 2 columns
    const yPos = [0, 230];  // Y positions for 2 rows

    imageFiles.forEach((file, i) => {
        const imagePath = path.join(imageDir, file);  // Ensure the absolute path is used
        doc.image(imagePath, xPos[i % 2], yPos[Math.floor(i / 2)], { width: imageWidth, height: imageHeight });
    });

    doc.end();

    // After the PDF is finished, send the download link
    doc.on('finish', () => {
        res.json({
            downloadLink: `http://localhost:${port}/uploads/output/${path.basename(pdfPath)}`
        });

        // Optionally clean up images after processing
        imageFiles.forEach(file => fs.unlinkSync(path.join(imageDir, file)));
    });

    // Handle error events
    doc.on('error', (err) => {
        console.error("Error generating PDF:", err);
        res.status(500).json({ error: 'Error generating the PDF.' });
    });
});

// Serve the processed PDF file for download
app.use('/uploads', express.static(uploadDir));

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
