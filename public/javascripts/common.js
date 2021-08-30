function startBot() {
  $.ajax({
    url: '/2',
    data : {
      url : $('[name="url"]:checked').val(),
      id : $('#id').val(),
      pw : $('#pw').val(),
      blogType : $('[name="blogType"]:checked').val(),
      nick : $('#nick').val()
    },
    beforeSend : function () {
      
    },
    success : function (data) {
      console.log(data);
    },
    error : function (e) {
      console.log(e);
    },
    complete : function () {

    }
  })
}