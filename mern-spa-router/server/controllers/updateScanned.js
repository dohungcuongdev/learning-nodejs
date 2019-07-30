const eslintModel = require('../models/eslint');
const scannedModel = require('../models/scanned');
const { errHandler } = require('./');

const BUILD_ID_TEST = 1;

exports.getDataAndUpdateScanned = function (request, response) {
    const id = request.query.id;
    if (!id) {
        response.status(400).json({ error: 'Bad Request: Missing Id' });
    } else {
        eslintModel.getDataByIDPromise(id).then(function (eslintData) {
            const scanned = getScannedData(eslintData);
            scannedModel.insertMany(scanned); // need to do more, E.g check build_id before insert
            response.status(200).json(scanned);
        }, err => errHandler(response, err));
    }
};

const getScannedData = eslintData => {
    let scanned = [];
    if (hasArrayElements(eslintData)) {
        eslintData.elements.map(wrapperElement => {
            if (isElement(wrapperElement, 'checkstyle')) {
                if (hasArrayElements(wrapperElement)) {
                    wrapperElement.elements.map((innerElement, scannedIndex) => {
                        if (isElement(innerElement, 'file')) {
                            scanned[scannedIndex] = {};
                            scanned[scannedIndex].build_id = BUILD_ID_TEST;
                            scanned[scannedIndex].file_name = getAttribute(innerElement.attributes, 'name');
                            let problems = [];
                            if (hasArrayElements(innerElement)) {
                                let elementsOfInnerElement = innerElement.elements;
                                let l = elementsOfInnerElement.length;
                                for (let i = 0; i < l; i++) {
                                    let nextElement = elementsOfInnerElement[i];
                                    if (isElement(nextElement, 'error')) {
                                        problems[i] = {};
                                        problems[i] = getObjectAttributes(nextElement.attributes);
                                    }
                                }
                            }
                            scanned[scannedIndex].problems = problems;
                        }
                    })
                }
            }
        })
    }
    return scanned;
}

exports.getScannedData = getScannedData;

const isArray = a => {
    return a && Array.isArray(a) && a.length > 0;
}

const hasArrayElements = e => {
    return e && isArray(e.elements);
}

const getAttribute = (attributes, name) => {
    if (attributes && attributes[name]) {
        return attributes[name];
    }
    return '';
}

const getObjectAttributes = attributes => {
    if (attributes) {
        return Object.assign({}, attributes);
    }
    return {};
}

const isElement = (e, kind) => {
    if (e && e.type && e.name && e.type === 'element' && e.name === kind) {
        return true;
    }
    return false;
}