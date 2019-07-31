const eslintModel = require('../models/eslint');
const buildModel = require('../models/build');
const { errHandler } = require('./');

exports.getAllBuilds = function(request, response) {
    buildModel.find().then((builds) => {
        response.status(200).json(builds);
    }, e => errHandler(response, err));
}

exports.getData = function (request, response) {
    eslintModel.getDataPromise().then(function (eslintArray) {
        let builds = [];
        if (isArray(eslintArray)) {
            eslintArray.map((eslintData, buildIndex) => {
                builds[buildIndex] = {};
                let scanned = [];
                if (hasArrayElements(eslintData)) {
                    eslintData.elements.map(wrapperElement => {
                        if (isElement(wrapperElement, 'checkstyle')) {
                            if (hasArrayElements(wrapperElement)) {
                                wrapperElement.elements.map((innerElement, scannedIndex) => {
                                    if (isElement(innerElement, 'file')) {
                                        scanned[scannedIndex] = {};
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
                builds[buildIndex].scanned = scanned;
            })
        }
        response.status(200).json(builds);
    }, err => errHandler(response, err));
};

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