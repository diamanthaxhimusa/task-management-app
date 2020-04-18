module.exports = {
    sendNotFoundErr: res => {
        res.statusCode = 404;
        res.end();
    },
    sendNotFoundErrWithMsg: (res, msg) => {
        res.statusCode = 404;
        res.json({ err: msg });
    },
    sendConflictErrWithMsg: (res, msg) => {
        res.statusCode = 409;
        res.statusMessage = msg;
        res.json({ err: msg });
    },
    sendAuthErrWithMsg: (res, msg) => {
        res.statusCode = 401;
        res.json({ err: msg });
    },
    sendInvalidDataErr: (res, invalidData) => {
        res.statusCode = 400;
        res.statusMessage = 'Invalid Data';
        res.json({ err: invalidData });
    },
    sendDbErr: (res, err) => {
        res.statusCode = 500;
        res.statusMessage = 'Database Error';
        res.json({ err: err })
    }
}