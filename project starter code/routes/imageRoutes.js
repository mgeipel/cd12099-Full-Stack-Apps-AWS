import express from "express";
import { filterImageFromURL, deleteLocalFiles } from '../util/util.js';

export const router = express.Router();

// @TODO1 IMPLEMENT A RESTFUL ENDPOINT
// GET /filteredimage?image_url={{URL}}
// endpoint to filter an image from a public url.
// IT SHOULD
//    1
//    1. validate the image_url query
//    2. call filterImageFromURL(image_url) to filter the image
//    3. send the resulting file in the response
//    4. deletes any files on the server on finish of the response
// QUERY PARAMATERS
//    image_url: URL of a publicly accessible image
// RETURNS
//   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

/**************************************************************************** */

//! END @TODO1

router.get("/filteredimage", async (req, res) => {
    let { image_url } = req.query;

    if (!image_url) {
        return res.status(400).send("image_url is required");
    }
    console.log(image_url);
    try {
        const filteredpath = await filterImageFromURL(image_url);
        res.status(200).sendFile(filteredpath, _ => deleteLocalFiles([filteredpath]));
    }
    catch (error) {
        return res.status(422).send("422 - " + error);
    }
});