var cart = JSON.parse(getCookie("cart"));
console.log(cart);
$(document).ready(function(){
	
	$('.add_cart').on('click',function(){
		var p = JSON.parse($(this).attr('data-shop-listing'));
		var item = { "name":p.name, "quantity":1, "price":p.price };
		
		$("#shoppingcart-form").siblings('p').hide();
		$("#shoppingcart-form").show();

		var exist_flag = false;
		var exist_key;
		if(cart.length>0)
		{
			$.each( cart, function( key, value ) {
				if(value.name == p.name)
				{
					exist_flag = true;
					exist_key = key;
				}
			});
		}
		if(!exist_flag){
			cart.push(item); 
			$("#shoppingcart-form tbody tr:first").clone().appendTo( "#shoppingcart-form tbody" );  
			var obj = $("#shoppingcart-form tbody tr:last");
			obj.find( "td:first h3" ).html(p.name);
			obj.find( "td:first p" ).html(p.description);
			obj.find( "td output" ).html(p.price);
		}
		else{
			cart[exist_key].quantity++;
			var cur_q_obj = $('#shoppingcart-form tbody tr:eq( '+(exist_key+1)+" ) input[type='number']");
			cur_q_obj.val(cart[exist_key].quantity);
		}
		setCookie("cart", JSON.stringify(cart), 365);
		
	});

	$("#shoppingcart-form button").on('click',function(){
		alert('ss')
		if($(this).text() == 'Remove')
		{
			alert('dd');
			p_name = $(this).siblings('h3').html();
			alert(p_name);
			cart = jQuery.grep(cart, function(value) {
			  return value.name != p_name;
			});
			//console.log(cart);


			$(this).parents('tr').remove();
			if($("#shoppingcart-form tbody tr").length() == 1)
			{
				$('#shoppingcart-form').hide();
				$( "#shoppingcart-form" ).siblings('p').hide();
			}
		}
		else
		{
						alert('ff')

			var input_obj = $(this).parent('span').siblings("input[type='number']");
			var q = $(this).parent('span').siblings("input[type='number']").val();
			switch($(this).attr('title'))
			{
			    case 'step up':
			        input_obj.val(++q);
			        break;
			    case 'decrease':
			    	if(q > 1)  input_obj.val(--q);
			        break;
			}
			alert($(this).parent('tr').find('h3').html())
			/*$.each( cart, function( key, value ) {
				if(value.name == $(this).parents('tr').find('h3').html())
				{
					alert(key);
				}
			});*/

		}
		setCookie("cart", JSON.stringify(cart, 365);

	})

	$('#shoppingcart-form button[type="submit"]').on('click',function(e){
		e.preventDefault();
		$(this).prop('disabled', true);
		$(this).html('Sending your order...');
	})


	function setCookie(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}


})
	function getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i = 0; i < ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length, c.length);
	        }
	    }
	    return "";
	}
