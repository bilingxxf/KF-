function setChart(symbol) {
    var toTime = 0;

    var RealtimePush = {
        New: function (url, path) {
            var self = this;
            this.socket = window.thisSocket
            // this.socket = io(url, {
            //     path: path
            // });
            this._onMessageReq = {};
            this._onMessageSub = {};
            this._onMessageUnsub = {};
            this._onMessageReq = {};
            this._onMessageSub = {};
            this._onMessageUnsub = {};

            //处理订阅数据推送
            this.socket.on("sub", function (msgObj) {
                if (self._onMessageSub.hasOwnProperty(msgObj.ch)) {
                    var callbacksChain = self._onMessageSub[msgObj.ch];
                    callbacksChain(msgObj);
                    // if(msgObj.code == 0){
                    //   delete self._onMessageSub[msgObj.ch];
                    // }
                }
            });

            //处理查询数据结果
            this.socket.on("req", function (msgObj) {
                if (self._onMessageReq.hasOwnProperty(msgObj.ch)) {
                    var callbacksChain = self._onMessageReq[msgObj.ch];
                    callbacksChain(msgObj);
                }
            });

            //处理取消订阅结果
            this.socket.on("unsub", function (msgObj) {
                if (self._onMessageUnsub.hasOwnProperty(msgObj.ch)) {
                    var callbacksChain = self._onMessageUnsub[msgObj.ch];
                    callbacksChain(msgObj);
                }
            });
            return this;
        },

        onMessageSub: function (ch, callback_func) {
            if (typeof callback_func == "function") {
                this._onMessageSub[ch] = callback_func;
                return true;
            } else {
                return false;
            }
        },

        onMessageReq: function (ch, callback_func) {
            if (typeof callback_func == "function") {
                this._onMessageReq[ch] = callback_func;
                return true;
            } else {
                return false;
            }
        },

        onMessageUnsub: function (ch, callback_func) {
            if (typeof callback_func == "function") {
                this._onMessageUnsub[ch] = callback_func;
                return true;
            } else {
                return false;
            }
        },

        send_sub: function (ch) {
            return this.socket.emit("sub", ch);
        },

        send_req: function (ch, data) {
            return this.socket.emit("req", ch, data);
        },

        send_unsub: function (ch) {
            return this.socket.emit("unsub", ch);
        }
    };

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ?
            "" :
            decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    var socket = window.socketKline = RealtimePush.New("http://192.168.2.173:5000", "/rtd.io");
    // var socket = window.socketKline = RealtimePush.New("https://www.bitboole.com", "/rtd.io");
    var return_data = window.return_data = {
        time: localStorage.getItem('time') || '5min',
        symbol: symbol
    };
    //qtumbtc
    var all_ch;
    var udf_datafeed = {
        onReady: function (callbackfunc) {
            setTimeout(function () {
                callbackfunc({
                    supports_search: false,
                    supports_group_request: false,
                    supported_resolutions: [1, 5, 10, 15, 30, 60, 120, 240, 480, "D", "W", "M", "12M"],
                    supports_marks: false,
                    supports_time: false,
                    supports_timescale_marks: false
                });
            }, 0);
        },
        searchSymbols: function () {
        },
        resolveSymbol: function (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
            var pricescale = 1
            
            for(var i = 0; i < window.pointLengthPri; i++) {
                pricescale = pricescale * 10
            }
            setTimeout(function () {
                onSymbolResolvedCallback({
                    name: "ETH/USDT",
                    ticker: symbolName.toLowerCase(),
                    description: "KF.COM",
                    type: "bitcoin",
                    session: "24x7", //"0000-2400:1234567",
                    // timezone: "UTC",
                    timezone: "Asia/Shanghai",
                    exchange: "",
                    listed_exchange: "",
                    minmov: 2,
                    minmov2: 0,
                    pricescale: pricescale,
                    has_intraday: true,
                    intraday_multipliers: ["1", "15", "30"]
                });
            }, 0);
        },
        getBars: function (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
            var self = this;
            var ch = "market." + symbolInfo.ticker + ".kline." + return_data["time"];
            window.klineCh = all_ch = ch;
            // console.log(symbolInfo);
            if (firstDataRequest) {
                toTime = to
                // console.log("getBars"); //,symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest);
            } else {
                // onHistoryCallback(bars, {noData: false, nextTime: 0});
            }
            // console.log('-------1')
            socket.onMessageReq(ch, function (msgObj) {
                if (msgObj.code == 0) {
                    var bars = [];
                    var data = msgObj.data;
                    var isNoData = false
                    if (data.length > 0) {
                        for (var i = 0; i < data.length; i++) {
                            bars[i] = {};
                            bars[i].time = data[i].id * 1000;
                            bars[i].close = data[i].close;
                            bars[i].open = data[i].open;
                            bars[i].high = data[i].high;
                            bars[i].low = data[i].low;
                            bars[i].volume = data[i].amount;
                        }
                        toTime = bars[0].time / 1000
                    } else {
                        isNoData = true
                    }

                    if (isNoData) {
                        onHistoryCallback([], { noData: true, nextTime: 0 });
                    } else {
                        setTimeout(() => onHistoryCallback(bars), 0)
                    }
                    // self.getBars=function(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest){};
                }
            }); //处理查询数据结果
            socket.send_req(ch, {
                begin: from,
                end: toTime
            });


        },
        subscribeBars: function (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
            onResetCacheNeededCallback(function () {
                // console.log("--------------");
            });
            var ch = "market." + symbolInfo.ticker + ".kline." + return_data["time"];
            socket.onMessageUnsub(ch, function (msgObj) {
                // onResetCacheNeededCallback()
            })
            socket.onMessageSub(ch, function (msgObj) {
                if (msgObj.code == 0) {
                    var bar = {
                        time: msgObj.data.id * 1000,
                        close: msgObj.data.close,
                        open: msgObj.data.open,
                        high: msgObj.data.high,
                        low: msgObj.data.low,
                        volume: msgObj.data.amount
                    };
                    onRealtimeCallback(bar);
                    // onResetCacheNeededCallback();
                }
            }); //处理订阅数据推送
            socket.send_sub(ch);
        },
        unsubscribeBars: function (subscriberUID) {
            return
            // console.log(subscriberUID)
            // console.log("unsubscribeBars", subscriberUID);
        },
        calculateHistoryDepth: function (resolution, resolutionBack, intervalBack) {
            return
        },
        getMarks: function () {
            return
            // console.log("getMarks");
        },
        getTimescaleMarks: function () {
            return
            // console.log("getTimescaleMarks");
        },
        // getServerTime : function(){console.log('getServerTime');},
        getQuotes: function () {
            return
            // console.log("getQuotes");
        },
        subscribeQuotes: function () {
            return
            // console.log("subscribeQuotes");
        },
        unsubscribeQuotes: function () {
            return
            // console.log("unsubscribeQuotes");
        },
        subscribeDepth: function () {
            return
            // console.log("subscribeDepth");
        },
        unsubscribeDepth: function () {
            return
            // console.log("unsubscribeDepth");
        }
    };

    function send_socket_req() {}

    function send_socket_sub(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
        onResetCacheNeededCallback(function () {
            // console.log("--------------");
        });
        var ch = "market." + symbolInfo.ticker + ".kline." + return_data["time"];
        socket.onMessageSub(ch, function (msgObj) {
            if (ch.split(".")[3] !== return_data["time"]) {
                socket.onMessageUnsub(ch, function (msgObj) {
                    send_socket_sub(
                        symbolInfo,
                        resolution,
                        onRealtimeCallback,
                        subscriberUID,
                        onResetCacheNeededCallback
                    );
                }); //取消订阅
                socket.send_unsub(ch);
            }
            if (msgObj.code == 0) {
                var bar = {
                    time: msgObj.data.id * 1000,
                    close: msgObj.data.close,
                    open: msgObj.data.open,
                    high: msgObj.data.high,
                    low: msgObj.data.low,
                    volume: msgObj.data.vol
                };
                onRealtimeCallback(bar);
                // onResetCacheNeededCallback();
            }
        }); //处理订阅数据推送
        socket.send_sub(ch);
    }
    var interval = getInterval()

    function getInterval() {
        var interval = localStorage.getItem('time') || '5'

        switch (interval) {
        case '1min':
            interval = '1'
            break;
        case '5min':
            interval = '5'
            break;
        case '15min':
            interval = '15'
            break;
        case '30min':
            interval = '30'
            break;
        case '60min':
            interval = '60'
            break;
        case '1day':
            interval = 'D'
            break;
        case '1week':
            interval = 'W'
            break;
        case '1mon':
            interval = 'M'
            break;
        case '1year':
            interval = '12M'
            break;
        }
        return interval
    }

    function e(e) {
        return ("00" + e).slice(-2)
    }

    function t(e) {
        return ("000" + e).slice(-3)
    }

    var widget = (window.tvWidget = new TradingView.widget({
        // fullscreen: true,
        height: 846,
        autosize: true,
        symbol: localStorage.getItem('symbol'),
        datafeed: udf_datafeed,
        interval: interval,
        toolbar_bg: "#181b2a",
        container_id: "tv_chart_container",
        //	BEWARE: no trailing slash is expected in feed URL
        library_path: "static/charting_library/",
        // custom_css_url: "chartPro.css",
        locale: getParameterByName("lang") || "zh",
        // timezone: "UTC",
        timezone: "Asia/Shanghai",
        session: "24x7",
        // custom_css_url: '../../index.css',
        //	Regression Trend-related functionality is not implemented yet, so it's hidden for a while
        drawings_access: {
            type: "black",
            tools: [{
                name: "Regression Trend"
            }]
        },
        customFormatters: {
            timeFormatter: {
                format: function (date) {
                    var _format_str = "%h:%m:%s";
                    return _format_str
                        .replace("%h", e(date.getUTCHours()), 2)
                        .replace("%m", e(date.getUTCMinutes()), 2)
                        .replace("%s", e(date.getUTCSeconds()), 2);
                }
            },
            dateFormatter: {
                format: function (date) {
                    return (
                        date.getUTCFullYear() +
                        "-" +
                        e(date.getUTCMonth() + 1) +
                        "-" +
                        e(date.getUTCDate())
                    );
                }
            }
        },
        disabled_features: [
            "save_chart_properties_to_local_storage", //载入中
            "volume_force_overlay",
            "left_toolbar",
            "header_screenshot",
            "pane_context_menu",
            "timeframes_toolbar",
            "go_to_date",
            "header_symbol_search",
            "caption_buttons_text_if_possible",
            "header_chart_type",
            // "header_indicators", //技术指标
            "header_saveload",
            "header_compare",
            "header_undo_redo",
            "edit_buttons_in_legend",
            "show_hide_button_in_legend",
            "legend_context_menu",
            "hide_last_na_study_output",
            "display_market_status",
            "chart_crosshair_menu",
            "control_bar",
            "symbol_search_hot_key",
            "header_resolutions", //头部下拉选项按钮
            "border_around_the_chart",
            // "dont_show_boolean_study_arguments",
            ""
        ],
        enabled_features: ["move_logo_to_main_pane", ""], //
        overrides: {
            "paneProperties.bottomMargin": 5,
            "paneProperties.topMargin": 12,
            volumePaneSize: "small",
            //  Margins (percent). Used for auto scaling.
            "paneProperties.background": "#1c2630",
            "paneProperties.vertGridProperties.color": "rgba(255,255,255,.08)",
            "paneProperties.horzGridProperties.color": "rgba(255,255,255,.08)",
            "paneProperties.legendProperties.showLegend": false,
            "symbolWatermarkProperties.transparency": 90,
            "scalesProperties.textColor": "rgba(255,255,255,.8)",
            // "mainSeriesProperties.candleStyle.drawBorder": !1,
            "symbolWatermarkProperties.color": "rgba(255,255,255, 0)",
            "mainSeriesProperties.candleStyle": {
                upColor: "#6ba583",
                downColor: "#d75442",
                drawWick: !0,
                drawBorder: !1,
                borderColor: "#f60000",
                borderUpColor: "#6ba583",
                borderDownColor: "#d75442",
                wickColor: "#f60000",
                wickUpColor: "#6ba583",
                wickDownColor: "#d75442",
                barColorsOnPrevClose: !1
            }
        },
        // toolbar_bg: "#1c2630",
        // loading_screen: {
        // 	backgroundColor: "#1c2630"
        // },
        // widgetbar: {
        // 	 details: !0
        // },
        // studies_overrides: {
        // 	"volume.volume.color.0": "#589065",
        // 	"volume.volume.color.1": "#ae4e54",
        // 	"volume.volume.transparency": 70,
        // 	"volume.volume ma.color": "#FF0000",
        // 	"volume.volume ma.transparency": 30,
        // 	"volume.volume ma.linewidth": 5,
        // 	"volume.show ma": false,
        // 	"bollinger bands.median.color": "#33FF88",
        // 	"bollinger bands.upper.linewidth": 7
        // },
        // debug: true,
        // time_frames: [
        // 	{ text: "50y", resolution: "6M", description: "50 Years" },
        // 	{ text: "3y", resolution: "W", description: "3 Years", title: "3yr" },
        // 	{ text: "8m", resolution: "D", description: "8 Month" },
        // 	{ text: "3d", resolution: "5", description: "3 Days" },
        // 	{ text: "1000y", resolution: "W", description: "All", title: "All" },
        // ],
        widgetbar: {
            details: false
        },
        charts_storage_url: "http://saveload.tradingview.com",
        charts_storage_api_version: "1.1",
        client_id: "tradingview.com",
        user_id: "public_user"
        // favorites: {
        //     intervals: ["1", "5", "15", "30", "60", "240", "1D", "5D", "7D", "1M"],
        //     chartTypes: ["Area", "Line"]
        // }
    }));

    var savedWidgetContent = null;
    var savedTemplate = null;

    widget.onChartReady(function () {

        // widget.activeChart().setTimezone('Asia/Singapore');
        var innerIframe =  $("#tv_chart_container iframe")
            .contents();

        innerIframe.find('.onchart-tv-logo').remove()
        innerIframe.find(".chart-markup-table .pane-legend")
            .last()
            .remove();
        // $("#tv_chart_container iframe")
        //     .contents()
        //     .find('.main .apply svg').click()
        var k_1 = widget
            .createButton()
            .attr("title", "1min")
            .on("click", function (e) {
                socket.send_unsub(all_ch);
                return_data["time"] = "1min";
                // widget.chart().resetData();
                widget.chart().setResolution("1", function () {});
                localStorage.setItem('time', '1min');
                $(this).addClass('current').parent().siblings().children().removeClass('current')
            })
            .append($("<span>1min</span>"))
            .addClass("chartBtn");


        var k_5 = widget
            .createButton()
            .attr("title", "5min")
            .on("click", function (e) {
                socket.send_unsub(all_ch);
                return_data["time"] = "5min";
                // widget.chart().resetData();
                widget.chart().setResolution("5", function () {});
                localStorage.setItem('time', '5min');
                $(this).addClass('current').parent().siblings().children().removeClass('current')
            })
            .append($("<span>5min</span>"));

        var k_15 = widget
            .createButton()
            .attr("title", "15min")
            .on("click", function (e) {
                socket.send_unsub(all_ch);
                return_data["time"] = "15min";
                // widget.chart().resetData();
                widget.chart().setResolution("15", function () {});
                localStorage.setItem('time', '15min');
                $(this).addClass('current').parent().siblings().children().removeClass('current')
            })
            .append($("<span>15min</span>"));

        var k_30 = widget
            .createButton()
            .attr("title", "30min")
            .on("click", function (e) {
                socket.send_unsub(all_ch);
                return_data["time"] = "30min";
                // widget.chart().resetData();
                widget.chart().setResolution("30", function () {});
                localStorage.setItem('time', '30min');
                $(this).addClass('current').parent().siblings().children().removeClass('current')
            })
            .append($("<span>30min</span>"));

        var k_60 = widget
            .createButton()
            .attr("title", "1hour")
            .on("click", function (e) {

                socket.send_unsub(all_ch);
                return_data["time"] = "60min";
                // widget.chart().resetData();
                widget.chart().setResolution("60", function () {});
                localStorage.setItem('time', '60min');
                $(this).addClass('current').parent().siblings().children().removeClass('current')
            })
            .append($("<span>1hour</span>"));

        var k_1day = widget
            .createButton()
            .attr("title", "1day")
            .on("click", function (e) {

                socket.send_unsub(all_ch);
                return_data["time"] = "1day";
                // widget.chart().resetData();
                widget.chart().setResolution("D", function () {});
                localStorage.setItem('time', '1day');
                $(this).addClass('current').parent().siblings().children().removeClass('current')
            })
            .append($("<span>1day</span>"));

        var k_1week = widget
            .createButton()
            .attr("title", "1week")
            .on("click", function (e) {

                socket.send_unsub(all_ch);
                return_data["time"] = "1week";
                // widget.chart().resetData();
                widget.chart().setResolution("W", function () {});
                localStorage.setItem('time', '1week');
                $(this).addClass('current').parent().siblings().children().removeClass('current')
            })
            .append($("<span>1week</span>"));

        var k_1mon = widget
            .createButton()
            .attr("title", "1mon")
            .on("click", function (e) {

                socket.send_unsub(all_ch);
                return_data["time"] = "1mon";
                // widget.chart().resetData();
                widget.chart().setResolution("M", function () {});
                localStorage.setItem('time', '1mon');
                $(this).addClass('current').parent().siblings().children().removeClass('current')
            })
            .append($("<span>1mon</span>"));

        var k_1year = widget
            .createButton()
            .attr("title", "1year")
            .on("click", function (e) {

                socket.send_unsub(all_ch);
                return_data["time"] = "1year";
                // widget.chart().resetData();
                widget.chart().setResolution("12M", function () {});
                localStorage.setItem('time', '1year');
                $(this).addClass('current').parent().siblings().children().removeClass('current')
            })
            .append($("<span>1year</span>"));

        widget.chart().createStudy("Moving Average", false, false, [5], null, {
            "Plot.color": "#fff"
        });
        widget.chart().createStudy("Moving Average", false, false, [10], null, {
            "Plot.color": "#ffff00"
        });
        widget.chart().createStudy("Moving Average", false, false, [20], null, {
            "Plot.color": "#00ff00"
        });
        widget.chart().createStudy("Moving Average", false, false, [30], null, {
            "Plot.color": "#be00be"
        });
        widget.chart().createStudy("Moving Average", false, false, [40], null, {
            "Plot.color": "#8080ff"
        });
        switch (interval) {
        case '1':
            k_1.addClass('current')
            break;
        case '5':
            k_5.addClass('current')
            break;
        case '15':
            k_15.addClass('current')
            break;
        case '30':
            k_30.addClass('current')
            break;
        case '60':
            k_60.addClass('current')
            break;
        case 'D':
            k_1day.addClass('current')
            break;
        case 'W':
            k_1week.addClass('current')
            break;
        case 'M':
            k_1mon.addClass('current')
            break;
        case '12M':
            k_1year.addClass('current')
            break;
        }
        // widget.chart().createStudy('Moving Average', false, false, [60], null, {'Plot.color': '#f00000'});
        // widget.chart().executeActionById("drawingToolbarAction");
        // widget.onGrayedObjectClicked(function(x) {
        // 	alert("You are not permitted to use " + x.name + "(" + x.type + ")");
        // });

        // widget.onIntervalChange(function(x) {
        // 	console.log("onIntervalChange: " + x);
        // });

        //                var fourMonthAgo = Math.floor(new Date().valueOf() / 1000 - 4 * 30 * 24 * 60 * 60);
        //                var today = Math.floor(new Date().valueOf() / 1000);

        //                // draw some simple technical analysis figures using drawings to show how it works
        //                getMinAndMaxPrice(udf_datafeed, fourMonthAgo, today,
        //                    function(minPrice, maxPrice, minPriceTime, maxPriceTime) {
        //                    } // end of getMinAndMaxPrice callback
        //                ); // end of getMinAndMaxPrice
    }); // end of widget.onChartReady
}
export default setChart
