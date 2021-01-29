movieGallery.addEventListener('click', event => {
  if (event.target.nodeName === 'IMG') {
    let id = event.target.dataset.id;
    activateDetailsPage(id);
  }
});

detailsButtonClose.addEventListener('click', closeModal);
detailsModal.addEventListener('click', closeModal);
document.addEventListener("keydown", closeModal);

function closeModal(event) {
  if(event.target.classList.contains("details-container")
  ||event.target.classList.contains("details-close")
  ||event.target.nodeName==="use"
    || event.key === "Escape") {
    toTopBtn.classList.add('show')
    body.classList.remove("blocked-scroll");
    detailsModal.classList.add('hidden');
  }
}

function activateDetailsPage(id) {
  let selectedMovie = renderedMovies.find(movie => movie.id === Number(id));

  openMovieDetails(selectedMovie);

}

fetchGenres();

function openMovieDetails(selectedMovie) {
  toTopBtn.classList.remove('show')
  body.classList.add("blocked-scroll");
  detailsModal.classList.remove('hidden');
  if(selectedMovie.poster_path){
  detailsPreviewImg.setAttribute(
    'src',
    `https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`,
  );
  }else{
    detailsPreviewImg.setAttribute(
      'src',
      '../images/plug.jpg',
    );
  }
  detailsTitle.textContent = selectedMovie.title;
  detailsDescription.textContent = selectedMovie.overview;
  detailsPopularuty.innerHTML = selectedMovie.popularity;
  detailsOriginalTitle.textContent = selectedMovie.original_title;
  detailsVote.textContent = selectedMovie.vote_average;
  console.log(selectedMovie.original_title);
  detailsVotes.textContent = `/ ${selectedMovie.vote_count}`;
  detailsGenre.textContent = String(
    genres
      .filter(el =>
        selectedMovie.genre_ids.find(movie => el.id === movie) ? true : false,
      )
      .reduce((acc, item) => acc + `${item.name}, `, ''),
  ).slice(0, -2);

}
