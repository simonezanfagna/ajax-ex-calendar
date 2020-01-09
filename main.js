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

    for (var i = 1; i <= giorni_del_mese; i++) {
      if (i < 10) {
        var context = {
          'giorno' : '0' + i + ' ' + mese
        }
      }
      else {
        var context = {
          'giorno' : i + ' ' + mese
        }
      }

      var html = template(context);
      $('main #calendario').append(html);
    }
  }

})
