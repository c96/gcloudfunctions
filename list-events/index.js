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
exports.listEvents = (req, res) => {
  const query = datastore.createQuery('Event').limit(10).order('Date', {
        descending: true,
    });
    let eventList = [];

    datastore
        .runQuery(query)
        .then(results => {
            const events = results[0];
            events.forEach(event => {
                const date = new Date(event.Date);

                eventList.push({
                    Title: event.Title,
                    Location: event.Address,
                    Date: date.toLocaleDateString("en-US"),
                    Id: event[datastore.KEY].path[1]
                });
            });
            //console.log(list);
            res.send(eventList);
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
};
