/* controller.js
    Controller for Shopping Cart page
*/

$(function(){
	var formatLabels = {
	    dvd: 'DVD',
	    bluray: 'Blu-Ray'
	};

	var cartModel = createCartModel();

	var cartView = createCartView({
	    model: cartModel,
	    template: $('.cart-item-template'),
	    container: $('.cart-items-container'),
	    totalPrice: $('.total-price')
	});

	var moviesModel = createMoviesModel({
	    url: 'https://courses.washington.edu/info343/ajax/movies/'
	});

	var moviesView = createMoviesView({
	    model: moviesModel,
	    template: $('.movie-template'),
	    container: $('.movies-container')
	});

	//when the movies view triggers 'addToCart'
	//add a new item to the cart, using the supplied
	//movieID and format
	moviesView.on('addToCart', function(data){
	    var movie = moviesModel.getItem(data.movieID);
	    if (!movie)
	        throw 'Invalid movie ID "' + movieID + '"!'; 

	    cartModel.addItem({
	        id: movie.id,
	        title: movie.title,
	        format: data.format,
	        formatLabel: formatLabels[data.format],
	        price: movie.prices[data.format]
	    });
	}); //addToCart event

	//refresh to get movies from server
	moviesModel.refresh();

	$('.place-order').click(function(){
		$.ajax({
		    url: 'https://courses.washington.edu/info343/ajax/movies/orders/',
		    type: 'POST',
		    data: cartModel.toJSON(),
		    contentType: 'application/json',
		    success: function(responseData) {
		    	alert('You have successfully placed an order!');
		    	cartModel.setItems([]);
		    },
		    error: function(jqXHR, status, errorThrown) {
		    	alert('This order was unsuccessful!');
		        alert(errorThrown || status);
		    }


		}); //ajax()
	})

	cartModel.on('change', function(){
	    localStorage.setItem('cart', cartModel.toJSON());
	});

	var cartJSON = localStorage.getItem('cart');
	if (cartJSON && cartJSON.length > 0) {
	    cartModel.setItems(JSON.parse(cartJSON));
	}
		     
}); //doc ready()

