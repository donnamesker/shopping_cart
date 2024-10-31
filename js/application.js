/*
// jQuery
$('.class/#id').text(); // To get or change the text of an element
$('.class/#id').val(); // To get or change the value of an input element
$('.class/#id').prepend(); // To add elements to the beginning of your target element
$('.class/#id').append(); // To add elements to the end of your target element
$(document).on('click', '.class/#id', function() {
    // run some programs
});  // This will trigger the specified program whenever you click on the elements with the selected class or id. This is better than $('.class/#id').click() because it will include elements you added in after initial loading.
$('.class/#id').parent(); // Access the parent row of the targeted class or id.
$('.class/#id').parents('.class/#id'); // Access the specific parents with a class or id.
$('.class/#id').remove(); // Remove the targeted elements from the DOM.

// JavaScript
Number() // Turn a string into a number value.
'string'.replace('a', 'b') // replace a subset of string with another one.

*/

// Calculate and display the sub total price of each item
var updateAmount = function (ele) {
  var itemPrice = parseFloat($(ele).find('.price input').val());
  var itemQty = parseFloat($(ele).find('.quantity input').val());
  
  // amount is price times quantity
  var itemAmount = itemPrice * itemQty;
  $(ele).children('.amount').html(itemAmount.toFixed(2));
  return itemAmount;
}

// Calculate and display the total price
var sum = function (acc, x) { return acc + x; };

var updateAmountsAndTotal = function () {
  var allAmounts = [];
  
  $('tbody tr').each(function (i, ele) {
    var itemUpdateAmount = updateAmount(ele);
    allAmounts.push(itemUpdateAmount);
  });
  if (allAmounts.length) {
    var totalCart = allAmounts.reduce(sum).toFixed(2);
  } else {
      var totalCart = "0.00";
  }
  $('#totalCart').html(totalCart);
}



// Allow user to delete an item

var updateCart = function () {
  var itemPrices = [];
  var itemQtys = [];
}

var updateAmount;
$(document).ready(function () {
  
  updateAmountsAndTotal();
  
  // Allow user to delete an item
  $(document).on('click', '.btn.remove', function (event) {
    $(this).closest('tr').remove();
    updateAmountsAndTotal();
  });
  
  // User changes input
  var timeout;
  $(document).on('input', 'tr input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateAmountsAndTotal();
    }, 500);
  });
  
  // Allow user to add a new item
  $('#addItem').on('submit', function (event) {
    event.preventDefault();
    console.log(this);
    var name = $(this).children('[name=name]').val();
    console.log("NAME: " + name);
    var quantity = $(this).children('[name=quantity]').val();
    console.log("QTY: " + quantity);
    var price = $(this).children('[name=price]').val();
    console.log("PRICE: " + price);

    $('tbody').append('<tr>' +
      '<td class="item">' + name + '</td>' +
      '<td class="text-center quantity">QTY <input class="text-center" type="number" value="' + quantity + '" /></td>' +
      '<td class="text-right price"><input class="text-right" type="number" value="' + price + '" /></td>' +
      '<td class="text-right amount"></td>' +
      '<td class="action text-center"><button type="button" class="btn btn-danger remove">Remove</button></td>' +
    '</tr>');

    updateAmountsAndTotal();
    $(this).children('[name=name]').val('');
    $(this).children('[name=quantity]').val('');
    $(this).children('[name=price]').val('');
  });
});
