import formidable from 'formidable';
import path from 'path';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const saveFile = async (file: any) => {
  const data = fs.readFileSync(file.path);
  fs.writeFileSync(`./public/${file.name}`, data);
  await fs.unlinkSync(file.path);
  return;
};

export default async function handler(req: any, res: any) {
  const form = formidable({
    uploadDir: path.join(process.cwd(), '/public'),
    filename: (name, ext, path, form) => {
      return Date.now().toString() + path.originalFilename;
    },
  });
  form.parse(req, async (errors, fields, files) => {
    res.json({ status: 200 });
  });
}
