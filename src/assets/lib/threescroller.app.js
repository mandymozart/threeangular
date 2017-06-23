var DEV = false;

function App() {

    // var db = window['AlbumComponent'].album
    
 var db =  {
	projects: [
		{
			id: 0,
			name: 'Room',
			text: {
				english: 'Video cut and post-production for Nike\'s Basketball Innovation Room',
				deutsch: 'Videoschnitt und Postproduktion fÃ¼r Nike\'s Basketball Innovation Room'
			},
			link: {
				title: '',
				href: ''
			},
			logo: 0
		},
		{
			id: 1,
			name: 'Ling Ling Gling',
			text: {
				english: 'Visual language for social media communication and In-house Glitch applications',
				deutsch: 'Visuelles Erscheinungsbild fÃ¼r Social Media Kommunikation und In-house Glitch Apps'
			},
			link: {
				title: '',
				href: ''
			},
			logo: 1
		},
		{
			id: 2,
			name: 'Nike Kobe Bryant Lab of Innovation',
			text: {
				english: 'Screen designs for Nike\'s Kobe Bryant Lab of Innovation exhibition in LA',
				deutsch: 'Screen designs fÃ¼r Nike\'s Kobe Bryant Lab of Innovation Ausstellung in LA'
			},
			link: {
				title: 'Video',
				href: 'https://www.youtube.com/watch?v=Ztl8FQ3-Fb0'
			},
			logo: 0
		},
		{
			id: 3,
			name: 'Yolo',
			text: {
				english: 'Video post-production and graphics for Ling Ling Mykonos',
				deutsch: 'Video Postproduktion und Grafik fÃ¼r Ling Ling Mykonos'
			},
			link: {
				title: 'Video',
				href: 'https://www.facebook.com/linglingaffairs/videos/1104543342940736/'
			},
			logo: 1
		}
	],
	images: [
		{
			filename: 'NETRO-LOGO-blank-white.jpg',
			width: 1024,
			height: 512,
			padding: 0.2,
			project: -1
		},
		{
			filename: 'lingling-mykonos-00.jpg',
			width: 1280,
			height: 720,
			padding: 0.25,
			project: 3
		},
		{
			filename: 'lingling-mykonos-01.jpg',
			width: 1280,
			height: 720,
			padding: 0.1,
			project: 3
		},
		{
			filename: 'nike-kobe-exhibition-00.jpg',
			width: 1620,
			height: 1080,
			padding: 0.05,
			project: 2
		},
		{
			filename: 'nike-kobe-exhibition-01.jpg',
			width: 1620,
			height: 1080,
			padding: 0.125,
			project: 2
		},
		{
			filename: 'nike-kobe-exhibition-02.jpg',
			width: 1620,
			height: 1080,
			padding: 0.2,
			project: 2
		},
		{
			filename: 'lingling-gling-00.jpg',
			width: 1280,
			height: 853,
			padding: 0.05,
			project: 1
		},
		{
			filename: 'lingling-gling-01.jpg',
			width: 526,
			height: 1079,
			padding: 0.25,
			project: 1
		},
		{
			filename: 'nike-kobe-pixel-sorting.jpg',
			width: 998,
			height: 1500,
			padding: 0.2,
			project: 0
		},
		{
			filename: 'nike-innovation-room-00.jpg',
			width: 1631,
			height: 540,
			padding: 0.025,
			project: 0
		},
		{
			filename: 'nike-innovation-room-01.jpg',
			width: 1620,
			height: 1080,
			padding: 0.1,
			project: 0
		},
		{
			filename: 'blank.jpg',
			width: 16,
			height: 16,
			padding: 0.0,
			project: -2
		}
	],
	logos: [
		{
			id: 0,
			name: 'Nike',
			filename: 'nike.png'
		},
		{
			id: 1,
			name: 'Ling Ling',
			filename: 'lingling.png'
		}
	]
};


	var container, stats;
	var renderer, scene, camera, clock;
	var geometry, material, mesh;
	var uniforms;

	var vertexRes = 256;
	var frameTimes = [];

	var scrollId = -1;
	var channels = [];
	var channelMin = [];
	var channelMax = [];

	var currentProjectId = -1;

	var scrollContainer, scrollContent;
	var loading, bar;
	var info, contact, logoContainer, metaContainer;
	var lang;


	function initialize() {

		container = document.getElementById('container');
		scrollContainer = document.getElementById('scrollContainer');
		scrollContent = document.getElementById('scrollContent');
		loading = document.getElementById('loading');
		bar = document.getElementById('bar');
		info = document.getElementById('info');
		contact = document.getElementById('contact');
		logoContainer = document.getElementById('logo');
		metaContainer = document.getElementById('meta');
		lang = document.documentElement.lang;

		if (Detector.webgl) setupThreeJs();
		else setupFallback();
	}
	
	function setupThreeJs() {
		scene = new THREE.Scene();
		scene.visible = false;

		camera = new THREE.PerspectiveCamera(80.0 / (container.clientWidth / container.clientHeight), container.clientWidth / container.clientHeight, 0.1, 100);
		camera.position.z = 1;

		clock = new THREE.Clock();

		geometry = new THREE.PlaneBufferGeometry(2, 2, vertexRes, vertexRes);

		for (var i=0; i<db.images.length; i++) {
			var tex = new THREE.TextureLoader().load('assets/images/' + db.images[i].filename);
			tex.minFilter = THREE.LinearFilter;
			//tex.magFilter = THREE.NearestFilter;
			channels.push(tex);
		}

		uniforms = {
			//iGlobalTime: { type: "f", value: 1.0 },
			//iResolution: { type: "v2", value: new THREE.Vector2() },
			iChannel: { type: "tv", value: [ undefined, undefined ] },
			iChannelMin: { type: "v2v", value: [ new THREE.Vector2(), new THREE.Vector2() ] },
			iChannelMax: { type: "v2v", value: [ new THREE.Vector2(), new THREE.Vector2() ] },
			scrollPosition: { type: "f", value: 0.0 },
			randomTime: { type: "f", value: Math.random() * 1024.0 }
		};

		material = new THREE.ShaderMaterial({
			uniforms: uniforms,
			vertexShader: document.getElementById('vertexShader').textContent,
			fragmentShader: document.getElementById('fragmentShader').textContent
		});

		mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

		renderer = new THREE.WebGLRenderer({ antialias: false });
		renderer.setClearColor(0x000000, 1);
		container.appendChild(renderer.domElement);

		if (DEV) {
			stats = new Stats();
			container.appendChild(stats.dom);
		}

		THREE.DefaultLoadingManager.onProgress = function(item, loaded, total) {
			if (loaded == total) {

				window.addEventListener('resize', onWindowResize, false);
				window.addEventListener('orientationchange', onWindowResize, false);
				scrollContainer.addEventListener('scroll', onScroll, false);

				onWindowResize();
				animate();

				scene.visible = true;
				loading.style.display = 'none';
			}
			var barWidth = 100.0 * loaded / total;
			bar.style.width = barWidth + '%';
		};
	}

	function setupFallback() {
		//Detector.addGetWebGLMessage();

		logoContainer.remove();
		scrollContainer.remove();
		loading.remove();

		container.style.background = 'url("assets/images/nike-kobe-exhibition-00.jpg")';
		container.style.backgroundSize = 'cover';

		info.style.color = 'rgba(0,0,0,0.75)';
		contact.style.color = 'rgba(0,0,0,0.75)';

		fadeIn(info);
		fadeIn(contact);
	}


	function animate() {
		requestAnimationFrame(animate);
		if (DEV) stats.update();
		checkPerformance();
		render();
	}

	function render() {
		//uniforms.iGlobalTime.value = clock.getElapsedTime();
		renderer.render(scene, camera);
	}

	/*
	 *	PERFORMANCE ADJUSTMENT
	 */
	function checkPerformance() {
		frameTimes.push(clock.getDelta());
		if (frameTimes.length > 60) frameTimes.shift();

		var t = 0;
		for (var i in frameTimes) {
			t += frameTimes[i];
		}
		t /= 60.0;

		var fps = 1.0 / t;

		if (fps < 30) {
			frameTimes = [];
			simplifyGeometry();
		}
	}

	function simplifyGeometry() {
		scene.remove(mesh);
		vertexRes /= 2;
		geometry = new THREE.PlaneBufferGeometry(2, 2, vertexRes, vertexRes);
		mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);
	}

	/*
	 *	WINDOW RESIZE
	 */
	function onWindowResize(event) {
		//uniforms.iResolution.value.x = 1.0;//container.clientWidth;
		//uniforms.iResolution.value.y = 1.0;//container.clientHeight;

		var iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
		if (iOS) {
			var timer = setInterval(function() {
				resizeRenderer();
			}, 1000);
		} else {
			resizeRenderer();
		}
	}

	function resizeRenderer() {
		for (var i=0; i<db.images.length; i++) {
			resizeChannel(i);
		}

		updateScrollPosition(true);

		camera.aspect = container.clientWidth / container.clientHeight;
		camera.fov = Math.max(48.0, Math.min(92.0, 80.0 / camera.aspect));
		camera.updateProjectionMatrix();

		renderer.setSize(container.clientWidth, container.clientHeight);
	}

	function resizeChannel(id) {
		var iw = db.images[id].width;
		var ih = db.images[id].height;
		var padding = db.images[id].padding;
		var cw = 1.0;//container.clientWidth;
		var ch = 1.0;//container.clientHeight;
		var w = 0.0;
		var h = 0.0;

		if (cw / iw < ch / ih) {
			//LANDSCAPE
			w = cw * (1.0 - 2.0 * padding);
			h = cw / iw * ih * (1.0 - 2.0 * padding);
		} else {
			//PORTRAIT
			h = ch * (1.0 - 2.0 * padding);
			w = ch / ih * iw * (1.0 - 2.0 * padding);
		}

		var iChannelWidth = w / cw;
		var iChannelHeight = h / ch;

		var iChannelMinX = (1.0 - iChannelWidth) * 0.5;
		var iChannelMinY = (1.0 - iChannelHeight) * 0.5;
		var iChannelMaxX = (1.0 - iChannelWidth) * 0.5 + iChannelWidth;
		var iChannelMaxY = (1.0 - iChannelHeight) * 0.5 + iChannelHeight;
		
		//uniforms.iChannelMin.value[id] = new THREE.Vector2(iChannelMinX, iChannelMinY);
		//uniforms.iChannelMax.value[id] = new THREE.Vector2(iChannelMaxX, iChannelMaxY);

		channelMin[id] = new THREE.Vector2(iChannelMinX, iChannelMinY);
		channelMax[id] = new THREE.Vector2(iChannelMaxX, iChannelMaxY);
	}

	/*
	 *	SCROLLING
	 */
	function onScroll(event) {
		updateScrollPosition(false);
	}

	function updateScrollPosition(resize) {
		//var scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		//var pos = (db.entries.length-1) / (document.body.clientHeight-container.clientHeight) * Math.max(scrollOffset, 0);

		var scrollOffset = scrollContainer.scrollTop;
		var pos = (db.images.length-1) / (scrollContent.clientHeight-container.clientHeight) * Math.max(scrollOffset, 0);

		uniforms.scrollPosition.value = pos;

		updateLogoAndMeta(pos);

		var firstChannel = Math.floor(pos);
		
		if (firstChannel != scrollId || resize) {
			var activeChannelMin = channelMin.slice(firstChannel, firstChannel+2);
			var activeChannelMax = channelMax.slice(firstChannel, firstChannel+2);

			if (activeChannelMin.length < 2) activeChannelMin.push(channelMin[channelMin.length-1]);
			if (activeChannelMax.length < 2) activeChannelMax.push(channelMax[channelMax.length-1]);

			uniforms.iChannelMin.value = activeChannelMin;
			uniforms.iChannelMax.value = activeChannelMax;
		}

		if (firstChannel != scrollId) {
			var activeChannels = channels.slice(firstChannel, firstChannel+2);
			if (activeChannels.length < 2) activeChannels.push(channels[channels.length-1]);
			uniforms.iChannel.value = activeChannels;

			scrollId = firstChannel;
		}
	}

	function updateLogoAndMeta(pos) {
		var channel = db.images[Math.round(pos)];
		if (currentProjectId != channel.project) {
			if (channel.project >= 0) {
				var project = db.projects[channel.project];

				// Meta
				var meta = lang == 'de' ? project.text.deutsch : project.text.english;
				var p = document.createElement('p');
				var pText = document.createTextNode(meta);
				p.appendChild(pText);

				while(metaContainer.firstChild){
					metaContainer.removeChild(metaContainer.firstChild);
				}
				metaContainer.appendChild(p);

				if (project.link.href) {
					var a = document.createElement('a');
					var aText = document.createTextNode('➜ ' + project.link.title);
					a.setAttribute('href', project.link.href);
					a.setAttribute('target', '_blank');
					a.appendChild(aText);

					metaContainer.appendChild(a);
				}

				// Logo
				var logo = db.logos[project.logo];
				var img = document.createElement('img');
				img.setAttribute('src', '/images/logos/' + logo.filename);
				img.setAttribute('width', '128');
				img.setAttribute('alt', logo.name);

				while(logoContainer.firstChild){
					logoContainer.removeChild(logoContainer.firstChild);
				}
				logoContainer.appendChild(img);

				if (currentProjectId == -2) {
					fadeOut(info);
					fadeOut(contact);
				}
				currentProjectId = project.id;
			} else {
				while(metaContainer.firstChild){
					metaContainer.removeChild(metaContainer.firstChild);
				}
				while(logoContainer.firstChild) {
					logoContainer.removeChild(logoContainer.firstChild);
				}
				if (channel.project == -2) {
					fadeIn(info);
					fadeIn(contact);
				}
				currentProjectId = channel.project;
			}
		}
	}

	// fade out
	function fadeOut(el) {
		var val = 1.0;
		el.style.opacity = val;

		(function fade() {
			if (val <= 0.0) {
				val = 0.0;
				el.style.opacity = val;
				el.style.display = "none";
			} else {
				val -= 0.1;
				el.style.opacity = val;
				requestAnimationFrame(fade);
			}
		})();
	}

	// fade in
	function fadeIn(el, display) {
		var val = 0.0;
		el.style.opacity = val;
		el.style.display = display || "block";

		(function fade() {
			if (val < 1.0) {
				val = val+0.1;
				el.style.opacity = val;
				requestAnimationFrame(fade);
			} else {
				val=1.0;
				el.style.opacity = val;
			}
		})();
	}


	return {
		initialize: initialize
	};
}

// Bootstrap ScrollerApp only once the AngularComponent is loaded
window.addEventListener('album:loaded', function(data) { 
    window.app = new App();
    window.app.initialize()
}, false);