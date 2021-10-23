$(function () {

	app.init();
});

var app = {

	init() {
		this.toggleAside();
		this.deleteConfirm();
		this.resizeIframe();
		this.changeStatus()
	},
	deleteConfirm() {
		$('.delete').click(function () {
			var flag = confirm('您确定要删除吗?');
			return flag;
		});
	},
	resizeIframe() {
		var heights = document.documentElement.clientHeight - 100;
		const rightMainObj = document.getElementById('rightMain');
		if (rightMainObj) {
			rightMainObj.height = heights
		}
	},
	toggleAside() {
		$('.aside h4').click(function () {
			$(this).siblings('ul').slideToggle();
		})
	},
	changeStatus: function () {
		$(".chStatus").click(function () {
			const id = $(this).attr("data-id")
			const model = $(this).attr("data-model")
			const field = $(this).attr("data-field")
			$.get("/admin/changeStatus", { id: id, model: model, field: field }, (response) => {
				console.log(response);
			})
		})
	}
};

$(window).resize(function () {
	app.resizeIframe()
})