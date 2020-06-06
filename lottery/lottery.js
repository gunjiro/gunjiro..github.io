/* globals _ */

window.addEventListener(
  "DOMContentLoaded",
  function() {
    var button = document.getElementById("look");
    button.addEventListener(
      "click",
      function() {
        var membersText = document.getElementById("members").value;
        var marksText = document.getElementById("marks").value;

        var members = textToArray(membersText);
        var marks = textToArray(marksText);

        if (members.length > marks.length) {
          marks = _.concat(
            marks,
            _.fill(new Array(members.length - marks.length), "")
          );
        }

        marks = _.shuffle(marks);
        marks = _.take(marks, members.length);

        var result = _.zip(members, marks);

        var text = _.map(result, function(pair) {
          return pair[0] + ": " + pair[1];
        }).join(", ");

        document.getElementById("result").textContent = text;
      },
      false
    );
  },
  false
);

function textToArray(text) {
  return text
    .replace("\r\n", "\n")
    .replace("\r", "\n")
    .split("\n");
}
