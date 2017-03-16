$(document).ready(()=>{
  function getData(searchTerm, callback){
    const key = 'AIzaSyD2Aff6LfW1YLYJa985PXLJLSJtS9jDfA8'
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key}&q=${searchTerm}&maxResults=50`
    const query = {
      url,
      success:callback
    }
    $.ajax(query)
  }

  $('form').on('submit',(e) => {
    e.preventDefault()
    $('.info').remove()
    const $this = $(e.currentTarget)
    $this.animate({top:'20%'}, 500)
    $('.search_result').fadeIn(900).css('display','flex')
    const $search = $('input').val()
    return getData($search, (res) => {
      fetch(res)
      console.log(res.items)
    })
  })

  function fetch(res){
    const limit = 50
    const searchArr=[]
    for(var i=0; i<limit; i++){
      searchArr.push(res.items[i])
      $('.search_result').append(`
        <a href="https://www.youtube.com/watch?v=${searchArr[i].id.videoId}" target="blank">
          <div class="info">
              <div class="thumbnail">
                <img src="${searchArr[i].snippet.thumbnails.medium.url}">
              </div>
              <div class="vid-info">
                <h3>${searchArr[i].snippet.title}</h3>
                <p>${searchArr[i].snippet.description}</p>
              </div>
          </div>
        </a>
        `)
    }
  }
})
