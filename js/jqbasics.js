"use strict";
/**
 * This js file shows
 * 1. the use of $(function(){});
 * 2. methods for element selection and content change
 * 3. event handling
 * 4. special effects
 */
/** $(document).ready(handler) makes the JS code insensitive to its location on the page.
 * This code will run automatically when the DOM tree is loaded.
 * It will add an event listener to each of the 3 buttons.
 * filters are used to select an individual button. Otherwise, all buttons will get the same Hanlder.
 */
$(function () {
  // event handling, similar to plain JS, except for the short notation
  // :first, :eq(1)-index 1 in the selected node collection, and :last are filters
  $("button:first").on("click", select);
  $("button:eq(1)").on("click", insertReplace);
  $("button:last").on("click", effects);
});

/**select the elements on the page, retrieve their text content and
 * the innerHTML, then show them in the last section of the page.
 * */
function select() {
  // select all section elements on the page
  let $sect = $("section");
  /** retrieve and show all sections' text and the 1st section's innerHtml
   * in the last section. .text() retrieve the text content, inc children's.
   * .html() returns the 1st matching element's innerHTML
   * .html(string) sets all matching elements' innerHTML using the string.
   */
  $("section:last").html(
    `<h3>Original text in both sections:</h3> ${$sect.text()} 
    <h3>The 1st section's html: </h3> ${$sect.html()}`
  );
}
/**
 * insert a new element at the end / beginning of the selected parent element.
 * change selected elements' content with various methods.
 * set selected elements' CSS.
 */
function insertReplace() {
  // add a <li> element to the end of the <ol> list-only one <ol> on the page.
  $("ol").append("<li>Do laundry-append()</li>");

  // add a <li> element at the beginning of the <ol> list
  $("ol").prepend("<li>Work on the assignment-prepend()</li>");

  // select all li elements that have the class "chore"
  let $chorelist = $("li.chore");

  // set the content of each li element in $chorelist with the text in ()
  $chorelist.text("<b>Updated</b> - text(), code as text");

  // select li elements that have the class "school"
  let $shoollist = $("li.school");
  // .html(string) replaces the items' content with string.
  // html code is treated as code but not as plain text
  $shoollist.html("<b>Updated</b> - html(), code as code.");

  // Replace the 2nd list item with the new content
  $("li.chore:eq(1)").replaceWith("<li>Go shopping - replacedWith()</li>");

  $chorelist.css({
    "background-color": "yellow",
  });
  // multiple css properties can be set. property:value pairs are separated by ,
  $shoollist.css({
    "background-color": "yellow",
    "font-family": "Arial",
    "font-size": "+=2pt",
  });
}

/**show special effects
 * Add event listeners to elements so that when they are clicked,
 * special effects will show.
 * */
function effects() {
  // chained effect methods are executed from left to right
  $("ol").hide().slideDown(2000).hide(2000).show(2000);

  $("h1").on("click", function (e) {
    $(e.target).hide(2000).show(2000);
  });

  $("h3").on("click", function (e) {
    $(e.target).slideUp(2000).slideDown(2000);
  });

  $("section").on("click", function () {
    // here $(this) represents each section in the selection
    // $(this) is different from e.target
    $(this).fadeOut(2000).fadeIn(2000);
  });

  $("li").on("click", cssanimation);
  // add <h4> text to prompt the user - the only <h4> on the page
  if ($("h4").length == 0) {
    let msg =
      "<h4>Click on the h1, h3, the section, as well as an li to see the effects</h4>";
    $(msg).insertAfter($("#buttons"));
  }
}
/* 
1. use animate() method to animate the evt target, then remove the target.
2. remove() is not an effect method, doesn't synchronize with other effect methods.
have to use a callback function.
*/
function cssanimation(e) {
  /*
   * $(this) represents the element that the event handler is attached to
   * $(e.target) might be used but there are some differences between them
   * if the element has child element(s).
   */
  $(this)
    .animate(
      {
        marginLeft: "+=200", // the default unit is px. In plain js, unit is required.
      },
      1000
    ) 
    /* after slideUp is done, call the anonymous function to remove the element from the page.
    * the function is called a callback function. This technique is used because only effect methods
    * are synchronized in the chain.  remove() is not an effect method, it doesn't wait for
    * other effect methods in the chain to finish before its execution.
    */
    .slideUp(2000, function () {
      $(this).remove();
    });
}
