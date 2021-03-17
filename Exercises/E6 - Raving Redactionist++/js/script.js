/**
E6 - Raving Redactionist++
Joseph Boumerhi

I decided to look for some copypastas on Reddit, take some fairly appropriate
ones that I liked, changed and pasted them in the places of the "Lorem Ipsum"

Links for each copypasta are in index.html above each of their <p>s
*/

"use strict";

$(`.top-secret`).on(`click`, redact);
setInterval(revelation, 500);

function redact(event) {
  $(this).removeClass(`revealed`);
  $(this).addClass(`redacted`);
}

function revelation() {
  $(`.redacted`).each(attemptReveal);
}

function attemptReveal() {
  let r = Math.random();
  if (r < 0.1) {
    $(this).removeClass(`redacted`);
    $(this).addClass(`revealed`);
  }
}
