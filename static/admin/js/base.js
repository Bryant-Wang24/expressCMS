$(function () {

	app.init();
});

var app = {

	init() {
		this.toggleAside();
		this.deleteConfirm();
		this.resizeIframe();
	},
	deleteConfirm() {
		$('.delete').click(function () {
			var flag = confirm('您确定要删除吗?');
			return flag;
		});
	},
	resizeIframe() {
		var heights = document.documentElement.clientHeight - 100;
		document.getElementById('rightMain').height = heights;
	},
	toggleAside() {
		$('.aside h4').click(function () {
			$(this).siblings('ul').slideToggle();
		})
	}
};

$(window).resize(function () {
	app.resizeIframe()
})