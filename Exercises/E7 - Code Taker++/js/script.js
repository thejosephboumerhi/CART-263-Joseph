/**
A7 - Code Taker
Joseph Boumerhi

Poem
*/

"use strict";

//Dana showed me (should make more use of looking at things in general),
//https://pippinbarr.github.io/cart263-2021/topics/jquery-uI/jquery-ui-widgets.html
//Brings up dialog box on startup
$(`#instruction-dialog`).dialog({
  modal: true,
});

$(`.secret`).effect({
  effect: `shake`,
  duration: 500,
  times: 10,
  distance: 2,
});

$(`#solved-dialog`).dialog({
  autoOpen: false,
  buttons: {
    "And that's good.": function () {
      $(this).dialog(`close`);
    },
  },
});

$(`.secret`).one(`mouseover`, function (event) {
  $(this).addClass(`found`, 500);
  $(this).draggable({ helper: `clone` });
});

$(`#answer`).droppable({
  drop: function (event, ui) {
    let letter = ui.draggable.text();
    $(this).append(letter);
    ui.draggable.draggable(`disable`);
    ui.draggable.removeClass(`found`);
    //Check if got
    if ($(this).text() === `shit`) {
      $(`#solved-dialog`).dialog(`open`);
    }
  },
});
