import Vue from 'vue';
import $ from 'jquery';

var createTips = (direction, msg) => {
    const oDiv = document.createElement('div');
    oDiv.className = 'awesomeTips';
    oDiv.innerHTML = msg;
    const triangle = createTriangle(direction);
    oDiv.appendChild(triangle);
    return oDiv;
}

var createTriangle = (direction) => {
    const oDiv = document.createElement('div');
    oDiv.style.cssText = 'position:absolute;'
    switch (direction) {
        case 'left':
            oDiv.style.cssText += 'border-top:5px solid transparent;border-right:5px solid transparent;border-bottom:5px solid transparent;border-left:5px solid rgba(0,0,0,0.7);left:100%;top:50%;transform:translateY(-50%);-webkit-transform:translateY(-50%);';
            break;
        case 'top':
            oDiv.style.cssText += 'border-top:5px solid rgba(0,0,0,0.7);border-right:5px solid transparent;border-bottom:5px solid transparent;border-left:5px solid transparent;top:100%;left:50%;transform:translateX(-50%);-webkit-transform:translateX(-50%);';;
            break;
        case 'right':
            oDiv.style.cssText += 'border-top:5px solid transparent;border-right:5px solid rgba(0,0,0,0.7);border-bottom:5px solid transparent;border-left:5px solid transparent;right:100%;top:50%;transform:translateY(-50%);-webkit-transform:translateY(-50%);';
            break;
        case 'bottom':
            oDiv.style.cssText += 'border-top:5px solid transparent;border-right:5px solid transparent;border-bottom:5px solid rgba(0,0,0,0.7);border-left:5px solid transparent;bottom:100%;left:50%;transform:translateX(-50%);-webkit-transform:translateX(-50%);';;
            break;
    }
    return oDiv;
}

Vue.directive('tips', function(params) {
    const target = this.el;
    const direction = params[0];
    const msg = params[1];
    $(target).on('mouseenter', function() {
        const _this = $(this);
        const oDiv = $(createTips(direction, msg));
        $('body').append(oDiv);
        const offsetInfo = _this.offset();
        const W = _this.outerWidth();
        const H = _this.outerHeight();
        const _W = oDiv.outerWidth();
        const _H = oDiv.outerHeight();
        oDiv.css({ 'display': 'block' });
        switch (direction) {
            case 'left':
                oDiv.css({
                    'left': offsetInfo.left - _W - 10 + 'px',
                    'top': offsetInfo.top + (H / 2) - (_H / 2) + 'px'
                });
                oDiv.addClass('tipsInLeft');
                oDiv.removeClass('tipsOutLeft');
                break;
            case 'top':
                oDiv.css({
                    'left': offsetInfo.left + (W / 2) - (_W / 2) + 'px',
                    'top': offsetInfo.top - _H - 10 + 'px'
                });
                oDiv.addClass('tipsInTop');
                oDiv.removeClass('tipsOutTop');
                break;
            case 'right':
                oDiv.css({
                    'left': offsetInfo.left + W + 10 + 'px',
                    'top': offsetInfo.top + (H / 2) - (_H / 2) + 'px'
                });
                oDiv.addClass('tipsInRight');
                oDiv.removeClass('tipsOutRight');
                break;
            case 'bottom':
                oDiv.css({
                    'left': offsetInfo.left + (W / 2) - (_W / 2) + 'px',
                    'top': offsetInfo.top + H + 10 + 'px',
                });
                oDiv.addClass('tipsInBottom');
                oDiv.removeClass('tipsOutBottom');
                break;
        }
    })
    $(target).on('mouseleave', function() {
        const _this = $(this);
        const oDiv = $('body').find('.awesomeTips');
        switch (direction) {
            case 'left':
                oDiv.removeClass('tipsInLeft');
                oDiv.addClass('tipsOutLeft');
                break;
            case 'top':
                oDiv.removeClass('tipsInTop');
                oDiv.addClass('tipsOutTop');
                break;
            case 'right':
                oDiv.removeClass('tipsInRight');
                oDiv.addClass('tipsOutRight');
                break;
            case 'bottom':
                oDiv.removeClass('tipsInBottom');
                oDiv.addClass('tipsOutBottom');
                break;
        }
        setTimeout(function() {
            oDiv.remove();
        }, 600);

    })
})


/* 
// 样式
.awesomeTips {position: absolute;box-sizing: border-box;-webkit-box-sizing: border-box;padding: 8px 15px;color: #fff;font-size: 12px;background: rgba(0, 0, 0, 0.7);border-radius: 8px;z-index: 9999;}
.awesomeTips.tipsInLeft {-webkit-animation: tipsInLeft 0.4s ease 0.2s both;animation: tipsInLeft 0.4s ease 0.2s both;}
.awesomeTips.tipsInRight {-webkit-animation: tipsInRight 0.4s ease 0.2s both;animation: tipsInRight 0.4s ease 0.2s both;}
.awesomeTips.tipsInTop {-webkit-animation: tipsInTop 0.4s ease 0.2s both;animation: tipsInTop 0.4s ease 0.2s both;}
.awesomeTips.tipsInBottom {-webkit-animation: tipsInBottom 0.4s ease 0.2s both;animation: tipsInBottom 0.4s ease 0.2s both;}
@-webkit-keyframes tipsInLeft {
    0% {opacity: 0;-webkit-transform: translateX(-10px);}
    100% {opacity: 1;-webkit-transform: translateX(0);}
}
@-webkit-keyframes tipsInRight {
    0% {opacity: 0;-webkit-transform: translateX(10px);}
    100% {opacity: 1;-webkit-transform: translateX(0);}
}
@-webkit-keyframes tipsInTop {
    0% {opacity: 0;-webkit-transform: translateY(-10px);}
    100% {opacity: 1;-webkit-transform: translateY(0);}
}
@-webkit-keyframes tipsInBottom {
    0% {opacity: 0;-webkit-transform: translateY(10px);}
    100% {opacity: 1;-webkit-transform: translateY(0);}
}
.awesomeTips.tipsOutLeft {-webkit-animation: tipsOutLeft 0.4s ease 0.1s both;animation: tipsOutLeft 0.4s ease 0.1s both;}
.awesomeTips.tipsOutRight {-webkit-animation: tipsOutRight 0.4s ease 0.1s both;animation: tipsOutRight 0.4s ease 0.1s both;}
.awesomeTips.tipsOutTop {-webkit-animation: tipsOutTop 0.4s ease 0.1s both;animation: tipsOutTop 0.4s ease 0.1s both;}
.awesomeTips.tipsOutBottom {-webkit-animation: tipsOutBottom 0.4s ease 0.1s both;animation: tipsOutBottom 0.4s ease 0.1s both;}
@-webkit-keyframes tipsOutLeft {
    0% {opacity: 1; -webkit-transform: translateX(0);}
    100% {opacity: 0;-webkit-transform: translateX(-10px);}
}
@-webkit-keyframes tipsOutRight {
    0% {opacity: 1;-webkit-transform: translateX(0);}
    100% {opacity: 0;-webkit-transform: translateX(10px);}
}
@-webkit-keyframes tipsOutTop {
    0% {opacity: 1;-webkit-transform: translateY(0);}
    100% {opacity: 0;-webkit-transform: translateY(-10px);}
}
@-webkit-keyframes tipsOutBottom {
    0% {opacity: 1;-webkit-transform: translateY(0);}
    100% {opacity: 0;-webkit-transform: translateY(10px);}
}
*/


