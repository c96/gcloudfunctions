  // Your Google Cloud Platform project ID
  const projectId = 'cloudfunctionscloudstorage';

// Imports the Google Cloud client library
const Datastore = require('@google-cloud/datastore');
const datastore = new Datastore({
    projectId: projectId,
});


/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.addEvent = (req, res) => {

    console.log(req.body);
  
  // The Cloud Datastore key for the new entity
    const eventKey = datastore.key('Event');

    // Prepares the new entity
    const entity = {
        key: eventKey,
        data: req.body
    };

    // Saves the entity
    datastore
        .save(entity)
        .then(() => {
            console.log(`Saved ${entity.key.name}: ${entity.data.description}`);
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
};
