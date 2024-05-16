var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res, next) {
  axios.get("http://localhost:16000/contratos")
        .then(resp => {
          contratos = resp.data
          res.status(200).render("startPage", {"clist": contratos})
        })
        .catch( erro =>{
          res.status(502).render("error", {"error": erro})
        })
});


router.get('/:idContrato', function(req, res, next) {
  var id = req.params.idContrato
  axios.get("http://localhost:16000/contratos/" + id)
    .then(resp => {
      c = resp.data
      res.status(200).render("contratoPage", {"contrato": c})
    })
    .catch( erro =>{
      res.status(503).render("error", {"error": erro})
    })
});


router.get('/entidades/:nipc', function(req, res, next) {
  nipc = req.params.nipc
  axios.get("http://localhost:16000/contratos?ent=" + nipc)
        .then(resp => {
          nome = resp.data["entidade_comunicante"]
          axios.get("http://localhost:16000/contratos?entidade=" + nome)
            .then(resp => {
              lista = resp.data

              let totalPrecoContratual = 0;
              for (const contrato of lista) {
                  totalPrecoContratual += parseFloat(contrato.precoContratual.replace(',', '.')) || 0;
              }

              res.status(200).render("entidadePage", {"nome": nome,"nipc" : nipc, "clist": lista, "totalPrecoContratual": totalPrecoContratual.toFixed(2)})
            })
            .catch( erro => {
              res.status(504).render("error", {"error": erro})
            })
        })
        .catch( erro => {
          res.status(504).render("error", {"error": erro})
        })
});



module.exports = router;
