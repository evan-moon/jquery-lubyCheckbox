/* ===========================================================
 *
 *  Name:          lubyCheckbox.min.js
 *  Updated:       2016-05-12
 *  Version:       0.1.0
 *  Created by:    DART, Lubycon.co
 *
 *  Copyright (c) 2016 Lubycon.co
 *
 * =========================================================== */

(function($){
	$.fn.lubyCheckbox = function(option){
        var defaults = { 
            id: "",
            icon: "fa fa-check",
            switchs: true,
            callback: null
        },
        d = {},
        pac = {
            init: function (option) {
                return d = $.extend({}, defaults, option), this.each(function () {
                    if ($(this).hasClass("checkKey")) $.error("lubyChecker is already exists");
                    else {
                        var $this = $(this),
                        id = $this.attr("id"),
                        name = $this.attr("name"),
                        type = $this.attr("type"),
                        disabled = $this.prop("disabled");

                        var $wrap = $("<div/>",{ "class" : "checkbox-wrapper " + type }).insertBefore($this);
                        if(d.switchs && type === "checkbox") $wrap.css({"width" : 40, "height" : 20});
                        else $wrap.css({"width" : 20, "height" : 20});

                        if(type === "checkbox") {
                            d.switchs ? 
                                pac.initSwitch.call($this,$wrap,id,name) : 
                                pac.initCheckbox.call($this,$wrap,id,name);
                        }
                        else if(type === "radio") pac.initRadio.call($this,$wrap,id,name);

                        if(disabled){
                            var checkboxWrapper = $this.parents(".checkbox-wrapper"),
                            checkboxLabel = checkboxWrapper.find(".checkbox-label");
                            checkboxWrapper.addClass("disabled");
                            checkboxLabel.off("click");
                        }
                    }
                })
            },
            initSwitch: function(wrap,id,name){
                var $this = $(this),
                type = "switch";

                var $body = new Wrapper(id,name,type).appendTo(wrap).on("click",checkFn.checkbox).on("click",checkFn.swithcAnimation),
                button = $body.find(".checkbox-btn");

                button.css("width",d.height);
                $this.addClass("checkbox-input").prependTo($body).hide();
            },
            initCheckbox: function(wrap,id,name){
                var $this = $(this),
                type = "checkbox";

                var $body = new Wrapper(id,name,type).appendTo(wrap).on("click",checkFn.checkbox),
                button = $body.find(".checkbox-btn"),
                icon = $("<i/>",{ "class" : d.icon });

                if($this.prop("checked")) $body.addClass("selected");

                icon.appendTo(button);
                $this.addClass("checkbox-input").prependTo($body).hide();
            },
            initRadio: function(wrap,id,name){
                var $this = $(this),
                type = "radio";
                
                var $body = new Wrapper(id,name,type).appendTo(wrap).on("click",checkFn.radio),
                button = $body.find(".checkbox-btn"),
                label = $body.find(".checkbox-label"),
                icon = $("<i/>",{ "class" : d.icon });

                if($this.prop("checked")) $body.addClass("selected");

                icon.appendTo(button);
                $this.addClass("checkbox-input").prependTo($body).hide();
            }
        },
        checkFn = {
            checkbox: function(event){
                event.preventDefault();
                var $this = $(this),
                checkbox = $this.find("input");
                
                if($this.hasClass("selected")) {
                    $this.removeClass("selected");
                    checkbox.prop("checked",false);
                    checkbox.trigger("change");
                }
                else {
                    $this.addClass("selected");
                    checkbox.prop("checked",true);
                    checkbox.trigger("change");
                }
            },
            radio: function(event){
                event.preventDefault();
                var $this = $(this),
                groupName = $this.attr("name"),
                labels = $(document).find("label[name='" + groupName + "']"),
                checkbox = $this.find("input");

                if($this.hasClass("selected")) return false;
                else {
                    labels.each(function(){
                        if(!$(this).parents(".checkbox-wrapper").hasClass("disabled")) $(this).removeClass("selected");
                    });
                    $this.addClass("selected");
                    checkbox.prop("checked",true);
                    checkbox.trigger("change");
                }
            },
            swithcAnimation: function(event){
                event.preventDefault();
                var $this = $(this),
                background = $this.find(".checkbox-innerbox"),
                button = $this.find(".checkbox-btn");

                if($this.hasClass("selected")) button.css({  "left" : "100%", "margin-left" : button.width()*-1+"px" });
                else button.css({ "left" : "0", "margin-left" : "0" });
            }
        },
        Wrapper = function(id,name,type){
            var body = $("<label/>",{ "class" : "checkbox-label " + type, "for" : id, "name" : name}),
            innerbox = $("<div/>", { "class" : "checkbox-innerbox" }).appendTo(body),
            button = $("<div/>", { "class" : "checkbox-btn" }).appendTo(innerbox);

            return body;
        },
        method = {
            destroy: function(){
                return this.each(function(){
                    var $this = $(this);
                    $this.remove();
                })
            },
            disable: function(){
                return this.each(function(){
                    var $this = $(this),
                    $label = $this.find(".checkbox-label"),
                    $input = $this.find("input");

                    $this.addClass("disabled");
                    $input.prop("disabled",true);
                    $label.off("click");
                })
            },
            enable: function(){
                return this.each(function(){
                    console.log($(this));
                    console.log("enabled");
                    var $this = $(this),
                    $label = $this.find(".checkbox-label"),
                    $input = $this.find("input"),
                    check1 = $this.hasClass("checkbox"),
                    check2 = $label.hasClass("switch");

                    $this.removeClass("disabled");
                    $input.prop("disabled",false);
                    if(check1){ //this is checkbox
                        $label.on("click",checkFn.checkbox);
                        if(check2) $label.on("click",checkFn.swithcAnimation);
                    }
                    else {//this is radio button
                        $label.on("click",checkFn.radio);
                    }
                })
            }
        }
        return method[option] ? 
        method[option].apply(this, Array.prototype.slice.call(arguments, 1)) : 
        "object" != typeof option && option ? 
            ($.error('No such method "' + option + '" for the lubySelector instance'), void 0) : 
            pac.init.apply(this, arguments);
    };
})(jQuery);
