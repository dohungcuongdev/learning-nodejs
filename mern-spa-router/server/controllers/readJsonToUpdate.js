var fs = require('fs');
const { errHandler } = require('./');
var Client = require('node-rest-client').Client;
var client = new Client();

const buildModle = require('../models/build');
const scannedFileModel = require('../models/scanned_file');
const scannedProblemModel = require('../models/scanned_problem');

exports.readJsonAndUpdate = function (request, response) {
    const JSON_URL = 'http://localhost:8081/scan/eslint-test.json';
    client.get(JSON_URL, async function (data, res) {
        try {
            await readDataAndUpdate(data);
            response.status(200).json('data updated');
        } catch (e) {
            errHandler(response, e)
        }
    }).on('error', function (err) {
        errHandler(response, err)
    });
};

const readDataAndUpdate = async eslintData => {
    if (hasArrayElements(eslintData)) {
        const repository = 'my-repo-1';
        //const oldBuild = await buildModle.find({ repository }, { created_at: { "$gte": getToday(), "$lt": getTomorrow() } });
        const oldBuild = await buildModle.findOne({ repository }).sort({ build_count: -1 }).limit(1);
        let build_count = (oldBuild) ? oldBuild.build_count+1 : 1;
        eslintData.elements.map(wrapperElement => {
            const build = new buildModle({ repository, build_count });
            build.save();
            if (isElement(wrapperElement, 'checkstyle')) {
                if (hasArrayElements(wrapperElement)) {
                    wrapperElement.elements.map(innerElement => {
                        if (isElement(innerElement, 'file')) {
                            const file_name = getAttribute(innerElement.attributes, 'name', '');
                            const scanned_file = new scannedFileModel({ file_name, repository, build_count });
                            scanned_file.save();
                            if (hasArrayElements(innerElement)) {
                                let elementsOfInnerElement = innerElement.elements;
                                let l = elementsOfInnerElement.length;
                                for (let i = 0; i < l; i++) {
                                    let nextElement = elementsOfInnerElement[i];
                                    if (isElement(nextElement, 'error')) {
                                        let nextElementAttributes = nextElement.attributes;
                                        const line = getAttribute(nextElementAttributes, 'line', 0);
                                        const column = getAttribute(nextElementAttributes, 'column', 0);
                                        const severity = getAttribute(nextElementAttributes, 'severity', '');
                                        const message = getAttribute(nextElementAttributes, 'message', '');
                                        const source = getAttribute(nextElementAttributes, 'source', '');
                                        const scanned_problem = new scannedProblemModel({ repository, build_count, file_name, line, column, severity, message, source });
                                        scanned_problem.save();
                                    }
                                }
                            }
                        }
                    })
                }
            }
        })
    }
}

const getToday = () => {
    return getDateWithTime(new Date());
}

const getTomorrow = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1)
    return getDateWithTime(date);
}

const getDateWithTime = (date) => {
    console.log(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

const isArray = a => {
    return a && Array.isArray(a) && a.length > 0;
}

const hasArrayElements = e => {
    return e && isArray(e.elements);
}

const getAttribute = (attributes, name, defaultValue) => {
    if (attributes && attributes[name]) {
        return attributes[name];
    }
    return defaultValue;
}

const isElement = (e, kind) => {
    if (e && e.type && e.name && e.type === 'element' && e.name === kind) {
        return true;
    }
    return false;
}
