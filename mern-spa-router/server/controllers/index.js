
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

function commonHandleUpdateApi(response, err, resource, doNextCallbackFunction, successStatus) {
    if (err) {
        response.status(500).json(err);
    } else {
        if (doNextCallbackFunction) {
            doNextCallbackFunction();
        } else {
            response.json(resource).status(successStatus);
        }
    }
}

function commonHandlePostApi(response, err, resource, doNextCallbackFunction) {
    commonHandleUpdateApi(response, err, resource, doNextCallbackFunction, 201);
}

function commonHandlePutApi(response, err, resource, doNextCallbackFunction) {
    commonHandleUpdateApi(response, err, resource, doNextCallbackFunction, 200);
}

function commonHandleDeleteApi(response, err, resource, doNextCallbackFunction) {
    commonHandleUpdateApi(response, err, resource, doNextCallbackFunction, 200);
}

function errHandler(response, err) {
    //console.log(err);
    response.status(500).json(err);
}

module.exports = { commonHandleGetApi, commonHandlePostApi, commonHandlePutApi, commonHandleDeleteApi, errHandler }