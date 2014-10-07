var phantom=require('node-phantom-simple');
phantom.create(function(err,ph) {
  return ph.createPage(function(err,page) {


    page.onLoadFinished = function() {
        console.log('page load findihed');
        console.log(arguments)
        page.evaluate(function() {
            return document.body.innerHTML;
        }, function(err, html) {
            console.log(html)
        })
    }



    return page.open("http://run.plnkr.co/plunks/uHVBcjh44ugMgxUeH6Zt/", function(err,status) {
      console.log("opened site? ", status);
      page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function(err) {
        page.evaluate(function() {
            $('input').val('testing').closest('form').submit();
          }, function(err,result) {

            page.get('contents', function() {
                console.log(arguments)
            })

            console.log(page.contents);
            //ph.exit();
          });
        
      });
    });
  });
});