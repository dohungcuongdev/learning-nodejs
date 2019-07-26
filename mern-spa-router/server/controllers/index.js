
function commonHandleGetApi(response, err, resource, doNextCallbackFunction) {
    if (err) {
        response.status(500).json(err);
    } else {
        if (resource == null) {
            response.status(404).json({error: 'Resource not found'});
        } else {
            if (doNextCallbackFunction) {
                doNextCallbackFunction();
            } else {
                response.status(200).json(resource);
            }
        }
    }
}

function commonHandlePostApi(response, err, resource, doNextCallbackFunction) {
    if (err) {
        response.status(500).json(err);
    } else {
        if (doNextCallbackFunction) {
            doNextCallbackFunction();
        } else {
            response.json(resource).status(201);
        }
    }
}

function commonHandleDeleteApi(response, err, resource, doNextCallbackFunction) {
    if (err) {
        return response.status(500).json(err);
    } else {
        if (doNextCallbackFunction) {
            doNextCallbackFunction();
        } else {
            response.json(resource);
        }
    }
}

module.exports = { commonHandleGetApi, commonHandlePostApi, commonHandleDeleteApi }