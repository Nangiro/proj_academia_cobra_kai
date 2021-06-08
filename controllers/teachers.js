exports.create = function(req,res) {
    return res.render("teachers/create")
}

exports.check = function(req,res) {
    return res.render("teachers/check")
}

exports.update = function(req,res) {
    return res.render("teachers/update")
}

exports.delete = function(req,res) {
    return res.render("teachers/delete")
}