exports.check = function(req,res) {
    return res.render("secretaries/check")
}

exports.create = function(req,res) {
    return res.render("secretaries/create")
}

exports.update = function(req,res) {
    return res.render("secretaries/update")
}

exports.delete = function(req,res) {
    return res.render("secretaries/delete")
}