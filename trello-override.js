function checkOnBoard() {
  if (window.location.href.includes('trello.com/b/')) {
    return 'b'
  } if (window.location.href.includes('trello.com/c/')) {
    return 'c'
  } else {
    return ''
  }
}

var lastCardCount = 0;

function calculateCardCount() {

  const status = checkOnBoard()

  if (status === 'b') {

    // 傳統模式
    if (document.querySelectorAll('.list-card').length > 0) {

      var numberCards = document.querySelectorAll('.list-card').length;
      var counterElement = document.getElementById('total-cards')
      if (counterElement == null) {
        document.querySelector('.board-header-btns').insertAdjacentHTML('beforeend', '<div id="total-cards">Total Cards: <span id="total-cards-count">' + numberCards + '</span></div>')
      } else {
        document.getElementById('total-cards-count').innerText = numberCards;
      }
    }

    else {

      var numberCards = document.querySelectorAll('[data-testid="list-card"]');

      if (lastCardCount == numberCards.length)
        return;

      for (var i in numberCards) {

        var card = numberCards[i];

        if (! card || typeof card === 'undefined' || ! card.querySelectorAll)
          continue;

        if (card.querySelectorAll('.card-short-id').length > 0)
          continue;

        var link = card.querySelectorAll('a[data-testid="card-name"]')[0];

        link.insertAdjacentHTML('afterbegin', '<span class="card-short-id">#' + link.href.split('/').pop().split('-').shift() + '</span>');
      }
    }
  }

  else if (status === 'c') {

    var cardDetailId = document.querySelectorAll('.card-detail-window  .card-short-id');

    if (cardDetailId.length > 0)
      return;

    //var cardDetaiTitle = document.querySelectorAll('.mod-card-back-title');
    var cardDetailInlineContent = document.querySelectorAll('.window-header-inline-content .u-inline-block');
    var cardId = window.location.href.split('/').pop().split('-').shift();

    cardDetailInlineContent.item(0).insertAdjacentHTML(
      'afterbegin',
      '<span class="card-short-id">#' + cardId + '</span>');
  }
}

setInterval(calculateCardCount, 750);
