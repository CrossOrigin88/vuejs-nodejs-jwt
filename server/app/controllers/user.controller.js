exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userPage = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminPage = (req, res) => {
    res.status(200).send("Admin Content.");
};