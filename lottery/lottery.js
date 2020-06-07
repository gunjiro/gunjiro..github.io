/* globals _ */

window.addEventListener(
  "DOMContentLoaded",
  function() {
    var button = document.getElementById("look");
    button.addEventListener(
      "click",
      function() {
        var membersText = getMembersText();
        var marksText = getMarksText();

        var members = textToArray(membersText);
        var marks = textToArray(marksText);

        if (members.length > marks.length) {
          marks = _.concat(
            marks,
            createEmptyMarks(members.length - marks.length)
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

function getMembersText() {
  return document.getElementById("members").value;
}

function getMarksText() {
  return document.getElementById("marks").value;
}

function createEmptyMarks(length) {
  return _.fill(new Array(length), "");
}

function textToArray(text) {
  return text
    .replace("\r\n", "\n")
    .replace("\r", "\n")
    .split("\n");
}
