module.exports = (req, res, next) => {
    req.checkBody('currentPassword', 'Actual password is required').notEmpty();
    req.checkBody('newPassword', 'New password is invalid, please use six characters minimum!').isLength({ min: 6 });
    req.checkBody('newPasswordConfirm', 'New passwords doesn\'t match!').equals(req.body.newPassword);

    var errors = req.validationErrors();

    if (notequals(req.body.currentPassword, req.body.newPassword)) {
        res.json({ errCmp: "New password cannot be same as actual password!" });
    } else if (errors) {
        res.json({ errVld: errors });
    } else {
        next();
    }
}

const notequals = (current, password) => {
    if (current == password && current.length > 0 && password.length > 0) {
        return true; ƒ
    } else {
        return false;
    }
}