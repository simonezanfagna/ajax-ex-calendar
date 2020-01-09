$(document).ready(function () {
  var source = $('#entry-template').html();
  var template = Handlebars.compile(source);

  var data_iniziale = '2018-01-01';
  var moment_data_iniziale = moment(data_iniziale);
  // console.log(moment_data_iniziale);
  stampaGiorniMese(moment_data_iniziale);

  if (moment_data_iniziale.format("M") == 1) {
    $('.fa-chevron-circle-left').hide()
  };

  $('.fa-chevron-circle-right').click(function () {
    $('.fa-chevron-circle-left').show();
    moment_data_iniziale.add(1, "months");
    stampaGiorniMese(moment_data_iniziale);
    if (moment_data_iniziale.format("M") == 12) {
      $('.fa-chevron-circle-right').hide();
    };
  });

  $('.fa-chevron-circle-left').click(function () {
    $('.fa-chevron-circle-right').show();
    moment_data_iniziale.subtract(1, "months");
    stampaGiorniMese(moment_data_iniziale);
    if (moment_data_iniziale.format("M") == 1) {
      $('.fa-chevron-circle-left').hide();
    };
  });

  function stampaGiorniMese(data) {
    $('#calendario').empty();
    var giorni_del_mese = data.daysInMonth();
    var mese = data.format("MMMM");
    $('#nome-mese').text(mese);

    var anno_mese_giorno = moment(data);
    for (var i = 1; i <= giorni_del_mese; i++) {
      if (i < 10) {
        var context = {
          'giorno' : '0' + i + ' ' + mese,
          'data' : anno_mese_giorno.format("YYYY-MM-") + '0' + i
        }
      }
      else {
        var context = {
          'giorno' : i + ' ' + mese,
          'data' : anno_mese_giorno.format("YYYY-MM-") + i
        }
      }

      var html = template(context);
      $('main #calendario').append(html);


    }
    $.ajax({
      'url' : 'https://flynn.boolean.careers/exercises/api/holidays',
      'method' : 'GET',
      'data' : {
        'year' : 2018,
        'month' : data.month()
      },
      'success': function (data_risultati) {
        var festivita = data_risultati.response;
        console.log(festivita);
        for (var i = 0; i < festivita.length; i++) {
          var singolaFestivita = festivita[i];
          var dataFestivita = singolaFestivita.date;
          var nomeFestivita = singolaFestivita.name;
          $('#calendario li').each(function () {
            if ($(this).attr('data-calendario') == dataFestivita) {
              $(this).addClass('giornoFesta');
              $(this).append(' - ' + nomeFestivita);
            }
          })
        }
      },
      'error' : function () {
        alert('errore')
      }
    })
  }

})
