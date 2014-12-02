(function ($) {
    var flashAjax = $.flashAjax;
    if (flashAjax) {
        return;
    }
    flashAjax = function (options) {
        var id = helpers.createGuid();
        addInstance(id, options);
        runInstance(id);
    };
    var helpers = {
        createGuid: function () {
            return '_' + Math.random().toString(36).slice(2);
        },
        isFunction: function (v) {
            return Object.prototype.toString.call(v) === '[object Function]';
        }
    };
    var defaultOptions = {
        url: '',
        type: 'GET',
        dataType: '',
        data: {},
        flashUrl: '',
        onReady: function () {
        }, //return false时不发送请求
        onSuccess: function () {
        },
        onFail: function () {
        },
        onComplete: function () {
        }
    };
    var flashId;
    var createFlash = function (id) {
        if (flashId) {
            return;
        }
        flashId = helpers.createGuid();
        var containerId = helpers.createGuid();
        $('body').prepend('<div style="position: absolute;top:-100px;left:0;"><div id="' + containerId + '"/></div>');
        swfobject.embedSWF(getInstance(id).flashUrl + "?" + new Date().getTime(), containerId, "1", "1", "9.0.0", "expressInstall.swf", {connectName: "$.flashAjax.onConnect"}, {
            allowFullscreen: "true",
            allowScriptAccess: "always"
        }, {id: flashId, name: flashId});
    };
    var getFlash = function () {
        return document.getElementById(flashId);
    };
    var isFlashReady = false;
    var readyCallback = [];
    var runReadyCallback = function () {
        $.each(readyCallback, function (i, v) {
            runInstanceCallback(v, getInstance(v).onReady);
        });
        readyCallback = [];
    };
    var runInstanceCallback = function (insId, onReady) {
        if (helpers.isFunction(onReady) && onReady() === false) {
            return;
        }
        sendRequest(insId);
    };
    flashAjax.onConnect = function () {
        isFlashReady = true;
        getFlash().asParam("$.flashAjax.onSuccess", "$.flashAjax.onFail", "$.flashAjax.onComplete");
        runReadyCallback();
    };
    flashAjax.onSuccess = function (text, id) {
        getInstance(id).onSuccess(text);
    };
    flashAjax.onFail = function (error, id) {
        getInstance(id).onFail(error.msg);
    };
    flashAjax.onComplete = function (id) {
        getInstance(id).onComplete();
    };


    var instances = {};
    var addInstance = function (id, options) {
        instances[id] = $.extend(defaultOptions, options);
    };
    var getInstance = function (id) {
        return instances[id];
    };
    var runInstance = function (id) {
        var ins = getInstance(id);
        if (!ins.url) {
            ins.onFail('请配置接口地址');
            return;
        }
        if (!ins.flashUrl) {
            ins.onFail('请配置swf文件地址');
            return;
        }
        if (isFlashReady) {
            runInstanceCallback(id, ins.onReady);
            return;
        }
        readyCallback.push(id);
        createFlash(id);
    };
    var sendRequest = function (id) {
        var ins = getInstance(id);
        console.log('sendRequest', ins.url, id);
        getFlash().asSend({
            url: ins.url,
            data: ins.data,
            type: ins.type,
            dataType: ins.dataType,
            maskId: id
        });
    };
    $.flashAjax = flashAjax;
})(jQuery);