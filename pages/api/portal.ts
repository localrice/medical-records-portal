import formidable from "formidable";
import path from "path";
import fs from "fs";
import { MongoClient } from "mongodb";
export const config = {
    api: {
        bodyParser: false,
    },
};
const uri =
    "shit here";
const client = new MongoClient(uri);
console.log("Initilialized client")

async function createListing(client:any, newListing:any) {
    const result = await client
        .db("krat-records")
        .collection("medical-records")
        .insertOne(newListing);
}

const saveFile = async (file: any) => {
    const data = fs.readFileSync(file.path);
    fs.writeFileSync(`./uploads/${file.name}`, data);
    await fs.unlinkSync(file.path);
    return;
};
let telName: any;
export default async function handler(req: any, res: any) {
    const form = formidable({
        uploadDir: path.join(process.cwd(), "/uploads"),
        filename: (name, ext, path, form) => {
            telName = Date.now().toString() + path.originalFilename;
            return Date.now().toString() + path.originalFilename;
        },
    });
    form.parse(req, async (errors, fields, files) => {
        console.log(fields);
        console.log(telName);
        await createListing(client,{
          name: fields.fullName,
          adharNumber: fields.adharNumber,
          fileName: `/uploads/${telName}`
      })
        res.json({ status: 200 });
    });
}
