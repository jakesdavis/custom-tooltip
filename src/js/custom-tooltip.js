/**
 * @classdesc This is an implementation of tooltip. The Tooltip 
 *
 * @class CustomTooltip
 * @param {Object} options Valid options are "allowedLocations", "autohide", "container", "content",
 *                         "preferredLocations", "size", "theme". @see "Members" section for details
 *
 * @example
 *
 *  $(".container").customTooltip();
 * 
 *  $(".container").customTooltip({
 *      "border": "1px",
 *      "position": "n",
 *      events: {
 *          hover: true,
 *      },
 *  });
 *
 * @author jakesdavis (Jakes Davis)
 * @version 1.0
 *
 * @license The MIT License (MIT)
 *
 * Copyright (c) 2015 jakesdavis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

!function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module depending on jQuery.
        define([
            'jquery',
            'css!plugins/css/basic-tooltip-v2'
        ], factory);
    } else {
        // No AMD. Register plugin with global jQuery object.
        factory(root.jQuery);
    }
}(this, function($) {
    'use strict';
    // Default values for tooltip. Can be overriden using global or local object.
    var defaults = {
        "border": "1px",
        "position": "n",
        events: {
            hover: true,
            focus: false,
            click: false
        },
        // animate: {
            // effect: {
                // show: "fade",
                // hide: "fade"
            // },
            // duration: 500
        // },
        "wrapper": {
            "min-width": "50px",
            "max-width": "200px",
            "padding": "5px",
            "border-radius": "5px",
            "box-shadow": "0px 0px 5px 0px #777",
            "background": "#F2F2F2",
            "color": "#000000"
        },
        "content": {
        },
        "arrow": {
            "height": "15px",
            "width": "15px"
        },
        "arrowInner": {
            "box-shadow": "0px 0px 5px 0px #777",
            "background": "#F2F2F2"
        }
    };
    // Constructor, initialise the tooltip here
    var CustomTooltip = function(element, options) {
        /**
         * @member
         * @access public
         */
        this.element = element;
        /**
         * @member
         * @access public
         */
        this.options = options;
        /**
         * @member
         * @access public
         */
        this.eventHandlers(element, options);


        core.titleFix(element);
    };

    // The main section of the plugin
    var core = {
        /**
         * For defining `data-tooltip` and removing `title`
         *
         * @alias core.titleFix
         * @private
         * @param   {HTML object} element The element for which the title has to be fixed
         * @returns null
         * 
         */
        titleFix: function(element) {
            var title = element.getAttribute('title');
            if (title && title.length != 0) {
                element.removeAttribute('title');
                element.setAttribute('data-tooltip', title);
            }
        },
        /**
         * For creating the basic structure of the tooltip and position it
         *
         * @alias core.init
         * @private
         * @param   {string} value The content for displaying inside the tooltip
         * @param   {Object} that The Custom Tooltip Object
         * @returns null
         * 
         */
        init: function(value, that) {
            var element = that.element,
                    options = that.options;
            core.finalize(that);
            var tooltipWrapper = document.createElement("DIV");
            tooltipWrapper.classList.add("tooltip-wrapper-global");
            var tooltipContent = document.createElement("SPAN");
            tooltipContent.classList.add("tooltip-content-global");
            var tooltipArrow = document.createElement("SPAN");
            tooltipArrow.classList.add("tooltip-arrow-global");
            var tooltipArrowInner = document.createElement("SPAN");
            tooltipArrowInner.classList.add("tooltip-arrow-inner-global");
            var tooltipContentText = document.createTextNode(value);
            var containerStyle = element.getBoundingClientRect();

            $(tooltipWrapper).css(options.wrapper);
            $(tooltipContent).css(options.content);
            $(tooltipArrow).css(options.arrow);
            $(tooltipArrowInner).css(options.arrowInner);

            tooltipArrow.appendChild(tooltipArrowInner);
            tooltipWrapper.appendChild(tooltipContent);
            tooltipWrapper.appendChild(tooltipArrow);
            tooltipContent.appendChild(tooltipContentText);

            var _position = options.position.toLowerCase();
            if (options.position.toLowerCase() == 'g') {
                _position = ($(element).offset().top > ($(document).scrollTop() + $(window).height() / 2)) ? 'n' : 's';
            }
            document.querySelector("body").appendChild(tooltipWrapper);
            var wrapperStyle = tooltipWrapper.getBoundingClientRect();

            switch (_position) {
                case "n":
                    tooltipWrapper.style.top = (containerStyle.top + containerStyle.height + this._convertToNum(options.arrow.height)) + "px";
                    tooltipWrapper.style.left = (containerStyle.left - wrapperStyle.width / 2 + (containerStyle.width / 2)) + "px";
                    tooltipArrow.style.top = (-this._convertToNum(options.arrow.height)) + "px";
                    tooltipArrow.style.right = (wrapperStyle.width / 2 - this._convertToNum(options.arrow.height) / 2) + "px";
                    tooltipArrowInner.style.top = (this._convertToNum(options.arrow.height) / Math.sqrt(2)) + "px";
                    break;
                case "s":
                    tooltipWrapper.style.top = (containerStyle.top - wrapperStyle.height - this._convertToNum(options.arrow.height)) + "px";
                    tooltipWrapper.style.left = (containerStyle.left - wrapperStyle.width / 2 + (containerStyle.width / 2)) + "px";
                    tooltipArrow.style.bottom = (-this._convertToNum(options.arrow.height)) + "px";
                    tooltipArrow.style.right = (wrapperStyle.width / 2 - this._convertToNum(options.arrow.height) / 2) + "px";
                    tooltipArrowInner.style.top = (-this._convertToNum(options.arrow.height) / Math.sqrt(2)) + "px";
                    break;
                case "e":
                    tooltipWrapper.style.top = (containerStyle.top + containerStyle.height / 2 - wrapperStyle.height / 2) + "px";
                    tooltipWrapper.style.left = (containerStyle.left - wrapperStyle.width - this._convertToNum(options.arrow.width)) + "px";
                    tooltipArrow.style.top = (wrapperStyle.height / 2 - this._convertToNum(options.arrow.height) / 2) + "px";
                    tooltipArrow.style.right = (-this._convertToNum(options.arrow.height)) + "px";
                    tooltipArrowInner.style.right = (this._convertToNum(options.arrow.height) / Math.sqrt(2)) + "px";
                    break;
                case "w":
                    tooltipWrapper.style.top = (containerStyle.top + containerStyle.height / 2 - wrapperStyle.height / 2) + "px";
                    tooltipWrapper.style.left = (containerStyle.left + containerStyle.width + this._convertToNum(options.arrow.width)) + "px";
                    tooltipArrow.style.top = (wrapperStyle.height / 2 - this._convertToNum(options.arrow.height) / 2) + "px";
                    tooltipArrow.style.left = (-this._convertToNum(options.arrow.height)) + "px";
                    tooltipArrowInner.style.right = (-this._convertToNum(options.arrow.height) / Math.sqrt(2)) + "px";
                    break;
                case "nw":
                    tooltipWrapper.style.top = (containerStyle.top + containerStyle.height + this._convertToNum(options.arrow.height)) + "px";
                    tooltipWrapper.style.left = (containerStyle.left + containerStyle.width / 2 - wrapperStyle.width + this._convertToNum(options.arrow.width) / Math.sqrt(2)) + "px";
                    tooltipArrow.style.top = (-this._convertToNum(options.arrow.height)) + "px";
                    tooltipArrow.style.right = (this._convertToNum(options.wrapper["border-radius"])) + "px";
                    tooltipArrowInner.style.top = (this._convertToNum(options.arrow.height) / Math.sqrt(2)) + "px";
                    break;
                case "ne":
                    tooltipWrapper.style.top = (containerStyle.top + containerStyle.height + this._convertToNum(options.arrow.height)) + "px";
                    tooltipWrapper.style.left = (containerStyle.left + containerStyle.width / 2 - this._convertToNum(options.wrapper["border-radius"]) - this._convertToNum(options.arrow.width) / Math.sqrt(2)) + "px";
                    tooltipArrow.style.top = (-this._convertToNum(options.arrow.height)) + "px";
                    tooltipArrow.style.left = (this._convertToNum(options.wrapper["border-radius"])) + "px";
                    tooltipArrowInner.style.top = (this._convertToNum(options.arrow.height) / Math.sqrt(2)) + "px";
                    break;
                case "sw":
                    tooltipWrapper.style.top = (containerStyle.top - wrapperStyle.height - this._convertToNum(options.arrow.height)) + "px";
                    tooltipWrapper.style.left = (containerStyle.left + containerStyle.width / 2 - wrapperStyle.width + this._convertToNum(options.arrow.width) / Math.sqrt(2)) + "px";
                    tooltipArrow.style.bottom = (-this._convertToNum(options.arrow.height)) + "px";
                    tooltipArrow.style.right = (this._convertToNum(options.wrapper["border-radius"])) + "px";
                    tooltipArrowInner.style.top = (-this._convertToNum(options.arrow.height) / Math.sqrt(2)) + "px";
                    break;
                case "se":
                    tooltipWrapper.style.top = (containerStyle.top - wrapperStyle.height - this._convertToNum(options.arrow.height)) + "px";
                    tooltipWrapper.style.left = (containerStyle.left + containerStyle.width / 2 - this._convertToNum(options.wrapper["border-radius"]) - this._convertToNum(options.arrow.width) / Math.sqrt(2)) + "px";
                    tooltipArrow.style.bottom = (-this._convertToNum(options.arrow.height)) + "px";
                    tooltipArrow.style.left = (this._convertToNum(options.wrapper["border-radius"])) + "px";
                    tooltipArrowInner.style.top = (-this._convertToNum(options.arrow.height) / Math.sqrt(2)) + "px";
                    break;
            }
            core.showWrapper(that);
        },
        /**
         * Displays the the tooltip after animation effects (if any)
         *
         * @alias core.showWrapper
         * @private
         * @param   {Object} that The Custom Tooltip Object
         * @returns null
         * 
         */
        showWrapper: function(that) {
            var wrapper = $(".tooltip-wrapper-global");
            if (!(that.options.animate && core.timer)) {
                wrapper.css({
                    opacity: 1.0
                });
            } else {
                clearTimeout(core.timer);
                switch (that.options.animate && that.options.animate.effect && that.options.animate.effect.show) {
                    case "fade":
                        wrapper.animate({
                            opacity: 1.0
                        }, that.options.animate.duration);
                        break;
                    default:
                        wrapper.css({
                            opacity: 1.0
                        });
                        break;
                }
            }
        },
        /**
         * Hides the the tooltip after animation effects (if any)
         *
         * @alias core.hideWrapper
         * @private
         * @param   {Object} that The Custom Tooltip Object
         * @returns null
         * 
         */
        hideWrapper: function(that) {
            if (!that.options.animate) {
                core.finalize(that);
            } else {
                var wrapper = $(".tooltip-wrapper-global");
                switch (that.options.animate.effect && that.options.animate.effect.hide) {
                    case "fade":
                        wrapper.animate({
                            opacity: 0.0
                        }, that.options.animate.duration);
                        break;
                    default:
                        wrapper.css({
                            opacity: 0.0
                        });
                        break;
                }
                core.timer = setTimeout(function() {
                    core.finalize(that);
                }, that.options.animate.duration);
            }
        },
        /**
         * Removes the tooltip from the DOM
         *
         * @alias core.finalize
         * @private
         * @returns null
         * 
         */
        finalize: function() {
            clearTimeout(core.timer);
            var elt = $(".tooltip-wrapper-global");
            if (elt.size() > 0) {
                elt.remove();
            }
        },
        /**
         * Mouse Enter Event    -   Show Tooltip on mouseenter
         *
         * @alias core.mouseEnterEvent
         * @private
         * @returns null
         * 
         */
        mouseEnterEvent: function() {
            var element = this.element,
                    options = this.options;
            var _value = element.getAttribute('data-tooltip');
            if (_value != null && _value.length != 0) {
                core.init(_value, this);
            }
        },
        /**
         * Mouse Leave Event    -   Hide Tooltip on mouseleave
         *
         * @alias core.mouseLeaveEvent
         * @private
         * @returns null
         * 
         */
        mouseLeaveEvent: function() {
            core.hideWrapper(this);
        },
        /**
         * Key Focus Event    -   Show Tooltip on focus
         *
         * @alias core.keyFocusEvent
         * @private
         * @returns null
         * 
         */
        keyFocusEvent: function() {
            var element = this.element,
                    options = this.options;
            var _value = element.getAttribute('data-tooltip');
            if (_value != null && _value.length != 0) {
                core.init(_value, this);
            }
        },
        /**
         * Key Blur Event    -   Hide Tooltip on blur
         *
         * @alias core.keyUnfocusEvent
         * @private
         * @returns null
         * 
         */
        keyUnfocusEvent: function() {
            core.hideWrapper(this);
        },
        /**
         * Mouse Click Event    -   Show / Hide Tooltip on click
         *
         * @alias core.mouseClickEvent
         * @private
         * @returns null
         * 
         */
        mouseClickEvent: function() {
            var element = this.element,
                    options = this.options;
            var data = $(".tooltip-wrapper-global").data("CustomTooltip");
            core.hideWrapper(this);
            if (!(data != null && typeof (data) != 'undefined' && data.element == element)) {
                var _value = element.getAttribute('data-tooltip');
                if (_value != null && _value.length != 0) {
                    core.init(_value, this);
                }
                $(".tooltip-wrapper-global").data("CustomTooltip", this);
            }
        },
        /**
         * helper function  -   remove char from string and convert to int
         *
         * @alias core._convertToNum
         * @private
         * @param   {String} string String
         * @returns null
         * 
         */
        _convertToNum: function(string) {
            return ((string + "").replace(/[a-zA-Z]*|[%]/g, '') * 1);
        }
    };
    // Plugin methods and shared properties
    CustomTooltip.prototype = {
        constructor: CustomTooltip,
        /**
         * This function is used to destroy
         *
         * @alias CustomTooltip.prototype.destroy
         * @public
         * @returns null
         * 
         */
        destroy: function() {
            var element = this.element;
            element.removeEventListener("mouseenter", this.mouseEnterEvent);
            element.removeEventListener("mouseleave", this.mouseLeaveEvent);
            element.removeEventListener("focus", this.keyFocusEvent);
            element.removeEventListener("blur", this.keyUnfocusEvent);
            element.removeEventListener("click", this.mouseClickEvent);
            var title = element.getAttribute('data-tooltip');
            if (title && title.length != 0) {
                element.removeAttribute('data-tooltip');
                element.setAttribute('title', title);
            }
            $(element).removeData('CustomTooltip');
        },
        /**
         * Bind Event Listeners depending on option
         *
         * @alias CustomTooltip.prototype.eventHandlers
         * @public
         * @returns null
         * 
         */
        eventHandlers: function(element) {
            if (this.options.events.hover) {
                this.mouseEnterEvent = core.mouseEnterEvent.bind(this);
                this.mouseLeaveEvent = core.mouseLeaveEvent.bind(this);
                element.addEventListener("mouseenter", this.mouseEnterEvent);
                element.addEventListener("mouseleave", this.mouseLeaveEvent);
            }
            if (this.options.events.focus) {
                this.keyFocusEvent = core.keyFocusEvent.bind(this);
                this.keyUnfocusEvent = core.keyUnfocusEvent.bind(this);
                element.addEventListener("focus", this.keyFocusEvent);
                element.addEventListener("blur", this.keyUnfocusEvent);
            }
            if (this.options.events.click) {
                this.mouseClickEvent = core.mouseClickEvent.bind(this);
                element.addEventListener("click", this.mouseClickEvent);
            }
        }
    };
    // Bind the function to the jQuery Object
    $.fn.customTooltip = function(options) {
        return this.each(function() {
            var $this = $(this);
            if ($this.data('CustomTooltip') == null) {
                options = $.extend(true, {}, $.fn.customTooltip.defaults, options);
                $this.data('CustomTooltip', new CustomTooltip(this, options));
            } else {
                console.info("CustomTooltip is already defined for the object");
            }
        });
    };
    // Expose defaults (can be over-ridden)
    $.fn.customTooltip.defaults = defaults;

    // Expose Constructor (can be over-ridden)
    $.fn.customTooltip.CustomTooltip = CustomTooltip;
});