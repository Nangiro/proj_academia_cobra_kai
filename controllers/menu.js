//INDEX
exports.index = function(req,res) {
    return res.render("menu/index")
}

exports.giveAdmRole = function(req,res) {
    return res.render("menu/giveAdmRole")
}

exports.giveSecretaryRole = function(req,res) {
    return res.render("menu/giveSecretaryRole")
}