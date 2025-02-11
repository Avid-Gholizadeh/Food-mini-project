const express = require('express')
const multer = require('multer')
const path = require('path')
const cors = require('cors')
const fs = require('fs') // Import filesystem module

const app = express()

// Set up CORS
app.use(
    cors({
        origin: 'http://localhost:5173', // React app's URL
    })
)

// Set up multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public/uploads'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname) // Add timestamp to avoid name conflicts
    },
})

const upload = multer({storage})

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')))

// Handle file upload route
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.')
    }

    // Respond with original and new filenames
    res.send({
        originalFilename: req.file.originalname,
        newFilename: req.file.filename,
    })
})

// Handle file delete route
app.delete('/delete/:filename', (req, res) => {
    let {filename} = req.params

    // Decode the filename to handle spaces and special characters
    filename = decodeURIComponent(filename)

    const filePath = path.join(__dirname, 'public/uploads', filename)

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, err => {
        if (err) {
            return res.status(404).send('File not found.')
        }

        // Delete the file
        fs.unlink(filePath, err => {
            if (err) {
                return res.status(500).send('Error deleting file.')
            }

            res.send({message: 'File deleted successfully.'})
        })
    })
})

const port = 5001
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
