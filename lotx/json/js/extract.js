/*ESTRAIR VALORES DO JSON*/

fetch("destaque.json")
    .then(response => response.json()) 
    .then(result => {

        var destaque_0 = result.payload[0];
        var destaque_1 = result.payload[1];
        var destaque_2 = result.payload[2];
        var destaque_3 = result.payload[3];
        var destaque_4 = result.payload[4];
        var destaque_5 = result.payload[5];
        var destaque_6 = result.payload[6];
        var destaque_7 = result.payload[7];
        var destaque_8 = result.payload[8];
        var destaque_9 = result.payload[9];
        var destaque_10 = result.payload[10];


    //CARD 0                  

        //objeto acumulou retorna true ou false. se true imprimir "ACUMULOU"
      var acumulou_0 = destaque_0.acumulou;
        if (acumulou_0 == true) {
        acumulou_0 = "ACUMULOU";
        }
        else{
         acumulou_0 = "";
        }



        document.getElementById("modalidade_0").textContent = destaque_0.modalidade
      //document.getElementById("valor_0").textContent = destaque_0.modalidadeDetalhada.valor;
      //document.getElementById("descricao_0").textContent = destaque_0.modalidadeDetalhada.descricao;
      //document.getElementById("descricaoEspecial_0").textContent = destaque_0.modalidadeDetalhada.descricaoEspecial;
      //document.getElementById("tipoConcurso_0").textContent = destaque_0.tipoConcurso;
      document.getElementById("acumulou_0").textContent = acumulou_0;
      document.getElementById("estimativa_0").textContent = destaque_0.estimativa;
      ///document.getElementById("numero_0").textContent = destaque_0.numero;
      //document.getElementById("dataFechamento_0").textContent = destaque_0.dataFechamento;
      //document.getElementById("dataAbertura_0").textContent = destaque_0.dataAbertura;
      document.getElementById("dataHoraSorteio_0").textContent = destaque_0.dataHoraSorteio;
      //document.getElementById("valorApostaMinima_0").textContent = destaque_0.valorApostaMinima;

      document.getElementById("sorteio_data_0").textContent = 'Nº' + destaque_0.numero + '   ' + '|' + '   ' + destaque_0.dataHoraSorteio;
      document.getElementById("premio_estimado_0").textContent = 'Prêmio estimado do concurso' + destaque_0.numero;



      

    //CARD 1                 


      var acumulou_1 = destaque_1.acumulou_1;
        if (acumulou_1 == true) {
        acumulou_1 = "ACUMULOU";
        }
        else{
         acumulou_1 = "";
        }

        document.getElementById("modalidade_1").textContent = destaque_1.modalidade
      //document.getElementById("valor_1").textContent = destaque_1.modalidadeDetalhada.valor;
      //document.getElementById("descricao_1").textContent = destaque_1.modalidadeDetalhada.descricao;
      //document.getElementById("descricaoEspecial_1").textContent = destaque_1.modalidadeDetalhada.descricaoEspecial;
      //document.getElementById("tipoConcurso_1").textContent = destaque_1.tipoConcurso;
      document.getElementById("acumulou_1").textContent = acumulou_1;
      document.getElementById("estimativa_1").textContent = destaque_1.estimativa;
      ///document.getElementById("numero_1").textContent = destaque_1.numero;
      //document.getElementById("dataFechamento_1").textContent = destaque_1.dataFechamento;
      //document.getElementById("dataAbertura_1").textContent = destaque_1.dataAbertura;
      document.getElementById("dataHoraSorteio_1").textContent = destaque_1.dataHoraSorteio;
      //document.getElementById("valorApostaMinima_1").textContent = destaque_1.valorApostaMinima;

      document.getElementById("sorteio_data_1").textContent = 'Nº' + destaque_1.numero + '   ' + '|' + '   ' + destaque_1.dataHoraSorteio;
      document.getElementById("premio_estimado_1").textContent = 'Prêmio estimado do concurso' + destaque_1.numero;

       
    //CARD 2                 

    var acumulou_2 = destaque_2.acumulou;
        if (acumulou_2 == true) {
        acumulou_2 = "ACUMULOU";
        }
        else{
         acumulou_2 = "";
        }

        document.getElementById("modalidade_2").textContent = destaque_2.modalidade
      //document.getElementById("valor_2").textContent = destaque_2.modalidadeDetalhada.valor;
      //document.getElementById("descricao_2").textContent = destaque_2.modalidadeDetalhada.descricao;
      //document.getElementById("descricaoEspecial_2").textContent = destaque_2.modalidadeDetalhada.descricaoEspecial;
      //document.getElementById("tipoConcurso_2").textContent = destaque_2.tipoConcurso;
      document.getElementById("acumulou_2").textContent = acumulou_2;
      document.getElementById("estimativa_2").textContent = destaque_2.estimativa;
      ///document.getElementById("numero_2").textContent = destaque_2.numero;
      //document.getElementById("dataFechamento_2").textContent = destaque_2.dataFechamento;
      //document.getElementById("dataAbertura_2").textContent = destaque_2.dataAbertura;
      document.getElementById("dataHoraSorteio_2").textContent = destaque_2.dataHoraSorteio;
      //document.getElementById("valorApostaMinima_2").textContent = destaque_2.valorApostaMinima;

      document.getElementById("sorteio_data_2").textContent = 'Nº' + destaque_2.numero + '   ' + '|' + '   ' + destaque_2.dataHoraSorteio;
      document.getElementById("premio_estimado_2").textContent = 'Prêmio estimado do concurso' + destaque_2.numero;


    //CARD 3                 

      var acumulou_3 = destaque_3.acumulou;
        if (acumulou_3 == true) {
        acumulou_3 = "ACUMULOU";
        }
        else{
         acumulou_3 = "";
        }

        document.getElementById("modalidade_3").textContent = destaque_3.modalidade
      //document.getElementById("valor_3").textContent = destaque_3.modalidadeDetalhada.valor;
      //document.getElementById("descricao_3").textContent = destaque_3.modalidadeDetalhada.descricao;
      //document.getElementById("descricaoEspecial_3").textContent = destaque_3.modalidadeDetalhada.descricaoEspecial;
      //document.getElementById("tipoConcurso_3").textContent = destaque_3.tipoConcurso;
      document.getElementById("acumulou_3").textContent = acumulou_3;
      document.getElementById("estimativa_3").textContent = destaque_3.estimativa;
      ///document.getElementById("numero_3").textContent = destaque_3.numero;
      //document.getElementById("dataFechamento_3").textContent = destaque_3.dataFechamento;
      //document.getElementById("dataAbertura_3").textContent = destaque_3.dataAbertura;
      document.getElementById("dataHoraSorteio_3").textContent = destaque_3.dataHoraSorteio;
      //document.getElementById("valorApostaMinima_3").textContent = destaque_3.valorApostaMinima;

      document.getElementById("sorteio_data_3").textContent = 'Nº' + destaque_3.numero + '   ' + '|' + '   ' + destaque_3.dataHoraSorteio;
      document.getElementById("premio_estimado_3").textContent = 'Prêmio estimado do concurso' + destaque_3.numero;


    //CARD 4                 

    var acumulou_4 = destaque_4.acumulou;
        if (acumulou_4 == true) {
        acumulou_4 = "ACUMULOU";
        }
        else{
         acumulou_4 = "";
        }

        document.getElementById("modalidade_4").textContent = destaque_4.modalidade
      //document.getElementById("valor_4").textContent = destaque_4.modalidadeDetalhada.valor;
      //document.getElementById("descricao_4").textContent = destaque_4.modalidadeDetalhada.descricao;
      //document.getElementById("descricaoEspecial_4").textContent = destaque_4.modalidadeDetalhada.descricaoEspecial;
      //document.getElementById("tipoConcurso_4").textContent = destaque_4.tipoConcurso;
      document.getElementById("acumulou_4").textContent = acumulou_4;
      document.getElementById("estimativa_4").textContent = destaque_4.estimativa;
      ///document.getElementById("numero_4").textContent = destaque_4.numero;
      //document.getElementById("dataFechamento_4").textContent = destaque_4.dataFechamento;
      //document.getElementById("dataAbertura_4").textContent = destaque_4.dataAbertura;
      document.getElementById("dataHoraSorteio_4").textContent = destaque_4.dataHoraSorteio;
      //document.getElementById("valorApostaMinima_4").textContent = destaque_4.valorApostaMinima;

      document.getElementById("sorteio_data_4").textContent = 'Nº' + destaque_4.numero + '   ' + '|' + '   ' + destaque_4.dataHoraSorteio;
      document.getElementById("premio_estimado_4").textContent = 'Prêmio estimado do concurso' + destaque_4.numero;

    //CARD 5                  


    var acumulou_5 = destaque_5.acumulou;
        if (acumulou_5 == true) {
        acumulou_5 = "ACUMULOU";
        }
        else{
         acumulou_5 = "";
        }

        document.getElementById("modalidade_5").textContent = destaque_5.modalidade
      //document.getElementById("valor_5").textContent = destaque_5.modalidadeDetalhada.valor;
      //document.getElementById("descricao_5").textContent = destaque_5.modalidadeDetalhada.descricao;
      //document.getElementById("descricaoEspecial_5").textContent = destaque_5.modalidadeDetalhada.descricaoEspecial;
      //document.getElementById("tipoConcurso_5").textContent = destaque_5.tipoConcurso;
      document.getElementById("acumulou_5").textContent = acumulou_5;
      document.getElementById("estimativa_5").textContent = destaque_5.estimativa;
      ///document.getElementById("numero_5").textContent = destaque_5.numero;
      //document.getElementById("dataFechamento_5").textContent = destaque_5.dataFechamento;
      //document.getElementById("dataAbertura_5").textContent = destaque_5.dataAbertura;
      document.getElementById("dataHoraSorteio_5").textContent = destaque_5.dataHoraSorteio;
      //document.getElementById("valorApostaMinima_5").textContent = destaque_5.valorApostaMinima;

      document.getElementById("sorteio_data_5").textContent = 'Nº' + destaque_5.numero + '   ' + '|' + '   ' + destaque_5.dataHoraSorteio;
      document.getElementById("premio_estimado_5").textContent = 'Prêmio estimado do concurso' + destaque_5.numero;



    //CARD 6                  

      var acumulou_6 = destaque_6.acumulou;
        if (acumulou_6 == true) {
        acumulou_6 = "ACUMULOU";
        }
        else{
         acumulou_6 = "";
        }

        document.getElementById("modalidade_6").textContent = destaque_6.modalidade
      //document.getElementById("valor_6").textContent = destaque_6.modalidadeDetalhada.valor;
      //document.getElementById("descricao_6").textContent = destaque_6.modalidadeDetalhada.descricao;
      //document.getElementById("descricaoEspecial_6").textContent = destaque_6.modalidadeDetalhada.descricaoEspecial;
      //document.getElementById("tipoConcurso_6").textContent = destaque_6.tipoConcurso;
      document.getElementById("acumulou_6").textContent = acumulou_6;
      document.getElementById("estimativa_6").textContent = destaque_6.estimativa;
      ///document.getElementById("numero_6").textContent = destaque_6.numero;
      //document.getElementById("dataFechamento_6").textContent = destaque_6.dataFechamento;
      //document.getElementById("dataAbertura_6").textContent = destaque_6.dataAbertura;
      document.getElementById("dataHoraSorteio_6").textContent = destaque_6.dataHoraSorteio;
      //document.getElementById("valorApostaMinima_6").textContent = destaque_6.valorApostaMinima;

      document.getElementById("sorteio_data_6").textContent = 'Nº' + destaque_6.numero + '   ' + '|' + '   ' + destaque_6.dataHoraSorteio;
      document.getElementById("premio_estimado_6").textContent = 'Prêmio estimado do concurso' + destaque_6.numero;



    //CARD 7                  


      var acumulou_7 = destaque_7.acumulou;
        if (acumulou_7 == true) {
        acumulou_7 = "ACUMULOU";
        }
        else{
         acumulou_7 = "";
        }

        document.getElementById("modalidade_7").textContent = destaque_7.modalidade
      //document.getElementById("valor_7").textContent = destaque_7.modalidadeDetalhada.valor;
      //document.getElementById("descricao_7").textContent = destaque_7.modalidadeDetalhada.descricao;
      //document.getElementById("descricaoEspecial_7").textContent = destaque_7.modalidadeDetalhada.descricaoEspecial;
      //document.getElementById("tipoConcurso_7").textContent = destaque_7.tipoConcurso;
      document.getElementById("acumulou_7").textContent = acumulou_7;
      document.getElementById("estimativa_7").textContent = destaque_7.estimativa;
      ///document.getElementById("numero_7").textContent = destaque_7.numero;
      //document.getElementById("dataFechamento_7").textContent = destaque_7.dataFechamento;
      //document.getElementById("dataAbertura_7").textContent = destaque_7.dataAbertura;
      document.getElementById("dataHoraSorteio_7").textContent = destaque_7.dataHoraSorteio;
      //document.getElementById("valorApostaMinima_7").textContent = destaque_7.valorApostaMinima;

      document.getElementById("sorteio_data_7").textContent = 'Nº' + destaque_7.numero + '   ' + '|' + '   ' + destaque_7.dataHoraSorteio;
      document.getElementById("premio_estimado_7").textContent = 'Prêmio estimado do concurso' + destaque_7.numero;

    //CARD 8                  


    var acumulou_8 = destaque_8.acumulou;
        if (acumulou_8 == true) {
        acumulou_8 = "ACUMULOU";
        }
        else{
         acumulou_8 = "";
        }

        document.getElementById("modalidade_8").textContent = destaque_8.modalidade
      //document.getElementById("valor_8").textContent = destaque_8.modalidadeDetalhada.valor;
      //document.getElementById("descricao_8").textContent = destaque_8.modalidadeDetalhada.descricao;
      //document.getElementById("descricaoEspecial_8").textContent = destaque_8.modalidadeDetalhada.descricaoEspecial;
      //document.getElementById("tipoConcurso_8").textContent = destaque_8.tipoConcurso;
      document.getElementById("acumulou_8").textContent = acumulou_8;
      document.getElementById("estimativa_8").textContent = destaque_8.estimativa;
      ///document.getElementById("numero_8").textContent = destaque_8.numero;
      //document.getElementById("dataFechamento_8").textContent = destaque_8.dataFechamento;
      //document.getElementById("dataAbertura_8").textContent = destaque_8.dataAbertura;
      document.getElementById("dataHoraSorteio_8").textContent = destaque_8.dataHoraSorteio;
      //document.getElementById("valorApostaMinima_8").textContent = destaque_8.valorApostaMinima;

      document.getElementById("sorteio_data_8").textContent = 'Nº' + destaque_8.numero + '   ' + '|' + '   ' + destaque_8.dataHoraSorteio;
      document.getElementById("premio_estimado_8").textContent = 'Prêmio estimado do concurso' + destaque_8.numero;

    //CARD 9                  


    var acumulou_9 = destaque_9.acumulou;
        if (acumulou_9 == true) {
        acumulou_9 = "ACUMULOU";
        }
        else{
         acumulou_9 = "";
        }

        document.getElementById("modalidade_9").textContent = destaque_9.modalidade
      //document.getElementById("valor_9").textContent = destaque_9.modalidadeDetalhada.valor;
      //document.getElementById("descricao_9").textContent = destaque_9.modalidadeDetalhada.descricao;
      //document.getElementById("descricaoEspecial_9").textContent = destaque_9.modalidadeDetalhada.descricaoEspecial;
      //document.getElementById("tipoConcurso_9").textContent = destaque_9.tipoConcurso;
      document.getElementById("acumulou_9").textContent = acumulou_9;
      document.getElementById("estimativa_9").textContent = destaque_9.estimativa;
      ///document.getElementById("numero_9").textContent = destaque_9.numero;
      //document.getElementById("dataFechamento_9").textContent = destaque_9.dataFechamento;
      //document.getElementById("dataAbertura_9").textContent = destaque_9.dataAbertura;
      document.getElementById("dataHoraSorteio_9").textContent = destaque_9.dataHoraSorteio;
      //document.getElementById("valorApostaMinima_9").textContent = destaque_9.valorApostaMinima;

      document.getElementById("sorteio_data_9").textContent = 'Nº' + destaque_9.numero + '   ' + '|' + '   ' + destaque_9.dataHoraSorteio;
      document.getElementById("premio_estimado_9").textContent = 'Prêmio estimado do concurso' + destaque_9.numero;

    //CARD 10                  


    var acumulou_10 = destaque_10.acumulou;
        if (acumulou_10 == true) {
        acumulou_10 = "ACUMULOU";
        }
        else{
         acumulou_10 = "";
        }

        document.getElementById("modalidade_10").textContent = destaque_10.modalidade
      //document.getElementById("valor_10").textContent = destaque_10.modalidadeDetalhada.valor;
      //document.getElementById("descricao_10").textContent = destaque_10.modalidadeDetalhada.descricao;
      //document.getElementById("descricaoEspecial_10").textContent = destaque_10.modalidadeDetalhada.descricaoEspecial;
      //document.getElementById("tipoConcurso_10").textContent = destaque_10.tipoConcurso;
      document.getElementById("acumulou_10").textContent = acumulou_10;
      document.getElementById("estimativa_10").textContent = destaque_10.estimativa;
      ///document.getElementById("numero_10").textContent = destaque_10.numero;
      //document.getElementById("dataFechamento_10").textContent = destaque_10.dataFechamento;
      //document.getElementById("dataAbertura_10").textContent = destaque_10.dataAbertura;
      document.getElementById("dataHoraSorteio_10").textContent = destaque_10.dataHoraSorteio;
      //document.getElementById("valorApostaMinima_10").textContent = destaque_10.valorApostaMinima;

      document.getElementById("sorteio_data_10").textContent = 'Nº' + destaque_10.numero + '   ' + '|' + '   ' + destaque_10.dataHoraSorteio;
      document.getElementById("premio_estimado_10").textContent = 'Prêmio estimado do concurso' + destaque_10.numero;


    })
    .catch(err => {
    // trata se alguma das promises falhar
    console.error('Failed retrieving information', err);
});




