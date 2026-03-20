;(function($, window, document, undefined){
	var OnePageNav = function(elem, options){
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data('plugin-options');
		this.$win = $(window);
		this.sections = {};
		this.didScroll = false;
		this.$doc = $(document);
		this.docHeight = this.$doc.height();
	};
	OnePageNav.prototype = {
		defaults: {
			navItems: 'a',
			currentClass: 'active',
			changeHash: false,
			easing: 'swing',
			filter: '',
			scrollSpeed: 750,
			scrollThreshold: 0.5,
			begin: false,
			end: false,
			scrollChange: false
		},
		init: function() {
			this.config = $.extend({}, this.defaults, this.options, this.metadata);
			this.$nav = this.$elem.find(this.config.navItems);
			if(this.config.filter !== '') { this.$nav = this.$nav.filter(this.config.filter); }
			this.$nav.on('click.onePageNav', $.proxy(this.handleClick, this));
			this.getPositions();
			this.bindInterval();
			this.$win.on('resize.onePageNav', $.proxy(this.getPositions, this));
			return this;
		},
		adjustNav: function(self, $el) {
			self.$nav.filter('.' + self.config.currentClass).removeClass(self.config.currentClass);
			$el.addClass(self.config.currentClass);
		},
		bindInterval: function() {
			var self = this;
			var docHeight;
			self.$win.on('scroll.onePageNav', function() { self.didScroll = true; });
			self.t = setInterval(function() {
				docHeight = self.$doc.height();
				if(docHeight !== self.docHeight) { self.docHeight = docHeight; self.getPositions(); }
				if(self.didScroll) { self.didScroll = false; self.scrollChange(); }
			}, 250);
		},
		getHash: function($el) { return $el.attr('href').split('#')[1]; },
		getPositions: function() {
			var self = this;
			var $target, targetOffset, targetHash;
			self.$nav.each(function() {
				targetHash = self.getHash($(this));
				$target = $('#' + targetHash);
				if($target.length) { targetOffset = $target.offset().top; self.sections[targetHash] = Math.round(targetOffset); }
			});
		},
		getSection: function(windowPos) {
			var returnValue = null;
			var windowHeight = Math.round(this.$win.height() * this.config.scrollThreshold);
			for(var section in this.sections) {
				if((this.sections[section] - windowHeight) < windowPos) { returnValue = section; }
			}
			return returnValue;
		},
		handleClick: function(e) {
			var self = this;
			var $link = $(e.currentTarget);
			var $target = $('#' + self.getHash($link));
			if($target.length) {
				e.preventDefault();
				if(self.config.begin) { self.config.begin(); }
				self.adjustNav(self, $link);
				self.scrollTo($target, function() {
					if(self.config.changeHash) { window.location.hash = '#' + self.getHash($link); }
					if(self.config.end) { self.config.end(); }
				});
			}
		},
		scrollChange: function() {
			var windowTop = this.$win.scrollTop();
			var currentSection = this.getSection(windowTop);
			var $currentNavItem;
			if(currentSection) {
				$currentNavItem = this.$nav.filter('[href$="#' + currentSection + '"]');
				if($currentNavItem.length && !$currentNavItem.hasClass(this.config.currentClass)) {
					this.adjustNav(this, $currentNavItem);
					if(this.config.scrollChange) { this.config.scrollChange($currentNavItem); }
				}
			}
		},
		scrollTo: function($target, callback) {
			var offset = $target.offset().top;
			$('html, body').animate({scrollTop: offset}, this.config.scrollSpeed, this.config.easing, callback);
		}
	};
	OnePageNav.defaults = OnePageNav.prototype.defaults;
	$.fn.onePageNav = function(options) {
		return this.each(function() { new OnePageNav(this, options).init(); });
	};
})(jQuery, window, document);
