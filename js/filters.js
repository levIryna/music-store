function applyFilters() {
  const selectedGenres = Array.from(document.querySelectorAll('.genre-filter input:checked')).map(ch => ch.value);
  const yearMin = parseInt(document.getElementById('year-min').value) || 1900;
  const yearMax = parseInt(document.getElementById('year-max').value) || 2026;
  const pressingYearMin = parseInt(document.getElementById('pressing-year-min').value) || 1900;
  const pressingYearMax = parseInt(document.getElementById('pressing-year-max').value) || 2026;
  const priceMin = parseFloat(document.getElementById('price-min').value) || 0;
  const priceMax = parseFloat(document.getElementById('price-max').value) || 1000;
  const matrixQuery = document.getElementById('matrix-search')?.value.toLowerCase() || '';
  const selectedArtistTypes = Array.from(document.querySelectorAll('.artist-type-filter input:checked')).map(ch => ch.value);

  const filtered = records.filter(r => {
    const genreMatch = selectedGenres.length === 0 || selectedGenres.every(g => r.genres.includes(g));
    const yearMatch = r.year >= yearMin && r.year <= yearMax;
    const pressingMatch = r.pressingYear >= pressingYearMin && r.pressingYear <= pressingYearMax;
    const priceMatch = r.price >= priceMin && r.price <= priceMax;
    const matrixMatch = !matrixQuery || 
      r.matrixNumberSideA.toLowerCase().includes(matrixQuery) || 
      r.matrixNumberSideB.toLowerCase().includes(matrixQuery);
    const artistTypeMatch = selectedArtistTypes.length === 0 || r.artistIds.some(aId => {
      const artist = artists.find(a => a.id === aId);
      return artist && selectedArtistTypes.includes(artist.type);
    });
    return genreMatch && yearMatch && pressingMatch && priceMatch && matrixMatch && artistTypeMatch;
  });

  renderProductList(filtered);
}

document.querySelectorAll('.filters input').forEach(input => input.addEventListener('change', applyFilters));
if (document.querySelector('button[onclick="applyFilters()"]')) {
  document.querySelector('button[onclick="applyFilters()"]').addEventListener('click', applyFilters);
}