# Requirements

{ chroma } = require 'npm'

Canvas.backgroundColor = 'black'

textColor = (toneOne, toneTwo) ->
	
	vsWhite = chroma.contrast(toneOne, toneTwo)
	
	if vsWhite < 4.5
		return '#FFF'
	else
		chroma(toneOne).saturate(0.6).hex()

# Colors
colors = [
	{
		'color1': '#FFFFFF'
		'color2': '#6284FF'
		'color3': '#FF0000'
	}
	{
		'color1': '#52ACFF'
		'color2': '#FFE32C'
	}
	{
		'color1': '#FFE53B'
		'color2': '#FF2525'
	}
	{
		'color1': '#FAACA8'
		'color2': '#DDD6F3'
	}
	{
		'color1': '#21D4FD'
		'color2': '#B721FF'
	}
	{
		'color1': '#08AEEA'
		'color2': '#2AF598'
	}
	{
		'color1': '#FEE140'
		'color2': '#FA709A'
	}
	{
		'color1': '#8EC5FC'
		'color2': '#E0C3FC'
	}
	{
		'color1': '#FBAB7E'
		'color2': '#F7CE68'
	}
	{
		'color1': '#FF3CAC'
		'color2': '#784BA0'
		'color3': '#2B86C5'
	}
	{
		'color1': '#D9AFD9'
		'color2': '#97D9E1'
	}
	{
		'color1': '#00DBDE'
		'color2': '#FC00FF'
	}
	{
		'color1': '#F4D03F'
		'color2': '#16A085'
	}
	{
		'color1': '#0093E9'
		'color2': '#80D0C7'
	}
	{
		'color1': '#74EBD5'
		'color2': '#9FACE6'
	}
	{
		'color1': '#FAD961'
		'color2': '#F76B1C'
	}
	{
		'color1': '#FA8BFF'
		'color2': '#2BD2FF'
		'color3': '#2BFF88'
	}
	{
		'color1': '#FBDA61'
		'color2': '#FF5ACD'
	}
	{
		'color1': '#8BC6EC'
		'color2': '#9599E2'
	}
	{
		'color1': '#A9C9FF'
		'color2': '#FFBBEC'
	}
	{
		'color1': '#3EECAC'
		'color2': '#EE74E1'
	}
	{
		'color1': '#4158D0'
		'color2': '#C850C0'
		'color3': '#FFCC70'
	}
	{
		'color1': '#85FFBD'
		'color2': '#FFFB7D'
	}
	{
		'color1': '#FFDEE9'
		'color2': '#B5FFFC'
	}
	{
		'color1': '#FF9A8B'
		'color2': '#FF6A88'
		'color3': '#FF99AC'
	}
]

duotone = [
	{
		'toneOne': '#00ff36'
		'blendOne': 'multiply'
		'toneTwo': '#23278a'
		'blendTwo': 'lighten'
		greyscale: 100
		contrast: 100
	}
	{
		'toneOne': '#e41c2d'
		'blendOne': 'multiply'
		'toneTwo': '#1d3162'
		'blendTwo': 'lighten'
		greyscale: 100
		contrast: 140
	}
	{
		'toneOne': '#FCA300'
		'blendOne': 'darken'
		'toneTwo': '#e23241'
		'blendTwo': 'lighten'
		greyscale: 100
		contrast: 120
	}
	{
		'toneOne': '#FCA300'
		'blendOne': 'darken'
		'toneTwo': '#282581'
		'blendTwo': 'lighten'
		greyscale: 100
		contrast: 120
	}
]

# 	urlShot = 'https://api.dribbble.com/v1/shots/'+shotID+'?access_token='+access_token
# 	
# 	fetch(urlShot, method: 'get').then((response) ->
# 		response.json()
# 		.then (data) ->
# 

movieTitle = null

queryOMDB = 'http://www.omdbapi.com/?t='+movieTitle+'&apikey=86718c42'

getMovie = (movieTitle) ->
	fetch(queryOMDB, method: 'get').then((response) ->
		response.json()
		.then (data) ->
			print data
		)

# .retro
#   background-color: #f1e3a0
#   img
#     mix-blend-mode: darken
#     -webkit-filter: grayscale(100%) contrast(2)
#     filter: grayscale(100%) contrast(2)
#   &::after
#     background: linear-gradient(180deg, #f430a9, #f2e782)
#     mix-blend-mode: lighten

# Data
# Top Rated Movies on IMDB http://www.imdb.com/chart/top?sort=ir,desc&mode=simple&page=1

# Data
# Movies from https://www.lists.design/

best = [
	{
	rating: 99
	title: 'Get Out'
	year: 2017
	}
	{
	rating: 98
	title: 'The Big Sick'
	year: 2017
	}
	{
	rating: 92
	title: 'Wonder Woman'
	year: 2017
	}
	{
	rating: 92
	title: 'Dunkirk'
	year: 2017
	}
	{
	rating: 100
	title: 'Lady Bird'
	year: 2017
	}
	{
	rating: 93
	title: 'Logan'
	year: 2017
	}
	{
	rating: 93
	title: 'Baby Driver'
	year: 2017
	}
	{
	rating: 93
	title: 'War for the Planet of the Apes'
	year: 2017
	}
	{
	rating: 92
	title: 'Thor: Ragnarok'
	year: 2017
	}
	{
	rating: 92
	title: 'Spider-Man: Homecoming'
	year: 2017
	}
	{
	rating: 98
	title: 'I Am Not Your Negro'
	year: 2017
	}
	{
	rating: 97
	title: 'Coco'
	year: 2017
	}
	{
	rating: 98
	title: 'Call Me by Your Name'
	year: 2017
	}
	{
	rating: 95
	title: 'The Florida Project'
	year: 2017
	}
	{
	rating: 93
	title: 'Logan Lucky'
	year: 2017
	}
	{
	rating: 92
	title: 'Hidden Figures'
	year: 2017
	}
	{
	rating: 96
	title: 'The Salesman (Forushande)'
	year: 2017
	}
	{
	rating: 91
	title: 'The Lego Batman Movie'
	year: 2017
	}
	{
	rating: 94
	title: 'Three Billboards Outside Ebbing, Missouri'
	year: 2017
	}
	{
	rating: 98
	title: 'My Life as a Zucchini (Ma vie de courgette)'
	year: 2017
	}
	{
	rating: 99
	title: 'God\'s Own Country'
	year: 2017
	}
	{
	rating: 87
	title: 'Blade Runner 2049'
	year: 2017
	}
	{
	rating: 100
	title: 'Faces Places (Visages, villages)'
	year: 2017
	}
	{
	rating: 99
	title: 'City of Ghosts'
	year: 2017
	}
	{
	rating: 100
	title: 'Truman'
	year: 2017
	}
	{
	rating: 98
	title: 'Kedi'
	year: 2017
	}
	{
	rating: 96
	title: 'Mudbound'
	year: 2017
	}
	{
	rating: 97
	title: 'After the Storm (Umi yori mo mada fukaku)'
	year: 2017
	}
	{
	rating: 99
	title: 'Jane'
	year: 2017
	}
	{
	rating: 99
	title: 'Whose Streets?'
	year: 2017
	}
	{
	rating: 98
	title: 'Lucky'
	year: 2017
	}
	{
	rating: 100
	title: 'Bright Lights: Starring Carrie Fisher and Debbie Reynolds'
	year: 2017
	}
	{
	rating: 100
	title: 'The Happiest Day in the Life of Olli Mäki (Hymyilevä mies)'
	year: 2017
	}
	{
	rating: 95
	title: 'The Red Turtle (La tortue rouge)'
	year: 2017
	}
	{
	rating: 96
	title: 'Stronger'
	year: 2017
	}
	{
	rating: 100
	title: 'The Work'
	year: 2017
	}
	{
	rating: 100
	title: 'Dawson City: Frozen Time'
	year: 2017
	}
	{
	rating: 97
	title: 'Your Name. (Kimi No Na Wa.)'
	year: 2017
	}
	{
	rating: 96
	title: 'The Disaster Artist'
	year: 2017
	}
	{
	rating: 98
	title: 'BPM (Beats Per Minute) (120 battements par minute)'
	year: 2017
	}
	{
	rating: 95
	title: 'Graduation (Bacalaureat)'
	year: 2017
	}
	{
	rating: 93
	title: 'I, Daniel Blake'
	year: 2017
	}
	{
	rating: 98
	title: 'In This Corner of the World (Kono sekai no katasumi ni)'
	year: 2017
	}
	{
	rating: 97
	title: 'Columbus'
	year: 2017
	}
	{
	rating: 95
	title: 'The Shape of Water'
	year: 2017
	}
	{
	rating: 90
	title: 'A Ghost Story'
	year: 2017
	}
	{
	rating: 90
	title: 'John Wick: Chapter 2'
	year: 2017
	}
	{
	rating: 98
	title: 'Dina'
	year: 2017
	}
	{
	rating: 98
	title: 'Trophy'
	year: 2017
	}
	{
	rating: 93
	title: 'The Meyerowitz Stories (New and Selected)'
	year: 2017
	}
]

movies = [
	{ 'title': 'Pulp Fiction' }
	{ 'title': 'Fight Club' }
	{ 'title': 'The Shawshank Redemption' }
	{ 'title': 'The Dark Knight' }
	{ 'title': 'Inglourious Basterds' }
	{ 'title': 'Inception' }
	{ 'title': 'The Matrix' }
	{ 'title': 'The Empire Strikes Back' }
	{ 'title': 'The Lord of the Rings: The Fellowship of the Ring' }
	{ 'title': 'Toy Story' }
	{ 'title': 'The Big Lebowski' }
	{ 'title': 'Django Unchained' }
	{ 'title': 'The Lord of the Rings: The Return of the King' }
	{ 'title': 'The Departed' }
	{ 'title': 'Memento' }
	{ 'title': 'The Godfather' }
	{ 'title': 'Reservoir Dogs' }
	{ 'title': 'Saving Private Ryan' }
	{ 'title': 'Forrest Gump' }
	{ 'title': 'Monty Python and the Holy Grail' }
	{ 'title': 'Se7en' }
	{ 'title': 'Back to the Future' }
	{ 'title': 'Goodfellas' }
	{ 'title': 'The Prestige' }
	{ 'title': 'Shaun of the Dead' }
	{ 'title': 'Alien' }
	{ 'title': 'The Silence of the Lambs' }
	{ 'title': 'The Lord of the Rings: The Two Towers' }
	{ 'title': 'Spirited Away' }
	{ 'title': 'The Good, the Bad and the Ugly' }
	{ 'title': 'Eternal Sunshine of the Spotless Mind' }
	{ 'title': 'Raiders of the Lost Ark' }
	{ 'title': '2001: A Space Odyssey' }
	{ 'title': 'Dr. Strangelove Or: How I Learned to Stop Worrying and Love the Bomb' }
	{ 'title': 'Blade Runner' }
	{ 'title': 'The Lion King' }
	{ 'title': 'One Flew Over the Cuckoo\'s Nest' }
	{ 'title': 'There Will Be Blood' }
	{ 'title': 'The Shining' }
	{ 'title': 'The Truman Show' }
	{ 'title': 'A Clockwork Orange' }
	{ 'title': 'Star Wars' }
	{ 'title': 'District 9' }
	{ 'title': 'Up' }
	{ 'title': 'Office Space' }
	{ 'title': '12 Angry Men' }
	{ 'title': 'Pan\'s Labyrinth' }
	{ 'title': 'The Usual Suspects' }
	{ 'title': 'Jurassic Park' }
	{ 'title': 'V for Vendetta' }
	{ 'title': 'The Princess Bride' }
	{ 'title': 'No Country for Old Men' }
	{ 'title': 'Full Metal Jacket' }
	{ 'title': 'Schindler\'s List' }
	{ 'title': 'Good Will Hunting' }
	{ 'title': 'Children of Men' }
	{ 'title': 'Kill Bill: Vol. 1' }
	{ 'title': 'WALL·E' }
	{ 'title': 'American History X' }
	{ 'title': 'Die Hard' }
	{ 'title': 'Drive' }
	{ 'title': 'Moon' }
	{ 'title': 'Groundhog Day' }
	{ 'title': 'Batman Begins' }
	{ 'title': 'Fargo' }
	{ 'title': 'The Incredibles' }
	{ 'title': 'O Brother, Where Art Thou' }
	{ 'title': 'Gladiator' }
	{ 'title': 'Airplane!' }
	{ 'title': 'Apocalypse Now' }
	{ 'title': 'American Beauty' }
	{ 'title': 'Terminator 2: Judgment Day' }
	{ 'title': 'Léon' }
	{ 'title': 'Toy Story 3' }
	{ 'title': 'Snatch' }
	{ 'title': 'American Psycho' }
	{ 'title': 'The Social Network' }
	{ 'title': 'Oldboy' }
	{ 'title': 'Ferris Bueller\'s Day Off' }
	{ 'title': 'Princess Mononoke' }
	{ 'title': 'In Bruges' }
	{ 'title': 'Donnie Darko' }
	{ 'title': 'Casablanca' }
	{ 'title': 'City of God' }
	{ 'title': 'Psycho' }
	{ 'title': 'The Fifth Element' }
	{ 'title': 'Seven Samurai' }
	{ 'title': 'Taxi Driver' }
	{ 'title': 'Monsters, Inc.' }
	{ 'title': '28 Days Later' }
	{ 'title': 'Requiem for a Dream' }
	{ 'title': 'The Godfather: Part II' }
	{ 'title': 'Hot Fuzz' }
	{ 'title': 'Trainspotting' }
	{ 'title': 'Amélie' }
	{ 'title': 'Twelve Monkeys' }
	{ 'title': 'Aliens' }
	{ 'title': 'The Dark Knight Rises' }
	{ 'title': 'Kiss Kiss Bang Bang' }
	{ 'title': 'Lost in Translation' }
	{ 'title': 'Chinatown' }
	{ 'title': 'The Royal Tennenbaums' }
	{ 'title': 'Rear Window' }
	{ 'title': 'Jaws' }
	{ 'title': 'Ocean\'s Eleven' }
	{ 'title': 'Howl\'s Moving Castle' }
	{ 'title': 'The Green Mile' }
	{ 'title': 'Black Swan' }
	{ 'title': 'Citizen Kane' }
	{ 'title': 'Moonrise Kingdom' }
	{ 'title': 'Looper' }
	{ 'title': 'The Thing' }
	{ 'title': 'The Breakfast Club' }
	{ 'title': 'The Cabin in the Woods' }
	{ 'title': 'L.A. Confidential' }
	{ 'title': 'Scott Pilgrim Vs. the World' }
	{ 'title': 'Finding Nemo' }
	{ 'title': 'Boogie Nights' }
	{ 'title': 'Superbad' }
	{ 'title': 'Sin City' }
	{ 'title': 'Fear and Loathing in Las Vegas' }
	{ 'title': 'Indiana Jones and the Last Crusade' }
	{ 'title': 'Gattaca' }
	{ 'title': 'To Kill a Mockingbird' }
	{ 'title': 'Lawrence of Arabia' }
	{ 'title': 'Being John Malkovich' }
	{ 'title': 'The Pianist' }
	{ 'title': 'Annie Hall' }
	{ 'title': 'Anchorman: The Legend of Ron Burgundy' }
	{ 'title': 'Argo' }
	{ 'title': 'Raging Bull' }
	{ 'title': 'Vertigo' }
	{ 'title': 'Little Miss Sunshine' }
	{ 'title': 'The Avengers' }
	{ 'title': 'Butch Cassidy and the Sundance Kid' }
	{ 'title': 'Dazed and Confused' }
	{ 'title': 'Days of Summer' }
	{ 'title': 'Willy Wonka & the Chocolate Factory' }
	{ 'title': 'Unforgiven' }
	{ 'title': 'Fantastic Mr. Fox' }
	{ 'title': 'Brazil' }
	{ 'title': 'The Iron Giant' }
	{ 'title': 'Akira' }
	{ 'title': 'The Terminator' }
	{ 'title': 'Ghost Busters' }
	{ 'title': 'This Is Spinal Tap' }
	{ 'title': 'Gran Torino' }
	{ 'title': 'Adaptation.' }
	{ 'title': 'A Fistful of Dollars' }
	{ 'title': 'Stand by Me' }
	{ 'title': 'Apollo 13' }
	{ 'title': 'Blazing Saddles' }
	{ 'title': 'Amadeus' }
	{ 'title': 'Kick-Ass' }
	{ 'title': 'Rushmore' }
	{ 'title': 'Life of Brian' }
	{ 'title': 'Almost Famous' }
	{ 'title': 'Network' }
	{ 'title': 'Mulholland Drive' }
	{ 'title': 'Star Trek' }
	{ 'title': 'It\'s a Wonderful Life' }
	{ 'title': 'Singin\' in the Rain' }
	{ 'title': 'The Graduate' }
	{ 'title': 'Cool Hand Luke' }
	{ 'title': 'The Nightmare Before Christmas' }
	{ 'title': 'Metropolis' }
	{ 'title': 'Casino Royale' }
	{ 'title': 'Zodiac' }
	{ 'title': 'Crouching Tiger, Hidden Dragon' }
	{ 'title': 'True Grit' }
	{ 'title': 'Braveheart' }
	{ 'title': 'Yojimbo' }
	{ 'title': 'The Thin Red Line' }
	{ 'title': 'Warrior' }
	{ 'title': 'Blue Velvet' }
	{ 'title': 'Primer' }
	{ 'title': 'The Life Aquatic With Steve Zissou' }
	{ 'title': 'Big Fish' }
	{ 'title': 'Mr. Smith Goes to Washington' }
	{ 'title': 'Clerks' }
	{ 'title': 'Rashomon' }
	{ 'title': 'Once Upon a Time in the West' }
	{ 'title': 'The Rocky Horror Picture Show' }
	{ 'title': 'North by Northwest' }
	{ 'title': 'Gangs of New York' }
	{ 'title': 'Duck Soup' }
	{ 'title': 'Grave of the Fireflies' }
	{ 'title': 'M' }
	{ 'title': 'E.T. the Extra-Terrestrial' }
	{ 'title': 'The Blues Brothers' }
	{ 'title': 'The Great Dictator' }
	{ 'title': 'Galaxy Quest' }
	{ 'title': 'Hotel Rwanda' }
	{ 'title': 'Brick' }
	{ 'title': 'The Assassination of Jesse James by the Coward Robert Ford' }
	{ 'title': 'Zoolander' }
	{ 'title': 'The Deer Hunter' }
	{ 'title': '8 1/2' }
	{ 'title': 'The Third Man' }
	{ 'title': 'The Bridge on the River Kwai' }
	{ 'title': 'The Lives of Others' }
	{ 'title': 'Heat' }
	{ 'title': 'The Seventh Seal' }
	{ 'title': 'Kill Bill: Vol. 2' }
	{ 'title': 'Synecdoche, New York' }
	{ 'title': 'Stranger Than Fiction' }
	{ 'title': 'Double Indemnity' }
	{ 'title': 'On the Waterfront' }
	{ 'title': 'Predator' }
	{ 'title': 'Lucky Number Slevin' }
	{ 'title': 'Catch Me If You Can' }
	{ 'title': 'Dredd' }
	{ 'title': 'Battle Royale' }
	{ 'title': 'Robocop' }
	{ 'title': 'How to Train Your Dragon' }
	{ 'title': 'Dog Day Afternoon' }
	{ 'title': 'Planet of the Apes' }
	{ 'title': 'Nausicaä of the Valley of the Wind' }
	{ 'title': 'Master and Commander: The Far Side of the World' }
	{ 'title': 'City Lights' }
	{ 'title': 'Paths of Glory' }
	{ 'title': 'Brokeback Mountain' }
	{ 'title': 'The Hobbit: An Unexpected Journey' }
	{ 'title': 'The Wizard of Oz' }
	{ 'title': 'Close Encounters of the Third Kind' }
	{ 'title': 'The Wrestler' }
	{ 'title': 'The Jerk' }
	{ 'title': 'Slumdog Millionaire' }
	{ 'title': 'Silver Linings Playbook' }
	{ 'title': 'Glengarry Glen Ross' }
	{ 'title': 'Sunset Boulevard' }
	{ 'title': 'Return of the Jedi' }
	{ 'title': 'Ran' }
	{ 'title': 'Collateral' }
	{ 'title': 'Let the Right One in' }
	{ 'title': 'The Sting' }
	{ 'title': 'Tucker and Dale Vs. Evil' }
	{ 'title': 'Some Like It Hot' }
	{ 'title': 'Shutter Island' }
	{ 'title': 'The Maltese Falcon' }
	{ 'title': 'The Treasure of the Sierra Madre' }
	{ 'title': 'Sunshine' }
	{ 'title': 'Punch-Drunk Love' }
	{ 'title': 'Magnolia' }
	{ 'title': 'Thank You for Smoking' }
	{ 'title': 'Ghost in the Shell' }
	{ 'title': 'Barry Lyndon' }
	{ 'title': 'Ikiru' }
	{ 'title': 'Dawn of the Dead' }
	{ 'title': 'The Hurt Locker' }
]

# Snapshots from omdbapi

pf =
	'Title': 'Pulp Fiction'
	'Year': '1994'
	'Rated': 'R'
	'Released': '14 Oct 1994'
	'Runtime': '154 min'
	'Genre': 'Crime, Drama'
	'Director': 'Quentin Tarantino'
	'Writer': 'Quentin Tarantino (stories), Roger Avary (stories), Quentin Tarantino'
	'Actors': 'Tim Roth, Amanda Plummer, Laura Lovelace, John Travolta'
	'Plot': 'The lives of two mob hit men, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.'
	'Language': 'English, Spanish, French'
	'Country': 'USA'
	'Awards': 'Won 1 Oscar. Another 60 wins & 68 nominations.'
	'Poster': 'http://res.cloudinary.com/pixelbeat/image/upload/c_mfit,q_auto:best,w_1280/v1512202426/pulpFiction.jpg'
	'Ratings': [
		{
			'Source': 'Internet Movie Database'
			'Value': '8.9/10'
		}
		{
			'Source': 'Rotten Tomatoes'
			'Value': '94%'
		}
		{
			'Source': 'Metacritic'
			'Value': '94/100'
		}
	]
	'Metascore': '94'
	'imdbRating': '8.9'
	'imdbVotes': '1,471,678'
	'imdbID': 'tt0110912'
	'Type': 'movie'
	'DVD': '19 May 1998'
	'BoxOffice': 'N/A'
	'Production': 'Miramax Films'
	'Website': 'N/A'
	'Response': 'True'

fc =
	'Title': 'Fight Club'
	'Year': '1999'
	'Rated': 'R'
	'Released': '15 Oct 1999'
	'Runtime': '139 min'
	'Genre': 'Drama'
	'Director': 'David Fincher'
	'Writer': 'Chuck Palahniuk (novel), Jim Uhls (screenplay)'
	'Actors': 'Edward Norton, Brad Pitt, Meat Loaf, Zach Grenier'
	'Plot': 'An insomniac office worker, looking for a way to change his life, crosses paths with a devil-may-care soap maker, forming an underground fight club that evolves into something much, much more.'
	'Language': 'English'
	'Country': 'USA, Germany'
	'Awards': 'Nominated for 1 Oscar. Another 10 wins & 32 nominations.'
	'Poster': 'http://res.cloudinary.com/pixelbeat/image/upload/s--bD7uo-Gy--/c_imagga_scale,q_auto:best,w_1280/v1512202141/Fight-Club_ksipx1.jpg'
	'Ratings': [
		{
			'Source': 'Internet Movie Database'
			'Value': '8.8/10'
		}
		{
			'Source': 'Rotten Tomatoes'
			'Value': '79%'
		}
		{
			'Source': 'Metacritic'
			'Value': '66/100'
		}
	]
	'Metascore': '66'
	'imdbRating': '8.8'
	'imdbVotes': '1,508,138'
	'imdbID': 'tt0137523'
	'Type': 'movie'
	'DVD': '06 Jun 2000'
	'BoxOffice': 'N/A'
	'Production': '20th Century Fox'
	'Website': 'http://www.foxmovies.com/fightclub/'
	'Response': 'True'

tsr =
	'Title': 'The Shawshank Redemption'
	'Year': '1994'
	'Rated': 'R'
	'Released': '14 Oct 1994'
	'Runtime': '142 min'
	'Genre': 'Crime, Drama'
	'Director': 'Frank Darabont'
	'Writer': 'Stephen King (short story "Rita Hayworth and Shawshank Redemption"), Frank Darabont (screenplay)'
	'Actors': 'Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler'
	'Plot': 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'
	'Language': 'English'
	'Country': 'USA'
	'Awards': 'Nominated for 7 Oscars. Another 19 wins & 29 nominations.'
	'Poster': 'http://res.cloudinary.com/pixelbeat/image/upload/s--UQgrUWCP--/c_imagga_crop,h_720,q_jpegmini,w_1280/v1512201263/shawshankRedemption.jpg'
	'Ratings': [
		{
			'Source': 'Internet Movie Database'
			'Value': '9.3/10'
		}
		{
			'Source': 'Rotten Tomatoes'
			'Value': '91%'
		}
		{
			'Source': 'Metacritic'
			'Value': '80/100'
		}
	]
	'Metascore': '80'
	'imdbRating': '9.3'
	'imdbVotes': '1,874,788'
	'imdbID': 'tt0111161'
	'Type': 'movie'
	'DVD': '27 Jan 1998'
	'BoxOffice': 'N/A'
	'Production': 'Columbia Pictures'
	'Website': 'N/A'
	'Response': 'True'

tdk =
	'Title': 'The Dark Knight'
	'Year': '2008'
	'Rated': 'PG-13'
	'Released': '18 Jul 2008'
	'Runtime': '152 min'
	'Genre': 'Action, Crime, Drama'
	'Director': 'Christopher Nolan'
	'Writer': 'Jonathan Nolan (screenplay), Christopher Nolan (screenplay), Christopher Nolan (story), David S. Goyer (story), Bob Kane (characters)'
	'Actors': 'Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine'
	'Plot': 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.'
	'Language': 'English, Mandarin'
	'Country': 'USA, UK'
	'Awards': 'Won 2 Oscars. Another 151 wins & 154 nominations.'
	'Poster': 'http://res.cloudinary.com/pixelbeat/image/upload/c_lfill,h_720,q_auto:best,w_1280/v1512203105/theDarkKnight.jpg'
	'Ratings': [
		{
			'Source': 'Internet Movie Database'
			'Value': '9.0/10'
		}
		{
			'Source': 'Rotten Tomatoes'
			'Value': '94%'
		}
		{
			'Source': 'Metacritic'
			'Value': '82/100'
		}
	]
	'Metascore': '82'
	'imdbRating': '9.0'
	'imdbVotes': '1,848,050'
	'imdbID': 'tt0468569'
	'Type': 'movie'
	'DVD': '09 Dec 2008'
	'BoxOffice': '$533,316,061'
	'Production': 'Warner Bros. Pictures/Legendary'
	'Website': 'http://thedarkknight.warnerbros.com/'
	'Response': 'True'

ib =
	'Title': 'Inglourious Basterds'
	'Year': '2009'
	'Rated': 'R'
	'Released': '21 Aug 2009'
	'Runtime': '153 min'
	'Genre': 'Adventure, Drama, War'
	'Director': 'Quentin Tarantino, Eli Roth'
	'Writer': 'Quentin Tarantino'
	'Actors': 'Brad Pitt, Mélanie Laurent, Christoph Waltz, Eli Roth'
	'Plot': 'In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner\'s vengeful plans for the same.'
	'Language': 'English, German, French, Italian'
	'Country': 'USA, Germany'
	'Awards': 'Won 1 Oscar. Another 129 wins & 165 nominations.'
	'Poster': 'http://res.cloudinary.com/pixelbeat/image/upload/s--epexlNdl--/c_imagga_scale,h_720,q_auto:best,w_1280/v1512203671/inglouriousBasterds_koghsj.jpg'
	'Ratings': [
		{
			'Source': 'Internet Movie Database'
			'Value': '8.3/10'
		}
		{
			'Source': 'Rotten Tomatoes'
			'Value': '88%'
		}
		{
			'Source': 'Metacritic'
			'Value': '69/100'
		}
	]
	'Metascore': '69'
	'imdbRating': '8.3'
	'imdbVotes': '997,468'
	'imdbID': 'tt0361748'
	'Type': 'movie'
	'DVD': '15 Dec 2009'
	'BoxOffice': '$120,523,073'
	'Production': 'The Weinstein Company'
	'Website': 'http://www.inglouriousbasterds-movie.com/'
	'Response': 'True'


# Add Card Function
	
numOfCards = 0

cards = []

cardSize = 
	width: 355
	height: 235
	offset: 11

addCard = () ->
	
	tone = _.sample duotone

	card = new Layer
		width: cardSize.width
		height: cardSize.height
		x: Align.center
		midX: 0.5
		y: numOfCards * (cardSize.height + cardSize.offset)
		name: 'card'+numOfCards
		parent: cardContainer
		borderRadius: 13
		opacity: 0
		scale: 0.8
		blur: 12
		backgroundColor: tone.toneOne

	poster = new Layer
		parent: card
		size: card.size
		blending: tone.blendOne
		opacity: 0.7
		clip: true
		borderRadius: 13
		grayscale: tone.greyscale
		contrast: tone.contrast

	after = new Layer
		parent: card
		size: card.size
		clip: true
		blending: tone.blendTwo
		backgroundColor: tone.toneTwo
		borderRadius: 13

	if numOfCards is 0
		poster.image = pf.Poster
	else if numOfCards is 1
		poster.image = fc.Poster
	else if numOfCards is 2
		poster.image = tsr.Poster
	else if numOfCards is 3
		poster.image = tdk.Poster
	else
		next = numOfCards + 1
		fetch = movies[next].title


	type = new TextLayer
		parent: card
		width: 209
		fontSize: 32
		x: Align.left +18
		y: Align.top -24
		color: 'white'
		fontFamily: '-apple-system'
		fontWeight: 700
		text: movies[numOfCards].title
		opacity: 0

	type.states =
		fadeIn:
			opacity: 1
			y: Align.top +24
			animationOptions:
				time: 0.15
				delay: 0.05
				
	numOfCards = numOfCards + 1
	
# 	http://www.omdbapi.com/?t=Pulp+Fiction&apikey=86718c42
	
	cards.push(card)
	
	card.states =
		fadeIn:
			scale: 1
			blur: 0
			opacity: 1
			y: card.y + 11
			animationOptions:
				time: 0.5
							
	card.animate('fadeIn')
	
	card.onAnimationEnd ->
		type.animate('fadeIn')
	
# 	card.onTap ->
# 		@.animate('done')
	
	# Force resize to match height with the contents of the container 
	cardContainer.height = cardContainer.contentFrame().height + 90 * 2

	if numOfCards > 4
		flow.scroll.updateContent()
		flow.scroll.scrollToPoint(y: cardContainer.height, curve: Bezier.ease, time: 10)

cardContainer = new Layer
	parent: scroll.content
	width: Screen.width
	height: Screen.height * 1.5
	y: 140
	backgroundColor: null

# Flow Component
flow = new FlowComponent
	backgroundColor: null
	parent: main
	index: -1
	
flow.showNext(cardContainer)

flow.scroll.mouseWheelEnabled = true
flow.scroll.contentInset =
	top: header.height
flow.index = 2

offsetHeader = (point, withModifier) ->
	if withModifier is 'scroll'
# 		print point
		header.y = Utils.modulate(point,[0,header.height],[point,-header.height],true)
		header.opacity = Utils.modulate(point,[0,70],[1,0],true)
		header.scale = Utils.modulate(point,[0,70],[1,0.9],true)

	else if withModifier is 'drag'
# 			print point
			header.y = Utils.modulate(point,[140,0],[0,-header.height],true)
			header.opacity = Utils.modulate(point,[140,70],[1,0],true)
			header.scale = Utils.modulate(point,[140,70],[1,0.9],true)

flow.scroll.on 'scroll', ->
	if flow.scroll.isDragging is false
		offsetHeader @.scrollPoint.y, 'scroll'
	else if flow.scroll.isDragging is true
		offsetHeader @.minY, 'drag'

# Interactions

button.placeBefore flow
homebar.placeBefore flow
button.states =
	over:
		opacity: 0.90
		options:
			time: 0.50
			curve: Spring

	out:
		opacity: 0.99
		options:
			time: 0.50
			curve: Spring

# Button interactions

button.y = Screen.height

button.on 'mouseover', ->
	@.animate 'over'

button.on 'mouseout', ->
	@.animate 'out'

button.on 'tap', ->
	addCard()

# Init

i = null

_.times 4, ->
	i += 1
	Utils.delay 0.7 * i, ->
		addCard()
	
	if i > 3
		Utils.delay 0.7 * i, ->
			button.animate
				y: Screen.height - (83+44)
				options:
					time: 0.50
					curve: Spring
