const { songs } = require("../repository/repository-wrapper");

function songValidate(req, res, next) {
    let songs = req.body;
    let properties = [
        { name: "title", type: "string" },
        { name: "album", type: "string" },
        { name: "artist", type: "string" },
        { name: "genre", type: "string" },
        { name: "releaseDate", type: "number" },
    ];
    for (const property of properties) {
        if (
            songs.hasOwnProperty(property.name) &&
            typeof (songs[property.name] === property.type)
            && songs[property.name] != ""
        ) {
    continue;
}   else {
    return res.status(403).send(`Song body not valid!`);
}
    }
return next();
}

module.exports = songValidate;