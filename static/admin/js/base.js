$(function () {

	app.init();
});

var app = {

	init() {
		this.toggleAside();
		this.deleteConfirm();
		this.resizeIframe();
		this.changeStatus();
		this.changeNum()
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
			const el = $(this)
			$.get("/admin/changeStatus", { id: id, model: model, field: field }, (response) => {
				if (response.success) {
					if (el.attr("src").indexOf("yes") !== -1) {
						el.attr("src", "/admin/images/no.png")
					} else {
						el.attr("src", "/admin/images/yes.png")
					}
				}
			})
		})
	},
	changeNum: function () {
		$(".chSpanNum").click(function () {
			const id = $(this).attr("data-id")
			const model = $(this).attr("data-model")
			const field = $(this).attr("data-field")

			const spanEl = $(this)
			const spanNum = $(this).html()//获取el里面的值
			const input = $("<input value='' style='width: 60px'/>")//创建一个input的dom节点			
			$(this).html(input)//把input放在el里面
			$(input).trigger('focus').val(spanNum)//让input1获取焦点，给input赋值
			$(input).click(function (e) {//点击input的时候阻止冒泡
				e.stopPropagation();
			})
			// 鼠标离开的时候给span赋值，并触发ajax请求
			$(input).blur(function () {
				const inputNum = $(this).val()
				if (inputNum > 0) {
					spanEl.html(inputNum)
				} else {
					spanEl.html(0)
				}
				$.get("/admin/changeNum", { id: id, model: model, field: field, num: inputNum }, (response) => {
					if (response.success) {
						console.log(response);
					}
				})
			})
		})
	}
};

$(window).resize(function () {
	app.resizeIframe()
})