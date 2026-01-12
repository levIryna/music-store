function loadProductDetails() {
  const id = getQueryParam('id');
  const record = records.find(r => r.id === id);
  if (record) {
    document.getElementById('product-cover').src = record.coverUrl;
    document.getElementById('product-title').textContent = record.title;
    document.getElementById('product-artist').textContent = `Виконавець: ${record.artistIds.map(aId => artists.find(a => a.id === aId)?.name).join(', ')}`;
    document.getElementById('product-year').textContent = `Рік релізу: ${record.year}`;
    document.getElementById('product-pressing-year').textContent = `Рік пресу: ${record.pressingYear}`;
    document.getElementById('product-catalog-number').textContent = `Каталожний номер: ${record.catalogNumber}`;
    document.getElementById('product-matrix-number').textContent = `Матриця: Side A - ${record.matrixNumberSideA}, Side B - ${record.matrixNumberSideB}`;
    document.getElementById('product-price').textContent = `Ціна: ${formatPrice(record.price)}`;
    document.getElementById('product-description').textContent = record.description;

    // Обставини запису
    const recInfo = document.getElementById('recording-info');
    recInfo.innerHTML = `
      Студія: ${record.recordingInfo.studio}<br>
      Продюсер: ${record.recordingInfo.producer}<br>
      Інженер: ${record.recordingInfo.engineer}<br>
      Дати запису: ${record.recordingInfo.recordingDates}
    `;

    // Кредити
    const creditsUl = document.getElementById('credits');
    record.credits.forEach(credit => {
      const li = document.createElement('li');
      li.textContent = `${credit.role}: ${credit.musicianId}`;  // Можна розширити для повних імен
      creditsUl.appendChild(li);
    });

    // Деталі музикантів/ансамблів
    const artistsUl = document.getElementById('artists-detail');
    record.artistIds.forEach(aId => {
      const artist = artists.find(a => a.id === aId);
      if (artist) {
        const li = document.createElement('li');
        li.innerHTML = `${artist.name} (${artist.type}, ${artist.country}, активний з ${artist.activeSince}${artist.activeUntil ? ` до ${artist.activeUntil}` : ''})<br>Учасники: ${artist.members.join(', ')}`;
        artistsUl.appendChild(li);
      }
    });

    // Треки з композиторами/виконавцями
    const tracklistUl = document.getElementById('tracklist');
    record.tracklist.forEach(track => {
      const li = document.createElement('li');
      li.textContent = `${track.number}. ${track.title} (${track.duration}) - Композитори: ${track.composers.join(', ')}; Виконавці: ${track.performers.join(', ')}`;
      tracklistUl.appendChild(li);
    });

    document.getElementById('add-to-cart').addEventListener('click', () => addToCart(id));
  } else {
    document.querySelector('.product-detail').innerHTML = '<h2>Товар не знайдено</h2>';
  }
}