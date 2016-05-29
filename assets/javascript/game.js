var player;
var computer;

var sounds = ["saberA.wav", "saberB.wav", "saberC.wav", "saberD.wav", "saberE.wav", "saberF.wav", "saberG.wav", "saberH.wav"];
var baseUrl = "assets/sounds/";
var saberOn = "saberOn.wav"
var saberOff = "saberOff.wav"
var saberOnB = "saberOnB.wav"
var slideSound = "spacedoor.mp3"
var beep = "beep.mp3"

var obiwan = {
	name: "OBI-WAN KENOBI",
	hitpoints: 115,
	attack: 2,
	counter: 7,
};

var anakin = {
	name: "ANAKIN SKYWALKER",
	hitpoints: 120,
	attack: 2,
	counter: 6,
};

var maul = {
	name: "DARTH MAUL",
	hitpoints: 220,
	attack: 1,
	counter: 25,
};

var starkiller = {
	name: "GALEN MAREK",
	hitpoints: 150,
	attack: 2,
	counter: 20,
};

var allCharacters = {
	"maul": maul,
	"starkiller": starkiller,
	"anakin": anakin,
	"obiwan": obiwan
};

$("div#nameA").text(obiwan.name);
$("section#hpA").text(obiwan.hitpoints);
$("div#nameB").text(anakin.name);
$("section#hpB").text(anakin.hitpoints);
$("div#nameC").text(starkiller.name);
$("section#hpC").text(starkiller.hitpoints);
$("div#nameD").text(maul.name);
$("section#hpD").text(maul.hitpoints);

function reWriteStats() {
	console.log ("PC Hitpoints: " + player.hitpoints);
	console.log ("NPC Hitpoints: " + computer.hitpoints);
	console.log ("PC Attack: " + player.attack);
	console.log ("NPC Attack: " + computer.counter);
};

$("button#attack").on("click", function() {
	player.hitpoints = player.hitpoints - computer.counter;
	computer.hitpoints = computer.hitpoints - player.attack;

	var i = Math.floor(Math.random() * (sounds.length));
	new Audio(baseUrl + sounds[i]).play();

	$("div#characters").find("section").text(player.hitpoints);
	$("div#defender").find("section").text(computer.hitpoints);

	$("div#gametextA").text("You attacked " + computer.name + " for " + player.attack + " damage");
	$("div#gametextB").text(computer.name + " counterattacked for " + computer.counter + " damage");
	player.attack = player.attack + player.attack;
	reWriteStats();
	
	if (computer.hitpoints <= 0) {
		$("div#defender").children("div").fadeOut("slow");
		$("div#gametextA").text("You have defeated " + computer.name + "." + " Choose another opponent!");
		$("div#gametextB").text(" ");
		computer = null;
		enemySelected = false;
	}
	
	if (player.hitpoints <= 0) {
		$("div#gametextA").hide();
		$("div#restart").show();
		$("div#gametextB").text("Your character has been defeated.");
		computer = null;
	}

	if (player == obiwan && anakin.hitpoints <= 0 && starkiller.hitpoints <= 0 && maul.hitpoints <= 0) {
		$("div#gametextA").text("You have defeated all opponents. You are the master of the force!");
		$("div#gametextB").text(" ");
		new Audio(baseUrl + saberOff).play();
		computer = null;
	}

	if (player == anakin && obiwan.hitpoints <= 0 && starkiller.hitpoints <= 0 && maul.hitpoints <= 0) {
		$("div#gametextA").text("You have defeated all opponents. You are the master of the force!");
		$("div#gametextB").text(" ");
		new Audio(baseUrl + saberOff).play();
		computer = null;
	}

	if (player == starkiller && obiwan.hitpoints <= 0 && anakin.hitpoints <= 0 && maul.hitpoints <= 0) {
		$("div#gametextA").text("You have defeated all opponents. You are the master of the force!");
		$("div#gametextB").text(" ");
		new Audio(baseUrl + saberOff).play();
		computer = null;
	}

	if (player == maul && obiwan.hitpoints <= 0 && anakin.hitpoints <= 0 && starkiller.hitpoints <= 0) {
		$("div#gametextA").text("You have defeated all opponents. Must be a great feeling smashing jedi noobs. Palpatine would be proud.");
		$("div#gametextB").text(" ");
		new Audio(baseUrl + saberOff).play();
		computer = null;
	}

});

$("button#restart").on("click", function() {
	location.reload();
})

$("div#obiwan, div#anakin, div#starkiller, div#maul").hover(function() {
	new Audio(baseUrl + beep).play();	
	$(this).css("background-color", "#282828");
	}, function() {
	$(this).css("background-color", "black")
});

var playerSelected = false;
var enemySelected = false;
$(".player").on("click", function() {

	if (playerSelected === false) {
		$(this).appendTo("div#characters");
		new Audio(baseUrl + saberOn).play();
		$("div#select").children("div").appendTo("div#enemies");
		$("div#select").slideUp(2700);
		new Audio(baseUrl + slideSound).play();
		$("div#enemies").children("div").css("background-color", "#300000");
		$("div#enemies").children("div").hover(function() {
			$("div#enemies").children("div").css("background-color", "#300000")
		});
		var id = $(this).attr('id');
		$(this).off("click");
		player = allCharacters[id]
	}

	if (playerSelected == true && enemySelected == false) {
		$(this).appendTo("div#defender");
		new Audio(baseUrl + saberOnB).play();
		var id = $(this).attr('id');
		computer = allCharacters[id];
		enemySelected = true;	
	}

	if ($("div#enemies img").length === 0) {
		$("div#enemies").slideUp(2700);
		new Audio(baseUrl + slideSound).play();
	}

	playerSelected = true; 	
	
})