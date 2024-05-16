var Contratos = require("../models/contratos")


module.exports.listTotal = () => {
    return Contratos
        .find()
        .exec()
}

module.exports.findById = id => {
    return Contratos
        .findOne({_id : id})
        .exec()
}

module.exports.insert = contrato => {
    var newContrato = new Contratos(contrato)
    return newContrato.save()
}

module.exports.delete = id => {
    return Contratos
        .deleteOne({_id: id})
        .exec()
}

module.exports.update = (contrato,id) => {
    return Contratos
        .findOneAndUpdate({_id: id}, contrato)
        .exec()
}


module.exports.findByEntidade = entidade => {
    return Contratos
            .find({"entidade_comunicante": entidade})
            .exec();
};

module.exports.findByTipoProcedimento = tipo => {
    return Contratos
            .find({"tipoprocedimento": tipo})
            .exec();
};

module.exports.listEntidades = () => {
    return Contratos
            .distinct("entidade_comunicante")
            .sort()
};

module.exports.listTipos = () => {
    return Contratos
        .distinct("tipoprocedimento")
        .sort()
};

module.exports.findByEntidadeNum = entidade => {
    return Contratos
        .findOne({"NIPC_entidade_comunicante": entidade}, 'entidade_comunicante')
        .exec();
};