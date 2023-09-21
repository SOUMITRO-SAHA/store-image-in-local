import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import imageModels from '../models/image.models.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadImage = async (req, res) => {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: err.message || err,
      });
    }

    if (!files.images) {
      return res.status(400).json({
        error: 'No images provided',
      });
    }

    try {
      // Handle Image Upload
      const uploadFolderPath = path.join(__dirname, '../uploads/courses');
      const photo = files.images;
      const filePath = photo[0].filepath;
      const data = fs.readFileSync(filePath);
      const imageExtension = photo[0].mimetype.split('/')[1];
      const imageName = `${Date.now()}.${imageExtension}`;
      const imagePath = path.join(uploadFolderPath, imageName);
      fs.writeFileSync(imagePath, data);

      // Create the course
      const newImage = await imageModels.create({
        url: imagePath,
      });
      res.status(200).json({
        success: true,
        message: 'Course created successfully',
        images: newImage,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while creating a new course',
        error: error.message,
      });
    }
  });
};
