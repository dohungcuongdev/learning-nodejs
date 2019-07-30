const eslintModel = require('../models/eslint');
const { errHandler } = require('./');

exports.getData = function (request, response) {
    const id = request.query.id;
    if (!id) {
        response.status(400).json({ error: 'Bad Request: Missing Id' });
    } else {
        eslintModel.getDataByIDPromise(id).then(function (eslintData) {
            response.status(200).json(getScannedData(eslintData));
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


/*

Assume that we will do the flow that checkstyle provides data as file XML or JSON (consider JSON for now) to our application

# Idea 1:
- If possible, Viewer frontend reads file json and displays, that all

# Idea 2:
- Viewer reads file json and displays
- to display backend reads file json and provide API for frontend

# Idea 3:
- Build another batch job working alongside with Viewer
- Batch job reads json file -> update database
- Viewer backend fetches data from database and provide API for frontend

# Idea 4:
- Build another batch job working alongside with Viewer
- Batch job reads json file -> update database
- Batch job triggers database itself and provides API, allows CORS for Viewer
- Viewer fontend gets API

# Idea 5:
- Build another batch job working alongside with Viewer
- Batch job reads json file -> update database
- Batch job triggers database itself and provides API
- Viewer backend exchanges API
- Viewer fontend gets API

# Idea 6:
- Viewer backend reads json file and update db
- Viewer backend gets data from DB and provides API
- Viewer frontend fetches API and displays

From 1-6: Code build does not need to import json file into DB.

# Idea 7:
- Let's code build import json file into DB.
- Viewer backend gets data from DB and provides API
- Viewer frontend fetches API and displays

# Idea 8:
- Is there any way before code build import one single json file into DB
as a collection, build such a thing (a command, app or whatever) that could
split a single file into smaller files. Each file may contain data as designed.
After that, These smaller json files will be imported as mutilple collections
in our DB by code build?
- Viewer backend gets data and provides API
- Viewer frontend fetches API and displays

# Idea 9:
- Let's code build import json file into DB as a single collection (E.g: collection: eslinct) then instead of reading json file, we could read data from the eslinct collection
- Build batch or build Viewer itself to read data from the eslinct collection and update data to other collections of this DB (or antoher DB if we are rich)
- Just ignore eslinct collection and concentrate on the other collections (or another DB) to get data and provide API for Viewer frontend

# Pros:
- Idea 1: super easy and fast to build our App
- Idea 2: easy and fast to build App, but not as easy and fast as Idea 1. reduce complexity of frontend, let backend handle business logic making more sense than idea 1
- Idea 3: having DB, can setup the period when DB will have new data
- Idea 4: having DB, can setup the period when DB will have new data, Viewer does not need to interact with the DB
- Idea 5: having DB, can setup the period when DB will have new data, Viewer does not need to interact with the DB, Viewer could handle logic itself, would not depend too much on the batch job
- Idea 6: having DB, Viewer works independently
- Idea 7: having DB, Viewer works independently, we don't need to build anything to read json file, DB will have new data after every build
- Idea 8: having DB, Viewer works independently, we don't need to build anything to read json file, DB will have new data after every build, DB look great, easy to use and maintain in the future
- Idea 9: having DB, DB will have new data after every build, we have both data from checktyle and data as expected in DB

# Cons:
- Idea 1: Viewer frontend needs to do everthing, no DB, unable to maintain in the future
- Idea 2: no DB, would be a nightmare to maintain this thing
- Idea 3: Need to build a batch job, DB is triggered by multiple applications, more complexity, more processes required to access a shared resource may lead to performance and timing issues.
- Idea 4: Need to build a batch job, Viewer frontend need to work directly with the API provided by the batch job, not easy to maintain as well as implement the code logic to make these 2 things understand each others
- Idea 5: Need to build a batch job, API is fetched and exchanged multiple times
- Idea 6: Viewer need to do everything from reading file to update db to providing API and displaying. since there is no batch job so everyday client need to trigger action reading file and update db manually
- Idea 7: the DB that code build imported is normally the json file, fetching data from this DB is a nightmare, DB will look like a mess and would be unmaintainable in the future
- Idea 8: maybe impossible or extremely difficult to do
- Idea 9: Data redundancy, need more steps to do than other ideas

*/

/*
# database: checkstyle

--------------------
# collections:

// to easily maintain the db, all the builds having the same repository on the same day should be overrided
// in case of building a batch job, we could setup the batch running on every single day, that means we can build multiple times on the same day and we may have multilple build json files. However, the batch will process the lastest flle on that day and execute so it will automatically match this requirement
build: {
    id,
    repository,
    created_at,
    count
}

scanned: {
    id,
    build_id,
    file_name,
    problem: [{
        line,
        column,
        severity,
        message,
        source
    }]
    created_at
}

// the rules will be configured at the beginning, we will store it in db by importing file from checkstyle or whatever
// the rules may be changed in the future but we don't need to link it to any other collections.
// we just need this collection to display for the clients
rules: {
    id,
    rule_name,
    description,
    isActivated,
    created_at,
    last_modified
}

# Things we could easily do:

+ Rules
- Client wants to see all the rules: query get all from collection rules
- Client wants to see specific rule: query from collection rules by id
- Client wants to search rule: query search from collection rules by name or description
- Client wants to check to day registing rule or sort by datime modified: query from collection rules by created_at, last_modified

+ Build
- Client wants to see all the builds: query get all from collection build
- Client wants to see specific build: query from collection build by id
- Client wants to see how many times built is triggered: query from collection build by count
- Client wants to see all the builds (one build may include many repositories) on a specific day: query from collection build by created_at
- Client wants search or sort the builds by date: query from collection build by created_at
- Client wants search or sort the builds by repository: query from collection build by repository

+ Repository:
- Client wants to see all the problems of a specific repository on a specific day: query get file_name, problem from scanned, build where scanned.created_at=build.created_at=specific_day and build.repository=specific_repository and scanned.build_id=build.build_id
- Client wants to search the problem by keyword: query from collections scanned by problem.message
- Client wants to search the problem by rule: query from collections scanned by problem.source
- Client wants to see all problems of a specific file on a specific day: query problem from collections scanned where file_name=specific_file and and created_at=specific_day
- Client wants to see all problems of a specific file of a specific repository on a specific day: query problem from collections scanned where scanned.file_name=specific_file and and scanned.created_at=build.created_at=specific_day and scanned.build_id=build.build_id and build.repository=specific_repository

+ Source code:
- Client wants to see the source code with the problem on this? I have no idea, the json file just contain the name of the file without any source code, I don't think that we should read the source code directly on github or via github API. There must be something more than just the json file that checkstyle provides for us, I guess.

# Example:

Suppose that
- repository xxxx-my-projectxxx1 was built only one time on 2020-01-03 and 3 times on 2020-01-04
- repository xxxx-my-projectxxx2 was built twice on 2020-01-03

- repository xxxx-my-projectxxx1 has 2 problems on file src/App.js and 1 problem on file index.js in the build on 2020-01-03
- repository xxxx-my-projectxxx1 has 1 problems on file src/components/Home.js in the build on 2020-01-04
- repository xxxx-my-projectxxx2 has 1 problems on file src/main/App.java in the build on 2020-01-03

build: [
    {
        id: bxxxxxx..1,
        repository: 'https://github.com/do-cuong-mulodo/xxxx-my-projectxxx1',
        created_at: '2020-01-03T21:21:38.032Z',
        count: 1
    },
    {
        id: bxxxxxx..2,
        repository: 'https://github.com/do-cuong-mulodo/xxxx-my-projectxxx2',
        created_at: '2020-01-03T21:21:38.032Z',
        count: 2
    },
    {
        id: bxxxxxx..3,
        repository: 'https://github.com/do-cuong-mulodo/xxxx-my-projectxxx1',
        created_at: '2020-01-04T21:21:38.032Z',
        count: 3
    }
]

scanned: [
    {
        id: sxxxxxx..1,
        build_id: bxxxxxx..1,
        file_name: 'src/App.js'
        problem: [
            {
                line: 10
                column: 3
                severity: warning
                message: 'Expected indentation of 20 spaces but found 8. (indent)'
                source: 'eslint.rules.indent'
            },
            {
                line: 14
                column: 2
                severity: error
                message: 'React is defined but never used. (no-unused-vars)'
                source: 'eslint.rules.no-unused-vars'
            }
        ]
        created_at: '2020-01-03T21:21:38.032Z'
    },
    {
        id: sxxxxxx..2,
        build_id: bxxxxxx..1,
        file_name: 'src/index.js'
        problem: {
            line: 3
            column: 5
            severity: error
            message: 'React is defined but never used. (no-unused-vars)'
            source: 'eslint.rules.no-unused-vars'
        }
        created_at: '2020-01-03T21:21:38.032Z'
    },
    {
        id: sxxxxxx..3,
        build_id: bxxxxxx..2,
        file_name: 'src/main/App.java'
        problem: {
            line: 10
            column: 9
            severity: error
            message: 'LOGGER is defined but never used. (no-unused-vars)'
            source: 'eslint.rules.no-unused-vars'
        }
        created_at: '2020-01-03T21:21:38.032Z'
    },
    {
        id: sxxxxxx..4,
        build_id: bxxxxxx..3,
        file_name: 'src/components/Home.js'
        problem: {
            line: 8
            column: 1
            severity: error
            message: 'React is defined but never used. (no-unused-vars)'
            source: 'eslint.rules.no-unused-vars'
        }
        created_at: '2020-01-04T21:21:38.032Z',
    }
]

- The rule is stored in DB but they should not have any relationship with other collections
because the older build might not have the rule yet or it is not activated or activivated
like it was in the past. If client clicks one a problem and wants to see the rule,
if it is availabe then display for the client, else Viewer should tell him that the
rule is no longer available in DB.

rules: [
    {
        id: rxxxxxx..1
        rule_name: 'eslint.rules.no-unused-vars'
        description: 'variable is defined but never used. (no-unused-vars)'
        isActivated: true
        created_at: '2018-01-04T21:21:38.032Z',
        last_modified: '2018-01-04T21:21:38.032Z'
    },
    {
        id: rxxxxxx..2
        rule_name: 'eslint.rules.indent'
        description: 'Expected indentation of 20 spaces but found 8. (indent)'
        isActivated: true
        created_at: '2018-01-04T21:21:38.032Z',
        last_modified: '2018-01-10T21:21:38.032Z'
    }
]

// Of course, we could design like this, it is ok to follow Embedded Data Models
- build and scanned become one collection eslinct:
eslinct: {
    id,
    repository,
    scanned: [{
        file_name,
        problem: [{
            line,
            column,
            severity,
            message,
            source
        }]
    }]
    created_at
}

// Or Normalized Data Models:
- scanned is split into 2 collections scanned_file and scanned_problem:
build: {
    id,
    repository,
    created_at,
    count
}

scanned_file: {
    id,
    build_id,
    file_name,
}

scanned_problem: {
    id,
    scanned_file_id,
    problem: {
        line,
        column,
        severity,
        message,
        source
    }
}

# Conclution:
- In my opinion, idea 8 is the best but I guess it is impossible to do.
- In case we could not do this, I recommend that we should go with idea 3 or 5. Since we
already have the json file. We just need to build a batch job that read the json file
and update DB as our design. That makes more sense than idea 7 because keeping the
bloody mess in our DB day by day will make it become unreadable, also difficult to check
whether we are fetching data from DB correctly or not. DB is the place we store the data
but we could not know exactly what in it, if so then I refer not using DB instead of
using this way.
- If building a batch job requires a lot of time and effort and we feel like it
is unnecessary then we could go with idea 6.

- Design App as idea 8:
On single day: Code build ->> json files --> Something (command, app, ...) ->> smaller json files with clear data (E.g: build.json, scanned.json) ->> import into DB --> Viewer backend ->> read DB and provide API --> Viewer frontend ->> display

- Design App as idea 3:
On a single day: Code build ->> json files (E.g: repo1_build1.json, repo2_build1.json, repo1_build2.json) --> Batch (read lastest build json file: repo2_build1, repo1_build2) ->>  update DB (collections: build, scanned) --> View backend ->> read DB and provide API --> Viewer frontend ->> display

- Design App as idea 5:
On a single day: Code build ->> json files (E.g: repo1_build1.json, repo2_build1.json, repo1_build2.json) --> Batch (read lastest build json file: repo2_build1, repo1_build2) ->>  update DB (collections: build, scanned) & provide API --> View backend ->> fetch batch's API and exchange --> Viewer frontend ->> display

- Design App as idea 6:
On a single day: Code build ->> json files (E.g: repo1_build1.json, repo2_build1.json, repo1_build2.json) --> Viewer backend (read lastest build json file: repo2_build1, repo1_build2) & update DB (collections: build, scanned) & provide API --> Viewer frontend ->> display

- System planning for idea 8
Viewer: just get data and display

- System planning for idea 3 & 5
Batch: setup running everyday at night, only trigger lastest build on the same repository
Viewer: just get data and display, if possible make a button to sync data from checkStyle, otherwise client needs to wait till the next day to see the change

- System planning for idea 6:
Viewer:
+ has a button onClick=syncDataFromCheckStyle, click on it will trigger read json files and update DB, then sync old data with lastest data
+ if client does not sync data from checkstyle then display old data from DB
+ the first time deploy app or if database is empty then trigger function syncDataFromCheckStyle

*/