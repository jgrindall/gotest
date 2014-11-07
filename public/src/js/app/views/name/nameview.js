
define(['phasercomponents', 'app/views/mainviewlayout', 'app/consts/canvaslayout'],

function(PhaserComponents, MainViewLayout, CanvasLayout){
	
	"use strict";
		
	var NameView = function(model){
		this.model = model;
		var that = this;
		this.el = $("<input class='_2goname' maxlength='56' placeholder='Your name here' type='text'></input>");
		PhaserComponents.Injector.getInstance().injectInto(this, "nameview");
		this.cacheRegExp();
		this.addListeners();
		setTimeout(function(){
			that.el.addClass("show");
		}, 400);
		this.onResize();
	};
	
	NameView.SWEAR = ["@$$","damn","dyke","fuck","cunt","crap","shit","2g1c","2girls1cup","ahole","amcik","anal","andskota","anilingus","anus","arschloch","arse","arsehole","ash0le","ash0les","asholes","ass","asses","assface","assh0le","assh0lez","asshole","assholes","assholz","asskisser","assmunch","assrammer","asswipe","autoerotic","ayir","azzhole","b!+ch","b!tch","b00b","b00bs","b17ch","b1tch","babeland","ballsack","bangbros","bareback","barenaked","bassterds","bastard","bastardo","bastards","bastardz","basterds","basterdz","bastinado","bbw","bdsm","beastial","beastiality","beastility","beaver","bestial","bestiality","bi+ch","bi7ch","biatch","bimbos","birdlock","bitch","bitch","bitcher","bitchers","bitches","bitches","bitchin","bitching","bloody","blowjob","blowjobs","blumpkin","boffing","boiolas","bollock","bollock","bollocks","bollok","bondage","bonehead","boner","boob","boobs","breasts","browneye","browntown","buceta","bugger","bukkake","bulldyke","bullshit","bum","bunghole","busty","butt-pirate","buttcheeks","buttface","buttfuck","buttfucker","butthead","butthole","butthole","buttpicker","buttplug","buttwipe","c0ck","c0cks","c0k","cabron","camgirl","camslut","camwhore","carpetmuncher","cawk","cawks","cazzo","chink","chraa","chuj","cipa","circlejerk","clam","clit","clitoris","clits","clusterfuck","cnts","cntz","cobia","cock","cock-head","cock-sucker","cock","cockhead","cocks","cocksuck","cocksucked","cocksucker","cocksucker","cocksucking","cocksucks","coon","cooter","coprolagnia","coprophilia","cornhole","crap","cum","cummer","cumming","cums","cumshot","cunilingus","cunnilingus","cunt","cunt","cuntlick","cuntlicker","cuntlicking","cunts","cuntz","cyberfuc","cyberfuck","cyberfucked","cyberfucker","cyberfuckers","cyberfucking","d4mn","damn","darkie","daterape","daygo","deepthroat","dego","dike","dike","dild0","dild0s","dildo","dildos","dilld0","dilld0s","dink","dinks","dipshit","dirsa","doggystyle","dolcett","domination","dominatricks","dominatrics","dominatrix","dommes","dong","douche","dumbass","dupa","dziwka","ecchi","ejackulate","ejaculate","ejaculated","ejaculates","ejaculating","ejaculatings","ejaculation","ejakulate","ekrem","ekto","enculer","enema","erotic","erotism","escort","eunuch","faen","fag","fag","fag1t","faget","fagg1t","fagget","fagging","faggit","faggit","faggot","faggs","fagit","fagot","fagots","fags","fagz","faig","faigs","fanculo","fanny","fart","farted","farting","fartings","farts","farty","fatass","fatso","fcuk","fecal","feces","feck","feg","felatio","felch","felcher","felching","fellate","fellatio","feltch","femalesquirting","femdom","ficken","figging","fingerfuck","fingerfucked","fingerfucker","fingerfuckers","fingerfucking","fingerfucks","fingering","fistfuck","fistfucked","fistfucker","fistfuckers","fistfucking","fistfuckings","fistfucks","fisting","fitt","flange","flikker","footjob","foreskin","fotze","frotting","fuck","fucked","fucker","fuckers","fuckin","fucking","fuckings","fuckme","fucks","fudgepacker","fukah","fuken","fuker","fukin","fukk","fukkah","fukken","fukker","fukkin","fuks","furburger","futanari","futkretzn","fux0r","g-spot","g00k","gangbang","gangbanged","gangbangs","gazongers","genitals","goatcx","goatse","gokkun","goldenshower","gonads","goodpoop","gook","goregasm","grope","guiena","guinne","guro","h00r","h0ar","h0r","h0re","h4x0r","handjob","hardcore","hardcoresex","helvete","hentai","hoar","honkey","hooker","hoor","hoore","hore","horniest","horny","hotsex","huevon","humping","hussy","incest","injun","intercourse","jack-off","jackass","jackingoff","jackoff","jailbait","jap","japs","jerk","jerk-off","jigaboo","jiggaboo","jiggerboo","jisim","jism","jiss","jiz","jizm","jizz","juggs","kanker","kawk","kike","kinbaku","kinkster","kinky","klootzak","knob","knobbing","knobend","knobs","knobz","knulle","kock","kondum","kondums","kraut","kuk","kuksuger","kum","kummer","kumming","kums","kunilingus","kunt","kunts","kuntz","kurac","kurwa","kusi","kyrpa","l3i+ch","l3itch","labia","lezzian","lick","lipshits","lipshitz","lolita","lovemaking","mamhoon","masochist","masokist","massterbait","masstrbait","masstrbate","masterbaiter","masterbat","masterbat3","masterbate","masterbates","masturbat","masturbate","merd","merde","mibun","milf","mofo","monkleigh","mothafuck","mothafucka","mothafuckas","mothafuckaz","mothafucked","mothafucker","mothafuckers","mothafuckin","mothafucking","mothafuckings","mothafucks","mother-fucker","motherfuck","motherfucked","motherfucker","motherfuckers","motherfuckin","motherfucking","motherfuckings","motherfucks","mouliewop","muffdiving","muie","mulkku","muschi","n1gr","nambla","nastt","nawashi","nazi","nazis","negro","neonazi","nepesaurio","nigga","nigger","nimphomania","nipple","nude","nudity","nutsack","nympho","nymphomania","octopussy","omg","omorashi","orafis","orgasim","orgasm","orgasum","orgy","oriface","orifice","orifiss","orospu","p0rn","packi","packie","packy","paedophile","paki","pakie","paky","panties","panty","paska","pecker","pedobear","pedophile","peeenus","peeenusss","peenus","pegging","peinus","pen1s","penas","penis","penis-breath","penus","penuus","perse","phonesex","phuc","phuck","phuk","phuk","phuked","phuker","phuking","phukked","phukker","phukking","phuks","phuq","picka","pierdol","pillu","pimmel","pimp","pimpis","pissed","pissers","pisses","pissin","pissing","pissoff","pisspig","pissrr","pizda","playboy","polac","polack","polak","ponyplay","poof","poonani","poontsee","poop","poopchute","porn","porno","pornography","pr0n","pr1c","pr1ck","pr1k","preteen","prick","pricks","pthc","pube","pubes","pula","pule","pusse","pussee","pussies","pussy","pussys","puta","puto","puuke","puuker","qahbeh","queaf","queef","raghead","rape","raping","rapist","rautenberg","recktum","rectum","retard","rimjob","rimming","s.o.b.","s&m","sadism","sadist","scank","scat","schaffer","scheiss","schlampe","schlong","schmuck","scissoring","screw","screwing","scrotum","semen","sex","sexo","sexy","sh!+","sh!t","sh!t","sh1t","sh1ter","sh1ts","sh1tter","sh1tz","sharmuta","sharmute","sheister","shemale","shi+","shibari","shipal","shit","shited","shitfull","shiting","shitings","shits","shitted","shitter","shitters","shitting","shittings","shitty","shity","shitz","shiz","shota","shrimping","shyt","shyte","shytty","shyty","skanck","skank","skankee","skankey","skanks","skanky","skribz","skurwysyn","slag","slanteye","sleaze","slut","sluts","slutty","slutz","smegma","smut","snatch","snowballing","sodomize","sodomy","son-of-a-bitch","sphencter","spic","spierdalaj","splooge","spooge","spunk","strapon","strappado","suck","sucks","suka","swastika","swinger","teets","teez","testicle","threesome","throating","tits","titties","titty","topless","tosser","towelhead","tranny","tribadism","tushy","twat","twink","twinkie","twogirlsonecup","undressing","upskirt","urethra","urophilia","va1jina","vag1na","vagiina","vagina","vaj1na","vajina","vibrator","vittu","vorarephilia","voyeur","vullva","vulva","w00se","w0p","wank","wank","wetback","wh00r","wh0re","whacker","whoar","whore","wichser","wop","wtf","xrated","xx","xxx","yaoi","yed","yiffy","zabourah","zoophilia"];

	NameView.HEIGHT = 45;

	NameView.prototype.addListeners = function(){
		var onChange;
		onChange = PhaserComponents.Utils.debounce(this.valChanged.bind(this), 1000);
		this.el.on("keydown", this.onKeyDown.bind(this));
		this.el.on("input propertychange paste change", onChange);
		this.el.on("focusout blur", this.scrollTop.bind(this));
		this.model.changeSignal.add(this.modelChanged, this);
		this.eventDispatcher.addListener(PhaserComponents.Events.AppEvents.ALERT_SHOWN, this.onAlert.bind(this));
		this.eventDispatcher.addListener(PhaserComponents.Events.AppEvents.RESIZE, this.onResize.bind(this));
	};

	NameView.prototype.onResize = function(){
		var pos;
		pos = MainViewLayout.getCanvasPos(this.game.w, this.game.h);
		this.el.width(pos.scale*CanvasLayout.REF_WIDTH*this.game.worldScale);
		this.el.css("left", pos.x);
	};

	NameView.prototype.filter = function(s){
		var i, regexp, max;
		max = this.regexps.length;
		for(i = 0; i < max; i++){
			regexp = this.regexps[i];
			s = s.replace(regexp, '');
		}
		return s;
	};

	NameView.prototype.onAlert = function(event, data) {
		var that = this;
		if(data.shown){
			setTimeout(function(){
				that.el.css("display", "none");
			}, 200);
		}
		else{
			this.el.css("display", "block");
		}
	};

	NameView.prototype.cacheRegExp = function() {
		this.regexps = [];
		var i, word, max;
		max = NameView.SWEAR.length;
		for(i = 0; i < max; i++){
			word = NameView.SWEAR[i];
			this.regexps.push(new RegExp('^'+word+' ', 'gi'));
			this.regexps.push(new RegExp(' '+word+' ', 'gi'));
			this.regexps.push(new RegExp('^'+word+'$', 'gi'));
			this.regexps.push(new RegExp(' '+word+'$', 'gi'));
		}
	};

	NameView.prototype.scrollTop = function() {
		setTimeout(function(){
			window.scrollTo(0, 0);
		}, 100);
	};

	NameView.prototype.onKeyDown = function(event) {
		event.stopPropagation();
	};

	NameView.prototype.valChanged = function() {
		var newVal = this.filter(this.el.val());
		this.model.set(newVal, {"force":true});
	};

	NameView.prototype.modelChanged = function(value) {
		if(value === null || value === undefined){
			value = "";
		}
		this.el.val(value);
	};

	NameView.prototype.destroy = function() {
		this.eventDispatcher.removeListener(PhaserComponents.Events.AppEvents.ALERT_SHOWN, this.onAlert.bind(this));
		this.eventDispatcher.removeListener(PhaserComponents.Events.AppEvents.RESIZE, this.onResize.bind(this));
		this.model.changeSignal.remove(this.nameChanged, this);
		this.el.off("input propertychange paste");
		this.el.off("keydown");
		this.el.remove();
		this.el = null;
		this.model = null;
	};

	return NameView;
	
});
	





