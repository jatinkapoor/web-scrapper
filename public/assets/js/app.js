$(document).ready(function () {

  console.log("IN JAVASCRIPT");


  $('#scrape-new').on('click', function (event) {
    event.preventDefault();
    $.ajax(url = "/scrape", method = "GET").then((articles) => {
      console.log('scrapped');
      $('#myspace').empty();
      $('#myspace').append(`<div class="alert alert-success text-center" role="alert"> Updated Page With ${articles.length} articles</div>`);
      $('#myContainer').empty();
      articles.map((article, index) => {
        $('#myContainer').append(` 
        <div class="card">
          <form class="myform" id="article-${index}">
          <div name="article-title" class="card-header">${article.title}</div>
          <div class="card-body">
            <div>
              <p class="article-summary"> ${article.summary}</p>
            </div>
            <div>
              <span>
                <a name="article-link" class="btn btn-outline-success" type="button" href="${article.link}">Go To TechCrunch</a>
              </span>
              <span>
                <button id="save-article" type="submit" class="btn btn-outline-success">Save Article</button>
              </span>
            </div>
          </div> 
          </form>
        </div><br><br><br>
      `);
      });
    });
  });

  $(document).on("submit", ".myform", function(event) {
    event.preventDefault();
    const title = $(this).find('.card-header').text().trim();
    const link = $(this).find("a[name='article-link']").attr('href').trim();
    const summary = $(this).find('.article-summary').text().trim();
    
    const data = {
      title,
      summary,
      link
    }
    $.ajax({
      type: 'POST',
      url: '/save',
      data: data
    }).then((response) => {
      console.log(response);
      $('#myspace').empty();
      $('#myspace').append(`<div class="alert alert-success text-center" role="alert"> Article Saved!!</div>`);
    }).catch((err) => {
      $('#myspace').empty();
      $('#myspace').append(`<div class="alert alert-warning text-center" role="alert"> This article has already been saved!! </div>`);
    })
  });

  $(document).on("click", "#addNotes", function(event) {
    event.preventDefault(); 
    const id = $(this).attr('data-id');
    const note = $('.note').val();
    data = {
      id,
      note
    }

    $.ajax({
      type: 'POST',
      url: '/savedArticles/notes',
      data: data
    }).then(response => {
      location.reload();
    });
  });


  $(document).on('click', '.delete', function(event) {

    event.preventDefault();
    const id = $(this).attr('id').trim();
    console.log(id);
    $.ajax({
      url: `/savedArticles/${id}`,
      type: 'DELETE',
    }).then(res => {
      location.reload();
    })
  });

  $(document).on('click', '.addnotes', function (event) {
    event.preventDefault();
    const id = $(this).attr('id').trim();
    console.log(id);
    $('.modal-header').text('Notes for ' + id.split('-')[1]);
    $('.modal-body #addNotes').attr('data-id', id);
    $.ajax({
      type: 'GET',
      url: `/savedArticles/${id}`
    }).then(response => {
      console.log("in notes section");
      console.log(response);
      $('.allNotes').empty();
      response.map((note, index) => {
        console.log(note);
        $('.allNotes').append(`<div class="alert alert-success" role="alert"> ${note.title} <i id=${note._id} class="far fa-trash-alt del-notes" style="color:red "></i></div>`);
      }); 
    });
  });


  $(document).on('click', '.del-notes', function(event)  {

    event.preventDefault();
    const id = $(this).attr('id');
    $.ajax({
      type: 'DELETE',
      url: `/savedArticles/notes/${id}`
    }).then((response) => {
      location.reload();
    });
  });

});

