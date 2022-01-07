function getURLParam(t) {
  for (
    var e = window.location.search.substring(1), o = e.split("&"), i = 0;
    i < o.length;
    i++
  ) {
    var a = o[i].split("=");
    if (a[0] == t) return a[1];
  }
}
function socialOnOff(t) {
  let e = t.prop("checked"),
    o = t.attr("data-name");
  !0 === e
    ? ($("#" + o)
        .find("option")
        .each(function () {
          $(this).text() === o && $(this).prop("selected", !0);
        }),
      $("#" + o + "Handle")
        .closest(".row")
        .show(),
      "Facebook" === o
        ? $("#" + o + "Handle").val("facebook.com/nucotomorrow")
        : "Twitter" === o && $("#" + o + "Handle").val("@nucotomorrow"))
    : ($("#" + o + "Handle")
        .closest(".row")
        .hide(),
      $("#" + o + "Handle").val(""),
      $("#" + o)
        .find("option")
        .first()
        .prop("selected", !0)),
    RefreshProof();
}
function colorSelect(t) {
  var e = $(t).attr("color");
  $("#Color > option").each(function () {
    var t = $(this).text(),
      o = t.split("-").pop();
    e === o && $(this).prop("selected", !0);
  }),
    sessionStorage.setItem("Color", e);
  var o = $(".logo-icon.selected");
  logoSelect(o);
}
function logoSelect(t) {
  var e = $(t).attr("alt");
  $("#LogoPlacement").val(), sessionStorage.getItem("Color");
  $(".logo-icon").removeClass("selected"),
    $(t).addClass("selected"),
    $("#Logo > option").each(function () {
      var t = $(this).text();
      e === t && $(this).prop("selected", !0);
    }),
    sessionStorage.setItem("Logo", e),
    RefreshProof(),
    $(".zoomContainer").remove(),
    $("#thumbLP").elevateZoom({
      tint: !0,
      tintColour: "#000000",
      tintOpacity: 0.5,
      zoomWindowPosition: 1,
      scrollZoom: !0,
    }),
    $("#spnFrontProof a.highslide").removeAttr("onclick"),
    $("#spnFrontProof a.highslide").removeAttr("href");
}
function calculateQuantity(t) {
  var e = 0,
    o = 0,
    i = $(".sizequantity.2xlarge"),
    a = $(".sizequantity.3xlarge"),
    s = $(".sizequantity.4xlarge");
  if (
    ($(".sizequantity").each(function () {
      isNaN(this.value) ||
        0 == this.value.length ||
        (e += parseFloat(this.value));
    }),
    i.length && i.val().length > 0)
  ) {
    if (((o = $(".sizequantity.2xlarge").val()), o > 25))
      return (
        alert("2X Large has a maximum order quantity of 24 shirts."),
        (o = 25),
        $(".sizequantity.2xlarge").val("25"),
        void calculateQuantity("2xlarge")
      );
    $('#NJE2 option[value="2X Large|' + o + '"]')
      .prop("selected", !0)
      .trigger("change");
  }
  if (a.length && a.val().length > 0) {
    if (((o = $(".sizequantity.3xlarge").val()), o > 25))
      return (
        alert("3X Large has a maximum order quantity of 24 shirts."),
        (o = 25),
        $(".sizequantity.3xlarge").val("25"),
        void calculateQuantity("3xlarge")
      );
    $('#NJE3 option[value="3X Large|' + o + '"]')
      .prop("selected", !0)
      .trigger("change");
  }
  if (s.length && s.val().length > 0) {
    if (((o = $(".sizequantity.4xlarge").val()), o > 25))
      return (
        alert("4X Large has a maximum order quantity of 24 shirts."),
        (o = 25),
        $(".sizequantity.4xlarge").val("25"),
        void calculateQuantity("4xlarge")
      );
    $('#NJE4 option[value="4X Large|' + o + '"]')
      .prop("selected", !0)
      .trigger("change");
  }
  $(".total-quantity").text(e),
    $("#NJQ option[value=" + e + "]")
      .prop("selected", !0)
      .trigger("change");
  var n = $("#NJPriceTag").text();
  $(".total-price").text(n);
}
if (
  (window.location.href.indexOf("ProductCats.asp") > -1 &&
    (sessionStorage.clear(),
    $("body").addClass("product-body"),
    $(".no-records-found").closest(".bootstrap-table").hide(),
    $(".product-info, .product-container .row > .product-colors").each(
      function () {
        (product = $(this).prev().find(".product-description")),
          $(this).detach().appendTo(product);
      }
    ),
    "digitalassets" === getURLParam("type")
      ? $(".shuffler").hide()
      : "envelope" === getURLParam("type")
      ? setTimeout(function () {
          $(".search-input").val("Envelope").blur();
        }, 100)
      : setTimeout(function () {
          $(".bootstrap-table").hide(),
            $(".static-products").hide(),
            $(".addtocart").hide();
        }, 100),
    "apparel" === getURLParam("group")
      ? $(".product-filter").find('li[data-group="stationery"]').hide()
      : $(".product-filter").find('li[data-group="apparel"]').hide()),
  setTimeout(function () {
    window.location.href.indexOf("NexJobPage.asp") > -1 &&
      ($("select").each(function () {
        $(this).find("option").first().remove();
      }),
      $("#EPI38").val("100"));
  }, 1e3),
  window.location.href.indexOf("Step5Edit.asp") > -1 &&
    setTimeout(function () {
      "" === $(".product-colors").html().replace(/\s/g, "") &&
        ($(".colors").hide(),
        $(".logo-icons").closest(".row").hide(),
        $(".tabs").hide(),
        $(".product-pricing").hide());
    }, 250),
  window.location.href.indexOf("Step1New.asp") > -1 ||
    window.location.href.indexOf("Step5Edit.asp") > -1 ||
    window.location.href.indexOf("Step3New.asp") > -1)
) {
  var logo;
  $(".Product").find("#btnSubmit").click(),
    ("Apparel" !== getURLParam("Type") &&
      null === sessionStorage.getItem("Logo")) ||
      $("body").addClass("apparel-item"),
    $("#contenttable")
      .find("h1")
      .first()
      .each(function () {
        var t = $(this);
        t.html(
          t
            .html()
            .replace(/(\S+)\s*$/, '<span class="product-id hide">$1</span>')
        );
      }),
    $(".front-back-title").each(function () {
      var t = $(this);
      t.html(
        t.html().replace(/(\S+)\s*$/, '<span class="product-id hide">$1</span>')
      );
    }),
    $(".Select.a.Apparel.style").find("#btnSubmit").click();
  var product_id = $(".product-id").first().text();
  $("#Color > option").each(function () {
    var t = $(this).text(),
      e = ((t = t.split("-").pop()), t.replace(/-/g, "")),
      o = e.split(/(?=[A-Z])/).join(" "),
      i = o.toLowerCase().replace("/", "");
    "" === t ||
      $(".colors")
        .find(".product-colors")
        .append(
          '<span class="color ' +
            i +
            '" title="' +
            o +
            '" color="' +
            e +
            '" onclick="colorSelect(this);"></span>'
        );
  }),
    $("#Logo > option").each(function () {
      var t = $(this).text(),
        e = t.replace("/", ""),
        o = "/files/pdfsthumbnail/" + e + ".jpg";
      "" !== t &&
        $(this)
          .closest(".product-input")
          .find(".logo-icons")
          .append(
            '<div class="col-sm-3"><img class="logo-icon" src="' +
              o +
              '" alt="' +
              t +
              '" onclick="logoSelect(this);" /></div>'
          );
    }),
    null !== sessionStorage.getItem("Logo")
      ? ($("body").addClass("apparel-item"),
        $(".logo-icons")
          .find('.logo-icon[alt="' + sessionStorage.getItem("Logo") + '"]')
          .first()
          .addClass("selected"))
      : $(".logo-icons").find(".logo-icon").first().addClass("selected"),
    $("#Logo").hide(),
    $("#LogoCenter").closest(".row").hide(),
    $("#Logo").closest(".row").find(".logo-icons").removeClass("hide"),
    $("#Description > option").each(function () {
      var t = $(this).text();
      "" === t
        ? ($(".description-list")
            .closest(".tab-pane")
            .removeClass("active in")
            .hide(),
          $("#description-tab").removeClass("active").hide(),
          $("#charges-tab").parent().addClass("active"),
          $("#delivery").addClass("active in"))
        : ($(".description-list")
            .find("ul")
            .append("<li>" + t + "</li>"),
          $(".description-list")
            .closest(".tab-pane")
            .addClass("active in")
            .show(),
          $("#description-tab").addClass("active").show(),
          $("#charges-tab").parent().removeClass("active"),
          $("#delivery").removeClass("active in"));
    });
  var selected_category = localStorage.getItem("Category");
  $(".description-list").find("ul li").length <= 0 &&
    ($(".description").find(".details").hide(),
    $(".description").find(".product-specsheet").hide()),
    $(".product-specsheet")
      .find("a")
      .attr(
        "href",
        "Files/BrokerBranding/intuitive/Include/" + product_id + "specsheet.pdf"
      ),
    $("#LogoPlacement").on("change", function () {
      var t = $(".logo-icon.selected");
      logoSelect(t);
    }),
    $("#Method").on("change", function () {
      var t = $(this).val(),
        e = $(".logo-icon.selected");
      sessionStorage.setItem("Method", t),
        "Embroidery" === t
          ? ($('#LogoPlacement option[value="Left Chest"]').prop(
              "selected",
              !0
            ),
            $("#LogoPlacement").attr("disabled", !0),
            $(".logo-icon.selected").removeClass("selected"),
            (e = $(".logo-icon.selected")),
            logoSelect(e))
          : "Screenprint" === t
          ? ($("#LogoPlacement").removeAttr("disabled"), logoSelect(e))
          : logoSelect(e);
    });
  var current = 0,
    type = $(".front-back-title").text();
  "Stationery" === getURLParam("Type") ||
  "Stationery" === sessionStorage.getItem("ProductType") ||
  window.location.href.indexOf("Step3New.asp") > -1
    ? ($(".product-pricing").hide(),
      $(".colors").hide(),
      $(".logo-icons").each(function () {
        $(this).parent().hide();
      }),
      $(".product-options").find(".tabs").hide(),
      $(".product-options input").each(function () {
        let t = $(this).val();
        $(this).on("focus", function () {
          t = $(this).val();
        }),
          $(this).on("blur", function () {
            $(this).val() !== t && RefreshProof();
          });
      }),
      $(".product-options textarea").each(function () {
        let t = $(this).val();
        $(this).on("focus", function () {
          t = $(this).val();
        }),
          $(this).on("blur", function () {
            $(this).val() !== t && RefreshProof();
          });
      }),
      $(".product-options select").each(function () {
        $(this).on("change", function () {
          RefreshProof();
        });
      }),
      $("#Facebook")
        .parent()
        .append(
          '<div class="custom-control custom-switch"><input type="checkbox" class="custom-control-input" id="Facebook_OnOff" data-name="Facebook" onchange="socialOnOff($(this))"><label class="custom-control-label" for="Facebook_OnOff">Facebook</label></div>'
        ),
      $("#Twitter")
        .parent()
        .append(
          '<div class="custom-control custom-switch"><input type="checkbox" class="custom-control-input" id="Twitter_OnOff" data-name="Twitter" onchange="socialOnOff($(this))"><label class="custom-control-label" for="Twitter_OnOff">Twitter</label></div>'
        ),
      $("#Facebook").hide(),
      $("#FacebookHandle, #TwitterHandle").closest(".row").hide(),
      $("#Twitter").hide(),
      $(".product-input").find("br").remove(),
      sessionStorage.setItem("ProductType", "Stationery"))
    : ($("#PriceTable > option").each(function () {
        var t = $(this).text(),
          e = $(this)
            .closest(".row")
            .find("h5 b")
            .text()
            .replace(":", "")
            .replace("$", ""),
          o = ((e = parseFloat(e)), t.replace(" ", "")),
          i = o.toLowerCase();
        "" === t ||
          $(".product-pricing")
            .find(".table tbody")
            .append(
              "<tr><td>" +
                t +
                '</td><td class="item-price">$' +
                parseFloat(e).toFixed(2) +
                '</td><td><input type="text" class="quantity spinner ' +
                i +
                '" id="' +
                o +
                '" value="0"></td></tr>'
            );
      }),
      $(".colors").show(),
      $(".logo-icons").each(function () {
        $(this).parent().show();
      }),
      $(".logo-icons").removeClass("d-none"),
      setTimeout(function () {
        $("#thumbLP").elevateZoom({
          tint: !0,
          tintColour: "#000000",
          tintOpacity: 0.5,
          zoomWindowPosition: 1,
          scrollZoom: !0,
        }),
          $("#spnFrontProof a.highslide").removeAttr("onclick"),
          $("#spnFrontProof a.highslide").removeAttr("href");
      }, 1e3)),
    $(".quantity").length >= 1 &&
      $(".product-pricing")
        .find(".table tbody")
        .append(
          '<tr class="hide"><td><span class="total-cost"></span></td></tr>'
        );
  var first_color = $(".product-colors").find(".color").first().attr("color");
  if (
    (null === sessionStorage.getItem("Color") &&
      setTimeout(function () {
        $("#Color > option").each(function () {
          var t = $(this).text(),
            e = t.split("-").pop();
          first_color === e &&
            ($(this).prop("selected", !0),
            sessionStorage.setItem("Color", first_color));
        });
      }, 1e3),
    null === sessionStorage.getItem("Logo"))
  ) {
    var selected = $("#Logo option[selected]").text();
    setTimeout(function () {
      $("#Logo > option").each(function () {
        var t = $(this).text();
        selected === t &&
          ($(this).prop("selected", !0),
          sessionStorage.setItem("Logo", selected));
      });
    }, 1e3);
  }
  null === sessionStorage.getItem("Method") &&
    setTimeout(function () {
      var t = $("#Method").find("option[selected]").text();
      sessionStorage.setItem("Method", t);
    }, 1e3),
    $("#Color").closest(".row").hide(),
    $("#Description").closest(".row").hide(),
    $("#PriceTable").closest(".row").hide(),
    $(".spinner").spinner({
      icons: { down: "ui-icon-caret-1-s", up: "ui-icon-caret-1-n" },
      min: 0,
    }),
    $(".spinner").each(function () {
      $(this).on("blur", function () {
        $(this);
        var t = $(this).val(),
          e = $(this).attr("id"),
          o = $(this).attr("id") + "Price",
          i = parseFloat(
            $(this).closest("tr").find(".item-price").text().replace("$", "")
          ).toFixed(2),
          a = parseFloat(i * t).toFixed(2);
        parseFloat($(this).closest("table").find(".total-pieces").text());
        if (
          (t > 0
            ? ($(this).closest("tr").addClass("bold"),
              sessionStorage.setItem(e, t),
              sessionStorage.setItem(o, a))
            : t <= 0 &&
              ($(this).closest("tr").removeClass("bold"),
              sessionStorage.removeItem(e),
              sessionStorage.removeItem(o, a)),
          ("2XLarge" === e && t > 25) ||
            ("3XLarge" === e && t > 25) ||
            ("4XLarge" === e && t > 25))
        )
          return (
            alert(
              "You have exceeded our in-stock quantity for this size: " +
                e +
                "\n\nThe quantity as been set at the maximum quantity we have in stock for this size\n\nIf you require more, please give us a call at 888.955.PROMO and we will be happy to assist you."
            ),
            $(this)
              .closest("table")
              .find("#" + e)
              .val("25"),
            $(this)
              .closest("table")
              .find("#" + e)
              .focus(),
            !1
          );
        "$0.00" !== $(this).closest("table").find(".total-cost").text()
          ? $('input[name="btnSubmit"]').removeAttr("disabled")
          : $('input[name="btnSubmit"]').attr("disabled", "disabled");
      });
    }),
    $(".comment").on("keyup", function () {
      sessionStorage.setItem("Comment", $(this).val());
    });
}
if (
  (window.location.href.indexOf("Step3New.asp") > -1 &&
    $("body").addClass("Employee Kit Template"),
  window.location.href.indexOf("ProjectOverView.asp") > -1 &&
    ($(".nav.nav-tabs").find("li").addClass("nav-item"),
    $(".nav.nav-tabs").find("li.tabon a").addClass("active"),
    $(".nav.nav-tabs").find("li a").addClass("nav-link"),
    $(".nav.nav-tabs")
      .find("li a")
      .on("click", function () {
        $(".nav.nav-tabs").find("li").addClass("nav-item"),
          $(".nav.nav-tabs").find("li.tabon a").addClass("active"),
          $(".nav.nav-tabs").find("li a").addClass("nav-link");
      }),
    $(".actionables")
      .find("button")
      .on("click", function () {
        setTimeout(function () {
          $(".nav.nav-tabs").find("li").addClass("nav-item"),
            $(".nav.nav-tabs").find("li.tabon a").addClass("active"),
            $(".nav.nav-tabs").find("li a").addClass("nav-link");
        }, 100);
      })),
  window.location.href.indexOf("ProofStationery.asp") > -1 &&
    ($(
      ".product-color, .total-price, .total-quantity, #divEditDelivery, #spnPurchasePrice, #spnListMappings"
    )
      .closest("tr")
      .hide(),
    $("#Table1").find("tbody tr").last().hide(),
    $("#tabMultiDrop").find("tbody tr").last().hide(),
    $("#tabproof").find("tbody tr").last().hide()),
  window.location.href.indexOf("ProofStationery.asp?BC") > -1 &&
    null !== sessionStorage.getItem("Logo"))
) {
  var sizebox,
    Logo = sessionStorage.getItem("Logo");
  if (
    ($("body").addClass("apparel-item Select a Apparel style"),
    null !== sessionStorage.getItem("Comment"))
  )
    var Comment = sessionStorage.getItem("Comment");
  else Comment = "";
  var Color = sessionStorage.getItem("Color");
  setTimeout(function () {
    $(".DescriptionText").each(function () {
      var t = $(this).closest("tr").find(".DescriptionText").first().text(),
        e = sessionStorage.getItem(t.replace(/\s/g, ""));
      $(this)
        .closest("tr")
        .find(".DescriptionText")
        .last()
        .find("input")
        .first()
        .attr("class", "sizequantity"),
        $(this)
          .closest("tr")
          .find(".DescriptionText")
          .last()
          .find("input")
          .first()
          .val(e);
    }),
      calculateQuantity(sizebox);
  }, 500),
    $('#NJB > option[value="' + Color + '"]').prop("selected", !0),
    $(".selected-color").text(Color),
    $('#NJE1 > option[value="Logo|' + Logo + '"]').prop("selected", !0),
    $(".sizequantity").each(function () {
      $(this).val("0"),
        $(this).on("change", function () {
          calculateQuantity(sizebox);
        });
    }),
    $("#BaseCaption, #BaseValues").wrapAll(
      '<div class="selected-color"></div>'
    ),
    $("#QuantityCaption, #QuantityValues").wrapAll(
      '<div class="selected-quantity"></div>'
    ),
    setTimeout(function () {
      $("#btnCart").click();
    }, 2500);
}
window.location.href.indexOf("ProofStationery.asp?bc") > -1 &&
  "BrandMethodStyle" === $(".NJTypeCaption").text() &&
  ($("body").addClass("apparel-item"),
  $(".loading")
    .find(".loading-text h3")
    .first()
    .text("Gathering your product information."),
  $(".DescriptionText").each(function () {
    (sizebox = $(this)
      .parent()
      .find("td")
      .first()
      .text()
      .replace(" ", "")
      .toLowerCase()),
      $(this)
        .closest("tr")
        .find(".DescriptionText")
        .last()
        .find("input")
        .first()
        .attr("class", "sizequantity " + sizebox);
  }),
  $(".sizequantity").each(function () {
    $(this).val().length <= 0 && $(this).val("0"),
      $(this).on("change", function () {
        calculateQuantity(sizebox);
      }),
      calculateQuantity(sizebox);
  }),
  setTimeout(function () {
    sessionStorage.setItem("Color", $("#NJB").val()),
      sessionStorage.setItem("Logo", $("#NJE1").val().replace("Logo|"));
    if ("" !== $("#Comments").val())
      sessionStorage.setItem("Comment", $("#Comments").val());
    else sessionStorage.setItem("Comment", "");
  }, 500),
  $("#BaseCaption, #BaseValues").wrapAll('<div class="selected-color"></div>'),
  $("#QuantityCaption, #QuantityValues").wrapAll(
    '<div class="selected-quantity"></div>'
  ),
  setTimeout(function () {
    $('input[value="Edit Artwork Details"]').click();
  }, 2500)),
  (window.location.href.indexOf("cart.asp") > -1 ||
    window.location.href.indexOf("Cart.asp") > -1) &&
    (sessionStorage.clear(),
    $("#tabDelDetails").length > 0 &&
      $('.bordertableheader[colspan="2"]').attr("colspan", ""),
    $("#tabDelDetails")
      .first("tr")
      .find(".bordertableheader b")
      .text("Delivery Details"),
    $("#tabDelDetails")
      .find("tr:nth-of-type(3)")
      .find("td")
      .first()
      .append('<span class="required">*</span>'),
    $("#tabDelDetails")
      .find("tr:nth-of-type(4)")
      .find("td")
      .first()
      .append('<span class="required">*</span>'),
    setTimeout(function () {
      $("#tabDelDetails")
        .find("tr:nth-of-type(6)")
        .find("table tr:nth-of-type(1)")
        .find("td")
        .first()
        .append('<span class="required">*</span>'),
        $("#tabDelDetails")
          .find("tr:nth-of-type(6)")
          .find("table tr:nth-of-type(3)")
          .find("td")
          .first()
          .append('<span class="required">*</span>'),
        $("#tabDelDetails")
          .find("tr:nth-of-type(6)")
          .find("table tr:nth-of-type(4)")
          .find("td")
          .first()
          .append('<span class="required">*</span>'),
        $("#tabDelDetails")
          .find("tr:nth-of-type(6)")
          .find("table tr:nth-of-type(5)")
          .find("td")
          .first()
          .append('<span class="required">*</span>'),
        $("#billadr")
          .find("table tr:nth-of-type(1)")
          .find("td")
          .first()
          .append('<span class="required">*</span>'),
        $("#billadr")
          .find("table tr:nth-of-type(3)")
          .find("td")
          .first()
          .append('<span class="required">*</span>'),
        $("#billadr")
          .find("table tr:nth-of-type(4)")
          .find("td")
          .first()
          .append('<span class="required">*</span>'),
        $("#billadr")
          .find("table tr:nth-of-type(5)")
          .find("td")
          .first()
          .append('<span class="required">*</span>');
    }, 1e3),
    $(".extraorderfields").each(function () {
      var t = $(this).html().split("<br>");
      $(this).html("<p>" + t.join("</p><p>") + "</p>");
    }),
    $(".extraorderfields p").each(function () {
      var t = $(this).text(),
        e = $(this).find("b").text(),
        o = $.trim(t.replace(e, ""));
      "0" === o && $(this).remove();
      e = $(this).find("b").text().replace(":", "");
      $(this).addClass(e);
    }),
    $(".2X.Large").length >= 2 && $(".2X.Large").first().remove(),
    $(".3X.Large").length >= 2 && $(".3X.Large").first().remove(),
    $(".4X.Large").length >= 2 && $(".4X.Large").first().remove(),
    $(".Quantity").length >= 2 && $(".Quantity").last().remove(),
    $(".table.table-hover tbody tr").each(function () {
      $(this)
        .find("td:nth-of-type(5)")
        .each(function () {
          var t = $(this);
          t.html(
            t
              .html()
              .replace(/(\S+)\s*$/, '<span class="product-id hide">$1</span>')
          );
        });
    }),
    $(".file").closest("p").hide(),
    $(".table.table-hover")
      .find("tr")
      .find("td:nth-child(6)")
      .contents()
      .filter(function () {
        return 3 == this.nodeType;
      })
      .remove(),
    sessionStorage.clear()),
  jQuery(function () {
    var t = $("div[id^=hero]"),
      e = 0,
      o = t.length;
    t.slice(1).hide(),
      setInterval(function () {
        t.eq(e).fadeOut(function () {
          (e = (e + 1) % o), t.eq(e).fadeIn("slow");
        });
      }, 1e4);
  }),
  (function (t) {
    function e() {
      t(".shuffler").each(function (e) {
        var i = t(this).data("shuffle-id", e);
        o[e] = new Shuffle(i.find(".shuffle-container").get(0), {
          itemSelector: ".shuffle-item",
          sizer: ".shuffle-item",
          group: "all",
          speed: 650,
          staggerAmount: 50,
          staggerAmountMax: 250,
        });
      });
    }
    var o = [];
    if (
      (t(document).on("click", ".product-filter ul > li a", function (e) {
        e.preventDefault();
        var i,
          a,
          s = t(this).closest("li");
        return (
          s.hasClass("active") ||
            (s.find(".sub-menu").children().removeClass("active"),
            s.addClass("active").siblings().removeClass("active"),
            (i = s.data("group")),
            t(".search-input").val("").blur(),
            "envelope" === i
              ? setTimeout(function () {
                  t(".bootstrap-table").show(),
                    t(".static-products").show(),
                    t(".addtocart").show(),
                    t(".search-input").val("Envelope").blur();
                }, 100)
              : "all" === i
              ? setTimeout(function () {
                  t(".bootstrap-table").show(),
                    t(".static-products").show(),
                    t(".addtocart").show();
                }, 100)
              : "digitalassets" === getURLParam("type")
              ? setTimeout(function () {
                  t(".bootstrap-table").show(),
                    t(".static-products").show(),
                    t(".addtocart").show(),
                    t(".search-input").val("Downloadable").blur();
                }, 100)
              : (t(".bootstrap-table").hide(),
                t(".static-products").hide(),
                t(".addtocart").hide()),
            (a = s.closest(".shuffler").data("shuffle-id")),
            void 0 !== o[a] &&
              o[a].filter(function (e) {
                return "all" === i || t(e).hasClass(i);
              })),
          !1
        );
      }),
      t(document).on("click", ".product-filter ul > li.drop > a", function (e) {
        e.preventDefault();
        var i,
          a,
          s = t(this).closest("li");
        return (
          s
            .find(".sub-menu")
            .find("li")
            .first()
            .addClass("active")
            .siblings()
            .removeClass("active"),
          s.hasClass("active") ||
            (s.addClass("active").siblings().removeClass("active"),
            (i = s.data("group")),
            t(".search-input").val("").blur(),
            "envelope" === i
              ? setTimeout(function () {
                  t(".bootstrap-table").show(),
                    t(".static-products").show(),
                    t(".addtocart").show(),
                    t(".search-input").val("Envelope").blur();
                }, 100)
              : "all" === i
              ? setTimeout(function () {
                  t(".bootstrap-table").show(),
                    t(".static-products").show(),
                    t(".addtocart").show();
                }, 100)
              : "digitalassets" === getURLParam("type")
              ? setTimeout(function () {
                  t(".bootstrap-table").show(),
                    t(".static-products").show(),
                    t(".addtocart").show(),
                    t(".search-input").val("Downloadable").blur();
                }, 100)
              : (t(".bootstrap-table").hide(),
                t(".static-products").hide(),
                t(".addtocart").hide()),
            (a = s.closest(".shuffler").data("shuffle-id")),
            void 0 !== o[a] &&
              o[a].filter(function (e) {
                return "all" === i || t(e).hasClass(i);
              })),
          !1
        );
      }),
      t(document).ready(e),
      window.location.href.indexOf("ProductCats.asp") > -1)
    ) {
      var i = getURLParam("group"),
        a = getURLParam("type");
      setTimeout(function () {
        t('.product-filter > ul > li[data-group="' + i + '"] > a').click(),
          t(
            '.product-filter > ul > li[data-group="' +
              i +
              '"] > .sub-menu > li[data-group="' +
              a +
              '"] a'
          ).click();
      }, 500);
    }
  })(jQuery);