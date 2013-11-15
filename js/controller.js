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
		cartModel.toJSON();
	})

	return console.log();
}); //doc ready()

