CDC && CDC.Global && (CDC.Global.settings.enableShareButtons = !1);
var cdcApplyValidation = function () {
	if ("undefined" == typeof Modernizer || Modernizr.input.pattern || ($(
            "form.validate input[data-inputmask]").each(function () {
            $(this).inputmask($(this).data("inputmask").replace(
                /\'mask\':/gi, "").replace(/\'/g, "").trim(), {
		showMaskOnHover: !1
	})
	}), $("form.validate input[type=email]").each(function () {
            $(this).inputmask("Regex", {
		regex: "[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+"
	})
	})), "undefined" != typeof Modernizer && !Modernizr.input.placeholder)
		var a = 0,
            b = setInterval(function () {
            	$.watermark ? (clearInterval(b), $(
                    "form.validate input[placeholder]").each(
                    function () {
                    	$(this).watermark($(this).attr(
                            "placeholder"))
                    })) : (a++, a > 5 && log(
                    "Timed out waiting for watermark support to load"
                ))
            }, 500);
	$("form.validate").validate({
		errorPlacement: function (a, b) {
			a.appendTo(b.parents("div#recaptcha_area").length >
                0 ? b.parents("div#recaptcha_area") : b.parent()
            )
		},
		rules: {
			recaptcha_response_field: {
				required: !0
			}
		},
		messages: {
			recaptcha_response_field: "A response to this challenge is required"
		}
	}), $("form.validate").submit(function () {
		var a = $(this);
		if (a.valid() && "get" === a.attr("method")) {
			$("div#emailLinkBody").length > 0 && $(
                'input[name="RCPT"]').val($("input#toEmail").val());
			var b = a.attr("action") + "?callback=?";
			return $.ajax({
				type: "GET",
				dataType: "json",
				url: b,
				data: $(this).serialize()
			}).done(function (b) {
				if ("string" == typeof b) {
					var c = JSON.parse(b);
					if ("object" == typeof c) var d = c.result;
					else var d = "error-challenge-failed"
				} else var d = b.result;
				if ("error-challenge-failed" === d) a.find(
                    ".form-group.challenge").each(
                    function () {
                    	$(this).children("label.error")
                            .remove(), $(this).append($(
                                '<label class="error" />'
                            ).html(
                                "Incorrect answer provided for challenge"
                            ))
                    });
				else {

					if ($('form.validate input[type="hidden"][name="refer"]').val() != '') {
						window.location = $('form.validate input[type="hidden"][name="refer"]').val();
						return;
					}

					var e, f = b.response,
                        g = f.indexOf("&lt;body");
					if (-1 === g) {
						if (g = f.indexOf("<body"), f = f.substring(
                                g), g > -1) {
							f = f.replace("</html>", ""), f =
                                f.replace("<body", "<div"),
                                f = f.replace("</body>",
                                    "</div>"), f = f.replace(
                                    /\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/gim,
                                    "");
							e = f
						}
					} else f = f.substring(g), g > -1 && (f =
                        f.replace("&lt;/html&gt;", ""),
                        f = f.replace("&lt;body",
                            "&lt;div"), f = f.replace(
                            "&lt;/body&gt;",
                            "&lt;/div&gt;"), e = $(
                            "<div/>").html(f).text());
					var h, i = $(e);
					if (i.find("#contentArea").length > 0) h =
                        i.find("#contentArea")[0].innerHTML,
                        $("#content .main-inner").length >
                        0 ? $("#content .main-inner").html(
                            h) : $("#contentArea").length >
                        0 ? $("#contentArea").html(h) : $(
                            "body").html(h);
					else if (i.find("#content .main-inner").length >
                        0) h = i.find(
                            "#content .main-inner")[0].innerHTML,
                        $("#content .main-inner").length >
                        0 ? $("#content .main-inner").html(
                            h) : $("#contentArea").length >
                        0 ? $("#contentArea").html(h) : $(
                            "body").html(h);

				}
			}).fail(function () { }), !1
		}
		return !0
	})
};
$(document).ready(function () {
	$("form.validate").length > 0 && cdcApplyValidation()
});