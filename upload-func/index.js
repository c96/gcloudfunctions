const storage = require('@google-cloud/storage')();

const bucketname = 'functioncreated';

/**
 * HTTP function that generates a signed URL
 * The signed URL can be used to upload files to Google Cloud Storage (GCS)
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.getSignedUrl = (req, res) => {
  if (req.method === 'POST') {
    // TODO(developer) check that the user is authorized to upload

    // Get a reference to the destination file in GCS
    const file = storage.bucket(bucketname).file(req.body.filename);

    // Create a temporary upload URL
    const expiresAtMs = Date.now() + 300000; // Link expires in 5 minutes
    const config = {
      action: 'write',
      expires: expiresAtMs,
      contentType: req.body.contentType
    };

    file.getSignedUrl(config, function (err, url) {
      if (err) {
        console.error(err);
        res.status(500).end();
        return;
      }
      res.send(url);
    });
  } else {
    // Return a "method not allowed" error
    res.status(405).end();
  }
};