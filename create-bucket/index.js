  // Imports the Google Cloud client library
  const { Storage } = require('@google-cloud/storage');

  // Your Google Cloud Platform project ID
  const projectId = 'cloudfunctionscloudstorage';

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.createbucket = (req, res) => {
  let message = req.query.message || req.body.message || 'Attempted Bucket Upload!';

  // Creates a client
  const storage = new Storage({
    projectId: projectId,
  });

  // The name for the new bucket
  const bucketName = 'functioncreated';
 
  // Creates the new bucket
  storage
    .createBucket(bucketName)
    .then(() => {
      console.log(`Bucket ${bucketName} created.`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  
  res.status(200).send(message);
};

