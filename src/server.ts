import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { Router, Request, Response } from 'express';

const router: Router = Router();

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  
  
  //! END @TODO1
 
  app.get( "/filteredimage", async(req:express.Request, res:express.Response) => {
    let {image_url} = req.query;
    //  1. validate the image_url query
    if (!image_url){
      res.status(400).send('Error: The submitted url is empty');
    } else {
      //  2. call filterImageFromURL(image_url) to filter the image
      await filterImageFromURL(image_url).then( function (image_filtered_path){
        //  3. send the resulting file in the response
        res.sendFile(image_filtered_path, () => {  
            // 4. deletes any files on the server on finish of the response     
            deleteLocalFiles([image_filtered_path]);       
        });   
      }).catch(function(err){
        res.status(400).send('Error:' + err + 'For some reason the image cannot be filtered.');
      });  

    }
  });
//! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}");
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();