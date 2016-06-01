var player;
var computer;
var anakinLastStand;
var galenLastStand;
var maulLastStand;
var obiwanLastStand;

var sounds = ["saberA.wav", "saberB.wav", "saberC.wav", "saberD.wav", "saberE.wav", "saberF.wav", "saberG.wav", "saberH.wav"];
var baseUrl = "assets/sounds/";
var saberOn = "saberOn.wav"
var saberOff = "saberOff.wav"
var saberOnB = "saberOnB.wav"
var slideSound = "spacedoor.mp3"
var crystalSound = "forcecrystal.wav"
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
	counter: 6,
};

var vader = {
	name: "DARTH VADER",
	hitpoints: 1200,
	attack: 3,
	counter: 150,
};

var sidious = {
	name: "DARTH SIDIOUS",
	hitpoints: 1500,
	attack: 4,
	counter: 250,
};

var yoda = {
	name: "YODA",
	hitpoints: 1300,
	attack: 4,
	counter: 225,
}

var allCharacters = {
	"maul": maul,
	"starkiller": starkiller,
	"anakin": anakin,
	"obiwan": obiwan,
	"sidious": sidious,
	"vader" : vader
};

$("div#nameA").text(obiwan.name);
$("section#hpA").text(obiwan.hitpoints);
$("div#nameB").text(anakin.name);
$("section#hpB").text(anakin.hitpoints);
$("div#nameC").text(starkiller.name);
$("section#hpC").text(starkiller.hitpoints);
$("div#nameD").text(maul.name);
$("section#hpD").text(maul.hitpoints);
$("div#nameE").text(sidious.name);
$("section#hpE").text(sidious.hitpoints);
$("div#nameF").text(vader.name);
$("section#hpF").text(vader.hitpoints);
$("div#nameG").text(yoda.name);
$("section#hpG").text(yoda.hitpoints);

function reWriteStats() {
	console.log ("PC Hitpoints: " + player.hitpoints);
	console.log ("NPC Hitpoints: " + computer.hitpoints);
	console.log ("PC Attack: " + player.attack);
	console.log ("NPC Attack: " + computer.counter);
};

function forceCrystal() {
	$("div#gametextB").html("<br><i>Force crystal augmented to lightsaber!<i>");
	player.hitpoints = player.hitpoints + 300;
	player.attack = player.attack + 1500;
	$("div#characters").find("section").text(player.hitpoints);
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
		$("div#characters").children("div").fadeOut("slow");
		$("div#gametextB").text("You have been defeated.");
		computer = null;
	}

	if (player == obiwan && anakin.hitpoints <= 0 && maul.hitpoints <= 0) {
		if (starkiller.hitpoints > 0) {
			$("div#gametextA").html("</b>You are startled by the sound of applause behind you. You spin around to see a man dressed in Jedi robes step out of the shadows where he had been secretly observing your battles.<br><br> <b>Galen</b>: 'Don't mind my disguise for I am no Jedi of the light. Rather, I was tracking the one known as Maul whom you have conveniently disposed of. He was carrying a rare <i>force crystal</i> which my master sent me to retrieve. This crystal was the source of his unusual power. Now who shall walk away with it? You or me? Time to find out!'");
			galenLastStand = true;
		}
	}

	if (player == obiwan && anakin.hitpoints <= 0 && maul.hitpoints <= 0 && galenLastStand == true) {
		if (starkiller.hitpoints <= 0) {
			forceCrystal();
		}
	}

	if (player == obiwan && anakin.hitpoints <= 0 && starkiller.hitpoints <= 0 && maul.hitpoints <= 0 && vader.hitpoints > 0) {
		computer = vader;
		$("div#gametextA").html("<br>Decades have passed since the battles of your youth but sadly, in your old age, you have been driven into hiding due to the establishment of the Galactic Empire. Most troubling has been the emergence of a mysterious, powerful Sith lord named Darth Vader. What you do know is that this Darth Vader has succesfully hunted down all but a small remnant of your Jedi comrades. <br><br>One day, a towering figure looms threateningly in your doorway! <br><br> <b>Vader</b>: 'At last, I have found you my old master. You left me for dead many long years ago. Indeed, Anakin Skywalker is dead. I am now who you see before you: Darth Vader!'");
		$("div#vader").appendTo("div#defender").fadeIn(3000);
		if (galenLastStand == true) {
			$("div#vader").appendTo("div#defender").fadeIn(3000, function() {
				new Audio(baseUrl + crystalSound).play();
			});
		}
	}

	if (player == obiwan && anakin.hitpoints <= 0 && starkiller.hitpoints <= 0 && maul.hitpoints <= 0 && vader.hitpoints <= 0) {
		$("div#gametextA").html("You have defeated Darth Vader and all other opponents. You have proven yourself to be a master of the force. However, you feel a deep sorrow as you consider the twisted remains of your former padawan from ages ago. Before you are overwhelmed with remorse, you steady yourself by recalling that evil can corrupt even the brightest and best of all people. No one is secure against the power of the dark side. Though you are now old, you find renewed resolve in the knowledge that someone out there requires your guidance as Anakin once did. And though you were unable to keep him from falling under the power of the Sith, you will live another day to help another walk in the way of the light - the way of the Jedi!");
		$("div#gametextB").text(" ");
		computer = null;
	}

	if (player == anakin && obiwan.hitpoints <= 0 && starkiller.hitpoints <= 0) {
		if (maul.hitpoints > 0) {
			$("div#gametextA").html("Without warning, a rough stomp to the back sends you sprawling facedown into the ground. You roll swiftly to your feet, ready to annhilate your assailant. What you see makes you pause momentarily. Standing before you is a fiery crimson Zabrak wearing a midnight garment of the Sith.</b><br><br> <b>Maul</b>: 'Done fighting weaklings and outcasts? Good. I took particular pleasure in watching you vivisect that one called Starkiller. Galen stole something of value to me that is in your possession...yes, that pretty crystal you've undoubtedly swiped from his corpse. Hahaha. It's my <i>force crystal</i> which I'll be needing back. I'll also be needing your head. What? Haven't you heard of 'The Rule of Two'? I don't intend on letting you take my place by the master's side!");
			maulLastStand = true;
		}
	}

	if (player == anakin && obiwan.hitpoints <= 0 && starkiller.hitpoints <= 0 && maulLastStand == true) {
		if (maul.hitpoints <= 0) {
			forceCrystal();
		}
	}

	if (player == anakin && obiwan.hitpoints <= 0 && starkiller.hitpoints <= 0 && maul.hitpoints <= 0 && yoda.hitpoints > 0) {
		computer = yoda;
		$("div#gametextA").html("<br>A small, cloaked figure hobbles into your path, obstructing your way. With one hand he flings back his hood revealing his identity while with the other he thrusts his twisted cane in your direction.<br><br> <b>Yoda</b>: 'No more causing destruction you shall. Justice for master Obi-Wan I bring. Your madness and betrayal of the Jedi this day ends!'");
		$("div#yoda").appendTo("div#defender").fadeIn(3000);
		if (maulLastStand == true) {
			$("div#yoda").appendTo("div#defender").fadeIn(3000, function() {
				new Audio(baseUrl + crystalSound).play();
			});
		}
	}

	if (player == anakin && obiwan.hitpoints <= 0 && starkiller.hitpoints <= 0 && maul.hitpoints <= 0 && yoda.hitpoints <= 0) {
		$("div#gametextA").html("You have defeated Yoda and all other opponents. You have proven yourself to be a master of the force. However, your victory seems shallow to you for as long as you are a lackey under Darth Sidious. He sends you scouring the known universe hunting down the Jedi. One by one you destroy the Jedi until they are completely eradicated. Yet, wounds incurred from countless battles have left you a shell of your former self, sustained only by the cybernetic augmentations that keep you alive. You know that there is no reward for loyalty among the Sith and that sooner or later your master will seek the opportunity to destroy you and replace you with another. Examining your broken body that is more android than human, you have little doubt as to who will come out on top when that time comes. In the meanwhile, you live out an uneasy existence awaiting Sidious' betrayal, wondering if there could have been another way.");
		$("div#gametextB").text(" ");
		computer = null;
	}

	if (player == starkiller && anakin.hitpoints <= 0 && maul.hitpoints <= 0) {
		if (obiwan.hitpoints > 0) {
			$("div#gametextA").html("As you turn to leave your fallen opponent you notice a man dressed in the traditional robe of a Jedi Knight standing a short distance from you, observing you grimly. <br><br> <b>Obi-Wan</b>: 'Anakin was my apprentice and thus I should have been the one to stop his descent into darkness. Yet, I see that you have already accomplished what I set out to do. What your reasons are for killing Anakin is unknown to me. But who you are is not. Though you wear the garment of a Jedi, I sense the dark side in you. I also sense the true nature of the crystal you have seized from Maul whether you are aware of its power or not and I will not allow you to augment it for evil purposes. Hand over the <i>force crystal</i> or I shall have no choice but to take it by force!'")
			obiwanLastStand = true;
		}
	}

	if (player == starkiller && anakin.hitpoints <= 0 && maul.hitpoints <= 0 && obiwanLastStand ==true) {
		if (obiwan.hitpoints <= 0) {
			forceCrystal();
		}
	}

	if (player == starkiller && obiwan.hitpoints <= 0 && anakin.hitpoints <= 0 && maul.hitpoints <= 0 && sidious.hitpoints > 0) {
		computer = sidious;
		$("div#gametextA").html("<br>An ominous darkness fills the room as a hooded figure emerges from the shadows. <br><br> <b>Sidious</b>: 'I admire your devotion to the dark side of the force. You have done your job as I have commanded by ridding me of my apprentice, Maul. However, you have also disposed of the one who was to take his place at my side. Were you foolish enough to think by destroying both Maul and Anakin that I would bestow upon you a place by my side? You are merely a tool, Galen Marek, which no longer has any use in my plans. Now you will join Maul and Anakin in death!");
		$("div#sidious").appendTo("div#defender").fadeIn(3000);
		if (obiwanLastStand == true) {
			$("div#sidious").appendTo("div#defender").fadeIn(3000, function() {
				new Audio(baseUrl + crystalSound).play();
			});
		}	
	}

	if (player == starkiller && obiwan.hitpoints <= 0 && anakin.hitpoints <= 0 && maul.hitpoints <= 0 && sidious.hitpoints <= 0) {
		$("div#gametextA").html("You have defeated Darth Sidious and all other opponents. You have proven yourself to be a master of the force. Having destroyed both Sith master and apprentice, 'The Rule of Two' has been broken. It now remains for you to reestablish the Sith which you gladly do. You take Sidious' mantle and assume the title of Darth Fatalis. Under your leadership, the Galactic Empire swiftly attains supremacy over the known galaxy and the Jedi are utterly wiped out. With no remaining Jedi to hunt, you annhilate your Sith apprentice, do away with 'The Rule of Two', and establish your absolute rule. But as you gaze out into the vast expanse of space from your icy throne, you know one day balance will return to the force. Balance always returns to the force.");
		$("div#gametextB").text(" ");
		computer = null;
	}

	if (player == maul && obiwan.hitpoints <= 0 && starkiller.hitpoints <= 0) {
		if (anakin.hitpoints > 0) {
			$("div#gametextA").html("A young man clad in the pitch black garment of a Sith apprentice, addresses you from atop of a pillar where he has been watching your battles. <br><br> <b>Anakin</b>: 'You have killed my Jedi master, Obiwan. You slew the Sith Assassin, Galen Marek. The dying remnant of the light-side within me has revealed that our master, Sidious, will betray either you or me regardless of who stands or falls.  If I fall, augment this <i>force crystal</i> into your light saber. It may save you in your time of need.'");
			anakinLastStand = true;
		}
	}

	if (player == maul && obiwan.hitpoints <= 0 && starkiller.hitpoints <= 0 && anakinLastStand == true) {
		if (anakin.hitpoints <= 0) {
			forceCrystal();
		}
	}

	if (player == maul && obiwan.hitpoints <= 0 && anakin.hitpoints <= 0 && starkiller.hitpoints <= 0 && sidious.hitpoints > 0) {
		computer = sidious;
		$("div#gametextA").html("<br>An ominous darkness fills the room as a hooded figure emerges from the shadows. <br><br> <b>Sidious</b>: 'Your rage has made you stronger. A pity that young Anakin is now dead, before I could train him to unleash his true potential. Now you must join him in death, my over-zealous apprentice.'");
		$("div#sidious").appendTo("div#defender").fadeIn(3000);
		if (anakinLastStand == true) {
			$("div#sidious").appendTo("div#defender").fadeIn(3000, function() {
				new Audio(baseUrl + crystalSound).play();
			});
		}
	}

	if (player == maul && obiwan.hitpoints <= 0 && anakin.hitpoints <= 0 && starkiller.hitpoints <= 0 && sidious.hitpoints <= 0) {
		$("div#gametextA").html("You have defeated Darth Sidious and all other opponents. You have proven yourself to be a master of the force. However, as you ponder the charred remains of your former master, your victory feels hollow. You wonder if this is all there is to the dark side of the force? For the first time in your existence, you feel a weak glimmer of light pulsating within you. Only time will tell if you will ruthlessly crush that inner-light or learn to embrace its call!");
		$("div#gametextB").text(" ");
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
		$("div#select").slideUp(2900);
		new Audio(baseUrl + slideSound).play();
		$("div#enemies").children("div").css("background-color", "#300000");
		$("div#enemies").children("div").hover(function() {
			$("div#enemies").children("div").css("background-color", "#300000")
		});
		var id = $(this).attr('id');
		$(this).off("click");
		player = allCharacters[id];
	}

	if (playerSelected == true && enemySelected == false) {
		$(this).appendTo("div#defender");
		new Audio(baseUrl + saberOnB).play();
		var id = $(this).attr('id');
		computer = allCharacters[id];
		enemySelected = true;	
	}

	if ($("div#enemies img").length === 0) {
		$("div#enemies").slideUp(2900);
		new Audio(baseUrl + slideSound).play();
		$(this).off("click");
	}

	playerSelected = true; 	
	
})