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

      //BOLINHAS


      document.getElementById("mega0").textContent = destaque_0.dezenasSorteadas[0];
      document.getElementById("mega1").textContent = destaque_0.dezenasSorteadas[1];
      document.getElementById("mega2").textContent = destaque_0.dezenasSorteadas[2];
      document.getElementById("mega3").textContent = destaque_0.dezenasSorteadas[3];
      document.getElementById("mega4").textContent = destaque_0.dezenasSorteadas[4];
      document.getElementById("mega5").textContent = destaque_0.dezenasSorteadas[5];

     
      

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


      //BOLINHAS


      document.getElementById("megaS0").textContent = destaque_1.dezenasSorteadas[0];
      document.getElementById("megaS1").textContent = destaque_1.dezenasSorteadas[1];
      document.getElementById("megaS2").textContent = destaque_1.dezenasSorteadas[2];
      document.getElementById("megaS3").textContent = destaque_1.dezenasSorteadas[3];
      document.getElementById("megaS4").textContent = destaque_1.dezenasSorteadas[4];
      document.getElementById("megaS5").textContent = destaque_1.dezenasSorteadas[5];

       
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


            //BOLINHAS


            document.getElementById("quina0").textContent = destaque_2.dezenasSorteadas[0];
            document.getElementById("quina1").textContent = destaque_2.dezenasSorteadas[1];
            document.getElementById("quina2").textContent = destaque_2.dezenasSorteadas[2];
            document.getElementById("quina3").textContent = destaque_2.dezenasSorteadas[3];
            document.getElementById("quina4").textContent = destaque_2.dezenasSorteadas[4];
          


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




      //BOLINHAS


      document.getElementById("mania0").textContent = destaque_3.dezenasSorteadas[0];
      document.getElementById("mania1").textContent = destaque_3.dezenasSorteadas[1];
      document.getElementById("mania2").textContent = destaque_3.dezenasSorteadas[2];
      document.getElementById("mania3").textContent = destaque_3.dezenasSorteadas[3];
      document.getElementById("mania4").textContent = destaque_3.dezenasSorteadas[4];
      document.getElementById("mania5").textContent = destaque_3.dezenasSorteadas[5];
      document.getElementById("mania6").textContent = destaque_3.dezenasSorteadas[6];
      document.getElementById("mania7").textContent = destaque_3.dezenasSorteadas[7];
      document.getElementById("mania8").textContent = destaque_3.dezenasSorteadas[8];
      document.getElementById("mania9").textContent = destaque_3.dezenasSorteadas[9];
      document.getElementById("mania10").textContent = destaque_3.dezenasSorteadas[10];
      document.getElementById("mania11").textContent = destaque_3.dezenasSorteadas[11];
      document.getElementById("mania12").textContent = destaque_3.dezenasSorteadas[12];
      document.getElementById("mania13").textContent = destaque_3.dezenasSorteadas[13];
      document.getElementById("mania14").textContent = destaque_3.dezenasSorteadas[14];
      document.getElementById("mania15").textContent = destaque_3.dezenasSorteadas[15];
      document.getElementById("mania16").textContent = destaque_3.dezenasSorteadas[16];
      document.getElementById("mania17").textContent = destaque_3.dezenasSorteadas[17];
      document.getElementById("mania18").textContent = destaque_3.dezenasSorteadas[18];
      document.getElementById("mania19").textContent = destaque_3.dezenasSorteadas[19];




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



      //BOLINHAS


      document.getElementById("timania0").textContent = destaque_4.dezenasSorteadas[0];
      document.getElementById("timania1").textContent = destaque_4.dezenasSorteadas[1];
      document.getElementById("timania2").textContent = destaque_4.dezenasSorteadas[2];
      document.getElementById("timania3").textContent = destaque_4.dezenasSorteadas[3];
      document.getElementById("timania4").textContent = destaque_4.dezenasSorteadas[4];
      document.getElementById("timania5").textContent = destaque_4.dezenasSorteadas[5];

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


            //BOLINHAS


            document.getElementById("diasorte0").textContent = destaque_4.dezenasSorteadas[0];
            document.getElementById("diasorte1").textContent = destaque_4.dezenasSorteadas[1];
            document.getElementById("diasorte2").textContent = destaque_4.dezenasSorteadas[2];
            document.getElementById("diasorte3").textContent = destaque_4.dezenasSorteadas[3];
            document.getElementById("diasorte4").textContent = destaque_4.dezenasSorteadas[4];
            document.getElementById("diasorte5").textContent = destaque_4.dezenasSorteadas[5];
      



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


      document.getElementById("tfacil0").textContent = destaque_6.dezenasSorteadas[0];
      document.getElementById("tfacil1").textContent = destaque_6.dezenasSorteadas[1];
      document.getElementById("tfacil2").textContent = destaque_6.dezenasSorteadas[2];
      document.getElementById("tfacil3").textContent = destaque_6.dezenasSorteadas[3];
      document.getElementById("tfacil4").textContent = destaque_6.dezenasSorteadas[4];
      document.getElementById("tfacil5").textContent = destaque_6.dezenasSorteadas[5];
      document.getElementById("tfacil6").textContent = destaque_6.dezenasSorteadas[6];
      document.getElementById("tfacil7").textContent = destaque_6.dezenasSorteadas[7];
      document.getElementById("tfacil8").textContent = destaque_6.dezenasSorteadas[8];
      document.getElementById("tfacil9").textContent = destaque_6.dezenasSorteadas[9];
      document.getElementById("tfacil10").textContent = destaque_6.dezenasSorteadas[10];
      document.getElementById("tfacil11").textContent = destaque_6.dezenasSorteadas[11];
      document.getElementById("tfacil12").textContent = destaque_6.dezenasSorteadas[12];
      document.getElementById("tfacil13").textContent = destaque_6.dezenasSorteadas[13];
      document.getElementById("tfacil14").textContent = destaque_6.dezenasSorteadas[14];
  


    })
    .catch(err => {
    // trata se alguma das promises falhar
    console.error('Failed retrieving information', err);
});




